import {createFileRoute, redirect} from '@tanstack/react-router'

export const Route = createFileRoute('/about')({
    beforeLoad: ({context}) => {
        if (context.auth.user == null) {
            throw redirect({to: "/login"})
        }
    },
    component: About,
})

function About() {
    return <div>Hello "/about"!</div>
}
