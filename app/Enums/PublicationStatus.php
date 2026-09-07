<?php

namespace App\Enums;

enum PublicationStatus: string
{
    case Draft = 'draft';
    case Published = 'published';

    /**
     * Human-readable label for UI display.
     */
    public function label(): string
    {
        return match ($this) {
            self::Draft => 'Draft',
            self::Published => 'Published',
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
            self::Draft->value => self::Draft->label(),
            self::Published->value => self::Published->label(),
        ];
    }
}
