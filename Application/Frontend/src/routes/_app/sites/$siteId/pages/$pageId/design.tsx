import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute(
    '/_app/sites/$siteId/pages/$pageId/design',
)({
    beforeLoad: () => {
        return {
            getTitle: () => 'Design',
        };
    },
    component: PageDesignComponent,
});

function PageDesignComponent() {
    return <div>Hello "/_app/websites/$siteId/pages/$pageId/design"!</div>;
}
