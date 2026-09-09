<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (DB::getDriverName() === 'sqlite') {
            DB::statement('ALTER TABLE services ADD COLUMN price INTEGER NOT NULL DEFAULT 0 CHECK (price >= 0)');

            return;
        }

        Schema::table('services', function (Blueprint $table): void {
            $table->unsignedInteger('price')->default(0)->after('name');
        });
    }

    public function down(): void
    {
        Schema::table('services', function (Blueprint $table): void {
            $table->dropColumn('price');
        });
    }
};
