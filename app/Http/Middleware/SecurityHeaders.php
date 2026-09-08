<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Vite;
use Symfony\Component\HttpFoundation\Response;

final class SecurityHeaders
{
    public function handle(Request $request, Closure $next): Response
    {
        if (! config('security.headers.enabled', true)) {
            return $next($request);
        }

        $nonce = $request->attributes->get('csp_nonce') ?? Vite::useCspNonce();
        Vite::useCspNonce($nonce);
        $request->attributes->set('csp_nonce', $nonce);
        $response = $next($request);
        $response->headers->set('X-Content-Type-Options', 'nosniff');
        $response->headers->set('X-Frame-Options', 'DENY');
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');
        $response->headers->set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

        $mode = strtolower((string) config('security.csp.mode', 'report-only'));
        $header = $mode === 'enforce' ? 'Content-Security-Policy' : 'Content-Security-Policy-Report-Only';
        $response->headers->set($header, $this->contentSecurityPolicy());

        if (config('security.hsts.enabled', false) && config('app.env') === 'production' && $request->isSecure()) {
            $hsts = 'max-age='.max(0, (int) config('security.hsts.max_age', 31536000));
            if (config('security.hsts.include_subdomains', false)) {
                $hsts .= '; includeSubDomains';
            }
            $response->headers->set('Strict-Transport-Security', $hsts);
        }

        return $response;
    }

    private function contentSecurityPolicy(): string
    {
        $nonce = Vite::cspNonce();
        $directives = [
            "default-src 'self'",
            "base-uri 'self'",
            "object-src 'none'",
            "frame-ancestors 'none'",
            "form-action 'self'",
            "script-src 'self' 'nonce-{$nonce}'",
            "style-src 'self' 'nonce-{$nonce}'",
            "img-src 'self' data:",
            "font-src 'self'",
            "connect-src 'self'".$this->analyticsOrigin(),
            "frame-src 'none'",
            "manifest-src 'self'",
        ];
        $reportUri = trim((string) config('security.csp.report_uri', ''));
        if ($reportUri !== '' && str_starts_with(strtolower($reportUri), 'https://')) {
            $directives[] = 'report-uri '.preg_replace('/[\r\n]/', '', $reportUri);
        }

        return implode('; ', $directives);
    }

    private function analyticsOrigin(): string
    {
        $endpoint = config('taretan.analytics.endpoint');
        if (! is_string($endpoint) || ! str_starts_with(strtolower($endpoint), 'https://')) {
            return '';
        }
        $parsed = parse_url($endpoint);
        if (! is_array($parsed) || ! isset($parsed['scheme'], $parsed['host'])) {
            return '';
        }
        $origin = $parsed['scheme'].'://'.$parsed['host'];
        if (isset($parsed['port'])) {
            $origin .= ':'.$parsed['port'];
        }

        return ' '.$origin;
    }
}
