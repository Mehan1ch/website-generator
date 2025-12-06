import {createFileRoute, useBlocker} from '@tanstack/react-router';
import {api, APIError} from "@/lib/api/api-client.ts";
import {PageNotFound} from "@/routes/_app/sites/$siteId/pages/-components/page-not-found.tsx";
import {compressAndEncodeBase64, decodeBase64AndDecompress} from "@/lib/utils.ts";
import {toast} from "sonner";
import {renderToStaticHTML} from "@/lib/element-utils.tsx";
import {PageDesigner} from "@/routes/_app/-components/editor/page-designer";

export const Route = createFileRoute(
    '/_app/sites/$siteId/pages/$pageId/design',
)({
    beforeLoad: () => {
        return {
            getTitle: () => 'Design',
        };
    },
    loader: async ({context: {queryClient}, params}) => {
        const {siteId, pageId} = params;
        const siteQueryOptions = api.queryOptions("get", "/api/v1/site/{site_id}/page/{page_id}", {
            params: {
                path: {
                    site_id: siteId,
                    page_id: pageId,
                }
            }
        });
        return queryClient.ensureQueryData(siteQueryOptions);
    },
    component: PageDesignComponent,
});

function PageDesignComponent() {
    const {siteId, pageId} = Route.useParams();
    const {data} = api.useSuspenseQuery("get", "/api/v1/site/{site_id}/page/{page_id}", {
        params: {
            path: {
                site_id: siteId,
                page_id: pageId,
            }
        }
    });
    const page = data?.data;
    if (!page) {
        return <PageNotFound/>;
    }

    const updatePageMutation = api.useMutation("put", "/api/v1/site/{site_id}/page/{page_id}");
    const decoded = decodeBase64AndDecompress(page?.content || "");

    useBlocker({
        shouldBlockFn: () => {
            const shouldLeave = confirm('Are you sure you want to leave? Unsaved changes will be lost.');
            return !shouldLeave;
        },
    });

    const onSave = (content: string) => {
        const decodedContent = decodeBase64AndDecompress(content);
        const htmlRaw = renderToStaticHTML(decodedContent);
        const html = compressAndEncodeBase64(htmlRaw);
        toast.promise(updatePageMutation.mutateAsync({
            params: {
                path: {
                    site_id: siteId,
                    page_id: page.id || "",
                }
            },
            body: {
                content: content,
                html: html,
            }
        }), {
            loading: "Saving page design...",
            success: "Page design saved successfully!",
            error: (error: APIError) => {
                return {
                    message: "Failed to save page design.",
                    description: error.message,
                };
            }
        });
    };

    return <PageDesigner content={decoded} onSave={onSave}/>;
}