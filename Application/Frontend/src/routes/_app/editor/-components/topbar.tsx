import {Button} from "@/components/ui/button.tsx";
import {Switch} from "@/components/ui/switch.tsx";
import {useEditor} from "@craftjs/core";
import {toast} from "sonner";
import copy from "copy-to-clipboard";
import lz from "lz-string";
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

export const Topbar = () => {
    const {actions, query, enabled} = useEditor((state) => ({
        enabled: state.options.enabled
    }));

    const [stateToLoad, setStateToLoad] = useState<string>();
    //const [json, setJson] = useState<json>(null);
    //TODO: do this from API backend call example is left here but it would be better to do this with a loader func
    // Load save state from server on page load
    //useEffect(() => {
    //    const stateToLoad = await fetch("your api to get the compressed data");
    //    const json = lz.decompress(lz.decodeBase64(stateToLoad));
    //    setJson(json);
    //}, []);


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
                            copy(lz.compressToBase64(json));
                            toast.info("State copied to clipboard");
                        }}
                    >
                        Serialize JSON to clipboard
                    </Button>
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Load</Button>
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
                                        const json = lz.decompressFromBase64(stateToLoad as string);
                                        actions.deserialize(json);
                                        toast.info("State loaded");
                                    }}
                                >Load</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>
        </div>
    );
};