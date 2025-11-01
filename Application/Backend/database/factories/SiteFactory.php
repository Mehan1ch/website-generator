<?php

namespace Database\Factories;

use App\Models\Site;
use App\Models\User;
use App\States\SiteState;
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
        return [
            'name' => $this->faker->company(),
            'subdomain' => $this->faker->unique()->domainWord(),
            'description' => $this->faker->optional()->sentence(),
            'state' => Site::getStatesFor("state")->random(),
            'user_id' => User::all()->random()->id,
        ];
    }
}
