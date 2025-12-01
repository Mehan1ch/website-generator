import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {useEditor} from "@craftjs/core";
import {EditorButton} from "@/routes/_app/-components/editor/components/editor-button.tsx";
import {EditorCard} from "@/routes/_app/-components/editor/components/editor-card.tsx";
import {EditorText} from "@/routes/_app/-components/editor/components/editor-text.tsx";

export const Toolbox = () => {
    const {connectors} = useEditor();
    return (
        <Card className="px-4 py-4">
            <CardContent className="flex flex-col items-center space-y-3 p-0">
                <div className="pb-2">
                    <span className="text-base font-medium">Drag to add</span>
                </div>
                <Button
                    ref={ref => {
                        connectors.create(ref!, <EditorButton size="sm">Click me!</EditorButton>);
                    }}
                    variant="default" className="w-full">Button</Button>
                <Button
                    ref={ref => {
                        connectors.create(ref!, <EditorText text="Hi world"/>);
                    }}
                    variant="default" className="w-full">Text</Button>
                <Button
                    ref={ref => {
                        connectors.create(ref!, <EditorCard background={""}/>);
                    }}
                    variant="default" className="w-full">Card</Button>
            </CardContent>
        </Card>
    );
};

