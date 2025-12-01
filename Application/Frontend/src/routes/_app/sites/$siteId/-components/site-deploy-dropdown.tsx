import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {Button} from "@/components/ui/button.tsx";
import {CloudCog, CloudOff, CloudUpload, MoreHorizontal} from "lucide-react";
import {Site, SiteState} from "@/types/site.ts";
import {api, APIError} from "@/lib/api/api-client.ts";
import {toast} from "sonner";
import {useState} from "react";
import {useQueryClient} from "@tanstack/react-query";
import {ConfirmDialogDropdown} from "@/components/blocks/confirm-dialog-dropdown.tsx";

type SiteDeployDropdownProps = {
    site: Site
}

export const SiteDeployDropdown = ({site}: SiteDeployDropdownProps) => {
    const queryClient = useQueryClient();
    const [loading, setLoading] = useState<boolean>(false);

    // Dialog states
    const [createDialogOpen, setCreateDialogOpen] = useState<boolean>(false);
    const [updateDialogOpen, setUpdateDialogOpen] = useState<boolean>(false);
    const [restartDialogOpen, setRestartDialogOpen] = useState<boolean>(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

    // Mutations
    const createSiteDeploymentMutation = api.useMutation("post", "/api/v1/site/{site_id}/deployment");
    const updateSiteDeploymentMutation = api.useMutation("put", "/api/v1/site/{site_id}/deployment");
    const restartSiteDeploymentMutation = api.useMutation("post", "/api/v1/site/{site_id}/deployment/restart");
    const deleteSiteDeploymentMutation = api.useMutation("delete", "/api/v1/site/{site_id}/deployment");

    // Options to invalidate queries after mutation
    const siteQueryOptions = api.queryOptions("get", "/api/v1/site/{site_id}", {
        params: {
            path: {
                site_id: site.id!,
            }
        }
    });

    const onCreate = async () => {
        setLoading(true);
        toast.promise(createSiteDeploymentMutation.mutateAsync({
            params: {
                path: {
                    site_id: site.id!,
                }
            }
        }), {
            loading: "Deploying site...",
            success: () => {
                setLoading(false);
                queryClient.invalidateQueries(siteQueryOptions);
                return "Site deployed successfully.";
            },
            error: (error: APIError) => {
                setLoading(false);
                return {message: "Failed to deploy site.", description: error.message};
            }
        });
    };

    const onUpdate = async () => {
        setLoading(true);
        toast.promise(updateSiteDeploymentMutation.mutateAsync({
            params: {
                path: {
                    site_id: site.id!,
                }
            }
        }), {
            loading: "Updating site deployment...",
            success: () => {
                setLoading(false);
                queryClient.invalidateQueries(siteQueryOptions);
                return "Site deployment updated successfully.";
            },
            error: (error: APIError) => {
                setLoading(false);
                return {message: "Failed to update site deployment.", description: error.message};
            }
        });
    };

    const onRestart = async () => {
        setLoading(true);
        toast.promise(restartSiteDeploymentMutation.mutateAsync({
            params: {
                path: {
                    site_id: site.id!,
                }
            }
        }), {
            loading: "Restarting site deployment...",
            success: () => {
                setLoading(false);
                queryClient.invalidateQueries(siteQueryOptions);
                return "Site deployment restarted successfully.";
            },
            error: (error: APIError) => {
                setLoading(false);
                return {message: "Failed to restart site deployment.", description: error.message};
            }
        });
    };

    const onDelete = async () => {
        setLoading(true);
        toast.promise(deleteSiteDeploymentMutation.mutateAsync({
                params: {
                    path: {
                        site_id: site.id!,
                    }
                }
            }),
            {
                loading: "Deleting site deployment...",
                success: () => {
                    setLoading(false);
                    queryClient.invalidateQueries(siteQueryOptions);
                    return "Site deployment deleted successfully.";
                },
                error: (error: APIError) => {
                    setLoading(false);
                    return {message: "Failed to delete site deployment.", description: error.message};
                }
            });
    };


    return <>
        <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
                <Button variant="outline">
                    <MoreHorizontal className="h-4 w-4"/>
                    Deployment
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                {site.state as SiteState === "draft" && !site.published_at ? (
                    <DropdownMenuItem className={"text-green-500 focus:text-green-500"}
                                      onClick={() => setCreateDialogOpen(true)}>
                        <CloudUpload className="mr-2 h-4 w-4 text-green-500 focus:text-green-500"/>
                        Publish
                    </DropdownMenuItem>
                ) : (
                    <>
                        <DropdownMenuItem className={"text-blue-500 focus:text-blue-500"}
                                          onClick={() => setUpdateDialogOpen(true)}>
                            <CloudUpload className="mr-2 h-4 w-4 text-blue-500 focus:text-blue-500"/>
                            Update
                        </DropdownMenuItem>
                        <DropdownMenuItem className={"text-yellow-500 focus:text-yellow-500"}
                                          onClick={() => setRestartDialogOpen(true)}>
                            <CloudCog className="mr-2 h-4 w-4 text-yellow-500 focus:text-yellow-500"/>
                            Restart
                        </DropdownMenuItem>
                        <DropdownMenuSeparator/>
                        <DropdownMenuItem className="text-destructive focus:text-destructive"
                                          onClick={() => setDeleteDialogOpen(true)}>
                            <CloudOff className="mr-2 h-4 w-4 text-destructive focus:text-destructive"/>
                            Delete
                        </DropdownMenuItem>
                    </>
                )}
            </DropdownMenuContent>
        </DropdownMenu>
        <ConfirmDialogDropdown title={"Site"}
                               icon={<CloudUpload/>}
                               description={"Are you sure you want to deploy your site?"}
                               onSubmit={onCreate} action={"Deploy"} doing={"Deploying"}
                               open={createDialogOpen}
                               onOpenChange={setCreateDialogOpen} loading={loading}/>
        <ConfirmDialogDropdown title={"Deployment"}
                               icon={<CloudUpload/>}
                               description={"Are you sure you want to update your site's deployment?"}
                               onSubmit={onUpdate} action={"Update"} doing={"Updating"}
                               open={updateDialogOpen}
                               onOpenChange={setUpdateDialogOpen} loading={loading}/>
        <ConfirmDialogDropdown title={"Deployment"}
                               icon={<CloudCog/>}
                               description={"Are you sure you want to restart your site's deployment?"}
                               onSubmit={onRestart} action={"Restart"} doing={"Restarting"}
                               open={restartDialogOpen}
                               onOpenChange={setRestartDialogOpen} loading={loading}/>
        <ConfirmDialogDropdown title={"Deployment"}
                               icon={<CloudOff/>}
                               description={"Are you sure you want to delete your site's deployment?"}
                               onSubmit={onDelete} action={"Delete"} doing={"Deleting"}
                               variant={"destructive"}
                               open={deleteDialogOpen}
                               onOpenChange={setDeleteDialogOpen} loading={loading}/>
    </>;
};