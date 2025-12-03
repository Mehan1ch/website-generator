import {Editor, Element, Frame} from "@craftjs/core";
import {Topbar} from "@/routes/_app/-components/editor/blocks/topbar.tsx";
import {EDITOR_RESOLVER} from "@/lib/constants.ts";
import {EditorContainer} from "@/routes/_app/-components/editor/components/editor-container.tsx";
import {EditorSidebar} from "@/routes/_app/-components/editor/blocks/editor-sidebar.tsx";
import {SidebarInset, SidebarProvider} from "@/components/ui/sidebar.tsx";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup} from "@/components/ui/resizable.tsx";
import {useEffect, useRef, useState} from "react";
import {cn} from "@/lib/utils.ts";
import type {ViewportSize} from "@/routes/_app/-components/editor/blocks/viewport-controls.tsx";
import {useEventListener} from "@/hooks/use-event-listener.ts";
import {Card, CardContent} from "@/components/ui/card.tsx";
import {RenderNode} from "@/routes/_app/-components/editor/blocks/render-node.tsx";

type PageDesignerProps = {
    content?: string;
    onSave: (content: string) => void;
}

const VIEWPORT_SIZES = {
    desktop: 100,
    tablet: 50,
    mobile: 30,
} as const;

export const PageDesigner = ({content, onSave}: PageDesignerProps) => {
    const [viewportSize, setViewportSize] = useState<ViewportSize>('desktop');
    const [isFullscreen, setIsFullscreen] = useState(false);
    const leftPanelRef = useRef<any>(null);
    const centerPanelRef = useRef<any>(null);
    const rightPanelRef = useRef<any>(null);

    useEffect(() => {
        const targetSize = VIEWPORT_SIZES[viewportSize];
        const spacerSize = (100 - targetSize) / 2;

        if (leftPanelRef.current && centerPanelRef.current && rightPanelRef.current) {
            leftPanelRef.current.resize(spacerSize);
            centerPanelRef.current.resize(targetSize);
            rightPanelRef.current.resize(spacerSize);
        }
    }, [viewportSize]);

    const handleReset = () => {
        setViewportSize('desktop');
        setIsFullscreen(false);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
        if (event.key == "Escape" && isFullscreen) {
            setIsFullscreen(false);
        }
    };

    useEventListener("keydown", handleKeyDown);


    return (
        <div className={cn(!isFullscreen && "-m-4")}>
            <Editor resolver={EDITOR_RESOLVER} onRender={RenderNode}>
                <SidebarProvider name={"Editor"}>
                    <SidebarInset>
                        <div className={cn(isFullscreen && "fixed inset-0 z-50 bg-background flex flex-col")}>
                            <Topbar
                                onSave={onSave}
                                viewportSize={viewportSize}
                                setViewportSize={setViewportSize}
                                isFullscreen={isFullscreen}
                                setIsFullscreen={setIsFullscreen}
                                onReset={handleReset}
                            />
                            <div className="p-2">
                                <ResizablePanelGroup
                                    direction="horizontal"
                                    className="w-full min-h-[calc(100vh-8rem)]"
                                >
                                    <ResizablePanel
                                        ref={leftPanelRef}
                                        defaultSize={(100 - VIEWPORT_SIZES[viewportSize]) / 2}
                                        minSize={0}
                                    />
                                    <ResizableHandle withHandle className="w-px bg-transparent"/>
                                    <ResizablePanel
                                        ref={centerPanelRef}
                                        defaultSize={VIEWPORT_SIZES[viewportSize]}
                                        minSize={20}
                                        maxSize={100}
                                        className="transition-all duration-300"
                                    >
                                        <Card
                                            className="h-full -p-0 -m-0">
                                            <CardContent className={"-p-0 -m-0"}>
                                                <Frame data={content}>
                                                    <Element is={EditorContainer} canvas/>
                                                </Frame>
                                            </CardContent>
                                        </Card>
                                    </ResizablePanel>
                                    <ResizableHandle withHandle className="w-px bg-transparent"/>
                                    <ResizablePanel
                                        ref={rightPanelRef}
                                        defaultSize={(100 - VIEWPORT_SIZES[viewportSize]) / 2}
                                        minSize={0}
                                    />
                                </ResizablePanelGroup>
                            </div>
                        </div>
                    </SidebarInset>
                    <EditorSidebar className={cn(isFullscreen && "hidden")} side={"right"}/>
                </SidebarProvider>
            </Editor>
        </div>
    );
};
