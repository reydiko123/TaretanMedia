<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement("CREATE TABLE categories (
            id integer PRIMARY KEY AUTOINCREMENT NOT NULL,
            name varchar NOT NULL,
            slug varchar NOT NULL,
            type varchar NOT NULL,
            created_at datetime,
            updated_at datetime,
            deleted_at datetime,
            CHECK (type IN ('book','journal','article'))
        )");

        Schema::table('categories', function ($table) {
            $table->unique('slug');
            $table->unique(['name', 'type']);
            $table->index('type');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('categories');
    }
};
