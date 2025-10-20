import {createFileRoute, redirect} from '@tanstack/react-router';
import {SignupForm} from "@/components/forms/signup-form.tsx";
import {GalleryVerticalEnd} from "lucide-react";
import {redirectOnlySearchSchema} from "@/types/search.ts";

export const Route = createFileRoute('/_auth/register')({
    validateSearch: redirectOnlySearchSchema,
    beforeLoad: ({context, search}) => {
        if (context.auth.isAuthenticated) {
            throw redirect({to: search.redirect});
        }
    },
    component: RouteComponent,
});

function RouteComponent() {
    const {redirect} = Route.useSearch();
    const appTitle = import.meta.env.VITE_APP_NAME || "Default App Title";
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <a href="#" className="flex items-center gap-2 self-center font-medium">
                    <div
                        className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                        <GalleryVerticalEnd className="size-4"/>
                    </div>
                    {appTitle}
                </a>
                <SignupForm redirect={redirect}/>
            </div>
        </div>
    );
}
