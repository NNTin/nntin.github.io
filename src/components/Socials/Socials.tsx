import { LordIcon } from "@/components/LordIcon/LordIcon";
import styles from "./Socials.module.css";

export default function Socials() {
    return (
        <div className={styles.socials}>
            <a
                className={styles.social}
                href="https://github.com/nntin"
                target="_blank"
            >
                <LordIcon src="/lottie/github.json" size={32} /> <span>GitHub</span>
            </a>
            <a className={styles.social} href="mailto:nguyen.ngoctindaniel@gmail.com">
                <LordIcon src="/lottie/email.json" size={32} /> <span>nguyen.ngoctindaniel@gmail.com</span>
            </a>
            <a className={styles.social}>
                <LordIcon src="/lottie/discord.json" size={32} /> <span>b6d</span>
            </a>
            <a
                className={styles.social}
                href="https://instagram.com/thedinolino"
                target="_blank"
            >
                <LordIcon src="/lottie/instagram.json" size={32} /> <span>Instagram</span>
            </a>
        </div>
    );
}
