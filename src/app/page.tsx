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
import { ChevronRight, Terminal, ArrowUpRight } from "lucide-react";

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

          {/* Project 2: Sealed */}
          <div className="pt-10 border-t border-[var(--border)] space-y-6">
            <div className="flex items-baseline justify-between flex-wrap gap-2">
              <h3 className="text-lg sm:text-xl font-medium text-[var(--fg)]">
                Sealed
              </h3>
              <a
                href="https://github.com/alastrm/Sealed"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--muted)] hover:text-[var(--fg)] transition-colors inline-flex items-center gap-1"
              >
                <span>github.com/alastrm/Sealed</span>
                <span>&gt;</span>
              </a>
            </div>

            <p className="text-sm sm:text-base font-light text-[var(--muted)] leading-relaxed">
              Anonymous drop prototype with client-side WebAssembly cryptography and an untrusted backend. The browser encrypts payloads in memory before transmission; the server acts purely as a blind relay storing ciphertexts without plaintext access.
            </p>

            {/* Tech chips */}
            <div className="flex flex-wrap items-center gap-1.5">
              {["FastAPI", "Next.js", "libsodium (WASM)", "X25519", "BLAKE2b", "Argon2id", "TypeScript"].map((tech) => (
                <span
                  key={tech}
                  className="text-xs px-2 py-0.5 rounded-md border border-dashed border-black/20 dark:border-white/20 text-[var(--muted)] font-normal"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Key Engineering Highlights: 4 crisp, scannable items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--terminal-bg)] space-y-1">
                <div className="text-xs font-mono font-medium text-[var(--fg)]">
                  Client-side E2EE
                </div>
                <p className="text-xs font-light text-[var(--muted)] leading-relaxed">
                  Libsodium (WASM), ECIES Sealed Box, Zero-Knowledge backend relay.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--terminal-bg)] space-y-1">
                <div className="text-xs font-mono font-medium text-[var(--fg)]">
                  BIP-39 Access
                </div>
                <p className="text-xs font-light text-[var(--muted)] leading-relaxed">
                  Single 12-word mnemonic for keypair and token derivation, no UUIDs or user accounts.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--terminal-bg)] space-y-1">
                <div className="text-xs font-mono font-medium text-[var(--fg)]">
                  Traffic Analysis Defense
                </div>
                <p className="text-xs font-light text-[var(--muted)] leading-relaxed">
                  Strict 4 KB message padding and discrete file size bucketing up to 10 MB.
                </p>
              </div>

              <div className="p-3.5 rounded-xl border border-[var(--border)] bg-[var(--terminal-bg)] space-y-1">
                <div className="text-xs font-mono font-medium text-[var(--fg)]">
                  Tamper-Evident Audit
                </div>
                <p className="text-xs font-light text-[var(--muted)] leading-relaxed">
                  Append-only BLAKE2b hash chain verifying database state integrity.
                </p>
              </div>
            </div>
          </div>

          {/* Project 3: Mentora (Bento-style Showcase Card) */}
          <div className="pt-10 border-t border-[var(--border)] space-y-6">
            <div className="group relative rounded-3xl overflow-hidden min-h-[420px] border border-black/10 dark:border-white/10 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950 shadow-[inset_0_1px_0_rgba(255,255,255,0.8)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] flex flex-col md:grid md:grid-cols-[5fr_7fr]">
              {/* Accent radial glow relative to the CARD (right side, ~500px, blur-3xl, radial-gradient, ~12% opacity, no hard edges) */}
              <div
                className="absolute -top-16 -right-16 w-[500px] h-[500px] rounded-full opacity-[0.12] blur-3xl pointer-events-none"
                style={{
                  background: "radial-gradient(circle, #c8e86a 0%, transparent 70%)",
                }}
              />

              {/* Left Column (p-8 md:p-10, flex flex-col justify-between) */}
              <div className="p-8 md:p-10 flex flex-col justify-between relative z-10 space-y-8 md:space-y-0">
                <div className="space-y-4">
                  {/* 44px rounded-xl icon tile */}

                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold text-[var(--fg)] tracking-tight">
                      Mentora
                    </h3>
                    <p className="text-sm font-light text-[var(--muted)] leading-relaxed">
                      Async backend and mobile app that turns PDFs into summaries, quizzes and Anki cards.
                    </p>
                  </div>

                  {/* Tech chips (text-xs, px-2 py-0.5, rounded-md, border border-dashed border-black/20 dark:border-white/20, gap-1.5) */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {["FastAPI", "PostgreSQL", "LLM Orchestration", "Python", "Docker"].map((tech) => (
                      <span
                        key={tech}
                        className="text-xs px-2 py-0.5 rounded-md border border-dashed border-black/20 dark:border-white/20 text-[var(--muted)] font-normal"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom: pill button "View on GitHub" + arrow icon */}
                <div className="pt-4 md:pt-0">
                  <a
                    href="https://github.com/alastrm/Mentora"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium text-[var(--fg)] bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15 border border-black/5 dark:border-white/10 transition-colors w-fit group/btn"
                  >
                    <span>View on GitHub</span>
                    <ArrowUpRight className="w-4 h-4 text-[var(--muted)] group-hover/btn:text-[var(--fg)] transition-colors" />
                  </a>
                </div>
              </div>

              {/* Right Column: NO overflow-hidden, NO background, pl-6 so left phone never touches text area */}
              <div className="relative min-h-[360px] md:min-h-[440px] flex items-end pl-6">
                <div className="relative w-full h-[360px] md:h-[440px]">
                  {/* Left phone: rotate(-5deg) at left-[8%], top offset, clean ring outline */}
                  <div className="absolute left-[6%] sm:left-[8%] top-8 sm:top-10 w-[170px] md:w-[190px] -rotate-[5deg] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 rounded-[28px] ring-1 ring-black/10 dark:ring-white/15 shadow-2xl shadow-black/30 dark:shadow-black/60 select-none pointer-events-none">
                    <Image
                      src="/mvp/mentora-ingest.png"
                      alt="Mentora Document Ingestion"
                      width={317}
                      height={640}
                      className="rounded-[28px] block w-full h-auto object-contain"
                    />
                  </div>

                  {/* Right phone: rotate(5deg), top offset, clean ring outline */}
                  <div className="absolute right-[2%] sm:right-[4%] md:right-[6%] top-2 sm:top-4 w-[170px] md:w-[190px] rotate-[5deg] transition-transform duration-500 ease-out group-hover:-translate-y-1.5 rounded-[28px] ring-1 ring-black/10 dark:ring-white/15 shadow-2xl shadow-black/30 dark:shadow-black/60 select-none pointer-events-none">
                    <Image
                      src="/mvp/mentora-quota.png"
                      alt="Mentora Quota Management"
                      width={317}
                      height={638}
                      className="rounded-[28px] block w-full h-auto object-contain"
                    />
                  </div>

                  {/* Center phone: top offset, scale-105, z-10, clean ring outline */}
                  <div className="absolute left-1/2 -translate-x-1/2 top-18 sm:top-20 md:top-24 w-[170px] md:w-[190px] scale-105 z-10 transition-transform duration-500 ease-out group-hover:-translate-y-1.5 rounded-[28px] ring-1 ring-black/10 dark:ring-white/15 shadow-2xl shadow-black/40 dark:shadow-black/70 select-none pointer-events-none">
                    <Image
                      src="/mvp/mentora-quiz.png"
                      alt="Mentora Interactive Quiz"
                      width={322}
                      height={658}
                      className="rounded-[28px] block w-full h-auto object-contain"
                    />
                  </div>
                </div>
              </div>
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
