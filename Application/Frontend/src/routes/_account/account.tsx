import {createFileRoute, redirect} from '@tanstack/react-router'
import AppWrapper from "@/components/sidebar/app-wrapper.tsx";

export const Route = createFileRoute('/_account/account')({
    beforeLoad: ({context}) => {
        if (!context.auth.user) {
            throw redirect({to: "/"})
        }
    },
    component: Account,
})

function Account() {
    return <AppWrapper header={"Account"}>

    </AppWrapper>
}
