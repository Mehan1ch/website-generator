import {describe, expect, test} from 'vitest';
import {renderWithFileRoutes} from "@/testing/utils/file-route-utils.tsx";
import {page} from "@vitest/browser/context";
import {
    createMockAuthenticatedContext,
    createMockUnauthenticatedContext
} from "@/testing/mocks/context/auth-context.tsx";

describe('Index Page', () => {
    test('should render hero section with main heading', async () => {
        const {router} = renderWithFileRoutes({
            initialLocation: '/',
            initialAuth: createMockUnauthenticatedContext(),
        });

        await router.load();

        await expect.element(page.getByText("The best way to build your website")).toBeVisible();
    });

    test('should show "Get started" button when unauthenticated', async () => {
        const {router} = renderWithFileRoutes({
            initialLocation: '/',
            initialAuth: createMockUnauthenticatedContext(),
        });

        await router.load();

        const getStartedLink = page.getByRole('link', {name: /get started/i});
        await expect.element(getStartedLink).toBeVisible();
    });

    test('should show sign in and register buttons when unauthenticated', async () => {
        const {router} = renderWithFileRoutes({
            initialLocation: '/',
            initialAuth: createMockUnauthenticatedContext(),
        });

        await router.load();

        await expect.element(page.getByText(/sign in/i).first()).toBeVisible();
        await expect.element((page.getByText(/register/i).first())).toBeVisible();
    });

    test('should show dashboard button when authenticated', async () => {
        const {router} = renderWithFileRoutes({
            initialLocation: '/',
            initialAuth: createMockAuthenticatedContext(),
        });

        await router.load();

        await expect.element(page.getByText("Dashboard").first()).toBeVisible();
    });

    test('should display app version in announcement', async () => {
        const {router} = renderWithFileRoutes({
            initialLocation: '/',
        });

        await router.load();

        await expect.element(page.getByText("v1.0.0").first()).toBeVisible();
    });

    test('should have descriptive text about the platform', async () => {
        const {router} = renderWithFileRoutes({
            initialLocation: '/',
        });

        await router.load();

        await expect.element(page.getByText("Build and deploy static websites")).toBeVisible();
    });
});