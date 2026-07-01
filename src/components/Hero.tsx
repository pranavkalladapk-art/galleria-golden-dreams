import { useEffect, useRef, useState } from "react";
import { Magnetic } from "./Magnetic";
import heroVideo from "@/assets/hero-loop.mp4.asset.json";
import heroPoster from "@/assets/hero-poster.jpg.asset.json";

export function Hero() {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [videoReady, setVideoReady] = useState(false);
  const [useVideo, setUseVideo] = useState(true);

  useEffect(() => {
    // Detect low-end / data-saver / reduced-motion and fall back to poster only.
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
      deviceMemory?: number;
      hardwareConcurrency?: number;
    };
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = nav.connection?.saveData === true;
    const slowNet = nav.connection?.effectiveType && /2g|slow-2g|3g/.test(nav.connection.effectiveType);
    const lowMem = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 2;
    const lowCPU = typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 2;
    if (reduced || saveData || slowNet || lowMem || lowCPU) {
      setUseVideo(false);
      return;
    }
    const v = videoRef.current;
    if (!v) return;
    const play = v.play();
    if (play && typeof play.catch === "function") {
      play.catch(() => setUseVideo(false));
    }
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const items = Array.from(root.querySelectorAll<HTMLElement>("[data-reveal]"));
    items.forEach((el, i) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(24px)";
      el.style.transition = "opacity 1000ms ease, transform 1000ms cubic-bezier(0.2,0.8,0.2,1)";
      setTimeout(() => {
        el.style.opacity = "1";
        el.style.transform = "translateY(0)";
      }, 2600 + i * 220);
    });
  }, []);

  const particles = Array.from({ length: 14 });

  return (
    <section
      id="home"
      ref={rootRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background layer — always present, even if video/poster fail */}
      <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
        {/* Fallback gradient — ensures text never sits on a transparent background */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 0,
            background: "linear-gradient(to bottom, #1a1410, #2C1C18)",
          }}
        />

        {/* Poster image — always rendered as base layer, covered by video once ready */}
        <img
          src={heroPoster.url}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ zIndex: 1 }}
        />

        {useVideo && (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
            style={{ opacity: videoReady ? 1 : 0, zIndex: 2 }}
            src={heroVideo.url}
            poster={heroPoster.url}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setVideoReady(true)}
            onError={() => setUseVideo(false)}
          />
        )}

        {/* Dark gradient overlay for text readability — sits above video/poster */}
        <div
          className="absolute inset-0"
          style={{
            zIndex: 3,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0.55) 100%)",
          }}
        />

        {/* Soft fog fading into page bg */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3"
          style={{
            zIndex: 4,
            background:
              "linear-gradient(to bottom, transparent 0%, color-mix(in oklab, var(--background) 55%, transparent) 55%, var(--background) 100%)",
          }}
        />

        {/* Top vignette for nav legibility */}
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-40"
          style={{
            zIndex: 4,
            background:
              "linear-gradient(to bottom, color-mix(in oklab, var(--matte-black) 40%, transparent), transparent)",
          }}
        />
      </div>

      {/* particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden" style={{ zIndex: 1 }}>
        {particles.map((_, i) => {
          const left = (i / particles.length) * 100 + Math.random() * 5;
          const delay = Math.random() * 12;
          const drift = `${(Math.random() - 0.5) * 120}px`;
          const dur = 14 + Math.random() * 10;
          return (
            <span
              key={i}
              className="gw-particle"
              style={{
                left: `${left}%`,
                animationDelay: `${delay}s`,
                animationDuration: `${dur}s`,
                ["--drift" as string]: drift,
              }}
            />
          );
        })}
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p
          data-reveal
          className="mb-8 text-[11px] uppercase tracking-[0.5em]"
          style={{ color: "color-mix(in oklab, var(--gold-bright) 90%, transparent)" }}
        >
          Kerala · Est. 2014
        </p>

        <h1
          data-reveal
          className="text-5xl leading-[1.02] text-[#F7F3EE] md:text-7xl lg:text-[5.5rem]"
        >
          Every Wedding Deserves
          <br />
          Its Own{" "}
          <span
            className="italic"
            style={{ fontFamily: "var(--font-script)", color: "var(--gold-bright)" }}
          >
            Masterpiece
          </span>
        </h1>

        <p
          data-reveal
          className="mx-auto mt-10 max-w-2xl text-[11px] uppercase tracking-[0.35em]"
          style={{ color: "color-mix(in oklab, #F7F3EE 75%, transparent)" }}
        >
          Luxury Wedding Planning · Cinematic Photography · Destination Weddings
        </p>

        <div data-reveal className="mt-12 flex flex-wrap items-center justify-center gap-2">
          <Magnetic
            href="#stories"
            className="group relative inline-flex items-center overflow-hidden rounded-full px-8 py-3.5 text-[10px] uppercase tracking-[0.3em]"
          >
            <span
              className="absolute inset-0"
              style={{ background: "var(--gold)" }}
            />
            <span
              className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
              style={{ background: "var(--gold-bright)" }}
            />
            <span className="relative" style={{ color: "var(--matte-black)" }}>
              Explore Stories
            </span>
          </Magnetic>

          <Magnetic
            href="#contact"
            className="group relative inline-flex items-center overflow-hidden rounded-full border border-[color-mix(in_oklab,var(--gold)_55%,transparent)] px-8 py-3.5 text-[10px] uppercase tracking-[0.3em] backdrop-blur-md"
          >
            <span
              className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
              style={{ background: "var(--gold)" }}
            />
            <span
              className="relative transition-colors duration-300 group-hover:text-[var(--matte-black)]"
              style={{ color: "#F7F3EE" }}
            >
              Book Consultation
            </span>
          </Magnetic>
        </div>
      </div>

      {/* scroll indicator */}
      <div
        data-reveal
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-[10px] uppercase tracking-[0.4em]"
        style={{ color: "color-mix(in oklab, #F7F3EE 70%, transparent)" }}
      >
        <span className="mb-3 block">Scroll</span>
        <span className="relative mx-auto block h-12 w-px overflow-hidden bg-[color-mix(in_oklab,var(--gold)_30%,transparent)]">
          <span
            className="absolute left-0 top-0 h-4 w-full"
            style={{
              background: "var(--gold-bright)",
              animation: "hero-scroll 2.2s ease-in-out infinite",
            }}
          />
        </span>
      </div>
    </section>
  );
}
