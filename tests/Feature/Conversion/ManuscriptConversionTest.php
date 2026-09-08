<?php

namespace Tests\Feature\Conversion;

use Inertia\Testing\AssertableInertia as Assert;
use Tests\TestCase;

final class ManuscriptConversionTest extends TestCase
{
    protected function setUp(): void
    {
        parent::setUp();
        $this->withoutVite();
        config()->set('taretan.whatsapp.number', '628123456789');
    }

    public function test_manuscript_page_is_get_only_and_has_public_safe_contract(): void
    {
        $this->get('/kirim-naskah')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page
                ->component('manuscripts/create')
                ->has('seo')
                ->has('site.conversion.whatsapp.publicationTypes')
                ->missing('site.conversion.whatsapp.secret'));

        foreach (['post', 'put', 'patch', 'delete'] as $method) {
            $this->{$method}('/kirim-naskah')->assertStatus(405);
        }
    }

    public function test_privacy_page_is_public(): void
    {
        $this->get('/privasi')
            ->assertOk()
            ->assertInertia(fn (Assert $page) => $page->component('privacy'));
    }
}
