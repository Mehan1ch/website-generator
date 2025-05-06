import {Moon, Sun, SunMoon} from "lucide-react"

import {Button} from "@/components/ui/button.tsx"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {useTheme} from "@/hooks/use-theme.tsx"
import {useSidebar} from "@/components/ui/sidebar.tsx";

export function ModeToggle() {
    const {theme, setTheme} = useTheme()

    const {state} = useSidebar()
    const isSidebarCollapsed = state === "collapsed"

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    size={isSidebarCollapsed ? "icon" : "default"}
                    className={`h-8 rounded-lg  ${
                        isSidebarCollapsed ? "w-8" : "w-full justify-start px-4"
                    }`}
                >
                    <Sun
                        className={`h-5 w-5 transition-all ${
                            theme === "light" ? "rotate-0 scale-100" : "dark:-rotate-90 dark:scale-0"
                        }`}
                    />
                    <Moon
                        className={`absolute h-5 w-5 transition-all ${
                            theme === "dark" ? "rotate-0 scale-100" : "dark:rotate-90 dark:scale-0"
                        }`}
                    />
                    <SunMoon
                        className={`absolute h-5 w-5 transition-all ${
                            theme === "system" ? "rotate-0 scale-100" : "dark:rotate-90 dark:scale-0"
                        }`}
                    />
                    {!isSidebarCollapsed && <span className="ml-2 capitalize">{theme}</span>}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                align="end"
                className="w-32 bg-sidebar-accent"
            >
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
