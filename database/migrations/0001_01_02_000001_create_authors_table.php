<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Raw CREATE TABLE so the SQLite CHECK constraint is embedded in the
        // table definition (Laravel's schema builder has no CHECK API, and
        // SQLite cannot ALTER TABLE ADD CONSTRAINT). See plan §5.4.
        DB::statement('CREATE TABLE authors (
            id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
            name varchar NOT NULL,
            about varchar,
            created_at datetime,
            updated_at datetime,
            deleted_at datetime,
            CHECK (about IS NULL OR length(about) <= 255)
        )');
    }

    public function down(): void
    {
        Schema::dropIfExists('authors');
    }
};
