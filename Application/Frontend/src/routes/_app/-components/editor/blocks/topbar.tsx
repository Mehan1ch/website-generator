import {Button} from "@/components/ui/button.tsx";
import {useEditor} from "@craftjs/core";
import {toast} from "sonner";
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
import {Label} from "@/components/ui/label.tsx";
import {Input} from "@/components/ui/input.tsx";
import {cn, compressAndEncodeBase64, decodeBase64AndDecompress} from "@/lib/utils.ts";
import {Spinner} from "@/components/ui/spinner.tsx";
import {AlertTriangle, Pencil, PencilOff, Save, Upload} from "lucide-react";
import {CopyButton} from "@/components/ui/copy-button.tsx";
import {Alert, AlertDescription, AlertTitle} from "@/components/ui/alert.tsx";
import {Toggle} from "@/components/ui/toggle";
import {SidebarTrigger} from "@/components/ui/sidebar.tsx";
import {ViewportControls, type ViewportSize} from "@/routes/_app/-components/editor/blocks/viewport-controls.tsx";

type TopbarProps = {
    onSave: (content: string) => void;
    viewportSize: ViewportSize;
    setViewportSize: (size: ViewportSize) => void;
    isFullscreen: boolean;
    setIsFullscreen: (value: boolean) => void;
    onReset: () => void;
}

export const Topbar = ({
                           onSave,
                           viewportSize,
                           setViewportSize,
                           isFullscreen,
                           setIsFullscreen,
                           onReset
                       }: TopbarProps) => {
    const {actions, query, enabled} = useEditor((state) => ({
        enabled: state.options.enabled
    }));

    const [stateToLoad, setStateToLoad] = useState<string>();
    const [loading, setLoading] = useState(false);


    const handleSave = () => {
        setLoading(true);
        const json = query.serialize();
        const compressed = compressAndEncodeBase64(json);
        onSave(compressed);
        setLoading(false);
    };

    return (
        <div className={cn("bg-sidebar border-b", !isFullscreen && " mb-4 rounded-xl")}>
            <div className="flex items-center justify-between gap-4 px-4 py-2">
                <div className="flex items-center gap-2">
                    <Toggle
                        aria-label="Toggle editing mode"
                        size="sm"
                        variant="outline"
                        pressed={enabled}
                        onClick={() => actions.setOptions(options => options.enabled = !enabled)}
                    >
                        {enabled ? <Pencil className="h-4 w-4"/> : <PencilOff className="h-4 w-4"/>}
                        <span className="ml-2">{enabled ? "Editing" : "Preview"}</span>
                    </Toggle>
                </div>
                <ViewportControls
                    currentSize={viewportSize}
                    isFullscreen={isFullscreen}
                    onSizeChange={setViewportSize}
                    onFullscreenToggle={() => setIsFullscreen(!isFullscreen)}
                    onReset={onReset}
                />
                <div className="flex items-center gap-2">
                    <CopyButton
                        onCopy={() => {
                            toast.info("Content copied to clipboard");
                        }}
                        content={compressAndEncodeBase64(query.serialize())}/>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline" size="sm">
                                <Upload className="h-4 w-4"/>
                                Load
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                            <DialogHeader>
                                <DialogTitle>Load state</DialogTitle>
                                <DialogDescription>
                                    Paste editor state to load it.
                                </DialogDescription>
                            </DialogHeader>
                            <Alert>
                                <AlertTriangle className="h-4 w-4"/>
                                <AlertTitle>Warning</AlertTitle>
                                <AlertDescription>This will override your entire page content!</AlertDescription>
                            </Alert>
                            <div className="flex items-center gap-2">
                                <div className="grid flex-1 gap-2">
                                    <Label htmlFor="link" className="sr-only">
                                        Link
                                    </Label>
                                    <Input
                                        value={stateToLoad}
                                        onChange={(e) => setStateToLoad(e.target.value)}/>
                                </div>
                            </div>
                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button variant="outline">Cancel</Button>
                                </DialogClose>
                                <Button
                                    onClick={() => {
                                        const json = decodeBase64AndDecompress(stateToLoad as string);
                                        actions.deserialize(json);
                                        toast.info("State loaded");
                                    }}
                                >
                                    Load
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <Button onClick={handleSave} disabled={loading} size="sm">
                        {loading ? <Spinner className="h-4 w-4"/> : <Save className="h-4 w-4"/>}
                        Save
                    </Button>
                    {!isFullscreen && (
                        <>
                            <div className="h-6 w-px bg-border mx-1"/>
                            <SidebarTrigger className="rotate-180"/>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};