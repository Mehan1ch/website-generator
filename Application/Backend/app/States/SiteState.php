<?php

namespace App\States;

use A909M\FilamentStateFusion\Concerns\StateFusionInfo;
use A909M\FilamentStateFusion\Contracts\HasFilamentStateFusion;
use Spatie\ModelStates\Exceptions\InvalidConfig;
use Spatie\ModelStates\State;
use Spatie\ModelStates\StateConfig;

abstract class SiteState extends State implements HasFilamentStateFusion
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
            ->allowTransition([Draft::class, Archived::class], Published::class)
            ->allowTransition(Published::class, Draft::class)
            ->allowTransition(Published::class, Archived::class);
    }
}
