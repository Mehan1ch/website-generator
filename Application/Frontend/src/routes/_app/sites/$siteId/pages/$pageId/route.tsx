import {createFileRoute} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/sites/$siteId/pages/$pageId')({
    beforeLoad: ({params: {pageId}}) => {
        return {
            getTitle: () => pageId,
        };
    },
    component: PageLayoutComponent,
});

function PageLayoutComponent() {
    return <div>Hello "/_app/websites/$siteId/pages/$pageId"!</div>;
}
