<?php

namespace App\Filament\Widgets;

use App\Enums\PublicationStatus;
use App\Models\Article;
use App\Models\Book;
use App\Models\Journal;
use App\Models\Service;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ContentStatsOverview extends BaseWidget
{
    protected function getStats(): array
    {
        return [
            $this->publicationStat('Buku', Book::class),
            $this->publicationStat('Jurnal', Journal::class),
            $this->publicationStat('Artikel', Article::class),
            Stat::make('Layanan Aktif', (string) Service::query()->where('is_active', true)->count())
                ->description(Service::onlyTrashed()->count().' terhapus')
                ->color('primary'),
        ];
    }

    /**
     * @param  class-string<Model>  $model
     */
    private function publicationStat(string $label, string $model): Stat
    {
        $published = $model::query()->where('status', PublicationStatus::Published->value)->count();
        $draft = $model::query()->where('status', PublicationStatus::Draft->value)->count();
        $trashed = DB::table((new $model)->getTable())->whereNotNull('deleted_at')->count();

        return Stat::make($label, (string) ($published + $draft))
            ->description("{$published} published · {$draft} draft · {$trashed} terhapus")
            ->color($published > 0 ? 'success' : 'gray');
    }
}
