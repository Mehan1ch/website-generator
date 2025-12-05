import {describe, expect, test} from 'vitest';
import {renderWithFileRoutes} from "@/testing/utils/file-route-utils.tsx";
import {page} from "@vitest/browser/context";
import {createMockUnauthenticatedContext} from "@/testing/mocks/context/auth-context.tsx";

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

        await nameInput.fill('John Doe');
        await emailInput.fill('john.doe@example.com');
        await passwordInputs.first().fill('SecurePassword123!');
        await confirmPasswordInput.fill('SecurePassword123!');

        const registerButton = page.getByRole('button', {name: /Create Account/});
        await registerButton.click();

        await expect.poll(() => router.state.location.pathname).toBe('/');

        const getStartedButton = page.getByText("Get Started").first();
        await getStartedButton.click();

        const userMenuTrigger = page.getByRole('button').filter({hasText: 'John Doe'});
        await userMenuTrigger.click();

        const logoutButton = page.getByRole('menuitem', {name: /logout/i});
        await logoutButton.click();

        await expect.poll(() => router.state.location.pathname).toMatch(/^\/($|login)/);

        await router.navigate({to: '/login'});
        await router.load();

        await expect.element(page.getByText('Login to your account')).toBeVisible();

        const loginEmailInput = page.getByLabelText('Email address');
        const loginPasswordInput = page.getByLabelText('Password');

        await loginEmailInput.fill('john.doe@example.com');
        await loginPasswordInput.fill('SecurePassword123!');

        const loginButton = page.getByRole('button', {name: /login/i});
        await loginButton.click();

        await expect.poll(() => router.state.location.pathname).toBe('/');

        await router.navigate({to: '/account'});
        await router.load();

        await expect.element(page.getByText('Settings').first()).toBeVisible();

        const profileTab = page.getByRole('tab', {name: 'Profile'});
        await profileTab.click();

        await expect.element(page.getByText('Profile').first()).toBeVisible();

        const profileNameInput = page.getByLabelText('Full Name').first();
        const profileEmailInput = page.getByLabelText('Email').first();

        await profileNameInput.clear();
        await profileNameInput.fill('Jane Doe');
        await profileEmailInput.clear();
        await profileEmailInput.fill('jane.doe@example.com');

        const saveProfileButton = page.getByRole('button', {name: /save changes/i}).first();
        await saveProfileButton.click();

        await expect.element(page.getByText('Profile updated successfully!')).toBeVisible();

        const passwordTab = page.getByRole('tab', {name: 'Password'});
        await passwordTab.click();

        await expect.element(page.getByText('Change Password').first()).toBeVisible();

        const currentPasswordInput = page.getByLabelText('Current Password');
        const newPasswordInput = page.getByLabelText('New Password');
        const confirmNewPasswordInput = page.getByLabelText('Confirm New Password');

        await currentPasswordInput.fill('SecurePassword123!');
        await newPasswordInput.fill('NewSecurePassword456!');
        await confirmNewPasswordInput.fill('NewSecurePassword456!');

        const changePasswordButton = page.getByRole('button', {name: /update password/i});
        await changePasswordButton.click();

        await expect.element(page.getByText(/password updated successfully/i)).toBeVisible();
        await expect.poll(() => router.state.location.pathname).toBe('/login');

        await router.load();

        const finalLoginEmailInput = page.getByLabelText('Email address');
        const finalLoginPasswordInput = page.getByLabelText('Password');

        await finalLoginEmailInput.fill('jane.doe@example.com');
        await finalLoginPasswordInput.fill('NewSecurePassword456!');

        const finalLoginButton = page.getByRole('button', {name: /login/i});
        await finalLoginButton.click();

        await expect.poll(() => router.state.location.pathname).toBe('/');

        const finalUserMenuTrigger = page.getByRole('button').filter({hasText: 'Jane Doe'});
        await finalUserMenuTrigger.click();

        const finalLogoutButton = page.getByRole('menuitem', {name: /logout/i});
        await finalLogoutButton.click();

        await expect.poll(() => router.state.location.pathname).toMatch(/^\/($|login)/);
    });
});

