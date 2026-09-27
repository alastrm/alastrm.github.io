"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import {
  GitBranch,
  Send,
  Mail,
  ExternalLink,
  Terminal,
  Activity,
  Eye,
  Clock,
} from "lucide-react";
import { animate, stagger } from "animejs";
import {
  PythonIcon,
  DockerIcon,
  PostgresIcon,
  RedisIcon,
  FastApiIcon,
  LinuxIcon,
  SqliteIcon,
  TraefikIcon,
} from "@/components/TechIcons";

interface BentoGridProps {
  onOpenForgeModal: () => void;
}

export function BentoGrid({ onOpenForgeModal }: BentoGridProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Subtle Anime.js cascade entrance animation on initial load
  useEffect(() => {
    if (!containerRef.current) return;

    const cards = containerRef.current.querySelectorAll(".bento-card");
    if (cards.length > 0) {
      animate(cards, {
        opacity: [0, 1],
        translateY: [16, 0],
        duration: 600,
        delay: stagger(80),
        ease: "outQuad",
      });
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full max-w-6xl mx-auto flex flex-col justify-center gap-3 sm:gap-4 my-auto"
    >
      {/* Top Bar */}
      <header className="flex items-center justify-between py-1 px-1 text-xs font-mono text-[#71717a] shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-[#ededed] font-medium">Madi Alenov</span>
          <span className="hidden sm:inline text-white/30">•</span>
          <span className="hidden sm:inline text-[#a1a1aa]">Backend & Systems</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-1.5 text-[#a1a1aa]">
            <Clock className="w-3.5 h-3.5 text-[#06b6d4]" strokeWidth={1.5} />
            <span>Astana, KZ (UTC+5)</span>
          </div>
        </div>
      </header>

      {/* Main Bento Grid: 12 Columns, 2 Rows */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-3.5 items-stretch">
        {/* CARD 1: IDENTITY CARD (5 Cols) — Tight, intentional, zero dead space */}
        <div className="bento-card lg:col-span-5 bg-[#111114]/90 border border-white/[0.08] hover:border-white/[0.18] rounded-xl p-4 sm:p-5 flex flex-col justify-start gap-3 transition-all duration-300 group shadow-sm">
          {/* Avatar & Title Row */}
          <div className="flex items-center gap-3.5">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-xl overflow-hidden border border-white/10 bg-black/40 shrink-0 shadow-md">
              <Image
                src="/avatar.png"
                alt="Madi Alenov"
                fill
                sizes="64px"
                priority
                className="object-cover"
              />
            </div>

            <div>
              <h1
                className="font-display text-2xl sm:text-3xl font-normal tracking-tight text-white leading-tight"
                style={{ fontFamily: "var(--font-zodiak), Georgia, serif" }}
              >
                Madi Alenov
              </h1>
              <p className="text-xs font-mono text-[#06b6d4] mt-0.5">
                Backend & Systems
              </p>
              <div className="flex items-center gap-1 text-[11px] font-mono text-[#71717a] mt-0.5">
                <span>Astana, Kazakhstan</span>
              </div>
            </div>
          </div>

          {/* Conversational Bio */}
          <p className="text-xs sm:text-[13px] text-[#a1a1aa] leading-relaxed">
              Software Engineer focused on backend development and
              system architecture. Experienced in designing and building
              reliable web applications, solving technical problems, and
              contributing across the software development lifecycle.
          </p>



          {/* Contact Links — immediately follows focus block without awkward dead gap */}
          <div className="pt-2 border-t border-white/[0.06] flex flex-wrap items-center gap-2 font-mono text-xs mt-auto">
            <a
              href="https://github.com/alastrm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#18181c] border border-white/10 text-[#ededed] hover:border-white/30 hover:text-white transition-colors"
            >
              <GitBranch className="w-3.5 h-3.5 text-[#06b6d4]" strokeWidth={1.5} />
              <span>@alastrm</span>
              <ExternalLink className="w-3 h-3 text-[#71717a]" />
            </a>

            <a
              href="https://t.me/hsokidam"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#18181c] border border-white/10 text-[#ededed] hover:border-white/30 hover:text-white transition-colors"
            >
              <Send className="w-3.5 h-3.5 text-[#22c55e]" strokeWidth={1.5} />
              <span>@hsokidam</span>
            </a>

            <a
              href="mailto:alenovm1@gmail.com"
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-[#18181c] border border-white/10 text-[#ededed] hover:border-white/30 hover:text-white transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-[#06b6d4]" strokeWidth={1.5} />
              <span>alenovm1@gmail.com</span>
            </a>
          </div>
        </div>

        {/* CARD 2: FEATURED PROJECT CARD — FORGE (7 Cols) */}
        <div className="bento-card lg:col-span-7 bg-[#111114]/90 border border-white/[0.08] hover:border-[#06b6d4]/40 rounded-xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 relative group shadow-sm overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#06b6d4]/5 rounded-full blur-3xl pointer-events-none" />

          <div>
            {/* Header & Badges */}
            <div className="flex items-center justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
              </div>

              <span className="text-[10px] font-mono text-[#71717a]">
                SQLite WAL • Traefik
              </span>
            </div>

            {/* Title with Explicit Zodiak Display Typeface */}
            <div className="mb-2.5">
              <h2
                className="font-display text-2xl sm:text-3xl font-normal tracking-tight text-white flex items-center gap-2"
                style={{ fontFamily: "var(--font-zodiak), Georgia, serif" }}
              >
                Forge Orchestrator
              </h2>
              <p className="text-xs sm:text-[13px] text-[#a1a1aa] leading-relaxed mt-1">
                Zero-downtime container orchestrator & single-node control plane. Features an explicit SQLite
                finite state machine, auto-reconciliation, and weighted Traefik blue/green proxying with zero Celery/Redis dependencies.
              </p>
            </div>

            {/* Static Preview / Mini Architecture Diagram */}
            <div className="p-3 bg-[#09090b] border border-white/[0.06] rounded-lg font-mono text-[11px] mb-2.5">
              <div className="flex items-center justify-between text-[10px] text-[#71717a] mb-2 pb-1.5 border-b border-white/[0.04]">
                <span>STATE RECONCILIATION & TRAFFIC SHIFT</span>
                <span className="text-[#22c55e] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                  Traefik Routing
                </span>
              </div>

              {/* State Machine Steps Mini Bar */}
              <div className="flex items-center gap-1.5 text-[10px] text-[#71717a] mb-2 overflow-x-auto">
                <span className="px-1.5 py-0.5 rounded bg-white/[0.04]">PENDING</span>
                <span>➔</span>
                <span className="px-1.5 py-0.5 rounded bg-white/[0.04]">STARTING</span>
                <span>➔</span>
                <span className="px-1.5 py-0.5 rounded bg-white/[0.04]">HEALTH_CHECK</span>
                <span>➔</span>
                <span className="px-1.5 py-0.5 rounded bg-[#22c55e]/15 text-[#22c55e] border border-[#22c55e]/30 font-semibold">
                  ACTIVE
                </span>
              </div>

              {/* Dual Pool Preview Bars */}
              <div className="grid grid-cols-2 gap-2 text-[10px]">
                <div className="p-2 rounded bg-black/40 border border-[#22c55e]/20">
                  <div className="flex justify-between text-[#71717a] mb-1">
                    <span className="text-white font-medium">Blue Pool (v1.2.0)</span>
                    <span className="text-[#22c55e]">100%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#22c55e] w-full" />
                  </div>
                </div>

                <div className="p-2 rounded bg-black/40 border border-white/[0.04]">
                  <div className="flex justify-between text-[#71717a] mb-1">
                    <span className="text-[#a1a1aa]">Green Pool (v1.3.0)</span>
                    <span className="text-[#71717a]">0%</span>
                  </div>
                  <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-[#06b6d4] w-0" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Action Trigger Button */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] font-mono text-[#71717a]">

            </span>

            <button
              onClick={onOpenForgeModal}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-white text-black hover:bg-zinc-200 text-xs font-mono font-medium transition-all active:scale-[0.98] cursor-pointer shadow-sm"
            >
              <Eye className="w-3.5 h-3.5 text-black" strokeWidth={1.5} />
              <span>View project & demo</span>
            </button>
          </div>
        </div>

        {/* CARD 3: SKILLS / STACK CARD (5 Cols) — No corner badge to break uniformity */}
        <div className="bento-card lg:col-span-5 bg-[#111114]/90 border border-white/[0.08] hover:border-white/[0.18] rounded-xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 shadow-sm">
          <div>
            {/* Title with display font, clean without repetitive corner badge */}
            <div className="flex items-center gap-2 mb-3">
              <Terminal className="w-4 h-4 text-[#06b6d4]" strokeWidth={1.5} />
              <h2
                className="font-display text-lg sm:text-xl font-normal tracking-tight text-white"
                style={{ fontFamily: "var(--font-zodiak), Georgia, serif" }}
              >
                Core Engineering Stack
              </h2>
            </div>

            {/* Recognizable Brand Icons Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
              <div className="p-2.5 rounded-lg bg-[#09090b] border border-white/[0.06] hover:border-white/20 transition-colors flex items-center gap-2.5">
                <PythonIcon className="w-4 h-4 shrink-0" />
                <div className="overflow-hidden">
                  <div className="text-white font-medium text-[11px] leading-tight">Python</div>
                  <div className="text-[9px] text-[#71717a]">FastAPI / Async</div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#09090b] border border-white/[0.06] hover:border-white/20 transition-colors flex items-center gap-2.5">
                <DockerIcon className="w-4 h-4 shrink-0" />
                <div className="overflow-hidden">
                  <div className="text-white font-medium text-[11px] leading-tight">Docker</div>
                  <div className="text-[9px] text-[#71717a]">Containers / API</div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#09090b] border border-white/[0.06] hover:border-white/20 transition-colors flex items-center gap-2.5">
                <PostgresIcon className="w-4 h-4 shrink-0" />
                <div className="overflow-hidden">
                  <div className="text-white font-medium text-[11px] leading-tight">PostgreSQL</div>
                  <div className="text-[9px] text-[#71717a]">Relational Data</div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#09090b] border border-white/[0.06] hover:border-white/20 transition-colors flex items-center gap-2.5">
                <RedisIcon className="w-4 h-4 shrink-0" />
                <div className="overflow-hidden">
                  <div className="text-white font-medium text-[11px] leading-tight">Redis</div>
                  <div className="text-[9px] text-[#71717a]">Streams / Cache</div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#09090b] border border-white/[0.06] hover:border-white/20 transition-colors flex items-center gap-2.5">
                <FastApiIcon className="w-4 h-4 shrink-0" />
                <div className="overflow-hidden">
                  <div className="text-white font-medium text-[11px] leading-tight">FastAPI</div>
                  <div className="text-[9px] text-[#71717a]">REST / High-QPS</div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#09090b] border border-white/[0.06] hover:border-white/20 transition-colors flex items-center gap-2.5">
                <SqliteIcon className="w-4 h-4 shrink-0" />
                <div className="overflow-hidden">
                  <div className="text-white font-medium text-[11px] leading-tight">SQLite</div>
                  <div className="text-[9px] text-[#71717a]">WAL / Embedded</div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#09090b] border border-white/[0.06] hover:border-white/20 transition-colors flex items-center gap-2.5">
                <TraefikIcon className="w-4 h-4 shrink-0" />
                <div className="overflow-hidden">
                  <div className="text-white font-medium text-[11px] leading-tight">Traefik</div>
                  <div className="text-[9px] text-[#71717a]">Dynamic Reverse Proxy</div>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#09090b] border border-white/[0.06] hover:border-white/20 transition-colors flex items-center gap-2.5">
                <LinuxIcon className="w-4 h-4 shrink-0" />
                <div className="overflow-hidden">
                  <div className="text-white font-medium text-[11px] leading-tight">Linux</div>
                  <div className="text-[9px] text-[#71717a]">Kernel / NetNS</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CARD 4: GITHUB / ACTIVITY STAT CARD (4 Cols) */}
        <div className="bento-card lg:col-span-4 bg-[#111114]/90 border border-white/[0.08] hover:border-white/[0.18] rounded-xl p-4 sm:p-5 flex flex-col justify-between transition-all duration-300 shadow-sm">
          <div>
            {/* Header with Title & Link */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <GitBranch className="w-4 h-4 text-[#06b6d4]" strokeWidth={1.5} />
                <h2
                  className="font-display text-lg sm:text-xl font-normal tracking-tight text-white"
                  style={{ fontFamily: "var(--font-zodiak), Georgia, serif" }}
                >
                  GitHub Activity
                </h2>
              </div>
              <a
                href="https://github.com/alastrm"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[11px] font-mono text-[#06b6d4] hover:underline flex items-center gap-1"
              >
                <span>@alastrm</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>

            {/* Real verified numbers */}
            <div className="grid grid-cols-3 gap-2 font-mono mb-3">
              <div className="p-2.5 rounded-lg bg-[#09090b] border border-white/[0.06] text-center">
                <div className="text-xl font-bold text-white leading-none mb-1">7</div>
                <div className="text-[10px] text-[#71717a]">Public Repos</div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#09090b] border border-white/[0.06] text-center">
                <div className="text-xl font-bold text-[#22c55e] leading-none mb-1">105</div>
                <div className="text-[10px] text-[#71717a]">Unit Tests</div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#09090b] border border-white/[0.06] text-center">
                <div className="text-xl font-bold text-[#06b6d4] leading-none mb-1">0</div>
                <div className="text-[10px] text-[#71717a]">External Deps</div>
              </div>
            </div>

            <div className="p-2 bg-[#09090b] border border-white/[0.04] rounded-lg font-mono text-[10px] text-[#a1a1aa] flex items-center justify-between">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3 h-3 text-[#22c55e]" />
                <span>Active Language: Python & Go</span>
              </span>
              <span className="text-[#22c55e]">CI Passing</span>
            </div>
          </div>
        </div>

        {/* CARD 5: QUIET BREATHING QUOTE CARD (3 Cols) — No badge, no metadata grid */}
        <div className="bento-card lg:col-span-3 bg-[#111114]/90 border border-white/[0.08] hover:border-white/[0.18] rounded-xl p-5 sm:p-6 flex flex-col justify-between transition-all duration-300 shadow-sm relative overflow-hidden">
          <div className="flex-1 flex flex-col justify-center my-auto py-2">
            <blockquote
              className="font-display text-xl sm:text-2xl text-white font-normal leading-snug tracking-tight"
              style={{ fontFamily: "var(--font-zodiak), Georgia, serif" }}
            >
              &ldquo;Hesitation — is defeat.&rdquo;
            </blockquote>
          </div>

          <div className="pt-3 border-t border-white/[0.06] text-xs font-mono text-[#71717a]">
            — Isshin Ashina
          </div>
        </div>
      </div>

      {/* Minimal Bottom Bar */}
      <footer className="flex flex-col sm:flex-row items-center justify-between py-1 px-1 text-[11px] font-mono text-[#71717a] shrink-0 border-t border-white/[0.06]">
        <div>
          © 2026 Madi Alenov
        </div>

        <div className="flex items-center gap-3 mt-1 sm:mt-0">
          <a
            href="https://github.com/alastrm"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            GitHub
          </a>
          <span>/</span>
          <a
            href="https://t.me/hsokidam"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors"
          >
            Telegram
          </a>
          <span>/</span>
          <a
            href="mailto:alenovm1@gmail.com"
            className="hover:text-white transition-colors"
          >
            Email
          </a>
        </div>
      </footer>
    </div>
  );
}
