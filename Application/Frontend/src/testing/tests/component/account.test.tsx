import {describe, expect, test} from 'vitest';
import {renderWithFileRoutes} from "@/testing/utils/file-route-utils.tsx";
import {page} from "@vitest/browser/context";
import {createMockAuthenticatedContext} from "@/testing/mocks/context/auth-context.tsx";

describe('Account Page', () => {
    test('should render account settings page', async () => {
        const {router} = renderWithFileRoutes({
            initialLocation: '/account',
            initialAuth: createMockAuthenticatedContext(),
        });

        await router.load();

        await expect.element(page.getByText('Settings').first()).toBeVisible();
        await expect.element(page.getByText('Manage your profile and account settings')).toBeVisible();
    });

    test('should display all settings tabs', async () => {
        const {router} = renderWithFileRoutes({
            initialLocation: '/account',
            initialAuth: createMockAuthenticatedContext(),
        });

        await router.load();

        await expect.element(page.getByRole('tab', {name: 'Appearance'})).toBeVisible();
        await expect.element(page.getByRole('tab', {name: 'Profile'})).toBeVisible();
        await expect.element(page.getByRole('tab', {name: 'Avatar'})).toBeVisible();
        await expect.element(page.getByRole('tab', {name: 'Verification'})).toBeVisible();
        await expect.element(page.getByRole('tab', {name: 'Password'})).toBeVisible();
        await expect.element(page.getByRole('tab', {name: 'Delete'})).toBeVisible();
    });

    test('should allow switching between tabs', async () => {
        const {router} = renderWithFileRoutes({
            initialLocation: '/account',
            initialAuth: createMockAuthenticatedContext(),
        });

        await router.load();

        const profileTab = page.getByRole('tab', {name: 'Profile'});
        await profileTab.click();

        await expect.element(page.getByText('Profile').first()).toBeVisible();
        await expect.element(page.getByText('Full Name').first()).toBeVisible();
        await expect.element(page.getByText('Email').first()).toBeVisible();
    });
});

