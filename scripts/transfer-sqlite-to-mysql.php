<?php

declare(strict_types=1);

if (PHP_SAPI !== 'cli') {
    fwrite(STDERR, "This utility must be run from the CLI.\n");
    exit(1);
}

if (! extension_loaded('pdo_sqlite') || ! extension_loaded('pdo_mysql')) {
    fwrite(STDERR, "Both pdo_sqlite and pdo_mysql are required.\n");
    exit(1);
}

$sourcePath = $argv[1] ?? getenv('SQLITE_PATH') ?: dirname(__DIR__).'/database/database.sqlite';
$mysqlHost = getenv('MYSQL_HOST') ?: '127.0.0.1';
$mysqlPort = getenv('MYSQL_PORT') ?: '3306';
$mysqlDatabase = getenv('MYSQL_DATABASE');
$mysqlUsername = getenv('MYSQL_USERNAME') ?: 'root';
$mysqlPassword = getenv('MYSQL_PASSWORD') ?: '';

if (! $mysqlDatabase) {
    fwrite(STDERR, "MYSQL_DATABASE is required.\n");
    exit(1);
}

if (! is_file($sourcePath)) {
    fwrite(STDERR, "SQLite source does not exist: {$sourcePath}\n");
    exit(1);
}

function quoteIdentifier(string $identifier): string
{
    return '`'.str_replace('`', '``', $identifier).'`';
}

function bindAndExecute(PDOStatement $statement, array $row): void
{
    foreach (array_values($row) as $index => $value) {
        $type = match (true) {
            $value === null => PDO::PARAM_NULL,
            is_int($value) => PDO::PARAM_INT,
            default => PDO::PARAM_STR,
        };

        $statement->bindValue($index + 1, $value, $type);
    }

    $statement->execute();
}

$tables = [
    'admins' => ['id', 'username', 'password', 'remember_token', 'created_at', 'updated_at'],
    'password_reset_tokens' => ['email', 'token', 'created_at'],
    'sessions' => ['id', 'user_id', 'ip_address', 'user_agent', 'payload', 'last_activity'],
    'cache' => ['key', 'value', 'expiration'],
    'cache_locks' => ['key', 'owner', 'expiration'],
    'jobs' => ['id', 'queue', 'payload', 'attempts', 'reserved_at', 'available_at', 'created_at'],
    'job_batches' => ['id', 'name', 'total_jobs', 'pending_jobs', 'failed_jobs', 'failed_job_ids', 'options', 'cancelled_at', 'created_at', 'finished_at'],
    'failed_jobs' => ['id', 'uuid', 'connection', 'queue', 'payload', 'exception', 'failed_at'],
    'authors' => ['id', 'name', 'about', 'created_at', 'updated_at', 'deleted_at'],
    'categories' => ['id', 'name', 'slug', 'type', 'created_at', 'updated_at', 'deleted_at'],
    'books' => ['id', 'title', 'slug', 'isbn', 'isbn_display', 'publisher', 'publication_year', 'page_count', 'price', 'cover_path', 'synopsis', 'table_of_contents', 'status', 'published_at', 'is_featured', 'created_at', 'updated_at', 'deleted_at'],
    'journals' => ['id', 'title', 'slug', 'theme', 'edition_label', 'publication_year', 'cover_path', 'description', 'external_url', 'status', 'published_at', 'is_featured', 'created_at', 'updated_at', 'deleted_at'],
    'articles' => ['id', 'author_id', 'title', 'slug', 'excerpt', 'body', 'featured_image_path', 'status', 'published_at', 'is_featured', 'created_at', 'updated_at', 'deleted_at'],
    'services' => ['id', 'name', 'slug', 'price', 'summary', 'description', 'features', 'cta_label', 'sort_order', 'is_active', 'created_at', 'updated_at', 'deleted_at'],
    'author_book' => ['author_id', 'book_id', 'sort_order', 'created_at', 'updated_at'],
    'book_category' => ['book_id', 'category_id'],
    'journal_category' => ['journal_id', 'category_id'],
    'article_category' => ['article_id', 'category_id'],
];

$sqlite = new PDO('sqlite:'.$sourcePath, null, null, [
    PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
]);
$mysql = new PDO(
    "mysql:host={$mysqlHost};port={$mysqlPort};dbname={$mysqlDatabase};charset=utf8mb4",
    $mysqlUsername,
    $mysqlPassword,
    [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false,
    ],
);

$mysql->exec('SET NAMES utf8mb4 COLLATE utf8mb4_unicode_ci');
$mysql->exec('SET FOREIGN_KEY_CHECKS = 0');

try {
    foreach ($tables as $table => $columns) {
        $sourceColumns = $sqlite->query('PRAGMA table_info('.quoteIdentifier($table).')')->fetchAll(PDO::FETCH_COLUMN, 1);
        $missingColumns = array_diff($columns, $sourceColumns);

        if ($missingColumns !== []) {
            throw new RuntimeException("SQLite table {$table} is missing: ".implode(', ', $missingColumns));
        }

        $targetCount = (int) $mysql->query('SELECT COUNT(*) FROM '.quoteIdentifier($table))->fetchColumn();

        if ($targetCount !== 0) {
            throw new RuntimeException("Target table {$table} is not empty; refusing to overwrite data.");
        }
    }

    $mysql->beginTransaction();
    $copied = [];

    foreach ($tables as $table => $columns) {
        $quotedColumns = implode(', ', array_map('quoteIdentifier', $columns));
        $placeholders = implode(', ', array_fill(0, count($columns), '?'));
        $insert = $mysql->prepare('INSERT INTO '.quoteIdentifier($table)." ({$quotedColumns}) VALUES ({$placeholders})");
        $select = $sqlite->query('SELECT '.$quotedColumns.' FROM '.quoteIdentifier($table));
        $count = 0;

        while ($row = $select->fetch(PDO::FETCH_ASSOC)) {
            bindAndExecute($insert, $row);
            $count++;
        }

        $copied[$table] = $count;
    }

    $mysql->commit();

    foreach ($copied as $table => $count) {
        $targetCount = (int) $mysql->query('SELECT COUNT(*) FROM '.quoteIdentifier($table))->fetchColumn();

        if ($targetCount !== $count) {
            throw new RuntimeException("Row count mismatch for {$table}: source={$count}, target={$targetCount}");
        }

        echo sprintf("%-24s %d\n", $table, $count);
    }
} catch (Throwable $exception) {
    if ($mysql->inTransaction()) {
        $mysql->rollBack();
    }

    fwrite(STDERR, $exception->getMessage()."\n");
    exit(1);
} finally {
    $mysql->exec('SET FOREIGN_KEY_CHECKS = 1');
}
