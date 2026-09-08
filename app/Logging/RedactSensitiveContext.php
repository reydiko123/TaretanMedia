<?php

namespace App\Logging;

use Illuminate\Log\Logger;
use Monolog\Logger as MonologLogger;
use Monolog\LogRecord;

final class RedactSensitiveContext
{
    private function redact(mixed $value, ?string $key = null): mixed
    {
        if ($key !== null && preg_match('/password|secret|token|authorization|cookie|api[-_]?key|email|phone|mobile|name|manuscript|message|title|dsn/i', $key) === 1) {
            return '[REDACTED]';
        }
        if (is_array($value)) {
            $result = [];
            foreach ($value as $childKey => $childValue) {
                $result[$childKey] = $this->redact($childValue, (string) $childKey);
            }

            return $result;
        }

        return $value;
    }

    public function process(LogRecord $record): LogRecord
    {
        return $record->with(
            context: $this->redact($record->context),
            extra: $this->redact($record->extra),
        );
    }

    public function __invoke(Logger $logger): void
    {
        $monolog = $logger->getLogger();
        if ($monolog instanceof MonologLogger) {
            $monolog->pushProcessor($this->process(...));
        }
    }
}
