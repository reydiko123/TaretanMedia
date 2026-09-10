<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('journals', function (Blueprint $table): void {
            $table->id();
            $table->string('title');
            $table->string('slug')->unique();
            $table->string('theme')->nullable();
            $table->string('edition_label')->nullable();
            $table->integer('publication_year')->nullable();
            $table->string('cover_path')->nullable();
            $table->text('description')->nullable();
            $table->string('external_url');
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
    }

    public function down(): void
    {
        Schema::dropIfExists('journals');
    }
};
