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
    public function viewAny(User $user): Response
    {
        return $user->can(Permissions::VIEW_ANY_SITES)
            ? Response::allow()
            : Response::deny("You do not have permission to view sites.");
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Site $site): Response
    {
        if ($user->can(Permissions::VIEW_SITES)) {
            return $site->user_id === $user->id
                ? Response::allow()
                : Response::deny("You do not own this site.");
        }
        return Response::deny("You do not have permission to view sites.");
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): Response
    {
        return $user->can(Permissions::CREATE_SITES)
            ? Response::allow()
            : Response::deny("You do not have permission to create sites.");
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Site $site): Response
    {
        if ($user->can(Permissions::UPDATE_SITES)) {
            return $site->user_id === $user->id
                ? Response::allow()
                : Response::deny("You do not own this site.");
        }
        return Response::deny("You do not have permission to update sites.");
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Site $site): Response
    {
        if ($user->can(Permissions::DELETE_SITES)) {
            return $site->user_id === $user->id
                ? Response::allow()
                : Response::deny("You do not own this site.");
        }
        return Response::deny("You do not have permission to delete sites.");
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Site $site): Response
    {
        if ($user->can(Permissions::RESTORE_SITES)) {
            return $site->user_id === $user->id
                ? Response::allow()
                : Response::deny("You do not own this site.");
        }
        return Response::deny("You do not have permission to restore sites.");
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Site $site): Response
    {
        if ($user->can(Permissions::FORCE_DELETE_SITES)) {
            return $site->user_id === $user->id
                ? Response::allow()
                : Response::deny("You do not own this site.");
        }
        return Response::deny("You do not have permission to force delete sites.");
    }
}
