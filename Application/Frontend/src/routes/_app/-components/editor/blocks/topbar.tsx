import {Button} from "@/components/ui/button.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {useEditor} from "@craftjs/core";
import {toast} from "sonner";
import copy from "copy-to-clipboard";
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
import {compressAndEncodeBase64, decodeBase64AndDecompress} from "@/lib/utils.ts";
import {Spinner} from "@/components/ui/spinner.tsx";
import {Save, Upload} from "lucide-react";

type TopbarProps = {
    onSave: (content: string) => void;
}

export const Topbar = ({onSave}: TopbarProps) => {
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
        <div className="outline bg-primary-foreground px-2 py-2 mt-3 mb-1 rounded">
            <div className="flex justify-between px-2">
                <Label className="flex items-center space-x-2">
                    <Switch
                        checked={enabled}
                        onCheckedChange={value => actions.setOptions(options => options.enabled = value)}
                    />
                    <span className="text-sm font-medium">Enable</span>
                </Label>
                <div className={"items-center px-2"}>
                    <Button
                        onClick={() => {
                            const json = query.serialize();
                            copy(compressAndEncodeBase64(json));
                            toast.info("State copied to clipboard");
                        }}
                    >
                        Serialize JSON to clipboard
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>
                                <Upload/>
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
                            <div className="flex items-center gap-2">
                                <div className="grid flex-1 gap-2">
                                    <Label htmlFor="link" className="sr-only">
                                        Link
                                    </Label>
                                    <Input
                                        value={stateToLoad}
                                        onChange={(e) => setStateToLoad(e.target.value)}
                                    />
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
                    <Button onClick={handleSave} disabled={loading}>
                        {loading ? <Spinner/> : <Save/>}
                        Save
                    </Button>
                </div>
            </div>
        </div>
    );
};