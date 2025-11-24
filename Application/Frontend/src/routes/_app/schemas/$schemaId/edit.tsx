import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/schemas/$schemaId/edit')({
    beforeLoad: () => {
        return {
            getTitle: () => 'Edit',
        };
    },
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/_app/schemas/$id/edit"!</div>;
}
