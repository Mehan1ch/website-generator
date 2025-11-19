import {useState} from "react";
import {Card, CardContent, CardFooter} from "@/components/ui/card.tsx";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircleIcon, AlertTriangle, Trash} from "lucide-react";
import {Button} from "@/components/ui/button.tsx";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog.tsx";
import {useAuth} from "@/hooks/use-auth.tsx";
import {toast} from "sonner";
import {useRouter} from "@tanstack/react-router";
import {APIError} from "@/lib/api/api-client.ts";
import {Spinner} from "@/components/ui/spinner.tsx";

export function DeleteAccountForm() {
    const [loading, setLoading] = useState(false);
    const {deleteUser} = useAuth();
    const router = useRouter();

    const onSubmit = async () => {
        setLoading(true);
        try {
            await deleteUser();
            toast.success("Account deleted successfully!");
            router.history.push("/");
        } catch (error) {
            toast.error("Failed to delete account!", {
                description: (error as APIError).message
            });
            setLoading(false);
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
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="destructive">Delete account</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-destructive/10 rounded-full">
                                        <AlertTriangle className="h-6 w-6 text-destructive"/>
                                    </div>
                                    <DialogTitle className="text-xl">Delete account</DialogTitle>
                                </div>
                                <DialogDescription className="text-base">
                                    This will permanently delete <strong>your user</strong> and all associated data.
                                </DialogDescription>
                            </DialogHeader>

                            <Alert variant="destructive" className="mt-4">
                                <AlertTriangle className="h-4 w-4"/>
                                <AlertDescription className="text-sm">
                                    This action is irreversible. The following will be deleted:
                                    <ul className="list-disc list-inside mt-2 space-y-1">
                                        <li>All of your websites</li>
                                        <li>All of your pages</li>
                                        <li>All of their deployments</li>
                                    </ul>
                                </AlertDescription>
                            </Alert>

                            <DialogFooter className="gap-2 sm:gap-0 mt-6">
                                <DialogClose asChild className="mx-2">
                                    <Button variant="outline">
                                        Cancel
                                    </Button>
                                </DialogClose>
                                <Button
                                    className="mx-2"
                                    variant="destructive"
                                    onClick={onSubmit}
                                    disabled={loading}
                                >
                                    {loading && <Spinner/>}
                                    {loading ? "Deleting..." : "Delete account"}
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
        </div>
    );
}