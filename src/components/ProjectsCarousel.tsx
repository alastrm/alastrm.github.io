"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { ForgeDeployment } from "./ForgeDeployment";

const projects = [
  {
    name: "Forge",
    category: "Infrastructure",
    tagline: "Deploy without the downtime.",
    description: "Single-server container orchestration using only Python’s standard library. Zero-downtime blue/green deploys via Traefik, tested with 235k+ requests without dropped connections.",
    technologies: ["Python", "Docker", "SQLite · WAL", "Traefik"],
    github: "https://github.com/alastrm/Forge",
  },
  {
    name: "Sealed",
    category: "Privacy & security",
    tagline: "A voice, without a name.",
    description: "Anonymous reporting prototype with WebAssembly encryption in browser memory. An untrusted backend relays ciphertext without plaintext access.",
    technologies: ["FastAPI", "Next.js", "libsodium (WASM)", "X25519", "BLAKE2b", "Argon2id", "TypeScript"],
    github: "https://github.com/alastrm/Sealed",
  },
  {
    name: "Sendrift",
    category: "File sharing",
    tagline: "Share a file. Set an expiry.",
    description: "Temporary file sharing with private S3-compatible storage. Choose an expiration, share a link, and revoke access early with a separate management key.",
    technologies: ["Next.js", "TypeScript", "FastAPI", "PostgreSQL", "S3 · MinIO", "Docker"],
    github: "https://github.com/alastrm/Sendrift",
  },
  {
    name: "Mentora",
    category: "Learning tools",
    tagline: "From documents to understanding.",
    description: "An async backend and mobile app that turns PDFs into summaries, quizzes and Anki cards.",
    technologies: ["FastAPI", "PostgreSQL", "LLM Orchestration", "Python", "Docker"],
    github: "https://github.com/alastrm/Mentora",
  },
];

function ProjectVisual({ name }: { name: string }) {
  if (name === "Forge") return <ForgeDeployment />;

  if (name === "Mentora") {
    return (
      <div className="mentora-composition">
        <div className="mentora-phone mentora-phone-back">
          <Image src="/mvp/mentora-ingest.png" alt="Mentora: upload a document and choose learning formats" width={317} height={640} draggable={false} sizes="(max-width: 420px) 105px, (max-width: 760px) 125px, 155px" />
        </div>
        <div className="mentora-phone mentora-phone-quota">
          <Image src="/mvp/mentora-quota.png" alt="Mentora: profile with generation and token usage quotas" width={317} height={638} draggable={false} sizes="(max-width: 420px) 105px, (max-width: 760px) 125px, 155px" />
        </div>
        <div className="mentora-phone mentora-phone-front">
          <Image src="/mvp/mentora-quiz.png" alt="Mentora: an interactive quiz generated from a document" width={322} height={658} draggable={false} sizes="(max-width: 420px) 125px, (max-width: 760px) 145px, 180px" />
        </div>
        <span className="visual-caption">Your documents. A new way to learn.</span>
      </div>
    );
  }

  return (
    <div className={`product-composition product-composition-${name.toLowerCase()}`}>
      <div className="product-window">
        <div className="product-window-bar" aria-hidden="true">
          <span className="window-dots"><i /><i /><i /></span>
          <span>{name === "Sealed" ? "sealed / submit a report" : "sendrift / share a file"}</span>
          <span className="window-secure">{name === "Sealed" ? "Encrypted in your browser" : "Temporary file sharing"}</span>
        </div>
        <div className={name === "Sealed" ? "sealed-screenshot" : "sendrift-screenshot"}>
          <Image
            src={name === "Sealed" ? "/projects/sealed-report.png" : "/projects/sendrift-download.png"}
            alt={name === "Sealed" ? "Sealed’s anonymous report form with browser-side encryption" : "Sendrift’s recipient page with file details, expiration and a download button"}
            width={name === "Sealed" ? 2048 : 1440}
            height={name === "Sealed" ? 1280 : 960}
            sizes="(max-width: 600px) 520px, (max-width: 900px) 700px, 680px"
            draggable={false}
          />
        </div>
      </div>
      <span className="visual-caption">{name === "Sealed" ? "Privacy starts in the browser." : "A file. A link. An expiration."}</span>
    </div>
  );
}

