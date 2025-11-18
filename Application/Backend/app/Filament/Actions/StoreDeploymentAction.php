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
use Illuminate\Support\Facades\Log;

class StoreDeploymentAction extends Action
{
    protected function setUp(): void
    {
        parent::setUp();

        $this->hidden(fn(Site $record): bool => !$record->state->canTransitionTo(Published::class) || $record->published_at !== null)
            ->label('Create Deployment')
            ->icon(Heroicon::CloudArrowUp)
            ->color('success')
            ->requiresConfirmation()
            ->modalHeading('Deploy site')
            ->modalIcon(Heroicon::CloudArrowUp)
            ->modalIconColor('success')
            ->modalDescription('Are you sure you want to deploy this site?')
            ->action(function (Site $record): void {
                $response = DeploymentService::store($record);
                switch (get_class($response)) {
                    case SiteDeploymentError::class:
                        Notification::make()
                            ->title('Deployment failed')
                            ->body($response->message)
                            ->danger()
                            ->send();
                        break;
                    case SiteDeploymentResponse::class:
                        Notification::make()
                            ->title('Deployment successful')
                            ->body($response->message)
                            ->success()
                            ->send();
                        break;
                }
            });
    }
}
