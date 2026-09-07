<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement("CREATE TABLE journals (
            id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
            title varchar NOT NULL,
            slug varchar NOT NULL,
            theme varchar,
            edition_label varchar,
            publication_year integer,
            cover_path varchar,
            description text,
            external_url varchar NOT NULL,
            status varchar NOT NULL DEFAULT 'draft',
            published_at datetime,
            is_featured tinyint(1) NOT NULL DEFAULT 0,
            created_at datetime,
            updated_at datetime,
            deleted_at datetime,
            CHECK (status IN ('draft','published'))
        )");

        Schema::table('journals', function ($table) {
            $table->unique('slug');
            $table->index('status');
            $table->index('published_at');
            $table->index('publication_year');
            $table->index('is_featured');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('journals');
    }
};
