import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/websites')({
    beforeLoad: () => {
        return {
            getTitle: () => 'Websites',
        };
    },
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/_app/websites"!</div>;
}
