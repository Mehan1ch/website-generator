import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Spinner} from "@/components/ui/spinner.tsx";
import {ReactNode} from "react";

type ConfirmDialogProps = {
    title: string;
    action: string;
    doing: string;
    description: string;
    variant?: "default" | "destructive";
    loading: boolean;
    onSubmit: () => Promise<void>;
    icon?: ReactNode;
    open?: boolean;
    onOpenChange?: (open: boolean) => void;
}
export const ConfirmDialogDropdown = ({
                                          title,
                                          action,
                                          doing,
                                          description,
                                          variant = "default",
                                          loading,
                                          onSubmit,
                                          icon,
                                          open,
                                          onOpenChange,
                                      }: ConfirmDialogProps) => {

    return <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-md">
            <DialogHeader>
                <div className="flex items-center gap-3 mb-2">
                    <div className={"p-2 rounded-full"}>
                        {icon}
                    </div>
                    <DialogTitle className="text-xl">{action} {title}</DialogTitle>
                </div>
                <DialogDescription className="text-base">
                    {description}
                </DialogDescription>
            </DialogHeader>
            <DialogFooter className="gap-2 sm:gap-0 mt-6">
                <DialogClose asChild className="mx-2">
                    <Button type={"button"} variant="outline">
                        Cancel
                    </Button>
                </DialogClose>
                <Button
                    variant={variant}
                    className={"mx-2"}
                    type={"submit"}
                    onClick={async () => {
                        await onSubmit();
                        onOpenChange?.(false);
                    }}
                    disabled={loading}
                >
                    {loading ? <Spinner/> : icon}
                    {loading ? `${doing}...` : `${action} ${title}`}
                </Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>;
};
