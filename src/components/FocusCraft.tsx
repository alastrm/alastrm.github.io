"use client";

import React, { useEffect, useRef } from "react";
import { Layers, Terminal, Database, Server } from "lucide-react";
import { animate, remove } from "animejs";

interface CraftCard {
  title: string;
  category: string;
  description: string;
  stack: string[];
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  accentColor: string;
}

const craftCards: CraftCard[] = [
  {
    title: "Architecture",
    category: "SYSTEM DESIGN & PRINCIPLES",
    description:
      "Spec-driven development, deterministic state machines, and domain-driven modularity. Designing systems that are easy to reason about and resilient under failure.",
    stack: ["Clean Architecture", "State Machines", "Spec-Driven", "Event Invariants"],
    icon: Layers,
    accentColor: "group-hover:text-[#06b6d4]",
  },
  {
    title: "Core Backend",
    category: "RUNTIMES & APIS",
    description:
      "Building high-throughput asynchronous services and pragmatic REST/RPC APIs. Heavy emphasis on concurrency handling, connection pooling, and non-blocking I/O.",
    stack: ["Python 3.10+", "FastAPI", "Django", "Asyncio / UVLoop"],
    icon: Terminal,
    accentColor: "group-hover:text-[#22c55e]",
  },
  {
    title: "Data & Streams",
    category: "STORAGE & PIPELINES",
    description:
      "Relational modeling and high-frequency caching. Implementing event ingestion pipelines, transactional guarantees, and stream consumer groups with backpressure.",
    stack: ["PostgreSQL", "Redis Streams", "Caching", "SQLite WAL"],
    icon: Database,
    accentColor: "group-hover:text-[#06b6d4]",
  },
  {
    title: "Infrastructure",
    category: "CONTAINERS & ROUTING",
    description:
      "Single-node and cluster orchestration, isolated bridge networks, dynamic reverse proxying, and zero-downtime rolling container replacements.",
    stack: ["Docker Engine", "Traefik Ingress", "Blue-Green", "Cgroups v2"],
    icon: Server,
    accentColor: "group-hover:text-[#22c55e]",
  },
];

export function FocusCraft() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const cards = containerRef.current.querySelectorAll(".craft-card-anim");
    if (!cards || cards.length === 0) return;

    const anim = animate(cards, {
      opacity: [0, 1],
      translateY: [20, 0],
      delay: (_el, i) => (i ?? 0) * 90 + 200,
      duration: 700,
      ease: "outExpo",
    });

    return () => {
      anim.cancel();
      remove(cards);
    };
  }, []);

  const handleCardEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    animate(e.currentTarget, {
      translateY: -4,
      scale: 1.01,
      duration: 250,
      ease: "outQuad",
    });
  };

  const handleCardLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    animate(e.currentTarget, {
      translateY: 0,
      scale: 1,
      duration: 300,
      ease: "outQuad",
    });
  };

  return (
    <section id="focus" className="py-20 md:py-24 border-b border-white/[0.08] bg-[#09090b] scroll-mt-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="mb-12">
          <div className="text-xs font-mono text-[#71717a] uppercase tracking-wider mb-2">
            Focus & Craft
          </div>
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
            Areas of expertise & core technologies
          </h2>
          <p className="text-sm text-[#a1a1aa] mt-2 max-w-xl">
            A balanced approach between pragmatic software engineering, asynchronous
            runtimes, and resilient container platforms.
          </p>
        </div>

        {/* 4 Cards Grid */}
        <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {craftCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.title}
                onMouseEnter={handleCardEnter}
                onMouseLeave={handleCardLeave}
                className="craft-card-anim group p-6 rounded-sm border border-white/[0.08] bg-[#111114] hover:border-white/25 transition-colors flex flex-col justify-between cursor-default"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-[10px] tracking-wider text-[#71717a]">
                      {card.category}
                    </span>
                    <Icon
                      className={`w-4 h-4 text-[#a1a1aa] ${card.accentColor} transition-colors`}
                      strokeWidth={1.5}
                    />
                  </div>

                  <h3 className="text-lg font-medium text-[#ededed] mb-2">
                    {card.title}
                  </h3>

                  <p className="text-xs text-[#a1a1aa] leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/[0.04]">
                  {card.stack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded-xs bg-[#09090b] border border-white/[0.06] font-mono text-[11px] text-[#ededed]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
