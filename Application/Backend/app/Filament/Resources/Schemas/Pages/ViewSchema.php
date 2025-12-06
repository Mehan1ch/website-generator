<?php

namespace App\Filament\Resources\Schemas\Pages;

use A909M\FilamentStateFusion\Actions\StateFusionActionGroup;
use App\Filament\Resources\Schemas\SchemaResource;
use App\States\PublishingState;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewSchema extends ViewRecord
{
    protected static string $resource = SchemaResource::class;

    protected function getHeaderActions(): array
    {
        return [
            EditAction::make(),
            StateFusionActionGroup::generate('state', PublishingState::class)
        ];
    }
}
