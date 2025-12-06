<?php

namespace App\States;

use A909M\FilamentStateFusion\Concerns\StateFusionInfo;
use A909M\FilamentStateFusion\Contracts\HasFilamentStateFusion;
use Spatie\ModelStates\Exceptions\InvalidConfig;
use Spatie\ModelStates\State;
use Spatie\ModelStates\StateConfig;

abstract class PublishingState extends State implements HasFilamentStateFusion
{
    use StateFusionInfo;

    /**
     * Configure the state transitions.
     *
     * @throws InvalidConfig
     */
    public static function config(): StateConfig
    {
        return parent::config()
            ->default(Draft::class)
            ->ignoreSameState()
            ->allowTransition(Draft::class, Published::class, ToPublished::class)
            ->allowTransition(Published::class, Draft::class);
    }
}
