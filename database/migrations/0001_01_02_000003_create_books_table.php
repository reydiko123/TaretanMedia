<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement("CREATE TABLE books (
            id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
            title varchar NOT NULL,
            slug varchar NOT NULL,
            isbn varchar,
            publisher varchar,
            publication_year integer,
            page_count integer,
            price integer NOT NULL DEFAULT 0,
            cover_path varchar,
            synopsis text,
            table_of_contents text,
            status varchar NOT NULL DEFAULT 'draft',
            published_at datetime,
            is_featured tinyint(1) NOT NULL DEFAULT 0,
            created_at datetime,
            updated_at datetime,
            deleted_at datetime,
            CHECK (price >= 0),
            CHECK (status IN ('draft','published'))
        )");

        Schema::table('books', function ($table) {
            $table->unique('slug');
            $table->unique('isbn');
            $table->index('status');
            $table->index('published_at');
            $table->index('publication_year');
            $table->index('is_featured');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('books');
    }
};
