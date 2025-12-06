import {useEditor, useNode} from '@craftjs/core';
import {ROOT_NODE} from '@craftjs/utils';
import {createPortal} from 'react-dom';
import {GripVertical, Trash2} from "lucide-react";
import React, {FC, ReactNode, useCallback, useEffect, useRef, useState} from "react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {cn, getEditorDisplayName} from "@/lib/utils.ts";

type RenderNodeProps = {
    render: ReactNode;
};

export const RenderNode: FC<RenderNodeProps> = ({render}) => {
    const {id} = useNode();
    const {actions, query, isActive} = useEditor((_, query) => ({
        isActive: query.getEvent('selected').contains(id),
    }));

    const {
        isHover,
        dom,
        name,
        moveable,
        deletable,
        connectors: {drag},
    } = useNode((node) => ({
        isHover: node.events.hovered,
        dom: node.dom,
        name: node.data.custom.displayName || node.data.displayName,
        moveable: query.node(node.id).isDraggable(),
        deletable: query.node(node.id).isDeletable(),
    }));

    const borderRef = useRef<HTMLDivElement | null>(null);
    const toolbarRef = useRef<HTMLDivElement | null>(null);
    const rafRef = useRef<number | null>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const updatePosition = useCallback(() => {
        const border = borderRef.current;
        const toolbar = toolbarRef.current;
        if (!border || !toolbar || !dom) return;

        const rect = dom.getBoundingClientRect();

        // Update border position and size
        border.style.top = `${rect.top}px`;
        border.style.left = `${rect.left}px`;
        border.style.width = `${rect.width}px`;
        border.style.height = `${rect.height}px`;

        // Update toolbar position - place it above the element
        toolbar.style.top = `${rect.top - 36}px`;
        toolbar.style.left = `${rect.left}px`;

        // If toolbar would go off top of screen, place it inside the element
        if (rect.top < 40) {
            toolbar.style.top = `${rect.top + 4}px`;
        }
    }, [dom]);

    const scheduleUpdate = useCallback(() => {
        if (rafRef.current) cancelAnimationFrame(rafRef.current);
        rafRef.current = requestAnimationFrame(() => {
            updatePosition();
            rafRef.current = null;
        });
    }, [updatePosition]);

    const getScrollParents = useCallback((el?: HTMLElement | null) => {
        const parents: (HTMLElement | Window)[] = [];
        let parent = el?.parentElement ?? null;

        while (parent) {
            const style = getComputedStyle(parent);
            if (/(auto|scroll)/.test(style.overflow + style.overflowY + style.overflowX)) {
                parents.push(parent);
            }
            parent = parent.parentElement;
        }

        if (!parents.includes(window)) parents.push(window);
        return parents;
    }, []);

    useEffect(() => {
        if (!dom || (!isActive && !isHover)) return;

        // Initial position
        scheduleUpdate();

        const listeners = getScrollParents(dom);
        listeners.forEach((el) => {
            el.addEventListener('scroll', scheduleUpdate, {passive: true} as any);
        });
        window.addEventListener('resize', scheduleUpdate, {passive: true});

        return () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            listeners.forEach((el) => {
                el.removeEventListener('scroll', scheduleUpdate);
            });
            window.removeEventListener('resize', scheduleUpdate);
        };
    }, [dom, isActive, isHover, scheduleUpdate, getScrollParents]);

    const handleDelete = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        actions.delete(id);
    }, [actions, id]);

    const portalContainer = isClient ? document.body : null;

    const showIndicators = (isActive || isHover) && id !== ROOT_NODE;

    return (
        <>
            {showIndicators && portalContainer
                ? createPortal(
                    <>
                        {/* Dashed border overlay */}
                        <div
                            ref={borderRef}
                            className={cn(
                                "fixed pointer-events-none border-2 border-dashed transition-colors",
                                isActive ? "border-primary" : "border-primary/50"
                            )}
                            style={{
                                top: 0,
                                left: 0,
                                zIndex: 10,
                            }}
                        />

                        {/* Toolbar */}
                        <div
                            ref={toolbarRef}
                            className="fixed flex items-center gap-1 bg-primary text-primary-foreground px-2 py-1 rounded-md shadow-lg text-xs font-medium"
                            style={{
                                top: 0,
                                left: 0,
                                zIndex: 9999,
                            }}
                        >
                            <span className="mr-1">{getEditorDisplayName(name)}</span>

                            {moveable && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <div
                                            ref={(ref) => {
                                                if (ref) drag(ref);
                                            }}
                                            className="cursor-move p-1 hover:bg-primary-foreground/20 rounded transition-colors"
                                        >
                                            <GripVertical className="h-3 w-3"/>
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent>Drag to move</TooltipContent>
                                </Tooltip>
                            )}

                            {deletable && (
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <button
                                            onClick={handleDelete}
                                            className="p-1 hover:bg-destructive/90 rounded transition-colors"
                                        >
                                            <Trash2 className="h-3 w-3"/>
                                        </button>
                                    </TooltipTrigger>
                                    <TooltipContent>Delete</TooltipContent>
                                </Tooltip>
                            )}
                        </div>
                    </>,
                    portalContainer
                )
                : null}
            {render}
        </>
    );
};

