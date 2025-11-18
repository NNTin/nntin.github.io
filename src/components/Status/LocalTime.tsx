"use client";

import { useState, useEffect } from "react";

export default function LocalTime() {
    const [time, setTime] = useState<string>("");

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            setTime(
                now.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                })
            );
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <span>
            {time} <span className="opacity-50">{Intl.DateTimeFormat().resolvedOptions().timeZone}</span>
        </span>
    );
}
