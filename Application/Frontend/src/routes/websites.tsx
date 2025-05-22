import {createFileRoute, redirect} from '@tanstack/react-router'
import AppWrapper from "@/components/sidebar/app-wrapper.tsx";

export const Route = createFileRoute('/websites')({
    beforeLoad: ({context}) => {
        if (!context.auth.isAuthenticated) {
            throw redirect({to: "/login"})
        }
    },
    component: Websites,
})

function Websites() {

    return <AppWrapper header={'Websites'}>
        Hello "/websites"!
    </AppWrapper>
}
