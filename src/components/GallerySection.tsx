import { useEffect, useRef } from "react";
import * as THREE from "three";
import frame1 from "@/assets/frame-1.jpg";
import frame2 from "@/assets/frame-2.jpg";
import frame3 from "@/assets/frame-3.jpg";
import frame4 from "@/assets/frame-4.jpg";
import frame5 from "@/assets/frame-5.jpg";
import frame6 from "@/assets/frame-6.jpg";
import frame7 from "@/assets/frame-7.jpg";
import frame8 from "@/assets/frame-8.jpg";
import frame9 from "@/assets/frame-9.jpg";

const FRAME_IMAGES = [
  frame1,
  frame2,
  frame3,
  frame4,
  frame5,
  frame6,
  frame7,
  frame8,
  frame9,
];

export function GallerySection() {
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const scene = new THREE.Scene();
    scene.background = null;
    scene.fog = new THREE.Fog(0xf7f3ee, 8, 22);

    const camera = new THREE.PerspectiveCamera(
      45,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      100,
    );
    camera.position.set(0, 0.2, 8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));
    const key = new THREE.DirectionalLight(0xddbe84, 1.1);
    key.position.set(4, 5, 6);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xc5a26a, 0.4);
    fill.position.set(-4, -2, 3);
    scene.add(fill);

    // Frames arranged in a loose ring
    const group = new THREE.Group();
    scene.add(group);

    type Frame = {
      mesh: THREE.Mesh;
      outline: THREE.LineSegments;
      baseY: number;
      phase: number;
      speed: number;
    };
    const frames: Frame[] = [];

    const count = FRAME_COLORS.length;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const radius = 3.6 + (i % 3) * 0.5;
      const depthOffset = ((i * 37) % 5) * 0.35 - 0.7;
      const y = ((i * 53) % 7) * 0.18 - 0.6;

      const w = 1.1 + ((i * 13) % 4) * 0.08;
      const h = 1.55 + ((i * 17) % 5) * 0.06;

      const geo = new THREE.PlaneGeometry(w, h);
      const mat = new THREE.MeshStandardMaterial({
        color: new THREE.Color(FRAME_COLORS[i]),
        roughness: 0.85,
        metalness: 0.05,
        side: THREE.DoubleSide,
      });
      const mesh = new THREE.Mesh(geo, mat);

      // Thin gold outline
      const edges = new THREE.EdgesGeometry(geo);
      const outline = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0xc5a26a, transparent: true, opacity: 0.9 }),
      );
      mesh.add(outline);

      mesh.position.set(
        Math.sin(angle) * radius,
        y,
        Math.cos(angle) * radius + depthOffset,
      );
      // Face roughly toward center
      mesh.lookAt(0, y, 0);

      group.add(mesh);
      frames.push({
        mesh,
        outline,
        baseY: y,
        phase: Math.random() * Math.PI * 2,
        speed: 0.35 + Math.random() * 0.25,
      });
    }

    // Resize
    const resize = () => {
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Scroll progress
    const onScroll = () => {
      const rect = wrap.getBoundingClientRect();
      const total = wrap.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      progressRef.current = total > 0 ? scrolled / total : 0;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // Animate
    const clock = new THREE.Clock();
    let smoothed = 0;
    let raf = 0;

    const tick = () => {
      const t = clock.getElapsedTime();
      smoothed += (progressRef.current - smoothed) * 0.06;

      // Camera dolly + slow rotation
      const p = smoothed;
      camera.position.z = 8 - p * 8.2; // walk forward through the ring
      camera.position.y = 0.2 + Math.sin(p * Math.PI) * 0.25;
      camera.position.x = Math.sin(p * Math.PI * 0.5) * 0.6;
      camera.rotation.y = p * Math.PI * 0.35;
      camera.lookAt(
        Math.sin(p * Math.PI * 0.5) * 0.4,
        0.1,
        camera.position.z - 2,
      );

      // Gentle bob
      for (const f of frames) {
        f.mesh.position.y = f.baseY + Math.sin(t * f.speed + f.phase) * 0.12;
      }

      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      ro.disconnect();
      frames.forEach((f) => {
        f.mesh.geometry.dispose();
        (f.mesh.material as THREE.Material).dispose();
        f.outline.geometry.dispose();
        (f.outline.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <section
      ref={wrapRef}
      className="relative"
      style={{ height: "300vh" }}
      aria-label="Gallery preview"
    >
      <div className="sticky top-0 flex h-screen w-full flex-col items-center justify-center overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full"
          style={{ display: "block" }}
        />

        <div className="pointer-events-none absolute inset-x-0 bottom-16 z-10 text-center">
          <h2
            className="text-3xl md:text-5xl"
            style={{ color: "var(--foreground)" }}
          >
            Step into the{" "}
            <span
              className="italic"
              style={{ fontFamily: "var(--font-script)", color: "var(--gold)" }}
            >
              gallery
            </span>
          </h2>
          <p
            className="mt-4 text-[11px] uppercase tracking-[0.4em]"
            style={{ color: "color-mix(in oklab, var(--foreground) 55%, transparent)" }}
          >
            Scroll to move through the frames
          </p>
        </div>
      </div>
    </section>
  );
}
