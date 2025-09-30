import {createFileRoute} from '@tanstack/react-router'
import {Card, CardContent} from "@/components/ui/card.tsx";
import {Toolbox} from "@/components/editor/toolbox.tsx";
import {SettingsPanel} from "@/components/editor/settings-panel.tsx";
import {Editor, Element, Frame} from "@craftjs/core";
import {EditorContainer} from '@/components/editor/editor-container';
import {EditorButton} from '@/components/editor/editor-button';
import {EditorText} from '@/components/editor/editor-text';
import {EditorCard, EditorCardBottom, EditorCardTop} from "@/components/editor/editor-card.tsx";
import {Topbar} from "@/components/editor/topbar.tsx";


export const Route = createFileRoute('/_app/editor')({
    beforeLoad: () => {
        return {
            getTitle: () => 'Editor',
        }
    },
    component: EditorPage,
})

//TODO: Inspiration for final look can be taken from grapes js editor: https://grapesjs.com/demo.html

function EditorPage() {
    return <div className="flex-1 m-4">
        <Editor
            resolver={{EditorCard, EditorButton, EditorText, EditorContainer, EditorCardTop, EditorCardBottom}}>
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
    </div>
}
