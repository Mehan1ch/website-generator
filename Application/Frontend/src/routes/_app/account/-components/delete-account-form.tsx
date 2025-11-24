import {Card, CardContent, CardFooter} from "@/components/ui/card.tsx";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircleIcon, Trash} from "lucide-react";
import {useAuth} from "@/hooks/use-auth.tsx";
import {toast} from "sonner";
import {useRouter} from "@tanstack/react-router";
import {APIError} from "@/lib/api/api-client.ts";
import {DeleteDialog} from "@/components/blocks/delete-dialog.tsx";

export function DeleteAccountForm() {
    const {deleteUser} = useAuth();
    const router = useRouter();

    const onSubmit = async () => {
        try {
            await deleteUser();
            toast.success("Account deleted successfully!");
            router.history.push("/");
        } catch (error) {
            toast.error("Failed to delete account!", {
                description: (error as APIError).message
            });
        }
    };


    return (
        <div className="mx-auto max-w-5xl p-6">
            <Card className="bg-card border p-8">
                <div className="border-b pb-6">
                    <h2 className="text-2xl font-semibold tracking-tight flex items-center gap-2">
                        <Trash className="h-6 w-6"/>
                        Delete Account
                    </h2>
                    <p className="text-muted-foreground mt-2 text-sm">
                        Delete your account and all associated data permanently.
                    </p>
                </div>
                <CardContent className="grid gap-2">
                    <Alert variant={"destructive"}>
                        <AlertCircleIcon/>
                        <AlertTitle>Warning</AlertTitle>
                        <AlertDescription>
                            This action is irreversible. Please proceed with caution.
                        </AlertDescription>
                    </Alert>
                </CardContent>
                <CardFooter>
                    <DeleteDialog name={"account"}
                                  description={`This will permanently delete <strong>your user</strong> and all associated data.`}
                                  alertDescription={"This action is irreversible. The following will be deleted:"}
                                  alertDescriptionItems={["All of your websites", "All of your pages", "All of their deployments"]}
                                  onSubmit={onSubmit}/>
                </CardFooter>
            </Card>
        </div>
    );
}