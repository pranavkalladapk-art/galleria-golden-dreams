import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Magnetic } from "./Magnetic";
import logoInk from "@/assets/logo-ink.png";
import logoGold from "@/assets/logo-gold.png";

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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > window.innerHeight * 0.85);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
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
        <div className="mx-auto flex h-20 max-h-20 max-w-[1400px] items-center justify-between px-6 py-0 md:px-12">
          <a href="#home" className="inline-flex items-center" style={{ height: 44 }}>
            <img
              src={solid ? logoInk : logoGold}
              alt="Galleria Weddings"
              className="w-auto max-w-none object-contain"
              style={{ height: 44, width: "auto" }}
            />
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

          <div className="flex items-center gap-3">
            <Magnetic
              href="#contact"
              className="group relative inline-flex items-center overflow-hidden rounded-full border border-[color-mix(in_oklab,var(--gold)_60%,transparent)] px-4 py-2.5 text-[10px] uppercase tracking-[0.3em] sm:px-5"
            >
              <span
                className="pointer-events-none absolute inset-0 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
                style={{ background: "var(--gold)" }}
              />
              <span
                className="relative transition-colors duration-300 group-hover:text-[var(--matte-black)]"
                style={{ color: solid ? "var(--foreground)" : "#F7F3EE" }}
              >
                <span className="hidden sm:inline">Book Consultation</span>
                <span className="sm:hidden">Book</span>
              </span>
            </Magnetic>

            <button
              type="button"
              aria-label="Open menu"
              aria-expanded={open}
              onClick={() => setOpen(true)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border transition-colors lg:hidden"
              style={{
                borderColor: "color-mix(in oklab, var(--gold) 45%, transparent)",
                color: solid ? "var(--foreground)" : "#F7F3EE",
              }}
            >
              <Menu size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-500 ${
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{
          background:
            "radial-gradient(ellipse at top, #1a1410 0%, var(--matte-black) 70%)",
        }}
        role="dialog"
        aria-modal="true"
      >
        <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-6 md:px-12">
          <img
            src={logoGold}
            alt="Galleria Weddings"
            className="w-auto max-w-none object-contain"
            style={{ height: 44 }}
          />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border"
            style={{
              borderColor: "color-mix(in oklab, var(--gold) 45%, transparent)",
              color: "#F7F3EE",
            }}
          >
            <X size={20} strokeWidth={1.5} />
          </button>
        </div>

        <nav className="flex flex-col items-center justify-center gap-2 px-6 pt-8">
          {links.map((l, i) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="group relative flex min-h-[56px] w-full max-w-md items-center justify-center overflow-hidden text-center transition-all"
              style={{
                transform: open ? "translateY(0)" : "translateY(12px)",
                opacity: open ? 1 : 0,
                transition: `opacity 500ms ease ${150 + i * 60}ms, transform 500ms ease ${150 + i * 60}ms`,
              }}
            >
              <span
                className="font-serif text-4xl tracking-wide"
                style={{ color: "#F7F3EE", fontFamily: "'Cormorant Garamond', serif" }}
              >
                {l.label}
              </span>
            </a>
          ))}

          <div
            className="mt-10 h-px w-24"
            style={{ background: "color-mix(in oklab, var(--gold) 60%, transparent)" }}
          />
          <p
            className="mt-6 text-center text-[10px] uppercase tracking-[0.4em]"
            style={{ color: "color-mix(in oklab, var(--gold) 80%, transparent)" }}
          >
            Galleria Weddings · Kerala
          </p>
        </nav>
      </div>
    </>
  );
}
