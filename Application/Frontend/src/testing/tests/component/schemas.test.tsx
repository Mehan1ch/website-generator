import {describe, expect, test} from 'vitest';
import {renderWithFileRoutes} from "@/testing/utils/file-route-utils.tsx";
import {page} from "@vitest/browser/context";
import {createMockAuthenticatedContext} from "@/testing/mocks/context/auth-context.tsx";

describe('Schemas Index Page', () => {
    test('should render schemas page when authenticated', async () => {
        const {router} = renderWithFileRoutes({
            initialLocation: '/schemas',
            initialAuth: createMockAuthenticatedContext(),
        });

        await router.load();

        await expect.element(page.getByRole('heading', {name: /schemas/i}).first()).toBeVisible();
    });

    test('should display schema cards when schemas exist', async () => {
        const {router} = renderWithFileRoutes({
            initialLocation: '/schemas',
            initialAuth: createMockAuthenticatedContext({is_admin: true}),
        });

        await router.load();

        await expect.element(page.getByText('Schemas').first()).toBeVisible();
        const draftOrPublished = page.getByText(/Draft|Published/i).first();
        await expect.element(draftOrPublished).toBeVisible();
        await expect.element(page.getByText("Created").first()).toBeVisible();
        await expect.element(page.getByText("Updated").first()).toBeVisible();
    });

    test('should show new schema button for admin users', async () => {
        const {router} = renderWithFileRoutes({
            initialLocation: '/schemas',
            initialAuth: createMockAuthenticatedContext({is_admin: true}),
        });

        await router.load();

        await expect.element(page.getByText('New Schema')).toBeVisible();
    });

    test('should handle pagination', async () => {
        const {router} = renderWithFileRoutes({
            initialLocation: '/schemas?page=1',
            initialAuth: createMockAuthenticatedContext(),
        });

        await router.load();

        await expect.element(page.getByText('Schemas').first()).toBeVisible();
    });
});

