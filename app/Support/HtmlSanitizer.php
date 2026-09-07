<?php

namespace App\Support;

use Stevebauman\Purify\Facades\Purify;

/**
 * Wraps HTMLPurifier with the curated "article" allowlist so rich text is
 * sanitised consistently before persistence and render (plan §7.9, R-04).
 */
class HtmlSanitizer
{
    public static function article(?string $html): string
    {
        if ($html === null || trim($html) === '') {
            return '';
        }

        $cleaned = Purify::config('article')->clean($html);

        return is_array($cleaned) ? implode('', $cleaned) : $cleaned;
    }
}
