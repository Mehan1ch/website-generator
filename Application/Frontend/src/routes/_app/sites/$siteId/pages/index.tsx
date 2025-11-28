import {createFileRoute, redirect} from '@tanstack/react-router';

export const Route = createFileRoute('/_app/sites/$siteId/pages/')({
    beforeLoad: ({params: {siteId}}) => {
        throw redirect({
            to: "/sites/$siteId",
            params: {
                siteId: siteId,
            },
            search: {
                tab: "pages",
            }
        });
    },
});