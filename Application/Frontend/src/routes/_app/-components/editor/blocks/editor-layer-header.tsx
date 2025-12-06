import {useEditor} from '@craftjs/core';
import {EditableLayerName, useLayer} from "@craftjs/layers";
import {ChevronDown, Eye, Link2} from "lucide-react";
import {cn} from "@/lib/utils";

export const EditorLayerHeader = () => {
    const {
        id,
        depth,
        expanded,
        children,
        hovered,
        connectors: {drag, layerHeader},
        actions: {toggleLayer},
    } = useLayer((layer) => {
        return {
            expanded: layer.expanded,
            hovered: layer.event.hovered,
        };
    });

    const {hidden, actions, topLevel, selected, beingDragged} = useEditor((state, query) => {
        return {
            hidden: state.nodes[id] && state.nodes[id].data.hidden,
            topLevel: query.node(id).isTopLevelCanvas(),
            selected: query.getEvent('selected').first() === id,
            beingDragged: state.events.dragged?.has(id),
        };
    });

    return (
        <div
            ref={(dom) => {
                drag(dom!);
            }}
            className={cn(
                "flex items-center px-2.5 py-1",
                "transition-all duration-200 rounded-md",
                "[&_svg]:mt-0.5",
                hovered && "bg-accent/50",
                selected && "bg-primary/10 ring-1 ring-primary/20",
                beingDragged && "opacity-50 scale-95 bg-accent/30"
            )}
        >
            <button
                onClick={() => actions.setHidden(id, !hidden)}
                className={cn(
                    "w-3.5 h-3.5 mr-2.5 relative cursor-pointer transition-all duration-300",
                    "after:content-[''] after:w-0.5 after:absolute after:left-0.5 after:top-0.5",
                    "after:-rotate-45 after:transition-all after:duration-300 after:origin-top-left",
                    hidden ? "after:h-full after:opacity-40" : "after:h-0 after:opacity-100"
                )}
            >
                <Eye className={cn(
                    "w-full h-full object-contain transition-opacity duration-300",
                    hidden ? "opacity-20" : "opacity-100"
                )}/>
            </button>
            <div className="flex-1">
                <div
                    ref={(dom) => {
                        layerHeader(dom!);
                    }}
                    className="flex items-center"
                    style={{marginLeft: `${depth * 10}px`}}
                >
                    {topLevel ? (
                        <div className="-ml-5.5 mr-2.5">
                            <Link2 className="w-3 h-3"/>
                        </div>
                    ) : null}

                    <div className="flex-1 [&_h2]:text-[15px] [&_h2]:leading-[26px]">
                        <EditableLayerName/>
                    </div>
                    <div>
                        {children && children.length ? (
                            <button
                                onMouseDown={() => toggleLayer()}
                                className={cn(
                                    "w-4 h-4 flex items-center justify-center",
                                    "transition-transform duration-300 cursor-pointer",
                                    "opacity-70 hover:opacity-100",
                                    expanded ? "rotate-180" : "rotate-0"
                                )}
                            >
                                <ChevronDown className="w-full h-full"/>
                            </button>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
};