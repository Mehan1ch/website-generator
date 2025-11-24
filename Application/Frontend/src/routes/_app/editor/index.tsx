import {createFileRoute} from '@tanstack/react-router';
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Editor, Element, Frame} from "@craftjs/core";
import {EditorCard} from "@/routes/_app/editor/-components/editor-card.tsx";
import {EditorContainer} from "@/routes/_app/editor/-components/editor-container.tsx";
import {EditorButton} from "@/routes/_app/editor/-components/editor-button.tsx";
import {EditorText} from "@/routes/_app/editor/-components/editor-text.tsx";
import {Topbar} from "@/routes/_app/editor/-components/topbar.tsx";
import {Toolbox} from "@/routes/_app/editor/-components/toolbox.tsx";
import {SettingsPanel} from "@/routes/_app/editor/-components/settings-panel.tsx";
import {EDITOR_RESOLVER} from "@/routes/_app/editor/-utils/resolver.ts";


export const Route = createFileRoute('/_app/editor/')({
    beforeLoad: () => {
        return {
            getTitle: () => 'Editor',
        };
    },
    component: EditorPage,
});

//TODO: Inspiration for final look can be taken from grapes js editor: https://grapesjs.com/demo.html

function EditorPage() {

    return <div>
        <Editor
            resolver={EDITOR_RESOLVER}>
            <Topbar/>
            <div className="flex gap-3 pt-3">
                <div className="flex-1">
                    <Frame>
                        <Element is={EditorContainer} padding={5} background="#eee" canvas>
                            <EditorCard background={''}/>
                            <EditorButton size="sm" variant="outline" color={"#000"}>Click</EditorButton>
                            <EditorText fontSize={12} text="Hi world!"/>
                            <Element is={EditorContainer} padding={2} background="#999" canvas>
                                <EditorText fontSize={12} text="It's me again!"/>
                            </Element>
                        </Element>
                    </Frame>
                </div>
                <div className="w-80">
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
}
