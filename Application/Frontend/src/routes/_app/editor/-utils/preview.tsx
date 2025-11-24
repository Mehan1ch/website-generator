import {EDITOR_RESOLVER} from "@/routes/_app/editor/-utils/resolver.ts";
import {Editor, Frame} from "@craftjs/core";
import {decodeBase64AndDecompress} from "@/routes/_app/editor/-utils/compress.ts";

type PreviewProps = {
    content?: string;
}

export const Preview = async ({content}: PreviewProps) => {
    const decoded = await decodeBase64AndDecompress(content || "");
    if (decoded) {
        return <Editor enabled={false} resolver={EDITOR_RESOLVER}>
            <Frame json={decoded}/>
        </Editor>;
    } else {
        return <div className="text-sm flex text-muted-foreground">No preview
            available</div>;
    }
};