<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('journal_category', function (Blueprint $table) {
            $table->foreignId('journal_id')->constrained('journals')->cascadeOnDelete();
            $table->foreignId('category_id')->constrained('categories')->cascadeOnDelete();

            $table->unique(['journal_id', 'category_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('journal_category');
    }
};
