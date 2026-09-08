<?php

use App\Http\Middleware\HandleAppearance;
use App\Http\Middleware\HandleInertiaRequests;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Middleware\AddLinkHeadersForPreloadedAssets;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware): void {
        $middleware->encryptCookies(except: ['appearance', 'sidebar_state']);

        $middleware->web(append: [
            HandleAppearance::class,
            HandleInertiaRequests::class,
            AddLinkHeadersForPreloadedAssets::class,
        ]);
    })
    ->withExceptions(function (Exceptions $exceptions): void {
        $exceptions->shouldRenderJsonWhen(
            fn (Request $request) => $request->is('api/*') || $request->expectsJson(),
        );

        $exceptions->respond(function (Response $response, Throwable $exception, Request $request): Response {
            if ($request->expectsJson()) {
                return $response;
            }

            $status = $response->getStatusCode();
            if ($status !== 404 && $status < 500) {
                return $response;
            }

            $page = $status === 404 ? 'errors/404' : 'errors/500';
            $title = $status === 404 ? 'Halaman tidak ditemukan' : 'Terjadi kesalahan';
            $description = $status === 404
                ? 'Halaman yang Anda cari tidak ditemukan.'
                : 'Terjadi kesalahan. Silakan coba kembali nanti.';
            $canonicalUrl = route('home');

            return Inertia::render($page, [
                'status' => $status === 404 ? 404 : 500,
                'seo' => [
                    'title' => $title,
                    'description' => $description,
                    'canonicalUrl' => $canonicalUrl,
                    'openGraph' => [
                        'type' => 'website',
                        'title' => $title,
                        'description' => $description,
                        'url' => $canonicalUrl,
                        'imageUrl' => null,
                    ],
                ],
            ])->toResponse($request)->setStatusCode($status);
        });
    })->create();
