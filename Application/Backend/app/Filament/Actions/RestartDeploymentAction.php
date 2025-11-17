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

class RestartDeploymentAction extends Action
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->hidden(fn(Site $record): bool => !$record->state->canTransitionTo(Published::class) || $record->published_at === null)
            ->label('Restart deployment')
            ->icon(Heroicon::ArrowPath)
            ->color('warning')
            ->requiresConfirmation()
            ->modalHeading('Restart deployment of site')
            ->modalIcon(Heroicon::ArrowPath)
            ->modalIconColor('warning')
            ->modalDescription('Are you sure you want to restart the deployment of this site?')
            ->action(function (Site $record): void {
                $response = DeploymentService::restart($record);
                switch (get_class($response)) {
                    case SiteDeploymentError::class:
                        Notification::make()
                            ->title('Deployment restart failed')
                            ->body($response->message)
                            ->danger()
                            ->send();
                        break;
                    case SiteDeploymentResponse::class:
                        Notification::make()
                            ->title('Deployment restarted successful')
                            ->body($response->message)
                            ->success()
                            ->send();
                        break;
                }
            });
    }
}
