import {useEditor} from "@craftjs/core";
import {createElement} from "react";
import {EditorDisabledEmpty} from "@/routes/_app/-components/editor/blocks/editor-disabled-empty.tsx";
import {EditorSelectedEmpty} from "@/routes/_app/-components/editor/blocks/editor-selected-empty.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {getEditorDisplayName} from "@/lib/utils.ts";

export const SettingsPanel = () => {
    const {selected, enabled} = useEditor((state, query) => {
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
        <div className="flex flex-col space-y-4 p-4">
            <div className="flex items-center justify-between pb-2">
                <span className="text-sm font-medium">Selected</span>
                <Badge variant="default">{getEditorDisplayName(selected.name)}</Badge>
            </div>
            {selected.settings && createElement(selected.settings)}
        </div>
    ) : <EditorSelectedEmpty/>;
};