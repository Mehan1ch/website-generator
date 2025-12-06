<?php

namespace Database\Factories;

use App\Enums\EditorContentExample;
use App\Models\Page;
use App\Models\Site;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Page>
 */
class PageFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(),
            'content' => $this->faker->optional()->randomElement([EditorContentExample::ENCODED->value]),
            'url' => "/" . $this->faker->unique()->slug(),
            'site_id' => Site::all()->random()->id,
        ];
    }

    public function configure(): static
    {
        return $this->afterCreating(function (Page $page) {
            $page->addMediaFromString($this->faker->randomHtml())
                ->setFileName($page->url . ".html")
                ->toMediaCollection('static_html');
        });
    }
}
