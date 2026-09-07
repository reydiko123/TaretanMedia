<?php

namespace App\Filament\Resources\Articles\Schemas;

use App\Enums\CategoryType;
use App\Enums\PublicationStatus;
use App\Filament\Support\MediaUpload;
use App\Rules\CategoryMatchesType;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ArticleForm
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
                        Select::make('author_id')
                            ->label('Penulis')
                            ->relationship('author', 'name')
                            ->searchable()
                            ->preload()
                            ->required(),
                        Select::make('categories')
                            ->label('Kategori')
                            ->relationship(
                                name: 'categories',
                                titleAttribute: 'name',
                                modifyQueryUsing: fn ($query) => $query->where('type', CategoryType::Article->value),
                            )
                            ->multiple()
                            ->preload()
                            ->rule(new CategoryMatchesType(CategoryType::Article))
                            ->helperText('Hanya kategori bertipe Artikel yang tampil.'),
                    ]),

                Section::make('Konten')
                    ->schema([
                        Textarea::make('excerpt')
                            ->label('Ringkasan')
                            ->rows(2)
                            ->maxLength(500),
                        MediaUpload::make('featured_image_path', 'articles')
                            ->label('Gambar Utama'),
                        RichEditor::make('body')
                            ->label('Isi Artikel')
                            ->required()
                            ->helperText('Konten akan disanitasi otomatis sebelum disimpan.'),
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
