<?php

namespace App\Models\Concerns;

use App\Enums\PublicationStatus;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

/**
 * Records content lifecycle events to the dedicated audit channel
 * (plan §7.15 / PRD §12.4). Logs only entity type, id, action, and the
 * acting admin id — never credentials or personal data.
 */
trait LogsContentAudit
{
    public static function bootLogsContentAudit(): void
    {
        static::created(fn ($model) => $model->writeAudit('created'));
        static::updated(function ($model): void {
            if ($model->wasChanged('status')) {
                $status = $model->status instanceof PublicationStatus
                    ? $model->status->value
                    : (string) $model->status;
                $model->writeAudit('status_changed:'.$status);
            } else {
                $model->writeAudit('updated');
            }
        });
        static::deleted(function ($model): void {
            $model->writeAudit($model->isForceDeleting() ? 'force_deleted' : 'deleted');
        });

        static::restored(fn ($model) => $model->writeAudit('restored'));
    }

    protected function writeAudit(string $action): void
    {
        Log::channel('audit')->info('content.'.$action, [
            'entity' => class_basename($this),
            'id' => $this->getKey(),
            'admin_id' => Auth::guard('admin')->id(),
        ]);
    }
}
