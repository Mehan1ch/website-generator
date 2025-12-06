import {useEditor} from '@craftjs/core';
import React from 'react';
import {EditorLayerHeader} from "@/routes/_app/-components/editor/blocks/editor-layer-header.tsx";
import {useLayer} from "@craftjs/layers";
import {cn} from "@/lib/utils";

export type DefaultLayerProps = {
    children?: React.ReactNode;
};

export const EditorLayer = ({children}: DefaultLayerProps) => {
    const {
        id,
        expanded,
        connectors: {layer},
    } = useLayer((layer: { event: { hovered: any; }; expanded: any; }) => ({
        hovered: layer.event.hovered,
        expanded: layer.expanded,
    }));
    const {hasChildCanvases, beingDragged} = useEditor((state, query) => {
        return {
            hasChildCanvases: query.node(id).isParentOfTopLevelNodes(),
            selected: query.getEvent('selected').first() === id,
            beingDragged: state.events.dragged?.has(id),
        };
    });

    return (
        <div
            ref={(dom) => {
                layer(dom!);
            }}
            className={cn(
                "block rounded-md transition-all duration-200",
                hasChildCanvases && expanded && "pb-1.5",
                beingDragged && "opacity-50"
            )}
        >
            <EditorLayerHeader/>
            {children ? (
                <div
                    className={cn(
                        "relative",
                        hasChildCanvases ? [
                            "ml-9 mr-1.5 my-1.5",
                            "rounded-xl",
                            "overflow-hidden",
                            "before:absolute before:-left-5 before:w-0.5 before:h-full before:content-['']"
                        ] : "ml-0",
                        "craft-layer-children"
                    )}
                >
                    {children}
                </div>
            ) : null}
        </div>
    );
};