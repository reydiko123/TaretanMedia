<?php

namespace App\Rules;

use App\Enums\CategoryType;
use App\Models\Category;
use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class CategoryMatchesType implements ValidationRule
{
    public function __construct(private CategoryType $expectedType) {}

    /**
     * Validate that every given category id belongs to the expected type
     * (plan §5.13, rule #3). Value is expected to be an array of ids.
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        $ids = array_filter((array) $value);

        if ($ids === []) {
            return;
        }

        $mismatched = Category::query()
            ->withTrashed()
            ->whereIn('id', $ids)
            ->where('type', '!=', $this->expectedType->value)
            ->exists();

        if ($mismatched) {
            $fail('Kategori yang dipilih tidak sesuai tipe publikasi ('.$this->expectedType->label().').');
        }
    }
}
