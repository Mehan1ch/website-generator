import {expect, test} from 'vitest';
import {renderWithFileRoutes} from "@/testing/utils/file-route-utils.tsx";
import {page} from "@vitest/browser/context";

test('index page should render', async () => {
    const {router} = renderWithFileRoutes({
        initialLocation: '/',
    });

    await router.load();

    await expect.element(page.getByText("Get started")).toBeVisible();
});