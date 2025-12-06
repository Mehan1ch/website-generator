import {page} from "@vitest/browser/context";

export async function clickSideBarItem(sideBarItemName: string, sideBarName: string, role: string = 'button') {
    const sideBarItem = page.getByRole(role).filter({hasText: sideBarItemName}).first();

    try {
        await sideBarItem.click({timeout: 2000});
    } catch {
        const sidebarToggle = page.getByRole(role).filter({hasText: sideBarName}).first();
        await sidebarToggle.click();
        await sideBarItem.click({timeout: 2000});
    }
}
