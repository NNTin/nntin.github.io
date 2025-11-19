"use client";

import { useEffect } from "react";
import styles from "./DZoneBackground.module.css";

export default function DZoneBackground() {
  useEffect(() => {
    const iframe = document.getElementById(
      "dzone-background-iframe"
    ) as HTMLIFrameElement;

    if (!iframe) return;

    // Load iframe src with timestamp (cache bust)
    const timestamp = new Date().getTime();
    iframe.src = `https://nntin.github.io/d-zone/0.1.7?t=${timestamp}`;
  }, []);

  return (
    <div className={styles.dzoneBackgroundWrapper}>
      <iframe
        id="dzone-background-iframe"
        title="D-Zone Background"
        className={styles.dzoneBackgroundIframe}
      />
    </div>
  );
}
