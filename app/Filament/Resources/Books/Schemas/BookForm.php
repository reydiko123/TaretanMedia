<?php

namespace App\Filament\Resources\Books\Schemas;

use App\Enums\CategoryType;
use App\Enums\PublicationStatus;
use App\Filament\Support\MediaUpload;
use App\Rules\CategoryMatchesType;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class BookForm
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
                        TextInput::make('isbn')
                            ->label('ISBN')
                            ->maxLength(32)
                            ->helperText('Opsional. Dinormalisasi dan wajib unik jika diisi.'),
                        TextInput::make('publisher')
                            ->label('Penerbit')
                            ->maxLength(255),
                        TextInput::make('publication_year')
                            ->label('Tahun Terbit')
                            ->numeric()
                            ->minValue(0)
                            ->maxValue(2100),
                        TextInput::make('page_count')
                            ->label('Jumlah Halaman')
                            ->numeric()
                            ->minValue(0),
                        TextInput::make('price')
                            ->label('Harga (Rp)')
                            ->numeric()
                            ->minValue(0)
                            ->required()
                            ->default(0)
                            ->helperText('Nominal Rupiah tanpa desimal.'),
                    ]),

                Section::make('Relasi')
                    ->columns(2)
                    ->schema([
                        Select::make('categories')
                            ->label('Kategori')
                            ->relationship(
                                name: 'categories',
                                titleAttribute: 'name',
                                modifyQueryUsing: fn ($query) => $query->where('type', CategoryType::Book->value),
                            )
                            ->multiple()
                            ->preload()
                            ->rule(new CategoryMatchesType(CategoryType::Book))
                            ->helperText('Hanya kategori bertipe Buku yang tampil.'),
                    ]),

                Section::make('Konten')
                    ->schema([
                        MediaUpload::make('cover_path', 'books')
                            ->label('Sampul'),
                        Textarea::make('synopsis')
                            ->label('Sinopsis')
                            ->rows(4),
                        Textarea::make('table_of_contents')
                            ->label('Daftar Isi')
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
                            ->native(false)
                            ->live(),
                        DateTimePicker::make('published_at')
                            ->label('Tanggal Publikasi')
                            ->helperText('Wajib untuk status Published; terisi otomatis jika kosong.'),
                        Toggle::make('is_featured')
                            ->label('Unggulan'),
                    ]),
            ]);
    }
}
