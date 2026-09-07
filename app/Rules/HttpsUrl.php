<?php

namespace App\Rules;

use Closure;
use Illuminate\Contracts\Validation\ValidationRule;

class HttpsUrl implements ValidationRule
{
    /**
     * Validate that the value is a well-formed HTTPS URL (plan §7.10, rule #7).
     */
    public function validate(string $attribute, mixed $value, Closure $fail): void
    {
        if (! is_string($value) || $value === '') {
            $fail('URL wajib diisi.');

            return;
        }

        if (! filter_var($value, FILTER_VALIDATE_URL)) {
            $fail('URL tidak valid.');

            return;
        }

        $scheme = parse_url($value, PHP_URL_SCHEME);

        if (strtolower((string) $scheme) !== 'https') {
            $fail('URL harus menggunakan skema HTTPS.');
        }
    }
}
