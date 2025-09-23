import * as React from "react"
import {Globe, LayoutDashboard, PencilIcon, User} from "lucide-react"

import {NavMain} from "@/components/sidebar/nav-main.tsx"
import {NavUser} from "@/components/sidebar/nav-user.tsx"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar.tsx"
import {useAuth} from "@/hooks/use-auth.tsx";
import {useRouter} from "@tanstack/react-router";
import {SideBarModeToggle} from "@/components/sidebar/side-bar-mode-toggle.tsx";
import {NavSection} from "@/types/nav-section.ts";


const navMain: NavSection[] = [
    {
        title: "Dashboard",
        url: "/",
        icon: LayoutDashboard,
        authRequired: false,
    },
    {
        title: "Websites",
        url: "/websites",
        icon: Globe,
        authRequired: true,
    },
    {
        title: "Editor",
        url: "/editor",
        icon: PencilIcon,
        authRequired: true,
    }
];

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    const appTitle = import.meta.env.VITE_APP_NAME || "Default App Title";
    const {user, isAuthenticated} = useAuth();
    const router = useRouter();

    const filteredNavMain = navMain.filter(item => !item.authRequired || isAuthenticated);

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenuButton size="lg" asChild onClick={() => router.navigate({to: "/dashboard"})}>
                    <div>
                        <div
                            className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                            <Globe className="size-4"/>
                        </div>
                        <div className="flex flex-col gap-0.5 leading-none">
                            <span className="font-medium">{appTitle}</span>
                        </div>
                    </div>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={filteredNavMain}/>
            </SidebarContent>
            <SidebarFooter>
                <SideBarModeToggle/>
                {isAuthenticated ?
                    <NavUser user={user!}/> :
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarMenuButton variant="default" size="lg" asChild
                                               onClick={() => router.navigate({to: "/login"})}>
                                <div>
                                    <div
                                        className="flex aspect-square size-8 items-center justify-center rounded-lg">
                                        <User className="-ml-auto"/>
                                    </div>
                                    <div className="flex flex-col gap-0.5 leading-none">
                                        <span className="font-semibold">Login</span>
                                    </div>
                                </div>
                            </SidebarMenuButton>
                        </SidebarMenuItem>
                    </SidebarMenu>
                }
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    )
}
