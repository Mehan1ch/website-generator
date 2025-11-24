import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/schemas/$schemaId/design')({
    beforeLoad: () => {
        return {
            getTitle: () => 'Design',
        };
    },
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/_app/schemas/$id/design"!</div>;
}
