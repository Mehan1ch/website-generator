import {describe, expect, test} from 'vitest';
import {renderWithFileRoutes} from "@/testing/utils/file-route-utils.tsx";
import {page} from "@vitest/browser/context";
import {createMockAuthenticatedContext} from "@/testing/mocks/context/auth-context.tsx";

describe('Sites Index Page', () => {
    test('should render sites page when authenticated', async () => {
        const {router} = renderWithFileRoutes({
            initialLocation: '/sites',
            initialAuth: createMockAuthenticatedContext(),
        });

        await router.load();

        await expect.element(page.getByText('Sites').first()).toBeVisible();
    });

    test('should display site cards when sites exist', async () => {
        const {router} = renderWithFileRoutes({
            initialLocation: '/sites',
            initialAuth: createMockAuthenticatedContext(),
        });

        await router.load();

        await expect.element(page.getByText('Sites').first()).toBeVisible();
        const draftOrPublished = page.getByText(/Draft|Published/).first();
        await expect.element(draftOrPublished).toBeVisible();
        await expect.element(page.getByText("Created").first()).toBeVisible();
    });

    test('should show new site button', async () => {
        const {router} = renderWithFileRoutes({
            initialLocation: '/sites',
            initialAuth: createMockAuthenticatedContext(),
        });

        await router.load();
        await expect.element(page.getByRole('button', {name: 'New Site'})).toBeVisible();
    });

    test('should handle pagination', async () => {
        const {router} = renderWithFileRoutes({
            initialLocation: '/sites?page=1',
            initialAuth: createMockAuthenticatedContext(),
        });

        await router.load();

        await expect.element(page.getByRole('heading', {name: /Sites/}).first()).toBeVisible();
    });
});

