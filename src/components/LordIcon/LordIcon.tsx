"use client";

import { useEffect } from "react";
import lottie from "lottie-web";
import React from "react";

declare module 'react' {
    namespace JSX {
        interface IntrinsicElements {
            'lord-icon': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
                src?: string;
                trigger?: string;
                colors?: string;
            };
        }
    }
}

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
