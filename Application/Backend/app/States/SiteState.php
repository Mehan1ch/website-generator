<?php

namespace App\States;

use Spatie\ModelStates\Exceptions\InvalidConfig;
use Spatie\ModelStates\State;
use Spatie\ModelStates\StateConfig;

//TODO: Label, color, icon, description, interfaces, and filament plugin for state library
abstract class SiteState extends State
{
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
