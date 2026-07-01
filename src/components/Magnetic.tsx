import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  href?: string;
  onClick?: () => void;
  ariaLabel?: string;
};

export function Magnetic({ children, className, strength = 0.35, href, onClick, ariaLabel }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - (rect.left + rect.width / 2);
      const y = e.clientY - (rect.top + rect.height / 2);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "translate(0,0)";
    };

    const parent = el.parentElement;
    if (!parent) return;
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [strength]);

  const style = { transition: "transform 500ms cubic-bezier(0.2, 0.8, 0.2, 1)" };

  return (
    <span className="inline-block p-2">
      {href ? (
        <a
          ref={(n) => {
            ref.current = n;
          }}
          href={href}
          className={className}
          style={style}
          aria-label={ariaLabel}
        >
          {children}
        </a>
      ) : (
        <button
          ref={(n) => {
            ref.current = n;
          }}
          type="button"
          className={className}
          style={style}
          onClick={onClick}
          aria-label={ariaLabel}
        >
          {children}
        </button>
      )}
    </span>
  );
}
