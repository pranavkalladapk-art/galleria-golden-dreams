import { useEffect, useRef, useState, type ReactNode } from "react";
import { Magnetic } from "./Magnetic";
import { useReveal } from "@/hooks/use-reveal";
import story1 from "@/assets/story-1.jpg";
import story2 from "@/assets/story-2.jpg";
import story3 from "@/assets/story-3.jpg";
import founder from "@/assets/about-founder.jpg";
import logoGold from "@/assets/logo-gold.png";

/* ---------------- Section header ---------------- */
function SectionHead({
  eyebrow,
  title,
  script,
  after,
}: {
  eyebrow: string;
  title: string;
  script?: string;
  after?: string;
}) {
  return (
    <div className="mx-auto mb-20 max-w-3xl px-6 text-center">
      <p
        data-reveal
        className="mb-6 text-[10px] uppercase tracking-[0.5em]"
        style={{ color: "var(--gold)" }}
      >
        {eyebrow}
      </p>
      <h2 data-reveal data-delay="120" className="text-4xl md:text-6xl">
        {title}{" "}
        {script && (
          <span
            className="italic"
            style={{ fontFamily: "var(--font-script)", color: "var(--gold)" }}
          >
            {script}
          </span>
        )}
        {after}
      </h2>
    </div>
  );
}

/* ---------------- STORIES ---------------- */
const stories = [
  {
    img: story1,
    couple: "Ananya & Vikram",
    place: "Kochi, Kerala",
    year: "2025",
    excerpt: "A quiet temple ceremony that unfolded like a soft golden hymn.",
  },
  {
    img: story2,
    couple: "Meera & Arjun",
    place: "Alleppey Backwaters",
    year: "2024",
    excerpt: "Oil lamps, jasmine and the hush of water at dusk.",
  },
  {
    img: story3,
    couple: "Divya & Rohan",
    place: "Fort Kochi",
    year: "2024",
    excerpt: "Heirloom silks, quiet vows, an afternoon that felt suspended.",
  },
];

export function StoriesSection() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="stories" ref={ref} className="relative py-32 md:py-44">
      <SectionHead
        eyebrow="Featured — Love Stories"
        title="Weddings, remembered as"
        script="poetry."
      />

      <div className="mx-auto grid max-w-[1400px] gap-24 px-6 md:px-12">
        {stories.map((s, i) => (
          <article
            key={s.couple}
            data-reveal
            className={`group grid items-center gap-10 md:grid-cols-12 ${
              i % 2 ? "md:[&>figure]:order-2" : ""
            }`}
          >
            <figure className="relative md:col-span-7 overflow-hidden">
              <div className="aspect-[4/5] overflow-hidden bg-[var(--beige)]">
                <img
                  src={s.img}
                  alt={s.couple}
                  loading="lazy"
                  width={1280}
                  height={1600}
                  className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105"
                />
              </div>
              <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background:
                    "linear-gradient(to top, color-mix(in oklab, var(--matte-black) 45%, transparent), transparent 60%)",
                }}
              />
            </figure>

            <div className="md:col-span-5 md:px-8">
              <p
                className="text-[10px] uppercase tracking-[0.4em]"
                style={{ color: "var(--gold)" }}
              >
                {s.place} · {s.year}
              </p>
              <h3 className="mt-6 text-4xl md:text-5xl">
                {s.couple.split(" & ")[0]}{" "}
                <span
                  className="italic"
                  style={{ fontFamily: "var(--font-script)", color: "var(--gold)" }}
                >
                  &
                </span>{" "}
                {s.couple.split(" & ")[1]}
              </h3>
              <p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">
                {s.excerpt}
              </p>
              <a
                href="#stories"
                className="mt-10 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.35em]"
                style={{ color: "var(--foreground)" }}
              >
                <span>Read the story</span>
                <span
                  className="h-px w-10 transition-all duration-500 group-hover:w-16"
                  style={{ background: "var(--gold)" }}
                />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------------- SERVICES ---------------- */
const services = [
  { title: "Wedding Planning", desc: "End-to-end design, from the first idea to the last farewell." },
  { title: "Wedding Photography", desc: "Editorial photographs shot with a fine-art sensibility." },
  { title: "Cinematic Films", desc: "Feature-quality wedding films with sound design and score." },
  { title: "Destination Weddings", desc: "Palaces, backwaters and coastlines across India and beyond." },
  { title: "Pre-Wedding Sessions", desc: "Intimate portraits in places that mean something to you." },
  { title: "Bridal Portraits", desc: "Timeless studio and outdoor portraits, printed as heirlooms." },
];

function TiltCard({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;
    let raf = 0;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${-py * 6}deg) rotateY(${px * 6}deg) translateY(-4px)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      el.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
    };
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);
  return (
    <div
      ref={ref}
      className="h-full transition-transform duration-500 ease-out"
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
}

