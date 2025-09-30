import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/_app/websites')({
    beforeLoad: () => {
        return {
            getTitle: () => 'Websites',
        }
    },
    component: Websites,
})

function Websites() {
    return <div>Hello "/websites"!</div>
}
