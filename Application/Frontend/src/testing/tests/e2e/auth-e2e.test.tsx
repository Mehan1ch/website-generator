import {describe, expect, test} from 'vitest';
import {renderWithFileRoutes} from "@/testing/utils/file-route-utils.tsx";
import {page} from "@vitest/browser/context";
import {createMockUnauthenticatedContext} from "@/testing/mocks/context/auth-context.tsx";
import {clickSideBarItem} from "@/testing/utils/test-helpers.ts";

describe('E2E Authentication Flow', () => {
    test('test complete auth flow', {timeout: 60000}, async () => {
        const {router} = renderWithFileRoutes({
            initialLocation: '/register',
            initialAuth: createMockUnauthenticatedContext(),
        });

        await router.load();

        await expect.element(page.getByText('Create your account').first()).toBeVisible();

        const nameInput = page.getByLabelText('Full Name');
        const emailInput = page.getByLabelText('Email');
        const passwordInputs = page.getByLabelText('Password');
        const confirmPasswordInput = page.getByLabelText('Confirm Password');

        await nameInput.fill('Grant');
        await emailInput.fill('grant@example.com');
        await passwordInputs.first().fill('password');
        await confirmPasswordInput.fill('password');

        const registerButton = page.getByRole('button', {name: /Create Account/i});
        await registerButton.click();

        await expect.poll(() => router.state.location.pathname).toBe('/');

        const getStartedButton = page.getByText("Get Started").first();
        await getStartedButton.click();

        await clickSideBarItem('Grant', 'sidebar');

        const logoutButton = page.getByRole('menuitem', {name: /logout/i});
        await expect.element(logoutButton).toBeVisible();
        await logoutButton.click({timeout: 2000});

        await expect.poll(() => router.state.location.pathname).toMatch("/");

        const singInLink = page.getByRole('link', {name: /sign in/i}).first();
        await expect.element(singInLink).toBeVisible();
        await singInLink.click();

        await expect.element(page.getByText('Login to your account').first()).toBeVisible();

        const loginEmailInput = page.getByLabelText('Email address');
        const loginPasswordInput = page.getByLabelText('Password');

        await loginEmailInput.fill('grant@example.com');
        await loginPasswordInput.fill('password');

        const loginButton = page.getByRole('button', {name: /Login/i}).first();
        await expect.element(loginButton).toBeVisible();
        await loginButton.click({timeout: 2000});

        await expect.poll(() => router.state.location.pathname).toBe('/');

        await router.navigate({to: '/account'});
        await router.load();

        await expect.element(page.getByText('Settings').first()).toBeVisible();

        const profileTab = page.getByRole('tab', {name: 'Profile'});
        await expect.element(profileTab).toBeVisible();
        await profileTab.click();

        await expect.element(page.getByText('Profile').first()).toBeVisible();

        const profileNameInput = page.getByLabelText('Full Name').first();
        const profileEmailInput = page.getByLabelText('Email').first();

        await profileNameInput.clear();
        await profileNameInput.fill('Grant Happy');
        await profileEmailInput.clear();
        await profileEmailInput.fill('grant.happy@example.com');

        const saveProfileButton = page.getByRole('button', {name: /save changes/i}).first();
        await expect.element(saveProfileButton).toBeVisible();
        await saveProfileButton.click();

        await expect.element(page.getByText('Profile updated successfully!')).toBeVisible();

        const passwordTab = page.getByRole('tab', {name: 'Password'}).first();
        await expect.element(passwordTab).toBeVisible();
        await passwordTab.click();

        await expect.element(page.getByText('Change Password').first()).toBeVisible();

        const currentPasswordInput = page.getByLabelText('Current Password');
        const newPasswordInput = page.getByRole('textbox', {name: 'Password', exact: true});
        const confirmNewPasswordInput = page.getByLabelText('Password Confirmation');

        await currentPasswordInput.fill('password');
        await newPasswordInput.fill('asdasdasd');
        await confirmNewPasswordInput.fill('asdasdasd');

        const changePasswordButton = page.getByRole('button', {name: /update password/i});
        await expect.element(changePasswordButton).toBeVisible();
        await changePasswordButton.click();

        await expect.element(page.getByText(/password updated successfully/i)).toBeVisible();
        await expect.poll(() => router.state.location.pathname).toBe('/');

        await getStartedButton.click();

        const finalLoginEmailInput = page.getByLabelText('Email address');
        const finalLoginPasswordInput = page.getByLabelText('Password');

        await finalLoginEmailInput.fill('grant.happy@example.com');
        await finalLoginPasswordInput.fill('asdasdasd');

        const finalLoginButton = page.getByRole('button', {name: /login/i});
        await expect.element(finalLoginButton).toBeVisible();
        await finalLoginButton.click();

        await expect.poll(() => router.state.location.pathname).toBe('/dashboard');
    });
});

