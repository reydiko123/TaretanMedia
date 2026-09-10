<?php

namespace Tests\Unit;

use PHPUnit\Framework\Attributes\Test;
use PHPUnit\Framework\TestCase;

final class MigrationCompatibilityTest extends TestCase
{
    #[Test]
    public function domain_migrations_do_not_embed_sqlite_only_table_definitions(): void
    {
        $migrationFiles = [
            '0001_01_02_000001_create_authors_table.php',
            '0001_01_02_000002_create_categories_table.php',
            '0001_01_02_000003_create_books_table.php',
            '0001_01_02_000004_create_journals_table.php',
            '0001_01_02_000005_create_articles_table.php',
        ];

        foreach ($migrationFiles as $migrationFile) {
            $source = file_get_contents(dirname(__DIR__, 2).'/database/migrations/'.$migrationFile);

            $this->assertIsString($source);
            $this->assertStringNotContainsString('AUTOINCREMENT', $source, $migrationFile);
            $this->assertStringNotContainsString('CREATE TABLE', strtoupper($source), $migrationFile);
        }
    }
}
