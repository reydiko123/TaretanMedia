<?php

namespace Tests\Feature\Security;

use Tests\TestCase;

class SecurityHeadersTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->withoutVite();
    }

    public function test_security_headers_protect_public_admin_and_error_responses(): void
    {
        foreach (['/robots.txt', '/admin/login', '/tidak-ada'] as $uri) {
            $response = $this->get($uri);

            $response
                ->assertHeader('X-Content-Type-Options', 'nosniff')
                ->assertHeader('X-Frame-Options', 'DENY')
                ->assertHeader('Referrer-Policy', 'strict-origin-when-cross-origin')
                ->assertHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
                ->assertHeader('Content-Security-Policy-Report-Only');
        }
    }

    public function test_report_only_csp_nonces_match_inline_assets_and_are_unique_per_response(): void
    {
        $first = $this->get('/tidak-ada');
        $second = $this->get('/tidak-ada');

        $firstNonce = $this->nonceFrom($first->headers->get('Content-Security-Policy-Report-Only'));
        $secondNonce = $this->nonceFrom($second->headers->get('Content-Security-Policy-Report-Only'));

        $this->assertNotSame($firstNonce, $secondNonce);
        $this->assertStringContainsString('nonce="'.$firstNonce.'"', $first->getContent());
        $this->assertStringContainsString('nonce="'.$secondNonce.'"', $second->getContent());
    }

    public function test_csp_can_be_enforced_without_wildcards_or_unsafe_sources(): void
    {
        config()->set('security.csp.mode', 'enforce');

        $response = $this->get('/tidak-ada')
            ->assertHeader('Content-Security-Policy')
            ->assertHeaderMissing('Content-Security-Policy-Report-Only');

        $policy = $response->headers->get('Content-Security-Policy');

        $this->assertStringContainsString("default-src 'self'", $policy);
        $this->assertStringContainsString("object-src 'none'", $policy);
        $this->assertStringContainsString("frame-ancestors 'none'", $policy);
        $this->assertStringNotContainsString('*', $policy);
        $this->assertStringNotContainsString("'unsafe-inline'", $policy);
        $this->assertStringNotContainsString("'unsafe-eval'", $policy);
    }

    public function test_hsts_is_only_sent_for_secure_production_requests(): void
    {
        config()->set('security.hsts.enabled', true);
        config()->set('security.hsts.include_subdomains', true);
        config()->set('app.env', 'local');

        $this->get('/tidak-ada')->assertHeaderMissing('Strict-Transport-Security');

        config()->set('app.env', 'production');

        $this->get('https://localhost/tidak-ada')
            ->assertHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');
    }

    private function nonceFrom(?string $policy): string
    {
        $this->assertIsString($policy);
        $this->assertMatchesRegularExpression("/script-src[^;]*'nonce-([^']+)'/", $policy);

        preg_match("/script-src[^;]*'nonce-([^']+)'/", $policy, $matches);

        return $matches[1];
    }
}
