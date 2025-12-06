import {describe, expect, test} from 'vitest';
import {renderWithFileRoutes} from "@/testing/utils/file-route-utils.tsx";
import {page} from "@vitest/browser/context";
import {createMockUnauthenticatedContext} from "@/testing/mocks/context/auth-context.tsx";

describe('E2E Site Management Flow', () => {
    test('complete site creation, design, and deployment flow', {timeout: 60000}, async () => {

        const {router} = renderWithFileRoutes({
            initialLocation: '/login',
            initialAuth: createMockUnauthenticatedContext(),
        });

        await router.load();

        await expect.element(page.getByText('Login to your account').first()).toBeVisible();

        const loginEmailInput = page.getByLabelText('Email address');
        const loginPasswordInput = page.getByLabelText('Password');

        await loginEmailInput.fill('test@example.com');
        await loginPasswordInput.fill('password');

        const loginButton = page.getByRole('button', {name: /login/i});
        await loginButton.click();

        await expect.poll(() => router.state.location.pathname).toBe('/');

        await router.navigate({to: '/sites'});
        await router.load();

        await expect.poll(() => router.state.location.pathname).toBe('/sites');

        const createSiteLink = page.getByRole('link', {name: /new site/i}).or(
            page.getByRole('button', {name: /new site/i})
        ).first();
        await createSiteLink.click();

        await expect.poll(() => router.state.location.pathname).toBe('/sites/create');

        const siteNameInput = page.getByLabelText('Name');
        const siteSubdomainInput = page.getByLabelText('Subdomain');
        const siteDescriptionInput = page.getByLabelText('Description');

        await siteNameInput.fill('My Test Site');
        await siteSubdomainInput.fill('mytestsite');
        await siteDescriptionInput.fill('This is a test site for e2e testing');

        const saveSiteButton = page.getByRole('button', {name: /save changes/i});
        await saveSiteButton.click();

        await expect.poll(() => router.state.location.pathname, {timeout: 10000}).toContain("sites");

        const pagesTab = page.getByRole('tab', {name: /pages/i});
        await expect.element(pagesTab).toBeVisible();
        await pagesTab.click();

        const pageCard = page.getByText(/created at/i).first();
        await pageCard.click();

        await expect.poll(() => router.state.location.pathname).toContain(/pages/);

        const designButton = page.getByRole('link', {name: /design/i}).or(
            page.getByRole('button', {name: /design/i})
        ).first();
        await designButton.click();

        await expect.poll(() => router.state.location.pathname).toContain("design");

        const saveButton = page.getByRole('button', {name: /save/i}).first();
        await saveButton.click();

        await expect.element(page.getByText(/saved successfully/i).first()).toBeVisible();

        const siteId = router.state.location.pathname.split('/')[2];

        const originalConfirm = window.confirm;
        window.confirm = () => true;

        const siteBreadcrumb = page.getByRole('link', {name: siteId});
        await siteBreadcrumb.click();

        await new Promise(resolve => setTimeout(resolve, 500));
        if (router.state.location.pathname.includes('design')) {
            await router.navigate({to: "/sites/$siteId", params: {siteId}});
            await router.load();
        }

        window.confirm = originalConfirm;

        await expect.poll(() => router.state.location.pathname, {timeout: 10000}).toBe(`/sites/${siteId}`);

        const deploymentButton = page.getByRole('button', {name: /deployment/i});
        await deploymentButton.click();

        const publishOption = page.getByRole('menuitem', {name: /publish/i}).or(
            page.getByRole('menuitem', {name: /update/i})
        );
        await publishOption.click();

        const confirmDeployButton = page.getByRole('button', {name: /deploy/i}).last();
        await confirmDeployButton.click();

        await expect.element(
            page.getByText(/deployed successfully/i).or(page.getByText(/updated successfully/i)).first()
        ).toBeVisible();
    });
});

