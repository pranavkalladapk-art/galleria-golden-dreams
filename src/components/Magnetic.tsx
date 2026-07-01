import { forwardRef, useEffect, useRef, type ButtonHTMLAttributes, type ReactNode } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  strength?: number;
  as?: "button" | "a";
  href?: string;
};

export const Magnetic = forwardRef<HTMLButtonElement, Props>(function Magnetic(
  { children, strength = 0.35, className, as = "button", href, ...rest },
  _ref,
) {
  const innerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = innerRef.current;
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

  const style = { transition: "transform 400ms cubic-bezier(0.2, 0.8, 0.2, 1)" };

  if (as === "a") {
    return (
      <span className="inline-block" style={{ padding: "8px" }}>
        <a
          ref={(n) => (innerRef.current = n)}
          href={href}
          className={className}
          style={style}
        >
          {children}
        </a>
      </span>
    );
  }

  return (
    <span className="inline-block" style={{ padding: "8px" }}>
      <button
        ref={(n) => (innerRef.current = n)}
        className={className}
        style={style}
        {...rest}
      >
        {children}
      </button>
    </span>
  );
});
