<?php

namespace App\Filament\Resources\Articles\Schemas;

use App\Models\Article;
use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class ArticleInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('author.name')
                    ->label('Penulis'),
                TextEntry::make('title')
                    ->label('Judul'),
                TextEntry::make('slug')
                    ->label('Slug'),
                TextEntry::make('excerpt')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('body')
                    ->label('Isi Berita')
                    ->html()
                    ->columnSpanFull(),
                ImageEntry::make('featured_image_path')
                    ->label('Gambar Utama')
                    ->placeholder('-'),
                TextEntry::make('status')
                    ->label('Status')
                    ->badge(),
                TextEntry::make('published_at')
                    ->label('Tanggal Publikasi')
                    ->dateTime()
                    ->placeholder('-'),
                IconEntry::make('is_featured')
                    ->label('Unggulan')
                    ->boolean(),
                TextEntry::make('created_at')
                    ->label('Dibuat Pada')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->label('Diperbarui Pada')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('deleted_at')
                    ->label('Dihapus')
                    ->dateTime()
                    ->visible(fn (Article $record): bool => $record->trashed()),
            ]);
    }
}
