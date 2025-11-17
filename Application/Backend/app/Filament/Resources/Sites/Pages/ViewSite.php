<?php

namespace App\Filament\Resources\Sites\Pages;

use App\Filament\Actions\DeleteDeploymentAction;
use App\Filament\Actions\RestartDeploymentAction;
use App\Filament\Actions\StoreDeploymentAction;
use App\Filament\Actions\UpdateDeploymentAction;
use App\Filament\Resources\Sites\SiteResource;
use Filament\Actions\ActionGroup;
use Filament\Actions\EditAction;
use Filament\Resources\Pages\ViewRecord;

class ViewSite extends ViewRecord
{
    protected static string $resource = SiteResource::class;

    protected function getHeaderActions(): array
    {
        return [
            //StateFusionActionGroup::generate('state', SiteState::class),
            EditAction::make(),
            ActionGroup::make([
                StoreDeploymentAction::make('Deploy'),
                UpdateDeploymentAction::make("Update deployment"),
                DeleteDeploymentAction::make("Delete deployment"),
                RestartDeploymentAction::make("Restart deployment"),
            ])->label('Deployment options')
                ->icon('heroicon-m-ellipsis-vertical')
                ->color('primary')
                ->button()
        ];
    }
}
