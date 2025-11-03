<?php

namespace App\States;

use BackedEnum;
use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasDescription;
use Filament\Support\Contracts\HasIcon;
use Filament\Support\Contracts\HasLabel;
use Illuminate\Contracts\Support\Htmlable;

class Draft extends SiteState implements HasLabel, HasIcon, HasDescription, HasColor
{
    public static string $name = 'draft';


    public function getColor(): string|array|null
    {
        return 'secondary';
    }

    public function getDescription(): string|Htmlable|null
    {
        return "The site is in draft mode and not yet published.";
    }

    public function getIcon(): string|BackedEnum|null
    {
        return 'heroicon-o-pencil-square';
    }

    public function getLabel(): string|Htmlable|null
    {
        return 'Draft';
    }
}
