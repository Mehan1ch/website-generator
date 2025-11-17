<?php

namespace App\Filament\Actions;

use App\Http\Resources\Api\V1\SiteDeploymentError;
use App\Http\Resources\Api\V1\SiteDeploymentResponse;
use App\Models\Site;
use App\Services\DeploymentService;
use App\States\Published;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Filament\Support\Icons\Heroicon;

class UpdateDeploymentAction extends Action
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->hidden(fn(Site $record): bool => !$record->state->canTransitionTo(Published::class) || $record->published_at === null)
            ->label('Update Deployment')
            ->icon(Heroicon::CloudArrowUp)
            ->color('info')
            ->requiresConfirmation()
            ->modalHeading('Update site deployment')
            ->modalIcon(Heroicon::CloudArrowUp)
            ->modalIconColor('info')
            ->modalDescription('Are you sure you want to update the deployment of this site?')
            ->action(function (Site $record): void {
                $response = DeploymentService::update($record);
                switch (get_class($response)) {
                    case SiteDeploymentError::class:
                        Notification::make()
                            ->title('Deployment update failed')
                            ->body($response->message)
                            ->danger()
                            ->send();
                        break;
                    case SiteDeploymentResponse::class:
                        Notification::make()
                            ->title('Deployment update successful')
                            ->body($response->message)
                            ->success()
                            ->send();
                        break;
                }
            });
    }
}
