"use client";

import React from "react";
import {
  GitBranch,
  Mail,
  ExternalLink,
  Cpu,
  Send,
} from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="py-16 md:py-20 bg-[#08080a] border-t border-white/[0.08] font-mono text-xs relative isolate z-10 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12">
          {/* Col 1: Identity & Engineering Philosophy */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <span className="flex items-center justify-center w-6 h-6 border border-white/20 bg-[#111114] text-[11px] font-semibold tracking-wider text-[#ededed]">
                AM
              </span>
              <span className="font-semibold text-sm tracking-wider">
                Alenov Madi
              </span>
            </div>
            <p className="text-[#a1a1aa] text-xs leading-relaxed max-w-sm">
              Backend & Systems Engineer. Engineering zero-downtime container
              orchestration, resilient asynchronous pipelines, and low-latency
              distributed infrastructure.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-[#71717a]">
              <span className="inline-block w-2 h-2 rounded-full bg-[#22c55e]" />
              <span>CURRENT DISPOSITION: OPEN TO SYSTEMS & BACKEND ROLES</span>
            </div>
          </div>

          {/* Col 2: System Specs / Production Stack (Replaced fake PGP block) */}
          <div className="md:col-span-4 space-y-3">
            <div className="flex items-center gap-2 text-[#ededed] font-semibold text-xs">
              <Cpu className="w-3.5 h-3.5 text-[#06b6d4]" strokeWidth={1.5} />
              <span>CORE SYSTEM SPECS & STACK</span>
            </div>
            <div className="p-3 bg-[#111114] border border-white/[0.08] rounded-xs space-y-2 text-[10px]">
              <div className="flex items-start justify-between border-b border-white/[0.04] pb-1.5">
                <span className="text-[#71717a]">RUNTIME:</span>
                <span className="text-[#ededed]">Linux x86_64 / Cgroups v2</span>
              </div>
              <div className="flex items-start justify-between border-b border-white/[0.04] pb-1.5">
                <span className="text-[#71717a]">ORCHESTRATION:</span>
                <span className="text-[#ededed]">Docker Engine API · Traefik v3.1</span>
              </div>
              <div className="flex items-start justify-between border-b border-white/[0.04] pb-1.5">
                <span className="text-[#71717a]">PIPELINE / APIS:</span>
                <span className="text-[#ededed]">Python 3.12 (asyncio) · FastAPI</span>
              </div>
              <div className="flex items-start justify-between">
                <span className="text-[#71717a]">DATA / STREAMS:</span>
                <span className="text-[#22c55e]">Redis 7 Streams · PostgreSQL 16</span>
              </div>
            </div>
          </div>

          {/* Col 3: Direct Connect & Links */}
          <div className="md:col-span-3 space-y-3">
            <div className="text-[#ededed] font-semibold text-xs">
              DIRECT PROTOCOLS
            </div>
            <div className="space-y-2">
              <a
                href="https://github.com/alastrm"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 bg-[#111114] border border-white/[0.08] text-[#ededed] hover:border-[#06b6d4]/50 hover:text-[#06b6d4] transition-colors rounded-xs"
              >
                <span className="flex items-center gap-2">
                  <GitBranch className="w-3.5 h-3.5 text-[#06b6d4]" strokeWidth={1.5} />
                  <span>github.com/alastrm</span>
                </span>
                <ExternalLink className="w-3 h-3 text-[#71717a]" strokeWidth={1.5} />
              </a>

              <a
                href="mailto:alenovm1@gmail.com"
                className="flex items-center justify-between p-2.5 bg-[#111114] border border-white/[0.08] text-[#ededed] hover:border-[#22c55e]/50 hover:text-[#22c55e] transition-colors rounded-xs"
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-[#22c55e]" strokeWidth={1.5} />
                  <span>alenovm1@gmail.com</span>
                </span>
                <ExternalLink className="w-3 h-3 text-[#71717a]" strokeWidth={1.5} />
              </a>

              <a
                href="https://t.me/hsokidam"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 bg-[#111114] border border-white/[0.08] text-[#ededed] hover:border-[#22c55e]/50 hover:text-[#22c55e] transition-colors rounded-xs"
              >
                <span className="flex items-center gap-2">
                  <Send className="w-3.5 h-3.5 text-[#22c55e]" strokeWidth={1.5} />
                  <span>telegram: @hsokidam</span>
                </span>
                <ExternalLink className="w-3 h-3 text-[#71717a]" strokeWidth={1.5} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Hardware Invariants Bar */}
        <div className="pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-[#71717a]">
          <div>
            © {new Date().getFullYear()} ALENOV MADI. SPEC-DRIVEN SYSTEMS ARCHITECTURE.
          </div>
          <div className="flex items-center gap-3">
            <span>ENGINEERING PORTFOLIO</span>
            <span className="text-white/20">•</span>
            <span>AESTHETICS: SURGICAL MONOCHROME</span>
            <span className="text-white/20">•</span>
            <span className="text-[#22c55e]">ZERO EMOJIS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
