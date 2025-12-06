import {describe, expect, test} from 'vitest';
import {renderWithFileRoutes} from "@/testing/utils/file-route-utils.tsx";
import {page} from "@vitest/browser/context";
import {createMockAuthenticatedContext} from "@/testing/mocks/context/auth-context.tsx";

describe('Dashboard Page', () => {
    test('should render dashboard page when authenticated', async () => {
        const {router} = renderWithFileRoutes({
            initialLocation: '/dashboard',
            initialAuth: createMockAuthenticatedContext(),
        });

        await router.load();

        await expect.element(page.getByRole('heading', {name: /dashboard/i}).first()).toBeVisible();
        await expect.element(page.getByText('Welcome to your dashboard')).toBeVisible();
    });

    test('should display dashboard stats', async () => {
        const {router} = renderWithFileRoutes({
            initialLocation: '/dashboard',
            initialAuth: createMockAuthenticatedContext(),
        });

        await router.load();

        await expect.element(page.getByText('Total Sites')).toBeVisible();
        await expect.element(page.getByText('Published Sites')).toBeVisible();
        await expect.element(page.getByText('Draft Sites')).toBeVisible();
        await expect.element(page.getByText('Total Pages')).toBeVisible();
        await expect.element(page.getByText('Recent Activity')).toBeVisible();
        await expect.element(page.getByText('Latest Site')).toBeVisible();
    });

    test('should show quick actions section', async () => {
        const {router} = renderWithFileRoutes({
            initialLocation: '/dashboard',
            initialAuth: createMockAuthenticatedContext(),
        });

        await router.load();

        await expect.element(page.getByText('Quick actions')).toBeVisible();
        await expect.element(page.getByText('Create New Site')).toBeVisible();
        await expect.element(page.getByText('View All Sites')).toBeVisible();
    });
});

