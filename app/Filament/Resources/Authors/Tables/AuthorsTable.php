<?php

namespace App\Filament\Resources\Authors\Tables;

use App\Filament\Resources\Authors\AuthorDeletionGuard;
use App\Models\Author;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Actions\RestoreAction;
use Filament\Actions\RestoreBulkAction;
use Filament\Notifications\Notification;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;
use Illuminate\Support\Collection;

class AuthorsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label('Nama')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('books_count')
                    ->label('Jumlah Buku')
                    ->counts('books')
                    ->badge(),
                TextColumn::make('articles_count')
                    ->label('Jumlah Berita')
                    ->counts('articles')
                    ->badge(),
                TextColumn::make('deleted_at')
                    ->label('Dihapus')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                TrashedFilter::make(),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make()
                    ->before(fn (Author $record, DeleteAction $action) => AuthorDeletionGuard::forRecord($record, $action)),
                RestoreAction::make(),
                ForceDeleteAction::make()
                    ->before(function (Author $record, ForceDeleteAction $action): void {
                        if ($record->articles()->withTrashed()->exists()) {
                            Notification::make()
                                ->title('Tidak dapat menghapus permanen')
                                ->body('Author masih memiliki artikel terkait. Hapus atau alihkan artikel tersebut terlebih dahulu.')
                                ->danger()
                                ->send();

                            $action->cancel();
                        }
                    }),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make()
                        ->before(fn (Collection $records, DeleteBulkAction $action) => AuthorDeletionGuard::forRecords($records, $action)),
                    ForceDeleteBulkAction::make(),
                    RestoreBulkAction::make(),
                ]),
            ]);
    }
}
