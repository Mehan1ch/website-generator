import {createRoot} from "react-dom/client";
import {flushSync} from "react-dom";
import {Editor, Frame} from "@craftjs/core";
import {EDITOR_RESOLVER} from "@/lib/constants.ts";
import {ForwardedRef, JSX, useEffect, useRef} from "react";
import {SiteState} from "@/types/site.ts";
import {SchemaState} from "@/types/schema.ts";
import {Globe, SquarePen} from "lucide-react";

export function renderToStaticHTML(JSONStateString: string) {
    const div = document.createElement('div');
    const root = createRoot(div);
    flushSync(() => {
        root.render(<Editor enabled={false} resolver={EDITOR_RESOLVER}>
            <Frame data={JSONStateString}/>
        </Editor>);
    });
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <link rel="stylesheet" href="/index.css">
        </head>
        <body>
          ${div.innerHTML}
        </body>
      </html>
    `;
}

export function useForwardedRef<T>(ref: ForwardedRef<T>) {
    const innerRef = useRef<T>(null);

    useEffect(() => {
        if (!ref) return;
        if (typeof ref === 'function') {
            ref(innerRef.current);
        } else {
            ref.current = innerRef.current;
        }
    });

    return innerRef;
}

export const getStateBadgeIcon = (state?: SchemaState | SiteState): JSX.Element | null => {
    switch (state) {
        case "published":
            return <Globe/>;
        case "draft":
            return <SquarePen/>;
        default:
            return null;
    }
};