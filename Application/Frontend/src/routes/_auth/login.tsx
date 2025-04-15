import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/_auth/login')({
    component: Login,
})

function Login() {
    return <div>Hello "/_auth/login"!</div>
}
