<?php

namespace App\Filament\Resources\Books\RelationManagers;

use Filament\Actions\AttachAction;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DetachAction;
use Filament\Actions\DetachBulkAction;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class AuthorsRelationManager extends RelationManager
{
    protected static string $relationship = 'authors';

    protected static ?string $title = 'Penulis';

    public function form(Schema $schema): Schema
    {
        return $schema
            ->components([
                TextInput::make('sort_order')
                    ->label('Urutan')
                    ->numeric()
                    ->default(0),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('name')
            ->defaultSort('author_book.sort_order')
            ->reorderable('author_book.sort_order')
            ->columns([
                TextColumn::make('name')
                    ->label('Nama')
                    ->searchable(),
                TextColumn::make('pivot.sort_order')
                    ->label('Urutan')
                    ->sortable(),
            ])
            ->headerActions([
                AttachAction::make()
                    ->label('Tambah Penulis')
                    ->preloadRecordSelect()
                    ->schema(fn (AttachAction $action): array => [
                        $action->getRecordSelect(),
                        Select::make('sort_order')
                            ->label('Urutan')
                            ->options(fn (): array => collect(range(0, 20))
                                ->mapWithKeys(fn (int $order): array => [$order => (string) $order])
                                ->all())
                            ->default(0),
                    ]),
            ])
            ->recordActions([
                DetachAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DetachBulkAction::make(),
                ]),
            ]);
    }
}
