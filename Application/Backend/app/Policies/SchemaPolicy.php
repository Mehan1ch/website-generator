<?php

namespace App\Policies;

use App\Enums\Permissions;
use App\Models\Schema;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class SchemaPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): Response
    {
        return $user->can(Permissions::VIEW_ANY_SCHEMAS)
            ? Response::allow()
            : Response::deny("You do not have permission to view schemas.");
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Schema $schema): Response
    {
        return $user->can(Permissions::VIEW_SCHEMAS)
            ? Response::allow()
            : Response::deny("You do not have permission to view schemas.");
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): Response
    {
        return $user->can(Permissions::CREATE_SCHEMAS)
            ? Response::allow()
            : Response::deny("You do not have permission to create schemas.");
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Schema $schema): Response
    {
        return $user->can(Permissions::UPDATE_SCHEMAS)
            ? Response::allow()
            : Response::deny("You do not have permission to update schemas.");
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Schema $schema): Response
    {
        return $user->can(Permissions::DELETE_SCHEMAS)
            ? Response::allow()
            : Response::deny("You do not have permission to delete schemas.");
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Schema $schema): Response
    {
        return $user->can(Permissions::RESTORE_SCHEMAS)
            ? Response::allow()
            : Response::deny("You do not have permission to restore schemas.");
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Schema $schema): Response
    {
        return $user->can(Permissions::FORCE_DELETE_SCHEMAS)
            ? Response::allow()
            : Response::deny("You do not have permission to permanently delete schemas.");
    }
}
