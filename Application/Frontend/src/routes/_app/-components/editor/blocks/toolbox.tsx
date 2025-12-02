import {Button} from "@/components/ui/button.tsx";
import {useEditor} from "@craftjs/core";
import {EditorButton} from "@/routes/_app/-components/editor/components/editor-button.tsx";
import {EditorCard} from "@/routes/_app/-components/editor/components/editor-card.tsx";
import {EditorText} from "@/routes/_app/-components/editor/components/editor-text.tsx";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {CreditCard, RectangleHorizontal, Type} from "lucide-react";

const toolboxItems = [
    {
        name: "Button",
        icon: RectangleHorizontal,
        component: <EditorButton size="sm">Click me!</EditorButton>
    },
    {
        name: "Text",
        icon: Type,
        component: <EditorText text="Hi world"/>
    },
    {
        name: "Card",
        icon: CreditCard,
        component: <EditorCard background={""}/>
    },
];

export const Toolbox = () => {
    const {connectors} = useEditor();

    return (
        <div className="p-4">
            <div className="pb-4">
                <span className="text-sm font-medium">Drag to add</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
                {toolboxItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Tooltip key={item.name}>
                            <TooltipTrigger asChild>
                                <Button
                                    ref={ref => {
                                        connectors.create(ref!, item.component);
                                    }}
                                    variant="outline"
                                    className="h-15 flex flex-col items-center justify-center gap-2 hover:bg-accent cursor-grab active:cursor-grabbing"
                                >
                                    <Icon className="h-5 w-5"/>
                                    <span className="text-xs">{item.name}</span>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="left">
                                <p>{item.name}</p>
                            </TooltipContent>
                        </Tooltip>
                    );
                })}
            </div>
        </div>
    );
};

