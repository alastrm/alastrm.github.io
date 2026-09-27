"use client";

import React, { useState } from "react";
import { GitBranch, Send, Menu, X } from "lucide-react";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-[#09090b]/90 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
        {/* Brand / Name */}
        <a
          href="#"
          className="flex items-center gap-2.5 text-white hover:text-white/80 transition-colors group"
        >
          <div className="w-7 h-7 rounded-sm bg-[#16161a] border border-white/10 flex items-center justify-center font-mono text-xs font-semibold text-[#ededed] group-hover:border-white/30 transition-colors">
            MA
          </div>
          <div className="flex flex-col">
            <span className="font-medium text-sm text-[#ededed] tracking-tight">
              Madi Alenov
            </span>
            <span className="font-mono text-[10px] text-[#71717a] -mt-0.5">
              Backend & Systems
            </span>
          </div>
        </a>

        {/* Navigation Anchors */}
        <nav className="hidden md:flex items-center gap-6 text-xs text-[#a1a1aa]">
          <a
            href="#focus"
            className="hover:text-white transition-colors"
          >
            Focus & Craft
          </a>
          <a
            href="#forge"
            className="hover:text-white transition-colors flex items-center gap-1"
          >
            <span>Forge</span>
            <span className="font-mono text-[9px] px-1 py-0.2 bg-white/10 text-white/80 rounded-xs">
              PaaS
            </span>
          </a>
          <a
            href="#contact"
            className="hover:text-white transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Action Direct Links */}
        <div className="hidden sm:flex items-center gap-2 text-xs font-mono">
          <a
            href="https://github.com/alastrm"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-white/10 bg-[#121215] text-[#ededed] hover:border-white/30 hover:text-white transition-colors"
          >
            <GitBranch className="w-3.5 h-3.5 text-[#06b6d4]" strokeWidth={1.5} />
            <span>GitHub</span>
          </a>

          <a
            href="https://t.me/hsokidam"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-sm border border-white/10 bg-[#121215] text-[#a1a1aa] hover:border-white/30 hover:text-white transition-colors"
          >
            <Send className="w-3.5 h-3.5 text-[#22c55e]" strokeWidth={1.5} />
            <span>Telegram</span>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden text-[#a1a1aa] hover:text-white p-1"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/[0.08] bg-[#09090b] px-4 py-3 space-y-2 text-sm">
          <a
            href="#focus"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 text-[#a1a1aa] hover:text-white"
          >
            Focus & Craft
          </a>
          <a
            href="#forge"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 text-[#a1a1aa] hover:text-white"
          >
            Forge Orchestrator
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-1 text-[#a1a1aa] hover:text-white"
          >
            Contact
          </a>
          <div className="pt-2 border-t border-white/[0.06] flex items-center gap-2">
            <a
              href="https://github.com/alastrm"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-1.5 border border-white/10 rounded-sm text-xs font-mono"
            >
              GitHub
            </a>
            <a
              href="https://t.me/hsokidam"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 text-center py-1.5 border border-white/10 rounded-sm text-xs font-mono"
            >
              Telegram
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
