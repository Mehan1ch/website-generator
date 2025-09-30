import {createFileRoute} from '@tanstack/react-router'
import {AccountSidebar} from "@/components/sidebar/account/account-sidebar.tsx";
import {SidebarProvider} from "@/components/ui/sidebar.tsx";
import {TypographyH4} from "@/components/ui/typography/typography-h4.tsx";

export const Route = createFileRoute('/_app/account/')({
    beforeLoad: () => {
        return {
            getTitle: () => 'Account',
        }
    },
    component: Account,
})

function Account() {
    return <>
        <header className="flex h-16 shrink-0 items-center gap-2 p-4 m-2">
            <div>
                <TypographyH4>Settings</TypographyH4>
                <p className="text-muted-foreground">Manage your profile and account settings</p>
            </div>
        </header>
        <SidebarProvider name={"Account"} className="m-2">
            <AccountSidebar/>
        </SidebarProvider>
    </>
}
