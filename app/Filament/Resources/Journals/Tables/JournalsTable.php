<?php

namespace App\Filament\Resources\Journals\Tables;

use App\Enums\CategoryType;
use App\Enums\PublicationStatus;
use App\Models\Journal;
use Filament\Actions\Action;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ForceDeleteBulkAction;
use Filament\Actions\RestoreAction;
use Filament\Actions\RestoreBulkAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TrashedFilter;
use Filament\Tables\Table;

class JournalsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')
                    ->label('Judul')
                    ->searchable()
                    ->sortable(),
                TextColumn::make('theme')
                    ->label('Tema')
                    ->searchable(),
                TextColumn::make('publication_year')
                    ->label('Tahun')
                    ->sortable(),
                TextColumn::make('status')
                    ->label('Status')
                    ->badge()
                    ->color(fn (PublicationStatus $state): string => $state === PublicationStatus::Published ? 'success' : 'gray')
                    ->formatStateUsing(fn (PublicationStatus $state): string => $state->label()),
                IconColumn::make('is_featured')
                    ->label('Unggulan')
                    ->boolean(),
                TextColumn::make('deleted_at')
                    ->label('Dihapus')
                    ->dateTime()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                SelectFilter::make('status')
                    ->label('Status')
                    ->options(PublicationStatus::options()),
                SelectFilter::make('categories')
                    ->label('Kategori')
                    ->relationship('categories', 'name', fn ($query) => $query->where('type', CategoryType::Journal->value))
                    ->multiple()
                    ->preload(),
                SelectFilter::make('publication_year')
                    ->label('Tahun')
                    ->options(fn (): array => Journal::query()
                        ->whereNotNull('publication_year')
                        ->distinct()
                        ->orderByDesc('publication_year')
                        ->pluck('publication_year', 'publication_year')
                        ->all()),
                TrashedFilter::make(),
            ])
            ->recordActions([
                ViewAction::make(),
                EditAction::make(),
                Action::make('publish')
                    ->label('Publish')
                    ->icon('heroicon-o-check-circle')
                    ->color('success')
                    ->visible(fn (Journal $record): bool => $record->status !== PublicationStatus::Published && $record->deleted_at === null)
                    ->action(fn (Journal $record) => $record->update(['status' => PublicationStatus::Published->value])),
                Action::make('unpublish')
                    ->label('Jadikan Draft')
                    ->icon('heroicon-o-arrow-uturn-left')
                    ->color('gray')
                    ->visible(fn (Journal $record): bool => $record->status === PublicationStatus::Published && $record->deleted_at === null)
                    ->action(fn (Journal $record) => $record->update(['status' => PublicationStatus::Draft->value])),
                DeleteAction::make(),
                RestoreAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                    ForceDeleteBulkAction::make(),
                    RestoreBulkAction::make(),
                ]),
            ]);
    }
}
