import {Node, useNode} from "@craftjs/core";

interface EditorTextProps {
    text: string;
    size?: number;
}

export const EditorText = ({text, size = 20}: EditorTextProps) => {
    const {connectors: {connect, drag}} = useNode();

    return (
        <div
            ref={ref => {
                connect(drag(ref!));
            }}
        >
            <p style={{fontSize: size}}>{text}</p>
        </div>
    )
}
EditorText.craft = {
    rules: {
        canDrag: (node: Node) => node.data.props.text !== "Drag"
    }
}