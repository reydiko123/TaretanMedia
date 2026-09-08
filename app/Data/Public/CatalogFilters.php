<?php

namespace App\Data\Public;

use Illuminate\Http\Request;
use Illuminate\Support\Str;

final readonly class CatalogFilters
{
    private const MAX_SEARCH_LENGTH = 100;

    /**
     * @param  list<string>  $allowedSorts
     */
    public static function fromRequest(Request $request, array $allowedSorts, bool $books = false): self
    {
        $search = self::string($request->query('q'));
        $category = self::string($request->query('category'));
        $sort = self::string($request->query('sort')) ?? 'newest';

        if (! in_array($sort, $allowedSorts, true)) {
            $sort = 'newest';
        }

        $minPrice = $books ? self::nonNegativeInteger($request->query('min_price')) : null;
        $maxPrice = $books ? self::nonNegativeInteger($request->query('max_price')) : null;

        if ($minPrice !== null && $maxPrice !== null && $minPrice > $maxPrice) {
            $minPrice = null;
            $maxPrice = null;
        }

        $year = $books ? self::year($request->query('year')) : null;

        return new self(
            search: $search ?? '',
            category: $category,
            sort: $sort,
            page: self::positiveInteger($request->query('page')) ?? 1,
            minPrice: $minPrice,
            maxPrice: $maxPrice,
            year: $year,
        );
    }

    private function __construct(
        public string $search,
        public ?string $category,
        public string $sort,
        public int $page,
        public ?int $minPrice,
        public ?int $maxPrice,
        public ?int $year,
    ) {}

    /** @return array<string, string|int> */
    public function query(): array
    {
        return array_filter([
            'q' => $this->search,
            'category' => $this->category,
            'sort' => $this->sort === 'newest' ? null : $this->sort,
            'min_price' => $this->minPrice,
            'max_price' => $this->maxPrice,
            'year' => $this->year,
        ], static fn (mixed $value): bool => $value !== null && $value !== '');
    }

    /** @return array<string, string|int|null> */
    public function props(bool $books = false): array
    {
        $props = [
            'search' => $this->search,
            'category' => $this->category,
            'sort' => $this->sort,
        ];

        if ($books) {
            $props['minPrice'] = $this->minPrice;
            $props['maxPrice'] = $this->maxPrice;
            $props['year'] = $this->year;
        }

        return $props;
    }

    public function withoutCategory(): self
    {
        return new self($this->search, null, $this->sort, $this->page, $this->minPrice, $this->maxPrice, $this->year);
    }

    private static function string(mixed $value): ?string
    {
        if (! is_scalar($value)) {
            return null;
        }

        $value = preg_replace('/\s+/u', ' ', trim((string) $value)) ?? '';

        return $value === '' ? null : Str::limit($value, self::MAX_SEARCH_LENGTH, '');
    }

    private static function nonNegativeInteger(mixed $value): ?int
    {
        if (filter_var($value, FILTER_VALIDATE_INT) === false) {
            return null;
        }

        $value = (int) $value;

        return $value >= 0 ? $value : null;
    }

    private static function positiveInteger(mixed $value): ?int
    {
        $value = self::nonNegativeInteger($value);

        return $value !== null && $value > 0 ? $value : null;
    }

    private static function year(mixed $value): ?int
    {
        $value = self::positiveInteger($value);

        return $value !== null && $value >= 1000 && $value <= ((int) date('Y') + 1) ? $value : null;
    }
}
