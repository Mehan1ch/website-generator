import {ComponentPropsWithoutRef, useState} from "react";
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {AlertCircleIcon} from "lucide-react";
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
import {cn} from "@/lib/utils.ts";
import {useAuth} from "@/hooks/use-auth.tsx";
import {toast} from "sonner";
import {useRouter} from "@tanstack/react-router";
import {Spinner} from "@/components/ui/spinner.tsx";
import {APIError} from "@/lib/api/api-client.ts";

type DeleteAccountFormProps = {
    className?: string;
} & ComponentPropsWithoutRef<"div">;


export function DeleteAccountForm({className, ...props}: DeleteAccountFormProps) {
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
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader>
                    <CardTitle>Delete account</CardTitle>
                    <CardDescription>
                        Delete your account and all of its resources
                    </CardDescription>
                </CardHeader>
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
                            <Button variant="outline">Delete account</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Delete account</DialogTitle>
                                <DialogDescription>
                                    Are you sure you want to delete your account? This action cannot be undone.
                                </DialogDescription>
                            </DialogHeader>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button type="submit" disabled={loading} onClick={onSubmit}>
                                    {loading && <Spinner/>}
                                    Confirm
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </CardFooter>
            </Card>
        </div>
    );
}