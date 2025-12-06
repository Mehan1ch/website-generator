import {Sidebar, SidebarContent, SidebarRail,} from "@/components/ui/sidebar.tsx";
import {ComponentProps} from "react";
import {Tabs, TabsContent, TabsContents, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";
import {Toolbox} from "@/routes/_app/-components/editor/blocks/toolbox.tsx";
import {SettingsPanel} from "@/routes/_app/-components/editor/blocks/settings-panel.tsx";
import {Brush, Component, Layers} from "lucide-react";
import {Tooltip, TooltipContent, TooltipTrigger} from "@/components/ui/tooltip.tsx";
import {Layers as CraftLayers} from "@craftjs/layers";
import {EditorLayer} from "@/routes/_app/-components/editor/blocks/editor-layer.tsx";

export function EditorSidebar({...props}: ComponentProps<typeof Sidebar>) {
    return (
        <Sidebar variant={"sidebar"} collapsible={"offcanvas"} {...props}>
            <SidebarContent>
                <Tabs defaultValue={"customize"} className={"m-2"}>
                    <TabsList className={"w-full"}>
                        <TabsTrigger value="customize">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Brush className="h-4 w-4"/>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Customize
                                </TooltipContent>
                            </Tooltip>
                        </TabsTrigger>
                        <TabsTrigger value={"layers"}>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Layers className="h-4 w-4"/>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Layers
                                </TooltipContent>
                            </Tooltip>
                        </TabsTrigger>
                        <TabsTrigger value="components">
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <Component className="h-4 w-4"/>
                                </TooltipTrigger>
                                <TooltipContent>
                                    Components
                                </TooltipContent>
                            </Tooltip>
                        </TabsTrigger>
                    </TabsList>
                    <TabsContents>
                        <TabsContent value="customize">
                            <SettingsPanel/>
                        </TabsContent>
                        <TabsContent value={"layers"}>
                            <CraftLayers renderLayer={({id, ...props}) => {
                                return (
                                    <EditorLayer id={id} {...props}/>
                                );
                            }} expandRootOnLoad={true}/>
                        </TabsContent>
                        <TabsContent value="components">
                            <Toolbox/>
                        </TabsContent>
                    </TabsContents>
                </Tabs>
            </SidebarContent>
            <SidebarRail/>
        </Sidebar>
    );
}
