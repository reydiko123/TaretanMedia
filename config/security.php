<?php

return [
    'headers' => ['enabled' => env('SECURITY_HEADERS_ENABLED', true)],
    'csp' => [
        'mode' => env('CSP_MODE', 'report-only'),
        'report_uri' => env('CSP_REPORT_URI'),
    ],
    'hsts' => [
        'enabled' => env('HSTS_ENABLED', false),
        'max_age' => (int) env('HSTS_MAX_AGE', 31536000),
        'include_subdomains' => (bool) env('HSTS_INCLUDE_SUBDOMAINS', false),
    ],
];
