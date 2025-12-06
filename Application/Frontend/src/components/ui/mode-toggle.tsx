import {Moon, Sun, SunMoon} from "lucide-react";

import {useTheme} from "@/hooks/use-theme.tsx";
import {
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuTrigger
} from "@/components/ui/navigation-menu.tsx";

export function ModeToggle() {
    const {theme, setTheme} = useTheme();

    return (
        <NavigationMenuItem className="hidden md:block">
            <NavigationMenuTrigger className="flex-row items-center gap-2">
                <Sun
                    className="h-full rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 dark:hidden"/>
                <Moon
                    className="h-full hidden rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 dark:block"/>
                <span className="sr-only">Toggle theme</span>
                <span className="capitalize">{theme}</span>
            </NavigationMenuTrigger>
            <NavigationMenuContent>
                <ul className="grid w-[200px] gap-4">
                    <li>
                        <NavigationMenuLink asChild onClick={() => setTheme("light")}>
                            <div className="flex-row items-center gap-2">
                                <Sun/>
                                Light
                            </div>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild onClick={() => setTheme("dark")}>
                            <div className="flex-row items-center gap-2">
                                <Moon/>
                                Dark
                            </div>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild onClick={() => setTheme("system")}>
                            <div className="flex-row items-center gap-2">
                                <SunMoon/>
                                System
                            </div>
                        </NavigationMenuLink>
                    </li>
                </ul>
            </NavigationMenuContent>
        </NavigationMenuItem>
    );
}