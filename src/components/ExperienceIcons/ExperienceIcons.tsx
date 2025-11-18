import styles from "./ExperienceIcons.module.css";
import * as Icons from "simple-icons";

export default function ExperienceIcons() {
    const experience = [
        Icons.siTypescript,
        Icons.siJavascript,
        Icons.siReact,
        Icons.siVuedotjs,
        Icons.siNodedotjs,
        Icons.siDocker,
        Icons.siGithub,
        Icons.siGitlab,
        Icons.siDotnet,
        Icons.siGithubactions,
        Icons.siPython,
        Icons.siRuff,
        Icons.siUv,
        Icons.siJekyll,
        Icons.siGithubcopilot,
        Icons.siJenkins,
        Icons.siJinja,
        Icons.siUbuntu,
        Icons.siDebian,
        Icons.siLinux,
        Icons.siNextdotjs
        // don't exist yet, TODO: create custom icons
        // Icons.siAzurepipelines,
        // Icons.siMkdocs,
        // Icons.siCsharp,
        // Icons.siAzuredevops,
        // Icons.siVisualstudiocode,
        // Icons.siVisualstudio,
        // Icons.siMcp,
        // Icons.siCodex
    ];

    return (
        <div className="bg-light p-7 rounded-3xl shadow-lg">
            <div className="grid grid-cols-7 gap-5">
                {experience.map((item, i) => (
                    <div
                        className={styles.icon}
                        style={{ ["--color" as any]: "#" + item.hex }}
                        key={i}
                        dangerouslySetInnerHTML={{ __html: item.svg }}
                    ></div>
                ))}
            </div>
        </div>
    );
}
