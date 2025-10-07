import {ReactNode} from "react";

export function TypographyH5(children: { children: ReactNode }) {
    return (
        <h4 className="scroll-m-20 text-l font-semibold tracking-tight">
            {children.children}
        </h4>
    )
}