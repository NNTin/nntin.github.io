import { LordIcon } from "@/components/LordIcon/LordIcon";
import styles from "./Socials.module.css";

export default function Socials() {
    return (
        <div className={styles.socials}>
            <a
                id="social-github"
                className={styles.social}
                href="https://github.com/nntin"
                target="_blank"
            >
                <LordIcon src="/lottie/github.json" size={32} target="#social-github" /> <span>GitHub</span>
            </a>
            <a id="social-email" className={styles.social} href="mailto:nguyen.ngoctindaniel@gmail.com">
                <LordIcon src="/lottie/email.json" size={32} target="#social-email" /> <span>nguyen.ngoctindaniel@gmail.com</span>
            </a>
            <a id="social-discord" className={styles.social}>
                <LordIcon src="/lottie/discord.json" size={32} target="#social-discord" /> <span>b6d</span>
            </a>
            <a
                id="social-instagram"
                className={styles.social}
                href="https://instagram.com/thedinolino"
                target="_blank"
            >
                <LordIcon src="/lottie/instagram.json" size={32} target="#social-instagram" /> <span>Instagram</span>
            </a>
        </div>
    );
}
