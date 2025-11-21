import ExperienceIcons from "@/components/ExperienceIcons/ExperienceIcons";

export default function Home() {
    return (
        <>
            <div className="prose dark:prose-invert">
                <p className="text-lg leading-relaxed opacity-90">
                    heard it is cool to display some icons <br />
                    over the years i have worked with many technologies <br />
                    the important skill is being able to adapt to new technologies.
                </p>
            </div>
            <div className="mt-20">
                <ExperienceIcons />
            </div>
        </>
    );
}
