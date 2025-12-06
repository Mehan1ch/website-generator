<?php

namespace Database\Factories;

use App\Models\Site;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Site>
 */
class SiteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $state = Site::getStatesFor("state")->random();
        if ($state === "published") {
            $publishedAt = $this->faker->dateTimeBetween('-1 years');
        } else {
            $publishedAt = $this->faker->boolean() ? $this->faker->dateTimeBetween('-1 years') : null;
        }
        return [
            'name' => $this->faker->company(),
            'subdomain' => $this->faker->unique()->domainWord(),
            'description' => $this->faker->optional()->sentence(),
            'state' => $state,
            'user_id' => User::all()->random()->id,
            'published_at' => $publishedAt,
        ];
    }
}
