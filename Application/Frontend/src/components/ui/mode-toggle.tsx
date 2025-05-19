import {useTheme} from "@/hooks/use-theme.tsx"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Moon, Sun} from "lucide-react";
import {SidebarMenuButton, useSidebar} from "@/components/ui/sidebar.tsx";

export function ModeToggle() {
    const {theme, setTheme} = useTheme()
    const {state} = useSidebar()
    const isSidebarCollapsed = state === "collapsed"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                    <Sun
                        className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"/>
                    <Moon
                        className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"/>
                    <span className="sr-only">Toggle theme</span>
                    {!isSidebarCollapsed && <span className="ml-2 capitalize">{theme}</span>}
                </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                    Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                    Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                    System
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
