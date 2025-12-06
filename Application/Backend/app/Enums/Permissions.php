<?php

namespace App\Enums;

enum Permissions: string
{
    case ACCESS_ADMIN_PANEL = 'access_admin_panel';
    case VIEW_ANY_USERS = 'view_any_users';
    case VIEW_USERS = 'view_users';
    case CREATE_USERS = 'create_users';
    case UPDATE_USERS = 'edit_users';
    case DELETE_USERS = 'delete_users';
    case RESTORE_USERS = 'restore_users';
    case FORCE_DELETE_USERS = 'force_delete_users';
    case VIEW_ANY_SITES = 'view_any_sites';
    case VIEW_SITES = 'view_sites';
    case CREATE_SITES = 'create_sites';
    case UPDATE_SITES = 'edit_sites';
    case DELETE_SITES = 'delete_sites';
    case RESTORE_SITES = 'restore_sites';
    case FORCE_DELETE_SITES = 'force_delete_sites';
    case VIEW_ANY_PAGES = 'view_any_pages';
    case VIEW_PAGES = 'view_pages';
    case CREATE_PAGES = 'create_pages';
    case UPDATE_PAGES = 'edit_pages';
    case DELETE_PAGES = 'delete_pages';
    case RESTORE_PAGES = 'restore_pages';
    case FORCE_DELETE_PAGES = 'force_delete_pages';
    case VIEW_ANY_SCHEMAS = 'view_any_schemas';
    case VIEW_SCHEMAS = 'view_schemas';
    case CREATE_SCHEMAS = 'create_schemas';
    case UPDATE_SCHEMAS = 'edit_schemas';
    case DELETE_SCHEMAS = 'delete_schemas';
    case RESTORE_SCHEMAS = 'restore_schemas';
    case FORCE_DELETE_SCHEMAS = 'force_delete_schemas';
}
