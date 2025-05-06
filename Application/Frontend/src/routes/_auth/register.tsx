import {createFileRoute, redirect} from '@tanstack/react-router'
import {RegisterForm} from "@/components/forms/register-form.tsx";

export const Route = createFileRoute('/_auth/register')({
    beforeLoad: ({context}) => {
        if (context.auth.isAuthenticated) {
            throw redirect({to: '/'})
        }
    },
    component: RouteComponent,
})

function RouteComponent() {
    return (
        <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm">
                <RegisterForm/>
            </div>
        </div>
    )
}
