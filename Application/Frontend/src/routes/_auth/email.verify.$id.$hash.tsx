import {createFileRoute, redirect, useNavigate} from '@tanstack/react-router';
import {redirectOnlySearchSchema} from "@/types/search.ts";
import {z} from "zod";
import {BadgeCheckIcon, BadgeXIcon} from "lucide-react";
import {Item, ItemActions, ItemContent, ItemMedia, ItemTitle} from "@/components/ui/item.tsx";
import {Button} from "@/components/ui/button.tsx";
import {api} from "@/lib/api/api-client.ts";

const emailVerifySearchParams = redirectOnlySearchSchema.extend({
    expires: z.number().default(0),
    signature: z.string().min(1).default(""),
});

export const Route = createFileRoute('/_auth/email/verify/$id/$hash')({
    validateSearch: emailVerifySearchParams,
    beforeLoad: ({search, context, params, location}) => {
        if (!context.auth.isAuthenticated) {
            throw redirect({
                to: "/login",
                search: {
                    redirect: location.href
                },
            });
        }
        if (params.hash === "" || params.id === "" || search.expires === 0 || search.signature === "") {
            throw redirect({
                to: search.redirect
            });
        }
    },
    loaderDeps: ({search: {expires, signature}}) => ({expires, signature}),
    loader: async ({params, context, deps}) => {
        const {expires, signature} = deps;
        const emailVerifyQueryOptions = api.queryOptions("get", "/email/verify/{id}/{hash}",
            {
                params: {
                    query: {
                        expires: expires,
                        signature: signature,
                    },
                    path: {
                        id: parseInt(params.id),
                        hash: params.hash,
                    }
                }
            });
        return await context.queryClient.ensureQueryData(emailVerifyQueryOptions);
    },
    staleTime: Infinity,
    component: VerifyEmail,
});

function VerifyEmail() {
    const search = Route.useSearch();
    const params = Route.useParams();
    const navigate = useNavigate({from: Route.path});
    try {
        api.useSuspenseQuery("get", "/email/verify/{id}/{hash}", {
            params: {
                query: {
                    expires: search.expires,
                    signature: search.signature,
                },
                path: {
                    id: parseInt(params.id),
                    hash: params.hash,
                }
            }
        });
        return (
            <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
                <Item variant="outline" size="default" className="bg-background">
                    <ItemMedia>
                        <BadgeCheckIcon className="size-5"/>
                    </ItemMedia>
                    <ItemContent>
                        <ItemTitle>Your profile has been verified.</ItemTitle>
                    </ItemContent>
                    <ItemActions>
                        <Button onClick={async () => {
                            await navigate({to: "/account"});
                        }}>Go to account settings</Button>
                    </ItemActions>
                </Item>
            </div>
        );
    } catch (error) {
        return <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <Item variant="outline" size="default" className="bg-background">
                <ItemMedia>
                    <BadgeXIcon className="size-5"/>
                </ItemMedia>
                <ItemContent>
                    <ItemTitle>Email verification failed</ItemTitle>
                </ItemContent>
                <ItemActions>
                    <Button onClick={async () => {
                        await navigate({to: "/account"});
                    }}>Go to account settings</Button>
                </ItemActions>
            </Item>
        </div>;
    }
}
