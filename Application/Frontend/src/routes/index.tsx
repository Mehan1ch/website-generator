import "../index.css";
import {createFileRoute, Link, useRouter} from "@tanstack/react-router";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {ModeToggle} from "@/components/ui/mode-toggle.tsx";
import {TypographyH3} from "@/components/ui/typography/typography-h3.tsx";
import {useAuth} from "@/hooks/use-auth.tsx";

export const Route = createFileRoute("/")({
    validateSearch: (search) => ({
        redirect: (search.redirect as string) || '/',
    }),
    component: Index,
});

function Index() {
    const {VITE_APP_NAME} = import.meta.env;
    const {isAuthenticated} = useAuth();
    const router = useRouter();
    const {redirect} = Route.useSearch();
    return (
        //TODO: use shadcn navigation menu here instead
        <div className="min-h-screen bg-background flex flex-col">
            {/* Top Bar */}
            <header className="w-full px-6 py-4 flex justify-between items-center bg-secondary shadow">
                <TypographyH3>
                    {VITE_APP_NAME}
                </TypographyH3>
                <div className="space-x-2 align-middle">
                    <div className="inline align-bottom">
                        <ModeToggle/>
                    </div>
                    {!isAuthenticated ? (
                        <>
                            <Button onClick={() => router.navigate({
                                to: "/login",
                                search: {redirect: redirect}
                            })}>
                                Login
                            </Button>
                            <Button onClick={() => router.navigate({
                                to: "/register",
                                search: {redirect: redirect}
                            })}>Register</Button>
                        </>
                    ) : (
                        <Button onClick={() => router.navigate({
                            to: "/dashboard",
                            search: {redirect: redirect}
                        })}>Go to Dashboard
                        </Button>
                    )
                    }

                </div>
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