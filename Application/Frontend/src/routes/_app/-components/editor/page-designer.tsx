import {Card, CardContent} from "@/components/ui/card.tsx";
import {Editor, Element, Frame} from "@craftjs/core";
import {Topbar} from "@/routes/_app/-components/editor/blocks/topbar.tsx";
import {Toolbox} from "@/routes/_app/-components/editor/blocks/toolbox.tsx";
import {SettingsPanel} from "@/routes/_app/-components/editor/blocks/settings-panel.tsx";
import {EDITOR_RESOLVER} from "@/lib/constants.ts";
import {EditorContainer} from "@/routes/_app/-components/editor/components/editor-container.tsx";

//TODO: Inspiration for final look can be taken from grapes js editor: https://grapesjs.com/demo.html

type PageDesignerProps = {
    content?: string;
    onSave: (content: string) => void;
}

export const PageDesigner = ({content, onSave}: PageDesignerProps) => {

    return <div className={"min-h-screen flex flex-col"}>
        <Editor
            resolver={EDITOR_RESOLVER}>
            <Topbar onSave={onSave}/>
            <div className="flex-1 grid grid-cols lg:grid-cols-4 gap-3 pt-3">
                <div className="lg:col-span-3 h-full">
                    <Frame data={content}>
                        <Element is={EditorContainer} children={undefined} canvas>
                        </Element>
                    </Frame>
                </div>
                <div className={"lg:col-span-1"}>
                    <Card>
                        <CardContent className="p-4 space-y-4">
                            <Toolbox/>
                            <SettingsPanel/>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </Editor>
    </div>;
    ;
};
