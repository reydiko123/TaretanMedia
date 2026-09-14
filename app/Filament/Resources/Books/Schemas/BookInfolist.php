<?php

namespace App\Filament\Resources\Books\Schemas;

use App\Models\Book;
use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class BookInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('title')
                    ->label('Judul'),
                TextEntry::make('slug')
                    ->label('Slug'),
                TextEntry::make('isbn_display')
                    ->label('ISBN')
                    ->placeholder('-'),
                TextEntry::make('publisher')
                    ->label('Penerbit')
                    ->placeholder('-'),
                TextEntry::make('publication_year')
                    ->label('Tahun Terbit')
                    ->placeholder('-'),
                TextEntry::make('page_count')
                    ->label('Jumlah Halaman')
                    ->placeholder('-'),
                TextEntry::make('price')
                    ->label('Harga')
                    ->formatStateUsing(fn (int $state): string => 'Rp '.number_format($state, 0, ',', '.')),
                TextEntry::make('cover_path')
                    ->label('Sampul')
                    ->placeholder('-'),
                TextEntry::make('synopsis')
                    ->label('Sinopsis')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('table_of_contents')
                    ->label('Daftar Isi')
                    ->placeholder('-')
                    ->columnSpanFull(),
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
                    ->visible(fn (Book $record): bool => $record->trashed()),
            ]);
    }
}
