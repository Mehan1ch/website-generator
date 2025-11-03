<?php

namespace App\Filament\Resources\Sites\Pages;

use A909M\FilamentStateFusion\Actions\StateFusionActionGroup;
use App\Filament\Resources\Sites\SiteResource;
use App\States\SiteState;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewSite extends ViewRecord
{
    protected static string $resource = SiteResource::class;

    protected function getHeaderActions(): array
    {
        return [
            StateFusionActionGroup::generate('state', SiteState::class),
            EditAction::make(),
        ];
    }
}
