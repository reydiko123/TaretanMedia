<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('books', function (Blueprint $table): void {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('isbn')->nullable()->unique();
            $table->string('publisher')->nullable();
            $table->integer('publication_year')->nullable();
            $table->integer('page_count')->nullable();
            $table->unsignedInteger('price')->default(0);
            $table->string('cover_path')->nullable();
            $table->text('synopsis')->nullable();
            $table->text('table_of_contents')->nullable();
            $table->enum('status', ['draft', 'published'])->default('draft');
            $table->dateTime('published_at')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->dateTime('created_at')->nullable();
            $table->dateTime('updated_at')->nullable();
            $table->dateTime('deleted_at')->nullable();
            $table->index('status');
            $table->index('published_at');
            $table->index('publication_year');
            $table->index('is_featured');
        });

        if (DB::getDriverName() === 'sqlite') {
            DB::statement("CREATE TRIGGER books_price_nonnegative_insert
                BEFORE INSERT ON books
                FOR EACH ROW WHEN NEW.price < 0
                BEGIN
                    SELECT RAISE(ABORT, 'books.price must be non-negative');
                END");

            DB::statement("CREATE TRIGGER books_price_nonnegative_update
                BEFORE UPDATE OF price ON books
                FOR EACH ROW WHEN NEW.price < 0
                BEGIN
                    SELECT RAISE(ABORT, 'books.price must be non-negative');
                END");
        }
    }

    public function down(): void
    {
        if (DB::getDriverName() === 'sqlite') {
            DB::statement('DROP TRIGGER IF EXISTS books_price_nonnegative_insert');
            DB::statement('DROP TRIGGER IF EXISTS books_price_nonnegative_update');
        }

        Schema::dropIfExists('books');
    }
};
