<?php

namespace Tests\Unit;

use App\Enums\CategoryType;
use App\Enums\PublicationStatus;
use PHPUnit\Framework\TestCase;

class EnumTest extends TestCase
{
    public function test_publication_status_values(): void
    {
        $this->assertSame('draft', PublicationStatus::Draft->value);
        $this->assertSame('published', PublicationStatus::Published->value);
        $this->assertSame(PublicationStatus::Published, PublicationStatus::from('published'));
        $this->assertArrayHasKey('draft', PublicationStatus::options());
    }

    public function test_category_type_values(): void
    {
        $this->assertSame('book', CategoryType::Book->value);
        $this->assertSame('journal', CategoryType::Journal->value);
        $this->assertSame('article', CategoryType::Article->value);
        $this->assertSame(CategoryType::Article, CategoryType::from('article'));
        $this->assertCount(3, CategoryType::options());
    }
}
