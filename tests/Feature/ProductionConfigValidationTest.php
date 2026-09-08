<?php

namespace Tests\Feature;

use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

final class ProductionConfigValidationTest extends TestCase
{
    #[Test]
    public function production_validation_passes_without_printing_configuration_values(): void
    {
        config()->set([
            'app.debug' => false,
            'app.url' => 'https://taretan.example',
            'app.key' => 'base64:'.base64_encode(str_repeat('k', 32)),
            'taretan.admin.password' => 'a-strong-admin-password',
            'session.secure' => true,
            'taretan.whatsapp.number' => '628123456789',
        ]);

        $this->artisan('taretan:validate-config', ['--production' => true])
            ->expectsOutput('Configuration validation passed.')
            ->assertExitCode(0);
    }

    #[Test]
    public function production_validation_reports_reasons_without_echoing_secrets(): void
    {
        $password = 'change-me-super-secret-value';
        config()->set([
            'app.debug' => true,
            'app.url' => 'http://localhost',
            'app.key' => 'placeholder',
            'taretan.admin.password' => $password,
            'session.secure' => false,
            'taretan.whatsapp.number' => 'invalid',
        ]);

        $this->artisan('taretan:validate-config', ['--production' => true])
            ->expectsOutputToContain('Invalid configuration: app.debug')
            ->expectsOutputToContain('Invalid configuration: app.key')
            ->expectsOutputToContain('Invalid configuration: admin.password')
            ->doesntExpectOutputToContain($password)
            ->assertExitCode(1);
    }
}
