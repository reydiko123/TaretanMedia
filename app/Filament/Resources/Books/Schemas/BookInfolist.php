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
                TextEntry::make('title'),
                TextEntry::make('slug'),
                TextEntry::make('isbn')
                    ->placeholder('-'),
                TextEntry::make('publisher')
                    ->placeholder('-'),
                TextEntry::make('publication_year')
                    ->numeric()
                    ->placeholder('-'),
                TextEntry::make('page_count')
                    ->numeric()
                    ->placeholder('-'),
                TextEntry::make('price')
                    ->money(),
                TextEntry::make('cover_path')
                    ->placeholder('-'),
                TextEntry::make('synopsis')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('table_of_contents')
                    ->placeholder('-')
                    ->columnSpanFull(),
                TextEntry::make('status')
                    ->badge(),
                TextEntry::make('published_at')
                    ->dateTime()
                    ->placeholder('-'),
                IconEntry::make('is_featured')
                    ->boolean(),
                TextEntry::make('created_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('updated_at')
                    ->dateTime()
                    ->placeholder('-'),
                TextEntry::make('deleted_at')
                    ->dateTime()
                    ->visible(fn (Book $record): bool => $record->trashed()),
            ]);
    }
}
