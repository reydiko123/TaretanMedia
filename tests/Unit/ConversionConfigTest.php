<?php

namespace Tests\Unit;

use App\Services\Conversion\ConversionConfig;
use PHPUnit\Framework\Attributes\Test;
use Tests\TestCase;

final class ConversionConfigTest extends TestCase
{
    #[Test]
    public function it_normalizes_a_valid_whatsapp_number_and_exposes_only_public_safe_values(): void
    {
        config()->set('taretan.whatsapp.number', '+62 (812) 3456-789');

        $config = app(ConversionConfig::class);

        $this->assertTrue($config->available());
        $this->assertSame('628123456789', $config->toPublicArray()['number']);
    }

    #[Test]
    public function it_disables_an_invalid_whatsapp_configuration(): void
    {
        config()->set('taretan.whatsapp.number', 'invalid');

        $this->assertFalse(app(ConversionConfig::class)->available());
    }
}
