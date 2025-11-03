<?php

namespace App\States;

use BackedEnum;
use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasDescription;
use Filament\Support\Contracts\HasIcon;
use Filament\Support\Contracts\HasLabel;
use Illuminate\Contracts\Support\Htmlable;

class Archived extends SiteState implements HasLabel, HasIcon, HasDescription, HasColor
{
    public static string $name = 'archived';


    public function getColor(): string|array|null
    {
        return 'gray';
    }

    public function getDescription(): string|Htmlable|null
    {
        return 'The site is archived and not publicly accessible.';
    }

    public function getIcon(): string|BackedEnum|null
    {
        return 'heroicon-o-archive-box-x-mark';
    }

    public function getLabel(): string|Htmlable|null
    {
        return 'Archived';
    }
}
