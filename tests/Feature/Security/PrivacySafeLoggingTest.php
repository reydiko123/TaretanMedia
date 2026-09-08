<?php

namespace Tests\Feature\Security;

use App\Logging\RedactSensitiveContext;
use Monolog\Level;
use Monolog\LogRecord;
use Tests\TestCase;

class PrivacySafeLoggingTest extends TestCase
{
    private string $logPath;

    protected function setUp(): void
    {
        parent::setUp();

        $this->logPath = storage_path('logs/security-redaction-'.uniqid('', true).'.log');
    }

    protected function tearDown(): void
    {
        if (file_exists($this->logPath)) {
            unlink($this->logPath);
        }

        parent::tearDown();
    }

    public function test_default_log_channel_redacts_nested_credentials_headers_and_personal_data(): void
    {
        $record = new LogRecord(new \DateTimeImmutable, 'test', Level::Error, 'Synthetic security canary', [
            'password' => 'password-canary-123',
            'email' => 'person@example.test',
            'request' => [
                'headers' => [
                    'Authorization' => 'Bearer token-canary-456',
                    'X-Api-Key' => 'key-canary-789',
                ],
                'profile' => [
                    'phone' => '+628123456789',
                ],
            ],
        ]);
        $processed = (new RedactSensitiveContext)->process($record);
        $contents = json_encode($processed->context, JSON_THROW_ON_ERROR);

        $this->assertStringNotContainsString('password-canary-123', $contents);
        $this->assertStringNotContainsString('person@example.test', $contents);
        $this->assertStringNotContainsString('token-canary-456', $contents);
        $this->assertStringNotContainsString('key-canary-789', $contents);
        $this->assertStringNotContainsString('+628123456789', $contents);
        $this->assertStringContainsString('[REDACTED]', $contents);
    }
}
