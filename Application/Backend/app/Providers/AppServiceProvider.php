<?php

namespace App\Providers;

use App\Enums\Roles;
use App\Models\User;
use Illuminate\Auth\Notifications\ResetPassword;
use Illuminate\Auth\Notifications\VerifyEmail;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\URL;
use Illuminate\Support\ServiceProvider;
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
        ResetPassword::createUrlUsing(function (User $user, string $token) {
            $frontendUrl = config('app.frontend_url');
            return "{$frontendUrl}/reset-password?token={$token}&email={$user->email}";
        });

        VerifyEmail::createUrlUsing(function ($notifiable) {
            $route = URL::temporarySignedRoute(
                'verification.verify',
                Carbon::now()->addMinutes(Config::get('auth.verification.expire', 60)),
                [
                    'id' => $notifiable->getKey(),
                    'hash' => sha1($notifiable->getEmailForVerification()),
                ]
            );
            $app_url = config('app.url');
            $frontendUrl = config('app.frontend_url');
            return str_replace($app_url, $frontendUrl, $route);
        });

        if (class_exists(Scribe::class)) {
            $user = User::factory()->create();
            $user->assignRole(Roles::SUPER_ADMIN);
            Scribe::beforeResponseCall(function () use ($user) {
                // Customise the request however you want (e.g. custom authentication)
                Auth::guard('web')->login($user);
            });
            Scribe::afterResponseCall(function () use ($user) {
                // Clean up after the request
                Auth::guard('web')->logout($user);
            });
            $user->delete();
        }

        // Implicitly grant "Super Admin" role all permissions
        // This works in the app by using gate-related functions like auth()->user->can() and @can()
        Gate::before(function ($user, $ability) {
            return $user->hasRole(Roles::SUPER_ADMIN) ? true : null;
        });
    }
}
