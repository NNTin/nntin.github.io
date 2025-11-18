import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Tin Nguyen | Bar",
    description: "another page on my little home on the web",
};

export default function Home() {
    return (
        <>
            <div>
                <h2 className="fields text-3xl">Foooyoo</h2>
                <p>
                    foo bar baz qux quux corge grault garply waldo
                    fred plugh xyzzy thud.
                </p>
            </div>
        </>
    );
}
