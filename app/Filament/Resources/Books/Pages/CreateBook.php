<?php

namespace App\Filament\Resources\Books\Pages;

use App\Filament\Resources\Books\BookResource;
use App\Models\Book;
use Filament\Resources\Pages\CreateRecord;

class CreateBook extends CreateRecord
{
    protected static string $resource = BookResource::class;

    /** @var array<int, array{author_id: int|string, sort_order?: int|string|null}> */
    protected array $authorEntries = [];

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    protected function mutateFormDataBeforeCreate(array $data): array
    {
        $this->authorEntries = $data['author_entries'] ?? [];
        unset($data['author_entries']);

        return $data;
    }

    protected function afterCreate(): void
    {
        /** @var Book $book */
        $book = $this->record;

        $book->authors()->sync(collect($this->authorEntries)
            ->mapWithKeys(fn (array $entry): array => [
                (int) $entry['author_id'] => ['sort_order' => (int) ($entry['sort_order'] ?? 0)],
            ])
            ->all());
    }
}
