"use client";

import { useEffect } from "react";
import lottie from "lottie-web";

export function LordIcon(props: any) {
    useEffect(() => {
        import("lord-icon-element").then(({ defineElement }) => {
            defineElement(lottie.loadAnimation);
        });
    }, []);

    return (
        <lord-icon
            src={props.src}
            trigger={props.trigger || "hover"}
            style={{ width: props.size || 32, height: props.size || 32 }}
        />
    );
}
