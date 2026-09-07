<?php

namespace App\Enums;

enum CategoryType: string
{
    case Book = 'book';
    case Journal = 'journal';
    case Article = 'article';

    /**
     * Human-readable label for UI display.
     */
    public function label(): string
    {
        return match ($this) {
            self::Book => 'Buku',
            self::Journal => 'Jurnal',
            self::Article => 'Artikel',
        };
    }

    /**
     * All values as an associative array for select inputs.
     *
     * @return array<string, string>
     */
    public static function options(): array
    {
        return [
            self::Book->value => self::Book->label(),
            self::Journal->value => self::Journal->label(),
            self::Article->value => self::Article->label(),
        ];
    }
}
