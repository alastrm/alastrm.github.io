"use client";

import React from "react";
import {
  Terminal,
  Activity,
  Layers,
  ArrowRight,
  GitBranch,
  Server,
  Zap,
  ShieldCheck,
} from "lucide-react";

export function Hero() {
  const telemetryMetrics = [
    {
      label: "DEPLOYMENT DOWNTIME",
      value: "0ms",
      subtext: "Graceful drain via Traefik weighted service swaps",
      icon: ShieldCheck,
      color: "text-[#22c55e]",
      border: "border-[#22c55e]/20",
    },
    {
      label: "ROUTE SWITCHING LATENCY",
      value: "< 15ms",
      subtext: "Atomic ingress router reweighting without TCP RST",
      icon: Zap,
      color: "text-[#06b6d4]",
      border: "border-[#06b6d4]/20",
    },
    {
      label: "STATE CONSISTENCY",
      value: "Strict Linearizable",
      subtext: "Deterministic state machine preventing split-brain",
      icon: Layers,
      color: "text-[#ededed]",
      border: "border-white/[0.12]",
    },
    {
      label: "ASYNC INGESTION",
      value: "18.5k req/s",
      subtext: "p99 4.2ms Redis Streams distribution pipeline",
      icon: Activity,
      color: "text-[#22c55e]",
      border: "border-[#22c55e]/20",
    },
  ];

  return (
    <section className="relative isolate z-10 pt-24 pb-16 md:pt-32 md:pb-24 border-b border-white/[0.08] overflow-hidden bg-grid-pattern">
      {/* Background radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#06b6d4]/[0.025] blur-[120px] pointer-events-none rounded-full" />
      <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-[#22c55e]/[0.02] blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* System Spec Header Tag */}
        <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1 mb-6 border border-white/[0.1] bg-[#111114] text-[11px] font-mono tracking-wider text-[#a1a1aa] rounded-xs">
          <span className="flex items-center gap-1.5 text-[#22c55e]">
            <Server className="w-3.5 h-3.5 text-[#22c55e]" strokeWidth={1.5} />
            <span>SYS_ARCH_V2.6</span>
          </span>
          <span className="text-white/20">|</span>
          <span className="text-[#a1a1aa]">SPEC-DRIVEN INFRASTRUCTURE</span>
          <span className="text-white/20">|</span>
          <span className="text-[#06b6d4]">ZERO-DOWNTIME PRIMITIVES</span>
        </div>

        {/* Display Title in Zodiak Font */}
        <h1 className="font-[family-name:var(--font-zodiak)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal tracking-tight text-[#ededed] leading-[1.08] max-w-5xl mb-6">
          Architecting{" "}
          <span className="italic font-light text-white underline decoration-white/20 decoration-1 underline-offset-8">
            zero-downtime
          </span>{" "}
          systems and resilient backend infrastructure.
        </h1>

        {/* Engineering Manifesto */}
        <p className="font-mono text-sm sm:text-base text-[#a1a1aa] max-w-3xl leading-relaxed mb-10">
          Dedicated to eliminating failure domains in high-throughput environments.
          Specialized in deterministic state machines, Docker Engine API orchestration, 
          atomic Traefik ingress routing, and low-latency asynchronous event streams.
          Zero marketing fluff — pure systems engineering and verifiable telemetry.
        </p>

        {/* Action Triggers */}
        <div className="flex flex-wrap items-center gap-3 mb-16 font-mono text-xs">
          <a
            href="#architecture"
            className="flex items-center gap-2 px-5 py-3 bg-[#ededed] text-[#08080a] font-medium hover:bg-white transition-colors rounded-xs shadow-sm group"
          >
            <span>INSPECT TOPOLOGY</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
          </a>

          <a
            href="#forge"
            className="flex items-center gap-2 px-5 py-3 border border-white/[0.15] bg-[#111114] text-[#ededed] hover:border-white/[0.3] hover:bg-[#16161a] transition-colors rounded-xs"
          >
            <GitBranch className="w-3.5 h-3.5 text-[#06b6d4]" strokeWidth={1.5} />
            <span>FORGE ORCHESTRATOR RFC</span>
          </a>

          <a
            href="#telemetry"
            className="flex items-center gap-2 px-5 py-3 border border-white/[0.15] bg-[#111114] text-[#ededed] hover:border-[#22c55e]/50 hover:text-[#22c55e] transition-colors rounded-xs"
          >
            <Terminal className="w-3.5 h-3.5 text-[#22c55e]" strokeWidth={1.5} />
            <span>RUN CLI EMULATOR</span>
          </a>
        </div>

        {/* Telemetry Ticker Ribbon */}
        <div className="border border-white/[0.08] bg-[#111114]/90 p-4 sm:p-6 rounded-xs">
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-white/[0.06] text-[11px] font-mono text-[#71717a]">
            <span className="flex items-center gap-2 text-[#ededed]">
              <Activity className="w-3.5 h-3.5 text-[#22c55e]" strokeWidth={1.5} />
              PRODUCTION TELEMETRY BENCHMARKS
            </span>
            <span className="hidden sm:inline">MEASURED UNDER 25,000 CONCURRENT CLIENTS</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {telemetryMetrics.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.label}
                  className={`p-3.5 bg-[#08080a] border ${item.border} rounded-xs flex flex-col justify-between`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono tracking-wider text-[#71717a]">
                      {item.label}
                    </span>
                    <Icon className={`w-3.5 h-3.5 ${item.color}`} strokeWidth={1.5} />
                  </div>
                  <div className={`font-mono text-2xl font-semibold tracking-tight ${item.color} mb-1`}>
                    {item.value}
                  </div>
                  <p className="text-[11px] font-mono text-[#a1a1aa] leading-tight">
                    {item.subtext}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Operational invariants footer line */}
          <div className="mt-4 pt-3 border-t border-white/[0.04] flex flex-wrap items-center justify-between gap-3 text-[10px] font-mono text-[#71717a]">
            <div className="flex items-center gap-4">
              <span>SUPERVISOR: Traefik v3.1-CE</span>
              <span className="text-white/10">•</span>
              <span>ORCHESTRATOR: Forge Event Engine</span>
              <span className="text-white/10">•</span>
              <span>ENGINE: Docker 26.1 / containerd</span>
            </div>
            <div className="text-[#22c55e] flex items-center gap-1.5">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
              SLA GUARANTEE: 99.999%
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
