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
import {Button} from "@/components/ui/button.tsx";
import {AlertTriangle, Trash2} from "lucide-react";
import {Alert, AlertDescription} from "@/components/ui/alert.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";
import {useState} from "react";

type DeleteDialogProps = {
    name: string;
    description: string;
    alertDescription?: string;
    alertDescriptionItems?: string[];
    onSubmit: () => Promise<void>;
}
export const DeleteDialog = ({
                                 name,
                                 description,
                                 alertDescription,
                                 alertDescriptionItems,
                                 onSubmit
                             }: DeleteDialogProps) => {
    const onDelete = async () => {
        setLoading(true);
        try {
            await onSubmit();
        } catch (error) {
            setLoading(false);
        }
    };
    const [loading, setLoading] = useState<boolean>(false);
    return <Dialog>
        <DialogTrigger asChild>
            <Button variant="destructive">
                <Trash2/>
                Delete
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-destructive/10 rounded-full">
                        <AlertTriangle className="h-6 w-6 text-destructive"/>
                    </div>
                    <DialogTitle className="text-xl">Delete {name}</DialogTitle>
                </div>
                <DialogDescription className="text-base">
                    {description}
                </DialogDescription>
            </DialogHeader>

            <Alert variant="destructive" className="mt-4">
                <AlertTriangle className="h-4 w-4"/>
                <AlertDescription className="text-sm">
                    {alertDescription}
                    {alertDescriptionItems &&
                        <ul className="list-disc list-inside mt-2 space-y-1">
                            {alertDescriptionItems.map((item, index) => (
                                <li key={index}>{item}</li>
                            ))}
                        </ul>
                    }
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
                    onClick={onDelete}
                    disabled={loading}
                >
                    {loading ? <Spinner/> : <Trash2/>}
                    {loading ? "Deleting..." : `Delete ${name}`}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>;
};