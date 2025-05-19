import * as React from "react"
import {Globe, LayoutDashboard, User} from "lucide-react"

import {NavMain} from "@/components/nav-main"
import {NavUser} from "@/components/nav-user"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"
import {useAuth} from "@/hooks/use-auth.tsx";
import {useRouter} from "@tanstack/react-router";
import {ModeToggle} from "@/components/ui/mode-toggle.tsx";

const data = {
    navMain: [
        {
            title: "Dashboard",
            url: "/",
            icon: LayoutDashboard,
        },
        {
            title: "Websites",
            url: "/websites",
            icon: Globe,
        }
    ],
}

export function AppSidebar({...props}: React.ComponentProps<typeof Sidebar>) {
    const appTitle = import.meta.env.VITE_APP_NAME || "Default App Title";
    const {user, isAuthenticated} = useAuth();
    const router = useRouter();

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenuButton size="lg" asChild onClick={() => router.navigate({to: "/"})}>
                    <div>
                        <div
                            className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                            <Globe/>
                        </div>
                        <div className="grid flex-1 text-left text-sm leading-tight">
                            <span className="truncate font-semibold">{appTitle}</span>
                        </div>
                    </div>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={data.navMain}/>
            </SidebarContent>
            <SidebarFooter>
                <ModeToggle/>
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
