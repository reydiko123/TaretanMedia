<?php

namespace App\Services\Conversion;

final class ConversionConfig
{
    /** @var array<string, list<string>> */
    private const REQUIRED_TOKENS = [
        'book' => [':title', ':url'],
        'service' => [':service'],
        'manuscript' => [':name', ':email', ':title', ':publication_type'],
        'contact' => [],
    ];

    public function available(): bool
    {
        return $this->number() !== null && $this->templatesAreValid();
    }

    public function number(): ?string
    {
        $number = config('taretan.whatsapp.number');

        if (! is_scalar($number)) {
            return null;
        }

        $normalized = preg_replace('/[\\s+\\-()]+/', '', trim((string) $number));

        return is_string($normalized) && preg_match('/^[1-9][0-9]{7,14}$/', $normalized) === 1
            ? $normalized
            : null;
    }

    /** @return array{available: bool, number: string|null, templates: array<string, string>, publicationTypes: list<string>} */
    public function toPublicArray(): array
    {
        return [
            'available' => $this->available(),
            'number' => $this->number(),
            'templates' => $this->templates(),
            'publicationTypes' => $this->publicationTypes(),
        ];
    }

    /** @return list<string> */
    public function errors(): array
    {
        $errors = [];

        if ($this->number() === null) {
            $errors[] = 'whatsapp.number';
        }

        if ($this->publicationTypes() === []) {
            $errors[] = 'whatsapp.publication_types';
        }

        foreach (self::REQUIRED_TOKENS as $kind => $requiredTokens) {
            $template = $this->templates()[$kind] ?? null;
            if (! is_string($template) || trim($template) === '' || mb_strlen($template) > 1500) {
                $errors[] = "whatsapp.templates.{$kind}";

                continue;
            }

            preg_match_all('/:[a-z_]+/', $template, $matches);
            $tokens = array_values(array_unique($matches[0]));
            if (array_diff($requiredTokens, $tokens) !== [] || array_diff($tokens, $requiredTokens) !== []) {
                $errors[] = "whatsapp.templates.{$kind}";
            }
        }

        return array_values(array_unique($errors));
    }

    /** @return array<string, string> */
    private function templates(): array
    {
        $templates = config('taretan.whatsapp.templates', []);

        return is_array($templates)
            ? array_filter($templates, 'is_string')
            : [];
    }

    /** @return list<string> */
    private function publicationTypes(): array
    {
        $types = config('taretan.whatsapp.publication_types', []);

        return is_array($types)
            ? array_values(array_filter($types, static fn (mixed $type): bool => is_string($type) && trim($type) !== ''))
            : [];
    }

    private function templatesAreValid(): bool
    {
        return ! collect($this->errors())->contains(static fn (string $error): bool => str_starts_with($error, 'whatsapp.templates.'));
    }
}
