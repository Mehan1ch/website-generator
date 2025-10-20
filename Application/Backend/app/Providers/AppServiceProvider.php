<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Request;
use Illuminate\Support\ServiceProvider;
use Knuckles\Camel\Extraction\ExtractedEndpointData;
use Knuckles\Scribe\Scribe;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        ResetPassword::createUrlUsing(function (string $email, string $token) {
            $frontendUrl = config('app.frontend_url');
            return "{$frontendUrl}/reset-password?token={$token}&email={$email}";
        });
        if (class_exists(Scribe::class)) {
            Scribe::beforeResponseCall(function () {
                // Customise the request however you want (e.g. custom authentication)
                $user = User::factory()->make();
                Auth::login($user);
            });
        }
    }
}
