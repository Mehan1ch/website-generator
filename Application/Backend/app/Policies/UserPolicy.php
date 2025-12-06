<?php

namespace App\Policies;

use App\Enums\Permissions;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): Response
    {
        return $user->can(Permissions::VIEW_ANY_USERS)
            ? Response::allow()
            : Response::deny("You do not have permission to view users.");
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, User $model): Response
    {
        if ($user->can(Permissions::VIEW_USERS)) {
            return $model->id === $user->id
                ? Response::allow()
                : Response::deny("You are not this user.");
        }
        return Response::deny("You do not have permission to view users.");
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): Response
    {
        return $user->can(Permissions::CREATE_USERS)
            ? Response::allow()
            : Response::deny("You do not have permission to create users.");
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, User $model): Response
    {
        if ($user->can(Permissions::UPDATE_USERS)) {
            return $model->id === $user->id
                ? Response::allow()
                : Response::deny("You are not this user.");
        }
        return Response::deny("You do not have permission to update users.");
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, User $model): Response
    {
        if ($user->can(Permissions::DELETE_USERS)) {
            return $model->id === $user->id
                ? Response::allow()
                : Response::deny("You are not this user.");
        }
        return Response::deny("You do not have permission to delete users.");
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, User $model): Response
    {
        if ($user->can(Permissions::RESTORE_USERS)) {
            return $model->id === $user->id
                ? Response::allow()
                : Response::deny("You are not this user.");
        }
        return Response::deny("You do not have permission to restore users.");
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, User $model): Response
    {
        if ($user->can(Permissions::FORCE_DELETE_USERS)) {
            return $model->id === $user->id
                ? Response::allow()
                : Response::deny("You are not this user.");
        }
        return Response::deny("You do not have permission to force delete users.");
    }
}
