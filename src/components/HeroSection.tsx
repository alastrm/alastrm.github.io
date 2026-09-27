"use client";

import React, { useEffect, useRef } from "react";
import { GitBranch, Send, Mail } from "lucide-react";
import { createTimeline, remove, animate } from "animejs";

export function HeroSection() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const pulseDotRef = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const elements = heroRef.current.querySelectorAll(".hero-cascade");
    if (!elements || elements.length === 0) return;

    // Timeline cascade entrance in Anime.js v4
    const tl = createTimeline({
      defaults: {
        duration: 850,
        ease: "outExpo",
      },
    });

    elements.forEach((el, idx) => {
      tl.add(
        el,
        {
          opacity: [0, 1],
          translateY: [24, 0],
        },
        idx * 110
      );
    });

    // In Anime.js v4, explicitly start timeline playback
    tl.play();

    // Pulse animation for the green status diode
    const pulseDot = pulseDotRef.current;
    let pulseAnim: { cancel: () => void } | null = null;
    if (pulseDot) {
      pulseAnim = animate(pulseDot, {
        scale: [1, 1.45, 1],
        opacity: [0.7, 1, 0.7],
        duration: 1800,
        loop: true,
        ease: "inOutSine",
      });
    }

    return () => {
      tl.cancel();
      if (pulseAnim) pulseAnim.cancel();
      remove(elements);
      if (pulseDot) remove(pulseDot);
    };
  }, []);

  const handleButtonHover = (e: React.MouseEvent<HTMLElement>) => {
    animate(e.currentTarget, {
      scale: 1.03,
      translateY: -2,
      duration: 250,
      ease: "outQuad",
    });
  };

  const handleButtonLeave = (e: React.MouseEvent<HTMLElement>) => {
    animate(e.currentTarget, {
      scale: 1,
      translateY: 0,
      duration: 300,
      ease: "outQuad",
    });
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 border-b border-white/[0.08] bg-subtle-grid overflow-hidden">
      <div
        ref={heroRef}
        className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-start"
      >
        {/* Status Tag */}
        <div className="hero-cascade inline-flex items-center gap-2 px-2.5 py-1 mb-6 rounded-full border border-white/10 bg-[#121215] text-xs font-mono text-[#a1a1aa]">
          <span
            ref={pulseDotRef}
            className="w-1.5 h-1.5 rounded-full bg-[#22c55e] inline-block"
          />
          <span>Backend Engineer • Distributed & Async Systems</span>
        </div>

        {/* Human Name Headline */}
        <h1 className="hero-cascade text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[1.1] mb-6">
          Madi Alenov
        </h1>

        {/* Concise Engineering Manifesto */}
        <p className="hero-cascade text-base sm:text-lg md:text-xl text-[#a1a1aa] leading-relaxed max-w-2xl mb-8 font-normal">
          Building high-throughput backend services, deterministic state machines,
          and zero-downtime container infrastructure. I focus on clean architecture,
          low-latency APIs, and eliminating single points of failure.
        </p>

        {/* Minimalist Action Buttons with Kinetic Anime.js Hover Reaction */}
        <div className="hero-cascade flex flex-wrap items-center gap-3 font-mono text-xs">
          <a
            href="https://github.com/alastrm"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            className="flex items-center gap-2 px-4 py-2.5 rounded-sm bg-white text-black font-medium hover:bg-zinc-200 transition-colors cursor-pointer"
          >
            <GitBranch className="w-3.5 h-3.5 text-black" strokeWidth={1.5} />
            <span>github.com/alastrm</span>
          </a>

          <a
            href="https://t.me/hsokidam"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            className="flex items-center gap-2 px-4 py-2.5 rounded-sm border border-white/10 bg-[#121215] text-[#ededed] hover:border-[#22c55e]/50 hover:text-[#22c55e] transition-colors cursor-pointer"
          >
            <Send className="w-3.5 h-3.5 text-[#22c55e]" strokeWidth={1.5} />
            <span>@hsokidam</span>
          </a>

          <a
            href="mailto:alenovm1@gmail.com"
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            className="flex items-center gap-2 px-4 py-2.5 rounded-sm border border-white/10 bg-[#121215] text-[#a1a1aa] hover:border-white/30 hover:text-white transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>alenovm1@gmail.com</span>
          </a>
        </div>

        {/* Quick Tech Highlights */}
        <div className="hero-cascade mt-12 pt-8 border-t border-white/[0.06] w-full flex flex-wrap items-center gap-y-2 gap-x-6 text-xs font-mono text-[#71717a]">
          <div className="flex items-center gap-1.5">
            <span className="text-[#a1a1aa]">Stack:</span>
            <span className="text-[#ededed]">Python, FastAPI, Django</span>
          </div>
          <div className="hidden sm:inline text-white/20">•</div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#a1a1aa]">Data:</span>
            <span className="text-[#ededed]">PostgreSQL, Redis</span>
          </div>
          <div className="hidden sm:inline text-white/20">•</div>
          <div className="flex items-center gap-1.5">
            <span className="text-[#a1a1aa]">Deployments:</span>
            <span className="text-[#ededed]">Docker, Traefik, SQLite WAL</span>
          </div>
        </div>
      </div>
    </section>
  );
}
