import "../index.css";
import {createFileRoute, Link} from "@tanstack/react-router";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {TypographyH3} from "@/components/ui/typography/typography-h3.tsx";
import {useAuth} from "@/hooks/use-auth.tsx";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu.tsx";
import {useIsMobile} from "@/hooks/use-mobile.ts";
import {ModeToggle} from "@/components/ui/mode-toggle.tsx";

export const Route = createFileRoute("/")({
    validateSearch: (search) => ({
        redirect: (search.redirect as string) || '/',
    }),
    component: Index,
});

function Index() {
    const {VITE_APP_NAME} = import.meta.env;
    const {isAuthenticated} = useAuth();
    const {redirect} = Route.useSearch();
    const isMobile = useIsMobile();
    //TODO: better index page when done
    return (
        <div className="min-h-screen flex flex-col">
            <header className="w-full px-6 py-4 flex justify-between items-center shadow">
                <TypographyH3>
                    {VITE_APP_NAME}
                </TypographyH3>
                <NavigationMenu viewport={isMobile}>
                    <NavigationMenuList>
                        <ModeToggle/>
                        {!isAuthenticated ? (
                            <>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link to={"/login"}>Login</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                                <NavigationMenuItem>
                                    <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                        <Link to={"/register"}>Register</Link>
                                    </NavigationMenuLink>
                                </NavigationMenuItem>
                            </>
                        ) : (
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild className={navigationMenuTriggerStyle()}>
                                    <Link to={"/dashboard"}>Dashboard</Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        )}
                    </NavigationMenuList>
                </NavigationMenu>
            </header>
            <main className="flex-grow flex items-center justify-center">
                <Card className="max-w-lg w-full bg-secondary shadow">
                    <CardHeader>
                        <CardTitle className="dark:text-primary">
                            Welcome to {VITE_APP_NAME}!
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-lg mb-4">
                            Create and deploy static websites easily with our WYSIWYG editor. No coding
                            required—just design, publish, and share!
                        </p>
                        <div className="flex space-x-2">
                            {!isAuthenticated ? (
                                <><Link to={"/register"} search={{redirect: redirect}}>
                                    <Button>Get Started</Button>
                                </Link><Link to={"/login"} search={{redirect: redirect}}>
                                    <Button variant="outline">Login</Button>
                                </Link></>) : (
                                <Link to={"/dashboard"} search={{redirect: redirect}}>
                                    <Button>Go to Dashboard</Button>
                                </Link>
                            )}
                        </div>
                    </CardContent>
                </Card>
            </main>
        </div>
    );
}