import { useEffect, useState } from "react";
import { Magnetic } from "./Magnetic";

const links = [
  { label: "Home", href: "#home" },
  { label: "Stories", href: "#stories" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-[background-color,backdrop-filter,border-color] duration-500"
      style={{
        backgroundColor: solid
          ? "color-mix(in oklab, var(--background) 92%, transparent)"
          : "color-mix(in oklab, var(--matte-black) 15%, transparent)",
        backdropFilter: "blur(18px) saturate(140%)",
        borderBottom: solid
          ? "1px solid color-mix(in oklab, var(--gold) 20%, transparent)"
          : "1px solid transparent",
      }}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-12">
        <a href="#home" className="font-serif text-lg tracking-wide md:text-xl">
          <span style={{ color: solid ? "var(--foreground)" : "#F7F3EE" }}>Galleria </span>
          <span style={{ color: "var(--gold)" }} className="italic">
            Weddings
          </span>
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="group relative text-[11px] uppercase tracking-[0.3em] transition-colors"
              style={{
                color: solid
                  ? "color-mix(in oklab, var(--foreground) 75%, transparent)"
                  : "color-mix(in oklab, #F7F3EE 85%, transparent)",
              }}
            >
              {l.label}
              <span
                className="absolute -bottom-2 left-0 h-px w-full origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: "var(--gold)" }}
              />
            </a>
          ))}
        </nav>

        <Magnetic
          href="#contact"
          className="group relative inline-flex items-center overflow-hidden rounded-full border px-5 py-2.5 text-[10px] uppercase tracking-[0.3em]"
        >
          <span
            className="pointer-events-none absolute inset-0 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
            style={{ background: "var(--gold)" }}
          />
          <span
            className="relative transition-colors duration-300 group-hover:text-[var(--matte-black)]"
            style={{ color: solid ? "var(--foreground)" : "#F7F3EE" }}
          >
            Book Consultation
          </span>
        </Magnetic>
      </div>
    </header>
  );
}
