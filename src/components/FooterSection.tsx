"use client";

import React from "react";
import { GitBranch, Send, Mail } from "lucide-react";

export function FooterSection() {
  return (
    <footer id="contact" className="py-14 bg-[#09090b] border-t border-white/[0.08] scroll-mt-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="font-medium text-sm text-white">
            Madi Alenov
          </div>
          <div className="text-xs text-[#71717a] mt-0.5">
            Backend & Systems Engineer • Distributed & Async Systems
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-[#a1a1aa]">
          <a
            href="https://github.com/alastrm"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <GitBranch className="w-3.5 h-3.5 text-[#06b6d4]" strokeWidth={1.5} />
            <span>GitHub</span>
          </a>

          <a
            href="https://t.me/hsokidam"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5 text-[#22c55e]" strokeWidth={1.5} />
            <span>Telegram</span>
          </a>

          <a
            href="mailto:alenovm1@gmail.com"
            className="hover:text-white transition-colors flex items-center gap-1.5"
          >
            <Mail className="w-3.5 h-3.5" strokeWidth={1.5} />
            <span>Email</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
