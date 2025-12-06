<?php

namespace App\States;

use BackedEnum;
use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasDescription;
use Filament\Support\Contracts\HasIcon;
use Filament\Support\Contracts\HasLabel;
use Illuminate\Contracts\Support\Htmlable;

class Published extends PublishingState implements HasLabel, HasIcon, HasDescription, HasColor
{
    public static string $name = 'published';


    public function getColor(): string|array|null
    {
        return 'success';
    }

    public function getDescription(): string|Htmlable|null
    {
        return 'The site is published and publicly accessible.';
    }

    public function getIcon(): string|BackedEnum|null
    {
        return 'heroicon-o-globe-alt';
    }

    public function getLabel(): string|Htmlable|null
    {
        return 'Published';
    }
}
