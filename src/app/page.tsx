import React from "react";
import Image from "next/image";
import { ForgeStateMachineSvg } from "@/components/ForgeStateMachineSvg";
import { GitBranch, Send, Mail, ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--fg)] font-sans antialiased selection:bg-[var(--accent)] selection:text-white">
      <main className="max-w-6xl mx-auto px-5 sm:px-8 py-10 sm:py-14 lg:py-16">
        {/* Top Minimal Meta Bar */}
        <header className="flex items-center justify-between pb-6 mb-10 sm:mb-14 border-b border-[var(--border)] text-xs text-[var(--muted)] font-sans">
          <div className="font-medium text-[var(--fg)]">Madi Alenov</div>
          <div>Astana, KZ</div>
        </header>

        {/* Asymmetrical 2-Column Document Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* ================= LEFT COLUMN (~38%) ================= */}
          <aside className="lg:col-span-5 space-y-10 lg:space-y-12">
            {/* Identity & Bio */}
            <div>
              <div className="flex items-center gap-4 sm:gap-5">
                <Image
                  src="https://avatars.githubusercontent.com/u/134535771?v=4"
                  alt="Madi Alenov"
                  width={64}
                  height={64}
                  unoptimized
                  priority
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full border border-[var(--border)] object-cover shrink-0 select-none"
                />
                <div>
                  <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[var(--fg)] leading-tight font-sans">
                    Madi Alenov
                  </h1>
                  <div className="text-sm text-[var(--muted)] mt-1 font-sans font-medium">
                    Backend & Systems
                  </div>
                </div>
              </div>

              {/* Bio (Exact user text, no TODO blocks) */}
              <div className="mt-5 text-sm leading-relaxed text-[var(--fg)] font-sans">
                <p>
                  I&apos;m a backend developer from Astana, working mostly in Python. I graduated from AITU with honors and won silver at WorldSkills Kazakhstan in IT Solutions for Business.
                </p>
              </div>

              {/* Contacts (Oxblood accent links) */}
              <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-sans">
                <a
                  href="https://github.com/alastrm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[var(--accent)] hover:underline"
                >
                  <GitBranch className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>github/alastrm</span>
                </a>

                <a
                  href="https://t.me/hsokidam"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-[var(--accent)] hover:underline"
                >
                  <Send className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>@hsokidam</span>
                </a>

                <a
                  href="mailto:alenovm1@gmail.com"
                  className="inline-flex items-center gap-1.5 text-[var(--accent)] hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" strokeWidth={1.5} />
                  <span>alenovm1@gmail.com</span>
                </a>
              </div>
            </div>

            {/* Sekiro Quote — The largest, most breathable element (Oxblood quote marks and dash, pure air) */}
            <div className="py-6 sm:py-8 space-y-3">
              <blockquote className="text-3xl sm:text-4xl font-medium tracking-tight text-[var(--fg)] leading-snug font-sans">
                <span className="text-[var(--accent)] select-none">«</span>Hesitation — is defeat.<span className="text-[var(--accent)] select-none">»</span>
              </blockquote>
              <cite className="block text-xs font-sans text-[var(--muted)] not-italic">
                <span className="text-[var(--accent)] mr-1.5 select-none">—</span>Isshin Ashina, Sekiro: Shadows Die Twice
              </cite>
            </div>

            {/* Tools & Environment — Verified tools, Go & asyncio removed */}
            <div className="pt-8 border-t border-[var(--border)] text-xs font-sans space-y-3">
              <h2 className="text-xs font-semibold text-[var(--fg)]">
                Tools & environment
              </h2>

              <dl className="space-y-2 text-[var(--muted)] leading-relaxed">
                <div>
                  <dt className="text-[var(--fg)] inline font-medium">Languages: </dt>
                  <dd className="inline">Python, TypeScript, Java</dd>
                </div>
                <div>
                  <dt className="text-[var(--fg)] inline font-medium">Infrastructure: </dt>
                  <dd className="inline">Docker Engine API, Traefik</dd>
                </div>
                <div>
                  <dt className="text-[var(--fg)] inline font-medium">Data & State: </dt>
                  <dd className="inline">PostgreSQL, SQLite (WAL mode), Redis, Django ORM, Migrations</dd>
                </div>
                <div>
                  <dt className="text-[var(--fg)] inline font-medium">Frameworks & Runtimes: </dt>
                  <dd className="inline">FastAPI, Django, Spring</dd>
                </div>
              </dl>
            </div>
          </aside>

          {/* ================= RIGHT COLUMN (~62%) — DOMINANT BLOCK ================= */}
          <section className="lg:col-span-7 space-y-8">
            {/* Project Header */}
            <div>
              <div className="text-xs font-sans text-[var(--muted)] mb-1 font-medium">
                Project
              </div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[var(--fg)] font-sans">
                Forge Orchestrator
              </h2>
              <p className="mt-3 text-sm text-[var(--fg)] leading-relaxed font-sans">
                A container orchestrator for a single server, written with only Python&apos;s standard library. It does blue/green deploys through Traefik with no downtime.
              </p>
            </div>

            {/* Motivation Section (Exact user text) */}
            <div className="pt-8 border-t border-[var(--border)] space-y-3">
              <h3 className="text-xs font-sans text-[var(--fg)] font-semibold">
                Why Forge was built
              </h3>
              <p className="text-sm leading-relaxed text-[var(--fg)] font-sans">
                Most deployment tools want Redis, Celery or a whole cluster just to restart a container on one server. I wanted to see how far I could get with only Python&apos;s standard library, OS threads and SQLite in WAL mode, and still do zero-downtime blue/green deploys.
              </p>
            </div>

            {/* Finite State Machine Architecture Diagram (Clean, no card box) */}
            <div className="pt-8 border-t border-[var(--border)] space-y-3">
              <h3 className="text-xs font-sans text-[var(--fg)] font-semibold">
                Finite state machine architecture
              </h3>

              <div className="py-2">
                <ForgeStateMachineSvg />
              </div>
              <p className="text-[11px] font-sans text-[var(--muted)] leading-relaxed">
                Deployment lifecycle coordinates container builds, in-namespace health checks, Traefik weighted traffic shifts, and automatic rollback without dropping in-flight sockets.
              </p>
            </div>

            {/* Terminal / CLI Execution */}
            <div className="pt-8 border-t border-[var(--border)] space-y-3">
              <div className="flex items-center justify-between text-xs font-sans">
                <h3 className="text-[var(--fg)] font-semibold">
                  Terminal execution
                </h3>
                <span className="text-[var(--muted)] text-[11px] font-mono">forge-cli</span>
              </div>

              <div className="bg-[var(--terminal-bg)] p-4 sm:p-5 font-mono text-xs text-[var(--terminal-fg)] leading-relaxed overflow-x-auto">
                <div className="text-[11px] text-[var(--muted)] pb-2 mb-3 border-b border-[var(--border)] flex justify-between items-center select-none font-mono">
                  <span>bash</span>
                  <span>forge deploy</span>
                </div>

                <div className="font-mono text-xs leading-relaxed space-y-1 text-[var(--terminal-fg)]">
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

            {/* Hardest Challenge (Exact user text) */}
            <div className="pt-8 border-t border-[var(--border)] space-y-3">
              <h3 className="text-xs font-sans text-[var(--fg)] font-semibold">
                The hardest engineering challenge
              </h3>
              <p className="text-sm leading-relaxed text-[var(--fg)] font-sans">
                The hardest bug was intermittent HTTP 502s during a switch. Traefik picks up config changes through inotify with about 100 ms of debounce, and Forge was sending SIGTERM to the old container before Traefik had actually stopped routing to it. I fixed it by separating routing from shutdown: Forge first verifies that the new route is live, then gives the old container a 2-second draining window. I tested it with 235k+ requests and saw no dropped connections.
              </p>
            </div>

            {/* Repository & Source Code Link (Red accent used strictly for link) */}
            <div className="pt-8 border-t border-[var(--border)] flex items-center justify-between text-xs font-sans">
              <span className="text-[var(--muted)]">Source code & documentation</span>
              <a
                href="https://github.com/alastrm/Forge"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-medium text-[var(--accent)] hover:underline"
              >
                <span>github.com/alastrm/Forge</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </section>
        </div>

        {/* Minimal Footer */}
        <footer className="mt-16 sm:mt-20 pt-6 border-t border-[var(--border)] text-xs font-sans text-[var(--muted)]">
          <div>© 2026 Madi Alenov</div>
        </footer>
      </main>
    </div>
  );
}
