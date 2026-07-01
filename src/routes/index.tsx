import { createFileRoute } from "@tanstack/react-router";
import { Loader } from "@/components/Loader";
import { CursorGlow } from "@/components/CursorGlow";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Loader />
      <CursorGlow />

      <main className="relative min-h-screen">
        <header className="flex items-center justify-between px-8 py-6 md:px-16">
          <span className="font-serif text-xl tracking-[0.25em]">GW</span>
          <nav className="hidden gap-10 text-xs uppercase tracking-[0.3em] text-muted-foreground md:flex">
            <a href="#work">Work</a>
            <a href="#studio">Studio</a>
            <a href="#journal">Journal</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        <section className="flex min-h-[85vh] flex-col items-center justify-center px-6 text-center">
          <p className="mb-6 text-[11px] uppercase tracking-[0.45em] text-muted-foreground">
            Kerala · Est. 2014
          </p>
          <h1 className="max-w-4xl text-5xl leading-[1.05] md:text-7xl">
            Weddings, remembered as{" "}
            <span
              className="italic"
              style={{ fontFamily: "var(--font-script)", color: "var(--gold)" }}
            >
              poetry
            </span>
            .
          </h1>
          <p className="mt-8 max-w-lg text-sm leading-relaxed text-muted-foreground">
            Galleria Weddings is a quiet studio in Kochi crafting timeless films
            and photographs for couples who love slowly and celebrate softly.
          </p>
        </section>
      </main>
    </>
  );
}
