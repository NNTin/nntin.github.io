import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import Socials from "@/components/Socials/Socials";
import Status from "@/components/Status/Status";
import Footer from "@/components/Footer/Footer";
import DiscordCorner from "@/components/DiscordCorner/DiscordCorner";

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
                <link
                    rel="stylesheet"
                    href="https://use.typekit.net/urn6xmu.css"
                ></link>
            </head>
            <body>
                <DiscordCorner />
                <main>
                    <div className="md:flex md:gap-10">
                        <div className="md:w-1/2 md:sticky top-[100px] h-fit md:flex flex-col gap-2">
                            <h1 className="text-6xl font-extrabold fields">
                                Tin Nguyen
                            </h1>
                            <h2 className="text-2xl fields text-primary">
                                TODO: Tinkerer, Tinkery, Tinkero, Tiny, Tinderbox, Drinkerbell, Din A4, Dean Winchester, ...
                            </h2>
                            <p className="opacity-80 w-3/4">
                                my little home on the web.
                            </p>
                            <div className="mt-2">
                                <Status />
                            </div>
                            <div className="mt-10">
                                <Socials />
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <Header />
                            <div className="my-10 page">{children}</div>
                            <Footer />
                        </div>
                    </div>
                </main>
            </body>
        </html>
    );
}
