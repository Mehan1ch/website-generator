import * as React from "react"
import {BookOpen, Bot, Frame, Map, PieChart, Settings2, SquareTerminal, User} from "lucide-react"

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
    SidebarTrigger,
} from "@/components/ui/sidebar"
import {useAuth} from "@/hooks/use-auth.tsx";
import {useRouter} from "@tanstack/react-router";
import {ModeToggle} from "@/components/ui/mode-toggle.tsx";

const data = {
    navMain: [
        {
            title: "Playground",
            url: "#",
            icon: SquareTerminal,
            isActive: true,
            items: [
                {
                    title: "History",
                    url: "#",
                },
                {
                    title: "Starred",
                    url: "#",
                },
                {
                    title: "Settings",
                    url: "#",
                },
            ],
        },
        {
            title: "Models",
            url: "#",
            icon: Bot,
            items: [
                {
                    title: "Genesis",
                    url: "#",
                },
                {
                    title: "Explorer",
                    url: "#",
                },
                {
                    title: "Quantum",
                    url: "#",
                },
            ],
        },
        {
            title: "Documentation",
            url: "#",
            icon: BookOpen,
            items: [
                {
                    title: "Introduction",
                    url: "#",
                },
                {
                    title: "Get Started",
                    url: "#",
                },
                {
                    title: "Tutorials",
                    url: "#",
                },
                {
                    title: "Changelog",
                    url: "#",
                },
            ],
        },
        {
            title: "Settings",
            url: "#",
            icon: Settings2,
            items: [
                {
                    title: "General",
                    url: "#",
                },
                {
                    title: "Team",
                    url: "#",
                },
                {
                    title: "Billing",
                    url: "#",
                },
                {
                    title: "Limits",
                    url: "#",
                },
            ],
        },
    ],
    projects: [
        {
            name: "Design Engineering",
            url: "#",
            icon: Frame,
        },
        {
            name: "Sales & Marketing",
            url: "#",
            icon: PieChart,
        },
        {
            name: "Travel",
            url: "#",
            icon: Map,
        },
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
                            <SidebarTrigger className="-ml-auto"/>
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
