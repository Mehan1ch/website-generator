import {Lock, LogInIcon} from "lucide-react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem
} from "@/components/ui/sidebar.tsx";
import {Link} from "@tanstack/react-router";

const data = {
    nav: [
        {name: "Profile", icon: LogInIcon, link: "/account/profile"},
        {name: "Password", icon: Lock, link: "/account/password"},
    ],
}

export function AccountSidebar() {

    return <Sidebar collapsible={"none"} className="hidden md:flex bg-main">
        <SidebarContent>
            <SidebarGroup>
                <SidebarGroupContent>
                    <SidebarMenu>
                        {data.nav.map((item) => (
                            <SidebarMenuItem key={item.name}>
                                <SidebarMenuButton
                                    asChild
                                    isActive={item.name === "Messages & media"}
                                >
                                    <Link to={item.link}>
                                        <item.icon/>
                                        <span>{item.name}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        </SidebarContent>
    </Sidebar>
}