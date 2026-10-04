import React from "react";
import Image from "next/image";
import { ForgeStateMachineSvg } from "@/components/ForgeStateMachineSvg";
import { ParticlesBackground } from "@/components/ParticlesBackground";
import { ThemeToggle } from "@/components/ThemeToggle";
import {
  PythonIcon,
  DockerIcon,
  SqliteIcon,
  FastApiIcon,
} from "@/components/TechIcons";
import { FaGithub, FaTelegram, FaEnvelope } from "react-icons/fa";
import { ChevronRight, Terminal } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] font-sans antialiased selection:bg-[var(--fg)] selection:text-[var(--bg)] relative transition-colors duration-200">
      {/* 1. Interactive Particles Canvas behind all content: fixed, inset 0, z-0, pointer-events-none */}
      <ParticlesBackground />

      {/* Sticky Header with bottom border spanning FULL window width, wrapped in relative z-10 */}
      <header className="sticky top-0 z-50 w-full bg-[var(--header-bg)] backdrop-blur-md border-b border-[var(--border)] transition-colors duration-200">
        <div className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">
          {/* Left: Bold initials/logo only (no badges, no status pills) */}
          <a
            href="#"
            className="font-bold text-base tracking-tight text-[var(--fg)] hover:opacity-80 transition-opacity"
          >
            MA
          </a>

          {/* Right: Muted nav links, thin vertical divider, plain theme toggle icon */}
          <div className="flex items-center gap-5 sm:gap-6 text-sm">
            <nav className="flex items-center gap-5 sm:gap-6 text-[var(--muted)]">
              <a
                href="#projects"
                className="hover:text-[var(--fg)] transition-colors"
              >
                Projects
              </a>
              <a
                href="#stack"
                className="hover:text-[var(--fg)] transition-colors"
              >
                Stack
              </a>
            </nav>
            <span className="h-4 w-px bg-[var(--border)]" />
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Single Centered Container (~max-w-3xl) in relative z-10 */}
      <main className="relative z-10 max-w-3xl mx-auto px-6 sm:px-8 py-12 sm:py-16 space-y-16 sm:space-y-24">
        {/* ================= HERO SECTION ================= */}
        <section className="space-y-8">
          {/* Avatar + Name + Icon-only Social Links */}
          <div className="flex items-center gap-6 sm:gap-8">
            <Image
              src="https://avatars.githubusercontent.com/u/134535771?v=4"
              alt="Madi Alenov"
              width={144}
              height={144}
              unoptimized
              priority
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full ring-1 ring-black/10 dark:ring-white/10 border border-[var(--border)] object-cover select-none shrink-0"
            />

            <div className="space-y-2.5">
              <div className="flex items-center gap-2">
                <h1 className="text-2xl sm:text-3xl font-semibold text-[var(--fg)] tracking-tight">
                  Madi Alenov
                </h1>
                {/* Blue verified badge */}
                <svg
                  className="w-5 h-5 text-[#00a8ff] fill-current shrink-0"
                  viewBox="0 0 24 24"
                  aria-label="Verified developer"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>

              {/* Icon-only social links (filled variants, 24-26px, slate-600, hover slate-900) */}
              <div className="flex items-center gap-3.5 pt-0.5">
                <a
                  href="https://github.com/alastrm"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  className="text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                >
                  <FaGithub size={24} />
                </a>
                <a
                  href="https://t.me/hsokidam"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Telegram"
                  className="text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                >
                  <FaTelegram size={24} />
                </a>
                <a
                  href="mailto:alenovm1@gmail.com"
                  aria-label="Email"
                  className="text-slate-600 hover:text-slate-900 dark:text-neutral-400 dark:hover:text-white transition-colors"
                >
                  <FaEnvelope size={24} />
                </a>
              </div>
            </div>
          </div>

          {/* Headline: Full-stack Developer — Python, TypeScript. */}
          <div>
            <h2 className="text-2xl sm:text-3xl lg:text-[32px] tracking-tight leading-snug">
              <span className="font-semibold text-[var(--fg)]">
                Full-stack Developer
              </span>
              <span className="font-light text-[var(--muted)]">
                {" "}— Python, TypeScript.
              </span>
            </h2>
          </div>

          {/* Description paragraph */}
          <p className="text-sm sm:text-base font-light leading-relaxed text-[var(--muted)]">
            I&apos;m a full-stack developer from Astana, working mostly in Python. I graduated from AITU with honors and won silver at WorldSkills Kazakhstan in IT Solutions for Business.
          </p>

          {/* Primary CTA button: View Resume linking directly to attached PDF */}
          <div className="pt-2">
            <a
              href="/Madi_Alenov_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--btn-bg)] text-[var(--btn-fg)] text-sm font-medium hover:opacity-90 transition-opacity"
            >
              <span>View Resume</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* ================= PROJECTS SECTION ================= */}
        <section id="projects" className="space-y-10 sm:space-y-12">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[var(--fg)]">
              Projects
            </h2>
            <a
              href="https://github.com/alastrm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-normal text-[var(--muted)] hover:text-[var(--fg)] transition-colors inline-flex items-center gap-1"
            >
              <span>All repositories</span>
              <span>&gt;</span>
            </a>
          </div>

          {/* Project 1: Forge */}
          <div className="space-y-6">
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <h3 className="text-lg sm:text-xl font-medium text-[var(--fg)]">
                Forge
              </h3>
              <a
                href="https://github.com/alastrm/Forge"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--muted)] hover:text-[var(--fg)] transition-colors inline-flex items-center gap-1"
              >
                <span>github.com/alastrm/Forge</span>
                <span>&gt;</span>
              </a>
            </div>

            <p className="text-sm sm:text-base font-light text-[var(--muted)] leading-relaxed">
              A container orchestrator for a single server, written with only Python&apos;s standard library. Blue/green deploys through Traefik with no downtime, tested with 235k+ requests without dropped connections.
            </p>

            {/* Finite state machine architecture */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-medium text-[var(--muted)]">
                Finite state machine architecture
              </div>
              <div className="p-3 rounded-lg border border-[var(--border)] bg-transparent">
                <ForgeStateMachineSvg />
              </div>
            </div>

            {/* Terminal execution block */}
            <div className="space-y-2 pt-2">
              <div className="text-xs font-medium text-[var(--muted)]">
                Terminal execution
              </div>
              <div className="bg-[var(--terminal-bg)] border border-[var(--border)] rounded-lg p-4 sm:p-5 font-mono text-xs text-[var(--terminal-fg)] leading-relaxed overflow-x-auto">
                <div className="text-[11px] text-[var(--muted)] pb-2 mb-3 border-b border-[var(--border)] flex justify-between items-center select-none font-sans">
                  <span className="flex items-center gap-1.5">
                    <Terminal className="w-3 h-3" />
                    <span>bash</span>
                  </span>
                  <span>$ forge deploy</span>
                </div>

                <div className="space-y-1">
                  <div>
                    <span className="text-[var(--muted)] select-none">$ </span>
                    <span className="font-medium text-[var(--fg)]">forge deploy</span>
                  </div>
                  <div className="text-[var(--muted)]">Loaded 2 environment variables from &apos;.env&apos;</div>
                  <div>Deploying application &apos;my-service&apos; to Forge control plane...</div>
                  <div className="text-[var(--muted)]">Deployment enqueued: dep-4b8b9bc8</div>
                  <div className="text-[var(--muted)]">Waiting for deployment to complete...</div>
                  <div>Status: BUILDING</div>
                  <div>Status: STARTING</div>
                  <div>Status: HEALTH_CHECKING</div>
                  <div className="text-[var(--state-active)] font-medium">Status: ACTIVE</div>
                  <div className="pt-1 text-[var(--state-active)] font-medium">
                    Deployment successful! Active container: my-service-6006eaa
                  </div>
                </div>
              </div>
            </div>

            {/* Engineering Deep Dives */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 text-xs sm:text-sm">
              <div className="space-y-1.5">
                <h4 className="font-semibold text-[var(--fg)]">
                  Why Forge was built
                </h4>
                <p className="font-light text-[var(--muted)] leading-relaxed">
                  Most deployment tools want Redis, Celery or a whole cluster just to restart a container on one server. I wanted to see how far I could get with only Python&apos;s standard library, OS threads and SQLite in WAL mode, and still do zero-downtime blue/green deploys.
                </p>
              </div>

              <div className="space-y-1.5">
                <h4 className="font-semibold text-[var(--fg)]">
                  The hardest engineering challenge
                </h4>
                <p className="font-light text-[var(--muted)] leading-relaxed">
                  The hardest bug was intermittent HTTP 502s during a switch. Traefik picks up config changes through inotify with about 100 ms of debounce. I fixed it by separating routing from shutdown with a 2-second draining window, tested with 235k+ requests without dropped connections.
                </p>
              </div>
            </div>
          </div>

          {/* Project 2: Mentora */}
          <div className="pt-8 border-t border-[var(--border)] space-y-4">
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <h3 className="text-lg sm:text-xl font-medium text-[var(--fg)]">
                Mentora
              </h3>
              <a
                href="https://github.com/alastrm/Mentora"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--muted)] hover:text-[var(--fg)] transition-colors inline-flex items-center gap-1"
              >
                <span>github.com/alastrm/Mentora</span>
                <span>&gt;</span>
              </a>
            </div>

            <p className="text-sm sm:text-base font-light text-[var(--muted)] leading-relaxed">
              Async backend for an educational platform: FastAPI, PostgreSQL, LLM orchestration.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[var(--muted)] font-normal">
              <span className="px-2.5 py-1 rounded-md border border-[var(--border)] bg-transparent">
                FastAPI
              </span>
              <span className="px-2.5 py-1 rounded-md border border-[var(--border)] bg-transparent">
                PostgreSQL
              </span>
              <span className="px-2.5 py-1 rounded-md border border-[var(--border)] bg-transparent">
                LLM Orchestration
              </span>
              <span className="px-2.5 py-1 rounded-md border border-[var(--border)] bg-transparent">
                Python 3.10+
              </span>
            </div>
          </div>
        </section>

        {/* ================= STACK SECTION ================= */}
        <section id="stack" className="space-y-8 sm:space-y-10">
          <div className="flex items-baseline justify-between">
            <h2 className="text-2xl sm:text-3xl font-light tracking-tight text-[var(--fg)]">
              Stack
            </h2>
            <a
              href="https://github.com/alastrm"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm font-normal text-[var(--muted)] hover:text-[var(--fg)] transition-colors inline-flex items-center gap-1"
            >
              <span>View Profile</span>
              <span>&gt;</span>
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 text-xs sm:text-sm">
            <div className="space-y-1.5">
              <div className="font-semibold text-[var(--fg)] flex items-center gap-2">
                <PythonIcon className="w-4 h-4" />
                <span>Languages</span>
              </div>
              <div className="font-light text-[var(--muted)] leading-relaxed">
                Python (asyncio, multiprocessing, threading), TypeScript, Java
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="font-semibold text-[var(--fg)] flex items-center gap-2">
                <DockerIcon className="w-4 h-4" />
                <span>Infrastructure &amp; Systems</span>
              </div>
              <div className="font-light text-[var(--muted)] leading-relaxed">
                Docker Engine API, Traefik, Systemd
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="font-semibold text-[var(--fg)] flex items-center gap-2">
                <SqliteIcon className="w-4 h-4" />
                <span>Data &amp; State</span>
              </div>
              <div className="font-light text-[var(--muted)] leading-relaxed">
                SQLite (WAL mode), PostgreSQL, Redis, Django ORM
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="font-semibold text-[var(--fg)] flex items-center gap-2">
                <FastApiIcon className="w-4 h-4" />
                <span>Frameworks</span>
              </div>
              <div className="font-light text-[var(--muted)] leading-relaxed">
                FastAPI, Django, Next.js, Spring Boot
              </div>
            </div>
          </div>
        </section>

        {/* ================= PERSONAL QUOTE (Sekiro) ================= */}
        <section className="py-6 border-t border-[var(--border)] space-y-2">
          <blockquote className="text-xl sm:text-2xl font-light tracking-tight text-[var(--fg)] leading-snug">
            <span className="text-[var(--accent)] select-none">«</span>Hesitation — is defeat.<span className="text-[var(--accent)] select-none">»</span>
          </blockquote>
          <cite className="block text-xs font-normal text-[var(--muted)] not-italic">
            <span className="text-[var(--accent)] mr-1.5 select-none">—</span>Isshin Ashina, Sekiro: Shadows Die Twice
          </cite>
        </section>
      </main>

      {/* Full-width Minimalist Footer wrapped in relative z-10 */}
      <footer className="relative z-10 w-full border-t border-[var(--border)] py-8 transition-colors duration-200">
        <div className="max-w-3xl mx-auto px-6 sm:px-8 flex items-center justify-between text-xs text-[var(--muted)] font-normal">
          <div>© 2026 Madi Alenov</div>
          <div>Astana, KZ</div>
        </div>
      </footer>
    </div>
  );
}
