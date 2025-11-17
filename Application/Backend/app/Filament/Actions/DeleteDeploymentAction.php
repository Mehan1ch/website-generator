<?php

namespace App\Filament\Actions;

use App\Http\Resources\Api\V1\SiteDeploymentError;
use App\Http\Resources\Api\V1\SiteDeploymentResponse;
use App\Models\Site;
use App\Services\DeploymentService;
use App\States\Draft;
use App\States\Published;
use Filament\Actions\Action;
use Filament\Notifications\Notification;
use Filament\Support\Icons\Heroicon;

class DeleteDeploymentAction extends Action
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->hidden(fn(Site $record): bool => !$record->state->canTransitionTo(Draft::class) || $record->published_at === null)
            ->label('Delete Deployment')
            ->icon(Heroicon::CloudArrowDown)
            ->color('danger')
            ->requiresConfirmation()
            ->modalHeading('Delete site deployment')
            ->modalIcon(Heroicon::CloudArrowDown)
            ->modalIconColor('danger')
            ->modalDescription('Are you sure you want to delete the deployment of this site?')
            ->action(function (Site $record): void {
                $response = DeploymentService::destroy($record);
                switch (get_class($response)) {
                    case SiteDeploymentError::class:
                        Notification::make()
                            ->title('Deployment deletion failed')
                            ->body($response->message)
                            ->danger()
                            ->send();
                        break;
                    case SiteDeploymentResponse::class:
                        Notification::make()
                            ->title('Deployment deleted successfully')
                            ->body($response->message)
                            ->success()
                            ->send();
                        break;
                }
            });
    }
}
