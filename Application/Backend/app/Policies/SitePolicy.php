<?php

namespace App\Policies;

use App\Enums\Permissions;
use App\Models\Site;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class SitePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can(Permissions::VIEW_ANY_SITES);
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Site $site): bool
    {
        if ($user->can(Permissions::VIEW_SITES)) {
            return $site->user_id === $user->id;
        }
        return false;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->can(Permissions::CREATE_SITES);
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Site $site): bool
    {
        if ($user->can(Permissions::UPDATE_SITES)) {
            return $site->user_id === $user->id;
        }
        return false;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Site $site): bool
    {
        if ($user->can(Permissions::DELETE_SITES)) {
            return $site->user_id === $user->id;
        }
        return false;
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Site $site): bool
    {
        if ($user->can(Permissions::RESTORE_SITES)) {
            return $site->user_id === $user->id;
        }
        return false;
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Site $site): bool
    {
        if ($user->can(Permissions::FORCE_DELETE_SITES)) {
            return $site->user_id === $user->id;
        }
        return false;
    }
}
