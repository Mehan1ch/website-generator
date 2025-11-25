import {useState} from "react";
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
import {AlertTriangle, Upload} from "lucide-react";
import {Alert, AlertDescription} from "@/components/ui/alert.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";


type SchemaPublishDialogProps = {
    name: string;
    onSubmit: () => Promise<void>;
}
export const SchemaPublishDialog = ({name, onSubmit}: SchemaPublishDialogProps) => {
    const [loading, setLoading] = useState<boolean>(false);
    const onPublish = async () => {
        setLoading(true);
        try {
            await onSubmit();
        } catch (error) {
            setLoading(false);
        }
    };
    return <Dialog>
        <DialogTrigger asChild>
            <Button variant="default">
                <Upload/>
                Publish
            </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-destructive/10 rounded-full">
                        <AlertTriangle className="h-6 w-6 text-destructive"/>
                    </div>
                    <DialogTitle className="text-xl">Publish {name}</DialogTitle>
                </div>
                <DialogDescription className="text-base">
                    This will make the schema publicly available.
                </DialogDescription>
            </DialogHeader>

            <Alert variant="default" className="mt-4">
                <AlertTriangle className="h-4 w-4"/>
                <AlertDescription className="text-sm">
                    After publishing, users will be able to access the schema.
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
                    onClick={onPublish}
                    disabled={loading}
                >
                    {loading ? <Spinner/> : <Upload/>}
                    {loading ? "Publishing..." : "Publish schema"}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>;
};