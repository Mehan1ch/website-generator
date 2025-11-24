import {Globe, LayoutDashboard, LayoutTemplateIcon, PencilIcon} from "lucide-react";

import {NavMain} from "@/components/sidebar/nav-main.tsx";
import {NavUser} from "@/components/sidebar/nav-user.tsx";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenuButton,
    SidebarRail,
} from "@/components/ui/sidebar.tsx";
import {useAuth} from "@/hooks/use-auth.tsx";
import {useRouter} from "@tanstack/react-router";
import {NavSection} from "@/types/nav-section.ts";
import {ComponentProps} from "react";


const navMain: NavSection[] = [
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Schemas",
        url: "/schemas",
        icon: LayoutTemplateIcon,
    },
    {
        title: "Websites",
        url: "/websites",
        icon: Globe,
    },
    {
        title: "Editor",
        url: "/editor",
        icon: PencilIcon,
    }
];

export function AppSidebar({...props}: ComponentProps<typeof Sidebar>) {
    const appTitle = import.meta.env.VITE_APP_NAME || "Default App Title";
    const {user} = useAuth();
    const router = useRouter();


    return (
        <Sidebar variant={"inset"} collapsible={"icon"} {...props}>
            <SidebarHeader>
                <SidebarMenuButton size="lg" asChild onClick={() => router.navigate({to: "/dashboard"})}>
                    <div>
                        <div
                            className="bg-sidebar-foreground text-sidebar flex aspect-square size-8 items-center justify-center rounded-lg">
                            <Globe className="size-4"/>
                        </div>
                        <div className="flex flex-col gap-0.5 leading-none">
                            <span className="font-medium">{appTitle}</span>
                        </div>
                    </div>
                </SidebarMenuButton>
            </SidebarHeader>
            <SidebarContent>
                <NavMain items={navMain}/>
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={user!}/>
            </SidebarFooter>
            <SidebarRail/>
        </Sidebar>
    );
}
