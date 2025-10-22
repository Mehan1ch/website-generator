import {Node, useNode} from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import {useEffect, useState} from "react";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form.tsx";
import {useForm} from "react-hook-form";
import {Slider} from "@/components/ui/slider.tsx";

interface EditorTextProps {
    text: string;
    fontSize?: number;
    textAlign?: "left" | "center" | "right";
}

interface EditorTextState {
    hasSelectedNode: boolean;
    hasDraggedNode: boolean;
}

export const EditorText = ({text, fontSize = 20, textAlign = "left"}: EditorTextProps) => {
    const {
        connectors: {connect, drag},
        hasSelectedNode,
        actions: {setProp}
    } = useNode((state: Node): EditorTextState => ({
        hasSelectedNode: state.events.selected,
        hasDraggedNode: state.events.dragged
    }));

    const [editable, setEditable] = useState(false);

    useEffect(() => {
        if (!hasSelectedNode) {
            setEditable(false);
        }
    }, [hasSelectedNode]);

    return (
        <div
            ref={ref => {
                connect(drag(ref!));
            }}
            onClick={() => setEditable(true)}
        >
            <ContentEditable
                disabled={!editable}
                html={text}
                onChange={e =>
                    setProp((props: { text: string; }) =>
                        props.text = e.target.value.replace(/<\/?[^>]+(>|$)/g, "")
                    )
                }
                tagName="p"
                style={{fontSize: `${fontSize}px`, textAlign}}
            />
        </div>
    );
};

const TextSettings = () => {
    const {actions: {setProp}, fontSize} = useNode((node) => ({
        fontSize: node.data.props.fontSize
    }));
    const form = useForm({
        defaultValues: {
            fontSize: fontSize
        }
    });

    return (
        <>
            <Form {...form} >
                <form className="flex flex-col gap-4">
                    <FormField
                        control={form.control}
                        name="fontSize"
                        render={() => (
                            <FormItem>
                                <FormLabel>Font size</FormLabel>
                                <FormControl>
                                    <Slider
                                        value={[fontSize]}
                                        min={7}
                                        max={50}
                                        step={1}
                                        onValueChange={([value]) => setProp((props: {
                                            fontSize: number;
                                        }) => props.fontSize = value)}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        </>
    );
};

EditorText.craft = {
    props: {
        text: "Hi",
        fontSize: 20
    },
    rules: {
        canDrag: (node: Node) => node.data.props.text !== "Drag"
    },
    related: {
        settings: TextSettings
    }
};