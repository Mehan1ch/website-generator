import "../index.css";
import {createFileRoute} from "@tanstack/react-router";
import {useAuth} from "@/hooks/use-auth.tsx";
import {Navbar} from "@/routes/-components/navbar.tsx";
import Footer from "@/routes/-components/footer.tsx";
import {Hero} from "@/routes/-components/hero.tsx";

export const Route = createFileRoute("/")({
    validateSearch: (search) => ({
        redirect: (search.redirect as string) || "/",
    }),
    component: Index,
});

function Index() {
    const {isAuthenticated} = useAuth();
    return (
        <div className="min-h-screen flex flex-col">
            <Navbar isAuthenticated={isAuthenticated}/>
            <Hero/>
            <Footer/>
        </div>
    );
}