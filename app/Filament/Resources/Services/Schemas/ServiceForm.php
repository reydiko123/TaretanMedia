<?php

namespace App\Filament\Resources\Services\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ServiceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Layanan')
                    ->columns(2)
                    ->schema([
                        TextInput::make('name')
                            ->label('Nama')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function (string $operation, $state, callable $set): void {
                                if ($operation === 'create') {
                                    $set('slug', Str::slug((string) $state));
                                }
                            }),
                        TextInput::make('slug')
                            ->label('Slug')
                            ->maxLength(255)
                            ->helperText('Dibuat otomatis dari nama; dapat diubah.'),
                        TextInput::make('cta_label')
                            ->label('Label CTA')
                            ->maxLength(255)
                            ->default('Konsultasikan Kebutuhan Anda'),
                        TextInput::make('price')
                            ->label('Harga (Rp)')
                            ->numeric()
                            ->minValue(0)
                            ->default(0)
                            ->helperText('Kosong akan ditampilkan sebagai Rp 0.'),
                        TextInput::make('sort_order')
                            ->label('Urutan')
                            ->numeric()
                            ->default(0),
                    ]),

                Section::make('Deskripsi')
                    ->schema([
                        Textarea::make('summary')
                            ->label('Ringkasan')
                            ->rows(2),
                        Textarea::make('description')
                            ->label('Deskripsi')
                            ->rows(5),
                        Repeater::make('features')
                            ->label('Fitur / Cakupan')
                            ->simple(
                                TextInput::make('feature')
                                    ->label('Fitur')
                                    ->required(),
                            )
                            ->addActionLabel('Tambah Fitur'),
                    ]),

                Toggle::make('is_active')
                    ->label('Aktif')
                    ->default(true),
            ]);
    }
}
