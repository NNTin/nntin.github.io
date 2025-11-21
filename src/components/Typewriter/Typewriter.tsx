"use client";

import { useState, useEffect } from "react";

interface TypewriterProps {
    words: string[];
    typingSpeed?: number;
    deletingSpeed?: number;
    pauseAfterType?: number;
    pauseAfterDelete?: number;
}

export default function Typewriter({
    words,
    typingSpeed = 100,
    deletingSpeed = 50,
    pauseAfterType = 5000,
    pauseAfterDelete = 500,
}: TypewriterProps) {
    const [text, setText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [delta, setDelta] = useState(typingSpeed);

    useEffect(() => {
        let ticker = setTimeout(() => {
            tick();
        }, delta);

        return () => clearTimeout(ticker);
    }, [text, delta, isDeleting, loopNum]);

    const tick = () => {
        let i = loopNum % words.length;
        let fullText = words[i];
        let updatedText = isDeleting
            ? fullText.substring(0, text.length - 1)
            : fullText.substring(0, text.length + 1);

        setText(updatedText);

        if (isDeleting) {
            setDelta(deletingSpeed);
        } else {
            setDelta(typingSpeed);
        }

        if (!isDeleting && updatedText === fullText) {
            setDelta(pauseAfterType);
            setIsDeleting(true);
        } else if (isDeleting && updatedText === "") {
            setIsDeleting(false);
            setLoopNum(loopNum + 1);
            setDelta(pauseAfterDelete);
        }
    };

    return (
        <span className="border-r-2 border-current">
            {text}
        </span>
    );
}
