<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('books', function (Blueprint $table): void {
            $table->string('isbn_display')->nullable()->after('isbn');
        });

        DB::table('books')
            ->whereNotNull('isbn')
            ->update(['isbn_display' => DB::raw('isbn')]);
    }

    public function down(): void
    {
        Schema::table('books', function (Blueprint $table): void {
            $table->dropColumn('isbn_display');
        });
    }
};