export function ProjectsCarousel() {
  const viewport = useRef<HTMLDivElement>(null);
  const slides = useRef<(HTMLDivElement | null)[]>([]);
  const drag = useRef<{ x: number; y: number; scroll: number; moved: boolean } | null>(null);
  const preventClick = useRef(false);
  const [active, setActive] = useState(0);
  const [dragging, setDragging] = useState(false);

  const goTo = useCallback((index: number) => {
    const container = viewport.current;
    const slide = slides.current[Math.max(0, Math.min(projects.length - 1, index))];
    if (!container || !slide) return;
    container.scrollTo({
      left: slide.offsetLeft - (container.clientWidth - slide.clientWidth) / 2,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  }, []);

  useEffect(() => {
    const container = viewport.current;
    if (!container) return;
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const center = container.scrollLeft + container.clientWidth / 2;
        let closest = 0;
        let distance = Infinity;
        slides.current.forEach((slide, index) => {
          if (!slide) return;
          const nextDistance = Math.abs(slide.offsetLeft + slide.clientWidth / 2 - center);
          if (nextDistance < distance) { closest = index; distance = nextDistance; }
        });
        setActive(closest);
      });
    };
    container.addEventListener("scroll", update, { passive: true });
    return () => { container.removeEventListener("scroll", update); cancelAnimationFrame(frame); };
  }, []);

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    const next = { ArrowLeft: active - 1, ArrowRight: active + 1, Home: 0, End: projects.length - 1 }[event.key];
    if (next === undefined || event.altKey || event.ctrlKey || event.metaKey) return;
    event.preventDefault();
    viewport.current?.focus({ preventScroll: true });
    goTo(next);
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    // Touch keeps native momentum and vertical page scrolling.
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    drag.current = { x: event.clientX, y: event.clientY, scroll: event.currentTarget.scrollLeft, moved: false };
    preventClick.current = false;
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const start = drag.current;
    if (!start) return;
    const delta = event.clientX - start.x;
    if (!start.moved && Math.abs(delta) > 6 && Math.abs(delta) > Math.abs(event.clientY - start.y)) {
      start.moved = true;
      setDragging(true);
      event.currentTarget.setPointerCapture(event.pointerId);
      event.currentTarget.style.scrollSnapType = "none";
    }
    if (start.moved) {
      event.preventDefault();
      event.currentTarget.scrollLeft = start.scroll - delta;
    }
  }

  function endDrag(event: PointerEvent<HTMLDivElement>) {
    const start = drag.current;
    drag.current = null;
    if (!start?.moved) return;
    preventClick.current = true;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    event.currentTarget.style.scrollSnapType = "";
    const center = event.currentTarget.scrollLeft + event.currentTarget.clientWidth / 2;
    const nearest = slides.current.reduce((best, slide, index) => {
      const previous = slides.current[best];
      return slide && previous && Math.abs(slide.offsetLeft + slide.clientWidth / 2 - center) < Math.abs(previous.offsetLeft + previous.clientWidth / 2 - center) ? index : best;
    }, 0);
    goTo(nearest);
  }

  return (
    <section id="projects" className="projects-section" aria-labelledby="projects-title" aria-roledescription="carousel" onKeyDown={onKeyDown}>
      <div className="projects-heading">
        <div><span className="projects-eyebrow">Selected work</span><h2 id="projects-title">Projects</h2></div>
        <a href="https://github.com/alastrm" target="_blank" rel="noopener noreferrer" className="projects-all">All repositories <ArrowUpRight size={15} /></a>
      </div>

      <p id="projects-instructions" className="sr-only">Swipe or drag to explore projects. When focused, use the left and right arrow keys, Home or End.</p>
      <div
        className={`projects-viewport${dragging ? " is-dragging" : ""}`}
        ref={viewport}
        tabIndex={0}
        aria-label="Project slides"
        aria-describedby="projects-instructions"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={(event) => { if (!drag.current?.moved) endDrag(event); }}
        onClickCapture={(event) => { if (preventClick.current) { event.preventDefault(); event.stopPropagation(); preventClick.current = false; } }}
      >
        {projects.map((project, index) => (
          <div
            key={project.name}
            ref={(node) => { slides.current[index] = node; }}
            className={`project-slide${active === index ? " is-active" : ""}`}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} of ${projects.length}: ${project.name}`}
            inert={index !== active}
          >
            <article className={`project-card project-${project.name.toLowerCase()}`}>
              <div className="project-copy">
                <span className="project-category"><span className="project-number">0{index + 1}</span>{project.category}</span>
                <div className="project-intro"><h3>{project.name}</h3><p className="project-tagline">{project.tagline}</p></div>
                <p className="project-description">{project.description}</p>
                <ul className="project-technologies" aria-label="Technologies">{project.technologies.map((technology) => <li key={technology}>{technology}</li>)}</ul>
                <a href={project.github} className="project-github" target="_blank" rel="noopener noreferrer" aria-label={`View ${project.name} on GitHub`}><FaGithub size={16} /><span>View on GitHub</span><ArrowUpRight size={15} /></a>
              </div>
              <div className="project-visual"><ProjectVisual name={project.name} /></div>
            </article>
          </div>
        ))}
      </div>

      <div className="projects-controls">
        <div className="project-selectors" aria-label="Choose a project">{projects.map((project, index) => <button key={project.name} className={index === active ? "is-active" : ""} onClick={() => goTo(index)} aria-label={`Show ${project.name}`} aria-current={index === active ? "true" : undefined}><span className="selector-dot" /><span className="selector-name">{project.name}</span></button>)}</div>
        <div className="projects-navigation">
          <span className="projects-pagination" aria-live="polite" aria-atomic="true"><span className="sr-only">Project </span><span>0{active + 1}</span><span className="pagination-divider">/</span>04<span className="sr-only">: {projects[active].name}</span></span>
          {/* Keep arrow state in React; browsers can restore native disabled state before hydration. */}
          <button
            type="button"
            className="project-arrow"
            onClick={() => { if (active > 0) goTo(active - 1); }}
            aria-disabled={active === 0}
            aria-label="Previous project"
          ><ArrowLeft size={18} /></button>
          <button
            type="button"
            className="project-arrow"
            onClick={() => { if (active < projects.length - 1) goTo(active + 1); }}
            aria-disabled={active === projects.length - 1}
            aria-label="Next project"
          ><ArrowRight size={18} /></button>
        </div>
      </div>
    </section>
  );
}
