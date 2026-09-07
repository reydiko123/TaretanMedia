<?php

namespace App\Filament\Support;

use Filament\Forms\Components\FileUpload;

/**
 * Centralised image upload configuration (plan §7.9 / §11, rules #11–14):
 * JPEG/PNG/WebP only, max 5 MB, system-generated file names, stored on the
 * public disk. SVG and executables are rejected by the accepted-type allowlist.
 */
class MediaUpload
{
    public static function make(string $name, string $directory): FileUpload
    {
        return FileUpload::make($name)
            ->image()
            ->disk('public')
            ->directory($directory)
            ->visibility('public')
            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
            ->maxSize(5120) // kilobytes = 5 MB
            ->imageEditor()
            ->helperText('JPEG, PNG, atau WebP. Maksimal 5 MB.')
            // Regenerate the stored file name so the original name is discarded.
            ->getUploadedFileNameForStorageUsing(
                fn ($file): string => (string) str()->uuid().'.'.$file->getClientOriginalExtension(),
            );
    }
}
