import {Editor, Frame} from "@craftjs/core";
import {decodeBase64AndDecompress} from "@/lib/utils.ts";
import {EDITOR_RESOLVER} from "@/lib/constants.ts";

type PreviewProps = {
    content?: string;
}

export const Preview = ({content}: PreviewProps) => {
    const decoded = decodeBase64AndDecompress(content || "");
    if (decoded) {
        return <div className={"w-full h-full"}>
            <Editor enabled={false} resolver={EDITOR_RESOLVER}>
                <Frame data={decoded}/>
            </Editor>
        </div>;
    } else {
        return <div className="text-sm flex text-muted-foreground">No preview
            available</div>;
    }
};