import {Card, CardContent} from "@/components/ui/card.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useEditor} from "@craftjs/core";
import {createElement} from "react";
import {EditorDisabledEmpty} from "@/routes/_app/-components/editor/blocks/editor-disabled-empty.tsx";
import {EditorSelectedEmpty} from "@/routes/_app/-components/editor/blocks/editor-selected-empty.tsx";

export const SettingsPanel = () => {
    const {actions, selected, enabled} = useEditor((state, query) => {
        const [currentNodeId] = state.events.selected;
        let selected;

        if (currentNodeId) {
            selected = {
                id: currentNodeId,
                name: state.nodes[currentNodeId].data.name,
                settings: state.nodes[currentNodeId].related && state.nodes[currentNodeId].related.settings,
                isDeletable: query.node(currentNodeId).isDeletable()
            };
        }

        return {
            selected,
            enabled: state.options.enabled
        };
    });

    if (!enabled) return <EditorDisabledEmpty/>;

    return selected ? (
        <Card className="bg-muted mt-2 px-4 py-4">
            <CardContent className="flex flex-col space-y-4 p-0">
                <div>
                    <div className="flex items-center justify-between pb-2">
                        <span className="text-base font-medium">Selected</span>
                        <span
                            className="px-2 py-0.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">{selected.name}</span>
                    </div>
                </div>
                {
                    selected.settings && createElement(selected.settings)
                }
                {
                    selected.isDeletable ? (
                        <Button variant="default" className="w-full"
                                onClick={() => {
                                    actions.delete(selected.id);
                                }}
                        >
                            Delete
                        </Button>
                    ) : null
                }
            </CardContent>
        </Card>
    ) : <EditorSelectedEmpty/>;
};