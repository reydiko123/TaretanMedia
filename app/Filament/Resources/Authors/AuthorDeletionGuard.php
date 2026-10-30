<?php

namespace App\Filament\Resources\Authors;

use App\Models\Author;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Illuminate\Support\Collection;

/**
 * Blocks soft-deleting authors whose books or articles are still in use,
 * so public pages never lose an author's byline.
 */
final class AuthorDeletionGuard
{
    public static function forRecord(Author $record, Action $action): void
    {
        self::guard(collect([$record]), $action);
    }

    /**
     * @param  Collection<int, Author>  $records
     */
    public static function forRecords(Collection $records, Action $action): void
    {
        self::guard($records, $action);
    }

    /**
     * @param  Collection<int, Author>  $records
     */
    private static function guard(Collection $records, Action $action): void
    {
        $blocked = $records->filter(fn (Author $author): bool => $author->hasWorks());

        if ($blocked->isEmpty()) {
            return;
        }

        Notification::make()
            ->title('Penulis tidak dapat dihapus')
            ->body(sprintf(
                'Penulis berikut masih memiliki buku atau berita: %s. Hapus atau alihkan karya tersebut ke penulis lain terlebih dahulu.',
                $blocked->pluck('name')->join(', '),
            ))
            ->danger()
            ->persistent()
            ->send();

        $action->cancel();
    }
}
