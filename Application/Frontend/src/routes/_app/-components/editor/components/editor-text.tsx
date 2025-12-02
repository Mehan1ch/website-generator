import {Node, useEditor, useNode} from "@craftjs/core";
import ContentEditable from "react-contenteditable";
import {useEffect, useState} from "react";
import {Controller, useForm} from "react-hook-form";
import {Slider} from "@/components/ui/slider.tsx";
import {Field, FieldLabel} from "@/components/ui/field.tsx";

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
    const {enabled} = useEditor((state) => ({
        enabled: state.options.enabled
    }));


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
            onClick={() => {
                if (enabled) setEditable(true);
            }}
            className="w-full max-w-full"
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
                className="break-words overflow-wrap-anywhere max-w-full"
            />
        </div>
    );
};

const TextSettings = () => {
    const {actions: {setProp}, props} = useNode((node) => ({
        props: node.data.props as EditorTextProps
    }));
    const form = useForm({
        defaultValues: {
            props: props
        }
    });

    return (
        <form className="flex flex-col gap-4 h-full">
            <Controller
                control={form.control}
                name="props.fontSize"
                render={({field, fieldState}) => (
                    <Field data-invalid={fieldState.invalid}>
                        <FieldLabel htmlFor="props.fontSize">Font Size</FieldLabel>
                        <Slider
                            value={[field.value || 12]}
                            min={7}
                            max={50}
                            step={1}
                            onValueChange={([value]) => {
                                field.onChange(value);
                                setProp((props: EditorTextProps) => {
                                    props.fontSize = value;
                                });
                            }}
                        />
                    </Field>
                )}
            />
        </form>
    );
};

EditorText.craft = {
    props: {
        text: "Text",
        fontSize: 12
    },
    rules: {},
    related: {
        settings: TextSettings
    }
};