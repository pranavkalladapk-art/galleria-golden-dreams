import { useEffect, useState } from "react";
import { Music } from "lucide-react";
import logoGold from "@/assets/logo-gold.png.asset.json";

export function Loader() {
  const [gone, setGone] = useState(false);
  const [fading, setFading] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const t1 = setTimeout(() => setFading(true), 1800);
    const t2 = setTimeout(() => setGone(true), 2600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (gone) return null;

  const particles = Array.from({ length: 12 });

  return (
    <div
      className="gw-loader"
      style={{
        opacity: fading ? 0 : 1,
        transition: "opacity 700ms ease",
        pointerEvents: fading ? "none" : "auto",
      }}
      aria-hidden={fading}
    >
      {/* particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {particles.map((_, i) => {
          const left = (i / particles.length) * 100 + Math.random() * 6;
          const delay = Math.random() * 4;
          const drift = `${(Math.random() - 0.5) * 80}px`;
          const dur = 5 + Math.random() * 4;
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

      <div className="gw-ring">
        <img
          src={logoGold.url}
          alt="Galleria Weddings"
          className="h-auto w-[136%] max-w-none object-contain"
        />
      </div>

      <p
        className="text-[13px] uppercase tracking-[0.5em]"
        style={{ color: "color-mix(in oklab, var(--gold) 80%, transparent)" }}
      >
        Galleria Weddings
      </p>

      <button
        type="button"
        onClick={() => setMuted((m) => !m)}
        aria-label={muted ? "Unmute music" : "Mute music"}
        className="absolute bottom-6 right-6 flex h-11 w-11 items-center justify-center rounded-full border transition-colors"
        style={{
          borderColor: "color-mix(in oklab, var(--gold) 60%, transparent)",
          color: "var(--gold-bright)",
        }}
      >
        <Music className="h-4 w-4" />
        {muted && (
          <span
            className="absolute h-[1px] w-6 rotate-45"
            style={{ background: "var(--gold-bright)" }}
          />
        )}
      </button>
    </div>
  );
}
