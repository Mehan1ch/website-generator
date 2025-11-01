import {createRoot} from "react-dom/client";
import {flushSync} from "react-dom";
import {EDITOR_RESOLVER} from "@/routes/_app/editor/-utils/resolver.ts";
import {Editor, Frame} from "@craftjs/core";

export function renderToStaticHTML(JSONStateString: string) {
    const div = document.createElement('div');
    const root = createRoot(div);
    flushSync(() => {
        root.render(<Editor enabled={false} resolver={EDITOR_RESOLVER}>
            <Frame json={JSONStateString}/>
        </Editor>);
    });
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charSet="UTF-8" />
          <link rel="stylesheet" href="index.css">
        </head>
        <body>
          ${div.innerHTML}
        </body>
      </html>
    `;
}
