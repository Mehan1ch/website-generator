<?php

namespace App\Policies;

use App\Enums\Permissions;
use App\Models\Page;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class PagePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): Response
    {
        return $user->can(Permissions::VIEW_ANY_PAGES)
            ? Response::allow()
            : Response::deny("You do not have permission to view pages.");
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Page $page): Response
    {
        if ($user->can(Permissions::VIEW_PAGES)) {
            return $page->site->user_id === $user->id
                ? Response::allow()
                : Response::deny("You do not own this page.");
        }
        return Response::deny("You do not have permission to view pages.");
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): Response
    {
        return $user->can(Permissions::CREATE_PAGES)
            ? Response::allow()
            : Response::deny("You do not have permission to create pages.");
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Page $page): Response
    {
        if ($user->can(Permissions::UPDATE_PAGES)) {
            return $page->site->user_id === $user->id
                ? Response::allow()
                : Response::deny("You do not own this page.");
        }
        return Response::deny("You do not have permission to update pages.");
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Page $page): Response
    {
        if ($page->url === '/') {
            return Response::deny("The homepage cannot be deleted.");
        }
        if ($user->can(Permissions::DELETE_PAGES)) {
            $page->site->user_id === $user->id
                ? Response::allow()
                : Response::deny("You do not own this page.");
        }
        return Response::deny("You do not have permission to delete pages.");
    }

    /**
     * Determine whether the user can restore the model.
     */
    public function restore(User $user, Page $page): Response
    {
        if ($user->can(Permissions::RESTORE_PAGES)) {
            return $page->site->user_id === $user->id
                ? Response::allow()
                : Response::deny("You do not own this page.");
        }
        return Response::deny("You do not have permission to restore pages.");
    }

    /**
     * Determine whether the user can permanently delete the model.
     */
    public function forceDelete(User $user, Page $page): Response
    {
        if ($user->can(Permissions::FORCE_DELETE_PAGES)) {
            return $page->site->user_id === $user->id
                ? Response::allow()
                : Response::deny("You do not own this page.");
        }
        return Response::deny("You do not have permission to permanently delete pages.");
    }
}
