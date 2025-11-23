<?php

namespace Database\Factories;

use App\Enums\EditorContentExample;
use App\Models\Schema;
use App\States\PublishingState;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Schema>
 */
class SchemaFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->word(),
            'description' => $this->faker->optional()->sentence(),
            'content' => $this->faker->optional()->randomElement([EditorContentExample::ENCODED->value]),
            'state' => Schema::getStatesFor('state')->random(),
        ];
    }
}
