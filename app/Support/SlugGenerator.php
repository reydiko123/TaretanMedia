<?php

namespace App\Support;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\SoftDeletingScope;
use Illuminate\Support\Str;

class SlugGenerator
{
    /**
     * Generate a unique slug for the given model class.
     *
     * Collision handling considers soft-deleted rows so a restore never
     * clashes with a slug taken while the record was trashed (plan §5.10).
     *
     * @param  class-string<Model>  $modelClass
     */
    public static function unique(string $modelClass, string $value, ?int $ignoreId = null): string
    {
        $base = Str::slug($value);

        if ($base === '') {
            $base = Str::random(8);
        }

        $slug = $base;
        $suffix = 2;

        while (self::exists($modelClass, $slug, $ignoreId)) {
            $slug = $base.'-'.$suffix;
            $suffix++;
        }

        return $slug;
    }

    /**
     * Determine whether a slug already exists (including trashed rows).
     *
     * @param  class-string<Model>  $modelClass
     */
    protected static function exists(string $modelClass, string $slug, ?int $ignoreId): bool
    {
        $query = $modelClass::query();

        $usesSoftDeletes = in_array(
            SoftDeletes::class,
            class_uses_recursive($modelClass),
            true,
        );

        if ($usesSoftDeletes) {
            // Include trashed rows so a restore never clashes with a slug
            // taken while the record was soft-deleted (plan §5.10).
            $query->withoutGlobalScope(SoftDeletingScope::class);
        }

        $query->where('slug', $slug);

        if ($ignoreId !== null) {
            $query->where('id', '!=', $ignoreId);
        }

        return $query->exists();
    }
}
