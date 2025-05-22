import {Button} from "@/components/ui/button.tsx";
import {Card, CardContent} from "../ui/card.tsx";
import {Element, useEditor} from "@craftjs/core";
import {EditorButton} from "@/components/editor/editor-button.tsx";
import {EditorText} from "@/components/editor/editor-text.tsx";
import {EditorContainer} from "@/components/editor/editor-container.tsx";
import {EditorCard} from "@/components/editor/editor-card.tsx";

export const Toolbox = () => {
    const {connectors, query} = useEditor();
    return (
        <Card className="px-4 py-4">
            <CardContent className="flex flex-col items-center space-y-3 p-0">
                <div className="pb-2">
                    <span className="text-base font-medium">Drag to add</span>
                </div>
                <Button
                    ref={ref => connectors.create(ref!, <EditorButton size="sm">Click me!</EditorButton>)}
                    variant="default" className="w-full">Button</Button>
                <Button
                    ref={ref => connectors.create(ref!, <EditorText text="Hi world"/>)}
                    variant="default" className="w-full">Text</Button>
                <Button
                    ref={ref => connectors.create(ref!, <Element is={EditorContainer} padding={20} canvas
                                                                 children={undefined} background={""}/>)}
                    variant="default" className="w-full">Container</Button>
                <Button
                    ref={ref => connectors.create(ref!, <EditorCard background={""}/>)}
                    variant="default" className="w-full">Card</Button>
            </CardContent>
        </Card>
    )
};

