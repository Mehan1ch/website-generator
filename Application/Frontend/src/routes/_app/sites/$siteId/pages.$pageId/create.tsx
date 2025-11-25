import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute(
    '/_app/sites/$siteId/pages/$pageId/create',
)({
    beforeLoad: () => {
        return {
            getTitle: () => 'Create',
        };
    },
    component: PageCreateComponent,
});

function PageCreateComponent() {
    return <div>Hello "/_app/websites/$siteId/pages/$pageId/create"!</div>;
}
