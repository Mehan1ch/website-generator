import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute(
    '/_app/sites/$siteId/pages/$pageId/edit',
)({
    beforeLoad: () => {
        return {
            getTitle: () => 'Edit',
        };
    },
    component: PageEditComponent,
});

function PageEditComponent() {
    return <div>Hello "/_app/websites/$siteId/pages/$pageId/edit"!</div>;
}