export function ServicesSection() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="services" ref={ref} className="relative py-32 md:py-44">
      <SectionHead
        eyebrow="Services"
        title="A studio of quiet"
        script="craftsmanship."
      />

      <div className="mx-auto grid max-w-[1400px] gap-6 px-6 md:grid-cols-2 md:px-12 lg:grid-cols-3">
        {services.map((s, i) => (
          <div key={s.title} data-reveal data-delay={i * 90}>
            <TiltCard>
              <div
                className="group relative flex h-full flex-col justify-between overflow-hidden rounded-sm border p-10 backdrop-blur-md"
                style={{
                  borderColor: "color-mix(in oklab, var(--gold) 22%, transparent)",
                  background:
                    "linear-gradient(180deg, color-mix(in oklab, #ffffff 55%, transparent), color-mix(in oklab, var(--beige) 40%, transparent))",
                  boxShadow: "0 40px 80px -60px color-mix(in oklab, var(--foreground) 45%, transparent)",
                  minHeight: "320px",
                }}
              >
                <div>
                  <span
                    className="mb-8 block h-px w-10"
                    style={{ background: "var(--gold)" }}
                  />
                  <span
                    className="text-[10px] uppercase tracking-[0.4em]"
                    style={{ color: "var(--gold)" }}
                  >
                    0{i + 1}
                  </span>
                  <h3 className="mt-4 text-2xl md:text-3xl">{s.title}</h3>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {s.desc}
                  </p>
                </div>
                <span
                  className="mt-10 inline-flex items-center gap-3 text-[10px] uppercase tracking-[0.35em]"
                  style={{ color: "var(--foreground)" }}
                >
                  Enquire
                  <span
                    className="h-px w-8 transition-all duration-500 group-hover:w-14"
                    style={{ background: "var(--gold)" }}
                  />
                </span>
              </div>
            </TiltCard>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- PROCESS ---------------- */
const steps = [
  { t: "Inquiry", d: "You share your story and the shape of your day." },
  { t: "Consultation", d: "A quiet conversation over coffee, in person or by video." },
  { t: "Planning", d: "Curated vendors, itineraries, moodboards — all handled." },
  { t: "Wedding Day", d: "We move like guests, invisible when we need to be." },
  { t: "Editing", d: "Weeks of colour, sound and craft, one frame at a time." },
  { t: "Luxury Album", d: "A hand-bound heirloom, delivered to your door." },
];

export function ProcessSection() {
  const ref = useReveal<HTMLElement>();
  return (
    <section
      id="process"
      ref={ref}
      className="relative py-32 md:py-44"
      style={{ background: "var(--beige)" }}
    >
      <SectionHead
        eyebrow="Our Process"
        title="Six unhurried"
        script="chapters."
      />

      <div className="relative mx-auto max-w-3xl px-6">
        <span
          className="absolute left-1/2 top-0 hidden h-full w-px -translate-x-1/2 md:block"
          style={{
            background:
              "linear-gradient(to bottom, transparent, color-mix(in oklab, var(--gold) 40%, transparent) 15%, color-mix(in oklab, var(--gold) 40%, transparent) 85%, transparent)",
          }}
        />

        {steps.map((s, i) => (
          <div
            key={s.t}
            data-reveal
            data-delay={i * 100}
            className={`relative grid grid-cols-1 items-center gap-6 py-10 md:grid-cols-2 ${
              i % 2 ? "md:[&>div:first-child]:order-2 md:text-left" : "md:text-right"
            }`}
          >
            <div className="md:px-10">
              <span
                className="text-[10px] uppercase tracking-[0.4em]"
                style={{ color: "var(--gold)" }}
              >
                Chapter 0{i + 1}
              </span>
              <h3 className="mt-3 text-3xl">{s.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {s.d}
              </p>
            </div>

            <span
              className="absolute left-1/2 hidden h-3 w-3 -translate-x-1/2 rounded-full md:block"
              style={{
                background: "var(--gold)",
                boxShadow: "0 0 0 6px var(--beige), 0 0 24px color-mix(in oklab, var(--gold) 50%, transparent)",
              }}
            />
            <div />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- GALLERY (masonry) ---------------- */
const galleryImgs = [story1, story2, story3, story1, story3, story2, story2, story1, story3];

export function GalleryMasonry() {
  const ref = useReveal<HTMLElement>();
  return (
    <section id="gallery" ref={ref} className="relative py-32 md:py-44">
      <SectionHead
        eyebrow="Gallery"
        title="A visual"
        script="archive."
      />

      <div className="mx-auto max-w-[1500px] px-6 md:px-12">
        <div className="columns-1 gap-6 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {galleryImgs.map((src, i) => (
            <figure
              key={i}
              data-reveal
              data-delay={i * 60}
              className="group mb-6 break-inside-avoid overflow-hidden"
            >
              <div
                className="overflow-hidden bg-[var(--beige)]"
                style={{ aspectRatio: i % 3 === 0 ? "3/4" : i % 3 === 1 ? "4/5" : "1/1" }}
              >
                <img
                  src={src}
                  loading="lazy"
                  alt=""
                  className="h-full w-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-105"
                />
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- ABOUT ---------------- */
export function AboutSection() {
  const ref = useReveal<HTMLElement>();
  return (
    <section
      id="about"
      ref={ref}
      className="relative py-32 md:py-44"
      style={{ background: "var(--matte-black)", color: "#F7F3EE" }}
    >
      <div className="mx-auto grid max-w-[1400px] gap-16 px-6 md:grid-cols-12 md:px-12">
        <figure data-reveal className="md:col-span-5">
          <div className="aspect-[4/5] overflow-hidden">
            <img
              src={founder}
              alt="Founder portrait"
              loading="lazy"
              width={1280}
              height={1600}
              className="h-full w-full object-cover"
            />
          </div>
        </figure>

        <div className="md:col-span-7 md:pl-8 md:pt-12">
          <p
            data-reveal
            className="text-[10px] uppercase tracking-[0.5em]"
            style={{ color: "var(--gold)" }}
          >
            The Studio
          </p>
          <h2
            data-reveal
            data-delay="120"
            className="mt-6 text-4xl leading-[1.05] md:text-6xl"
          >
            We photograph{" "}
            <span
              className="italic"
              style={{ fontFamily: "var(--font-script)", color: "var(--gold)" }}
            >
              feelings
            </span>
            , not just faces.
          </h2>
          <div
            data-reveal
            data-delay="240"
            className="mt-10 max-w-xl space-y-6 text-sm leading-relaxed"
            style={{ color: "color-mix(in oklab, #F7F3EE 78%, transparent)" }}
          >
            <p>
              Galleria Weddings began in a small studio in Kochi, in 2014, with
              a single film camera and a belief that a wedding is a story worth
              telling slowly.
            </p>
            <p>
              A decade later, we are a quiet team of planners, photographers and
              filmmakers — but our promise is the same. We move gently through
              your day, and we return with an heirloom.
            </p>
          </div>

          <div
            data-reveal
            data-delay="360"
            className="mt-12 grid grid-cols-3 gap-6 border-t border-[color-mix(in_oklab,var(--gold)_30%,transparent)] pt-8"
          >
            {[
              ["12+", "Years"],
              ["220+", "Weddings"],
              ["18", "Countries"],
            ].map(([n, l]) => (
              <div key={l as string}>
                <div className="font-serif text-4xl" style={{ color: "var(--gold)" }}>
                  {n}
                </div>
                <div className="mt-2 text-[10px] uppercase tracking-[0.4em]">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- TESTIMONIALS ---------------- */
const testimonials = [
  {
    q: "They held our day with such quiet care that we barely noticed a camera. What they returned to us feels like memory itself.",
    a: "Ananya & Vikram",
    p: "Kochi, 2025",
  },
  {
    q: "An album we will hand down. Every frame feels considered, every page a small breath.",
    a: "Meera & Arjun",
    p: "Alleppey, 2024",
  },
  {
    q: "Cinematic without being loud. The film played and my mother cried before the first minute was over.",
    a: "Divya & Rohan",
    p: "Fort Kochi, 2024",
  },
];

export function TestimonialsSection() {
  const [i, setI] = useState(0);
  const ref = useReveal<HTMLElement>();
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % testimonials.length), 7000);
    return () => clearInterval(id);
  }, []);
  const t = testimonials[i];
  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative py-32 md:py-44"
    >
      <div className="mx-auto max-w-3xl px-6 text-center">
        <p
          data-reveal
          className="text-[10px] uppercase tracking-[0.5em]"
          style={{ color: "var(--gold)" }}
        >
          Kind Words
        </p>
        <div
          data-reveal
          data-delay="120"
          className="relative mt-10 min-h-[240px]"
        >
          <span
            aria-hidden
            className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 font-serif text-[120px] leading-none"
            style={{ color: "color-mix(in oklab, var(--gold) 30%, transparent)" }}
          >
            “
          </span>
          <blockquote
            key={i}
            className="relative text-2xl leading-relaxed md:text-3xl"
            style={{ animation: "fade-in 700ms ease" }}
          >
            {t.q}
          </blockquote>
          <div className="mt-8 text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            {t.a} — {t.p}
          </div>
        </div>

        <div className="mt-10 flex justify-center gap-3">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setI(idx)}
              aria-label={`Testimonial ${idx + 1}`}
              className="h-px transition-all duration-500"
              style={{
                width: idx === i ? 40 : 16,
                background:
                  idx === i
                    ? "var(--gold)"
                    : "color-mix(in oklab, var(--foreground) 30%, transparent)",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------- INSTAGRAM ---------------- */
export function InstagramSection() {
  const ref = useReveal<HTMLElement>();
  const tiles = [story1, story2, story3, story1, story3, story2];
  return (
    <section ref={ref} className="relative py-32 md:py-44">
      <SectionHead eyebrow="Instagram — @galleriaweddings" title="From the" script="feed." />
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-3 px-6 md:grid-cols-6 md:px-12">
        {tiles.map((src, i) => (
          <a
            key={i}
            data-reveal
            data-delay={i * 60}
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="group relative block aspect-square overflow-hidden"
          >
            <img
              src={src}
              alt=""
              loading="lazy"
              className="h-full w-full object-cover grayscale-[15%] transition-all duration-[1200ms] ease-out group-hover:scale-105 group-hover:grayscale-0"
            />
            <span
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{
                background:
                  "linear-gradient(180deg, transparent, color-mix(in oklab, var(--matte-black) 55%, transparent))",
              }}
            />
          </a>
        ))}
      </div>
      <div className="mt-12 text-center">
        <Magnetic
          href="https://instagram.com"
          className="group relative inline-flex items-center overflow-hidden rounded-full border border-[color-mix(in_oklab,var(--gold)_55%,transparent)] px-8 py-3.5 text-[10px] uppercase tracking-[0.35em]"
        >
          <span
            className="absolute inset-0 origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100"
            style={{ background: "var(--gold)" }}
          />
          <span className="relative transition-colors duration-300 group-hover:text-[var(--matte-black)]">
            Follow the studio
          </span>
        </Magnetic>
      </div>
    </section>
  );
}

/* ---------------- CONTACT ---------------- */
export function ContactSection() {
  const ref = useReveal<HTMLElement>();
  const [sent, setSent] = useState(false);

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-32 md:py-44"
      style={{ background: "var(--beige)" }}
    >
      <SectionHead
        eyebrow="Book Consultation"
        title="Tell us about"
        script="the two of you."
      />

      <form
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
        className="mx-auto grid max-w-3xl gap-6 px-6 md:grid-cols-2"
      >
        {[
          ["Bride Name", "text"],
          ["Groom Name", "text"],
          ["Wedding Date", "date"],
          ["Venue", "text"],
          ["Phone", "tel"],
          ["Email", "email"],
          ["Estimated Budget", "text"],
          ["Wedding Type", "text"],
        ].map(([label, type], i) => (
          <label key={label} data-reveal data-delay={i * 60} className="block">
            <span className="mb-2 block text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
              {label}
            </span>
            <input
              type={type}
              className="w-full border-0 border-b bg-transparent py-3 text-sm outline-none transition-colors"
              style={{
                borderBottomColor: "color-mix(in oklab, var(--foreground) 20%, transparent)",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderBottomColor = "var(--gold)")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderBottomColor =
                  "color-mix(in oklab, var(--foreground) 20%, transparent)")
              }
            />
          </label>
        ))}

        <label data-reveal data-delay={520} className="block md:col-span-2">
          <span className="mb-2 block text-[10px] uppercase tracking-[0.4em] text-muted-foreground">
            Message
          </span>
          <textarea
            rows={4}
            className="w-full resize-none border-0 border-b bg-transparent py-3 text-sm outline-none"
            style={{
              borderBottomColor: "color-mix(in oklab, var(--foreground) 20%, transparent)",
            }}
          />
        </label>

        <div data-reveal data-delay={620} className="md:col-span-2 mt-6 flex flex-col items-center gap-4">
          <Magnetic>
            <span
              className="relative inline-flex items-center overflow-hidden rounded-full px-10 py-4 text-[10px] uppercase tracking-[0.35em]"
              style={{ background: "var(--foreground)", color: "var(--background)" }}
            >
              {sent ? "Received — we will be in touch" : "Send Inquiry"}
            </span>
          </Magnetic>
          <p className="text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
            Or write to studio@galleriaweddings.com
          </p>
        </div>
      </form>
    </section>
  );
}

/* ---------------- FOOTER ---------------- */
export function Footer() {
  return (
    <footer
      className="relative pb-10 pt-16"
      style={{ background: "var(--matte-black)", color: "#F7F3EE" }}
    >
      <div className="mx-auto grid max-w-[1400px] gap-8 px-6 md:grid-cols-4 md:px-12">
        <div className="md:col-span-2">
          <img
            src={logoGold}
            alt="Galleria Weddings"
            className="w-auto max-w-none object-contain"
            style={{ height: 72, width: 'auto' }}
          />
          <p
            className="mt-6 max-w-sm text-sm leading-relaxed"
            style={{ color: "color-mix(in oklab, #F7F3EE 65%, transparent)" }}
          >
            A quiet studio in Kochi, Kerala — crafting timeless wedding films
            and photographs for couples who love slowly.
          </p>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.4em]" style={{ color: "var(--gold)" }}>
            Studio
          </div>
          <ul className="mt-6 space-y-3 text-sm">
            {["Home", "Stories", "Services", "About", "Gallery", "Contact"].map((l) => (
              <li key={l}>
                <a
                  href={`#${l.toLowerCase()}`}
                  className="opacity-75 transition-opacity hover:opacity-100"
                >
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-[10px] uppercase tracking-[0.4em]" style={{ color: "var(--gold)" }}>
            Contact
          </div>
          <ul
            className="mt-6 space-y-3 text-sm"
            style={{ color: "color-mix(in oklab, #F7F3EE 78%, transparent)" }}
          >
            <li>Kochi, Kerala, India</li>
            <li>studio@galleriaweddings.com</li>
            <li>+91 484 000 0000</li>
            <li>WhatsApp · Instagram</li>
          </ul>
        </div>
      </div>

      <div
        className="mx-auto mt-16 flex max-w-[1400px] flex-col items-center justify-between gap-4 border-t px-6 pt-8 text-[10px] uppercase tracking-[0.4em] md:flex-row md:px-12"
        style={{
          borderColor: "color-mix(in oklab, var(--gold) 20%, transparent)",
          color: "color-mix(in oklab, #F7F3EE 55%, transparent)",
        }}
      >
        <span>© {new Date().getFullYear()} Galleria Weddings</span>
        <span>Every wedding has a story · We make it timeless</span>
      </div>
    </footer>
  );
}
