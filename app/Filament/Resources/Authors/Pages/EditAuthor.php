<?php

namespace App\Filament\Resources\Authors\Pages;

use App\Filament\Resources\Authors\AuthorDeletionGuard;
use App\Filament\Resources\Authors\AuthorResource;
use App\Models\Author;
use Filament\Actions\DeleteAction;
use Filament\Actions\ForceDeleteAction;
use Filament\Actions\RestoreAction;
use Filament\Resources\Pages\EditRecord;

class EditAuthor extends EditRecord
{
    protected static string $resource = AuthorResource::class;

    protected function getHeaderActions(): array
    {
        return [
            DeleteAction::make()
                ->before(fn (Author $record, DeleteAction $action) => AuthorDeletionGuard::forRecord($record, $action)),
            ForceDeleteAction::make(),
            RestoreAction::make(),
        ];
    }
}
