<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement("CREATE TABLE articles (
            id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
            author_id integer NOT NULL,
            title varchar NOT NULL,
            slug varchar NOT NULL,
            excerpt text,
            body text NOT NULL,
            featured_image_path varchar,
            status varchar NOT NULL DEFAULT 'draft',
            published_at datetime,
            is_featured tinyint(1) NOT NULL DEFAULT 0,
            created_at datetime,
            updated_at datetime,
            deleted_at datetime,
            FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE RESTRICT,
            CHECK (status IN ('draft','published'))
        )");

        Schema::table('articles', function ($table) {
            $table->unique('slug');
            $table->index('status');
            $table->index('published_at');
            $table->index('is_featured');
            $table->index('author_id');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('articles');
    }
};
