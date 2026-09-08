<?php

namespace App\Console\Commands;

use App\Services\Conversion\ConversionConfig;
use Illuminate\Console\Command;

final class ValidateProductionConfigCommand extends Command
{
    protected $signature = 'taretan:validate-config {--production : Validate deployment-only constraints}';

    protected $description = 'Validate public conversion configuration without printing configuration values.';

    public function handle(ConversionConfig $conversion): int
    {
        $errors = $conversion->errors();

        if ($this->option('production')) {
            if ((bool) config('app.debug')) {
                $errors[] = 'app.debug';
            }

            if (! str_starts_with((string) config('app.url'), 'https://')) {
                $errors[] = 'app.url';
            }

            $appKey = config('app.key');
            $validAppKey = false;
            if (is_string($appKey) && trim($appKey) !== '') {
                $rawKey = str_starts_with($appKey, 'base64:')
                    ? base64_decode(substr($appKey, 7), true)
                    : $appKey;
                $validAppKey = is_string($rawKey) && strlen($rawKey) >= 16;
            }
            if (! $validAppKey) {
                $errors[] = 'app.key';
            }

            $adminPassword = config('taretan.admin.password');
            $normalizedPassword = is_string($adminPassword) ? strtolower(trim($adminPassword)) : '';
            $placeholderPassword = in_array($normalizedPassword, [
                'password',
                'secret',
                'example',
                'admin',
                'change-me',
                'change_me',
                'change me',
            ], true) || str_starts_with($normalizedPassword, 'change-me-');
            if (! is_string($adminPassword) || strlen($adminPassword) < 12 || $placeholderPassword) {
                $errors[] = 'admin.password';
            }

            if (! (bool) config('session.secure')) {
                $errors[] = 'session.secure';
            }
        }

        if ($errors !== []) {
            foreach (array_unique($errors) as $error) {
                $this->error("Invalid configuration: {$error}");
            }

            return self::FAILURE;
        }

        $this->info('Configuration validation passed.');

        return self::SUCCESS;
    }
}
