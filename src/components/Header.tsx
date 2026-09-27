"use client";

import React, { useState, useEffect } from "react";
import { GitBranch, Send } from "lucide-react";

export function Header() {
  const [currentTime, setCurrentTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toISOString().replace("T", " ").substring(0, 19) + " UTC"
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const navItems = [
    { label: "ARCHITECTURE", href: "#architecture", id: "01" },
    { label: "FORGE_RFC", href: "#forge", id: "02" },
    { label: "PIPELINE", href: "#pipeline", id: "03" },
    { label: "TELEMETRY", href: "#telemetry", id: "04" },
    { label: "CONTACT", href: "#contact", id: "05" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.08] bg-[#08080a] shadow-lg shadow-black/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between font-mono text-xs">
        {/* Brand & Identity */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            className="flex items-center gap-2.5 text-white hover:text-[#22c55e] transition-colors group"
          >
            <span className="flex items-center justify-center w-6 h-6 border border-white/20 bg-[#111114] text-[11px] font-semibold tracking-wider text-[#ededed] group-hover:border-[#22c55e] group-hover:text-[#22c55e] transition-colors">
              AM
            </span>
            <div className="flex flex-col">
              <span className="font-semibold tracking-wider text-[12px] text-white">
                Alenov Madi
              </span>
              <span className="text-[10px] text-[#71717a] tracking-tight">
                Backend & Systems Engineer
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-white/[0.08] text-[11px] text-[#71717a]">
            <span>NODE: frankfurt-dc01</span>
            <span className="text-white/20">/</span>
            <span>PING: 1.2ms</span>
          </div>
        </div>

        {/* Navigation Dock */}
        <nav className="hidden md:flex items-center gap-1 border border-white/[0.08] bg-[#111114] px-2 py-1 rounded-xs">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="px-2.5 py-1 text-[11px] tracking-wider text-[#a1a1aa] hover:text-white hover:bg-white/[0.05] rounded-xs transition-colors flex items-center gap-1.5"
            >
              <span className="text-[9px] text-[#71717a] font-normal">[{item.id}]</span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Clean Engineering Links (No fake AI status badges) */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/alastrm"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-2.5 py-1 border border-white/[0.1] bg-[#111114] hover:border-white/30 text-[#ededed] hover:text-white transition-colors rounded-xs text-[11px]"
          >
            <GitBranch className="w-3.5 h-3.5 text-[#06b6d4]" strokeWidth={1.5} />
            <span className="hidden sm:inline">github.com/</span>
            <span>alastrm</span>
          </a>

          <a
            href="https://t.me/hsokidam"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 border border-white/[0.1] bg-[#111114] hover:border-[#22c55e]/40 text-[#a1a1aa] hover:text-[#22c55e] transition-colors rounded-xs text-[11px]"
          >
            <Send className="w-3 h-3 text-[#22c55e]" strokeWidth={1.5} />
            <span>@hsokidam</span>
          </a>

          <div className="hidden xl:block text-[10px] text-[#71717a] font-mono">
            {currentTime || "2026-09-27 15:28:00 UTC"}
          </div>
        </div>
      </div>
    </header>
  );
}
