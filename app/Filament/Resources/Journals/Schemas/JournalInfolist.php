<?php

namespace App\Filament\Resources\Journals\Schemas;

use App\Models\Journal;
use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class JournalInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextEntry::make('title')
                    ->label('Judul'),
                TextEntry::make('slug')
                    ->label('Slug'),
                TextEntry::make('theme')
                    ->label('Tema')
                    ->placeholder('-'),
                TextEntry::make('edition_label')
                    ->label('Edisi')
                    ->placeholder('-'),
                TextEntry::make('publication_year')
                    ->label('Tahun Terbit')
                    ->placeholder('-'),
                TextEntry::make('cover_path')
                    ->label('Sampul')
                    ->placeholder('-'),
                TextEntry::make('description')
                    ->label('Deskripsi')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('external_url')
                    ->label('URL Eksternal'),
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
                    ->visible(fn (Journal $record): bool => $record->trashed()),
            ]);
    }
}
