<?php

namespace App\Filament\Resources\Authors\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class AuthorForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('name')
                    ->label('Nama')
                    ->required()
                    ->maxLength(255),
                Textarea::make('about')
                    ->label('Bio Singkat')
                    ->maxLength(255)
                    ->rows(3)
                    ->helperText('Opsional, maksimal 255 karakter.'),
            ]);
    }
}
