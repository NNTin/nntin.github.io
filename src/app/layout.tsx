import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Socials from "@/components/Socials/Socials";
import Status from "@/components/Status/Status";
import Footer from "@/components/Footer/Footer";
import DiscordCorner from "@/components/DiscordCorner/DiscordCorner";
import DZoneBackground from "@/components/DZoneBackground/DZoneBackground";
import Typewriter from "@/components/Typewriter/Typewriter";

export const metadata: Metadata = {
    title: "Tin Nguyen",
    description:
        "my little home on the web",
    keywords: [
        "developer",
        "software engineer",
        "fullstack",
        "fullstack engineer",
        "fullstack developer",
    ],
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0"
                />
                <link
                    rel="stylesheet"
                    href="https://use.typekit.net/urn6xmu.css"
                ></link>
            </head>
            <body>
                <DZoneBackground />
                <DiscordCorner />
                <main className="min-h-screen relative bg-background md:h-screen md:overflow-hidden">
                    <div className="max-w-[90%] mx-auto p-[5%] grid grid-cols-1 md:grid-cols-2 md:max-w-none md:w-full md:p-0 md:m-0 md:h-full">
                        <div className="md:sticky top-[10vh] h-fit flex flex-col gap-2 md:p-[5%] md:justify-center md:h-full">
                            <h1 className="text-6xl font-extrabold fields">
                                Tin Nguyen
                            </h1>
                            <p className="opacity-80 w-3/4">
                                my little home on the web.
                            </p>
                            <h2 className="text-2xl fields opacity-80 min-h-[32px]">
                                <Typewriter
                                    words={[
                                        "Tiny",
                                        "Tinkerer",
                                        "Tinkery",
                                        "Tinkero",
                                        "Tin, Dinner, am dünnsten",
                                        "Tintin",
                                        "Tin & Tina",
                                        "Tinderbox",
                                        "TinTube",
                                        "Drinkerbell 🍺👦| 💃",
                                        "Din A4",
                                        "Dean Winchester",
                                        "Dinosaur",
                                        "SkeleTin",
                                    ]}
                                    typingSpeed={75}
                                    deletingSpeed={30}
                                    pauseAfterType={5000}
                                    pauseAfterDelete={500}
                                />
                            </h2>
                            <div className="mt-2">
                                <Status />
                            </div>
                            <div className="mt-10">
                                <Socials />
                            </div>
                        </div>
                        <div className="flex flex-col justify-between md:p-[5%] md:overflow-y-auto">
                            <div>
                                <Header />
                                <div className="my-[2vh] page">{children}</div>
                            </div>
                            <Footer />
                        </div>
                    </div>
                </main>
            </body>
        </html>
    );
}
