import {createFileRoute, Link, redirect} from '@tanstack/react-router';
import {GalleryVerticalEnd} from "lucide-react";
import {z} from "zod";
import {ResetPasswordForm} from "@/components/forms/reset-password-form.tsx";


const resetPasswordSearchSchema = z.object({
    redirect: z.string().default('/'),
    token: z.string().min(1).default(''),
    email: z.email().default(''),
});

export const Route = createFileRoute('/_auth/reset-password')({
    validateSearch: resetPasswordSearchSchema,
    beforeLoad: ({context, search}) => {
        // Redirect if already authenticated
        if (context.auth.isAuthenticated) {
            throw redirect({to: search.redirect, replace: true});
        }
        if (search.email === '' || search.token === '') {
            throw redirect({to: search.redirect, replace: true});
        }
    },
    component: ResetPassword,
});

function ResetPassword() {
    const {redirect, token, email} = Route.useSearch();
    const {VITE_APP_NAME} = import.meta.env;

    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link to={"/"} search={{
                    redirect: redirect || "/",
                }} className="flex items-center gap-2 self-center font-medium">
                    <div
                        className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                        <GalleryVerticalEnd className="size-4"/>
                    </div>
                    {VITE_APP_NAME}
                </Link>
                <ResetPasswordForm redirect={redirect} token={token} email={email}/>
            </div>
        </div>
    );
}
