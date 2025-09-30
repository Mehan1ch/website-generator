import {createFileRoute, redirect} from '@tanstack/react-router'
import {RegisterForm} from "@/components/forms/register-form.tsx";

export const Route = createFileRoute('/_auth/register')({
    validateSearch: (search) => ({
        redirect: (search.redirect as string) || '/',
    }),
    beforeLoad: ({context, search}) => {
        if (context.auth.isAuthenticated) {
            throw redirect({to: search.redirect})
        }
    },
    component: RouteComponent,
})

function RouteComponent() {
    const {redirect} = Route.useSearch()
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <RegisterForm redirect={redirect}/>
            </div>
        </div>
    )
}
