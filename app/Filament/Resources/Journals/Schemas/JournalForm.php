<?php

namespace App\Filament\Resources\Journals\Schemas;

use App\Enums\CategoryType;
use App\Enums\PublicationStatus;
use App\Filament\Support\MediaUpload;
use App\Rules\CategoryMatchesType;
use App\Rules\HttpsUrl;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class JournalForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Metadata')
                    ->columns(2)
                    ->schema([
                        TextInput::make('title')
                            ->label('Judul')
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
                            ->helperText('Dibuat otomatis dari judul; dapat diubah.'),
                        TextInput::make('theme')
                            ->label('Tema')
                            ->maxLength(255),
                        TextInput::make('edition_label')
                            ->label('Edisi')
                            ->maxLength(255),
                        TextInput::make('publication_year')
                            ->label('Tahun Terbit')
                            ->numeric()
                            ->minValue(0)
                            ->maxValue(2100),
                        TextInput::make('external_url')
                            ->label('URL Eksternal')
                            ->required()
                            ->url()
                            ->rule(new HttpsUrl)
                            ->helperText('Wajib HTTPS.'),
                    ]),

                Section::make('Relasi')
                    ->schema([
                        Select::make('categories')
                            ->label('Kategori')
                            ->relationship(
                                name: 'categories',
                                titleAttribute: 'name',
                                modifyQueryUsing: fn ($query) => $query->where('type', CategoryType::Journal->value),
                            )
                            ->multiple()
                            ->preload()
                            ->rule(new CategoryMatchesType(CategoryType::Journal))
                            ->helperText('Hanya kategori bertipe Jurnal yang tampil.'),
                    ]),

                Section::make('Konten')
                    ->schema([
                        MediaUpload::make('cover_path', 'journals')
                            ->label('Sampul'),
                        Textarea::make('description')
                            ->label('Deskripsi')
                            ->rows(4),
                    ]),

                Section::make('Publikasi')
                    ->columns(2)
                    ->schema([
                        Select::make('status')
                            ->label('Status')
                            ->options(PublicationStatus::options())
                            ->default(PublicationStatus::Draft->value)
                            ->required()
                            ->native(false),
                        DateTimePicker::make('published_at')
                            ->label('Tanggal Publikasi')
                            ->helperText('Wajib untuk status Published; terisi otomatis jika kosong.'),
                        Toggle::make('is_featured')
                            ->label('Unggulan'),
                    ]),
            ]);
    }
}
