"use client";

import React, { useState } from "react";
import { BentoGrid } from "@/components/BentoGrid";
import { ForgeModal } from "@/components/ForgeModal";
import { NetworkTopologyBackground } from "@/components/NetworkTopologyBackground";

export default function Home() {
  const [isForgeModalOpen, setIsForgeModalOpen] = useState<boolean>(false);

  return (
    <main className="min-h-screen lg:h-screen lg:max-h-screen overflow-y-auto lg:overflow-hidden bg-[#09090b] text-[#ededed] flex flex-col justify-between p-3 sm:p-5 lg:p-6 relative selection:bg-[#22c55e]/25 selection:text-white">
      {/* Network Topology Lines & Traveling Packets Background */}
      <NetworkTopologyBackground />

      {/* Subtle background ambient glow for depth & taste */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-[radial-gradient(ellipse_at_top,rgba(6,182,212,0.06),transparent_70%)] pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_bottom_right,rgba(34,197,94,0.04),transparent_70%)] pointer-events-none z-0" />

      {/* Bento Grid */}
      <div className="relative z-10 w-full h-full flex flex-col justify-between">
        <BentoGrid onOpenForgeModal={() => setIsForgeModalOpen(true)} />
      </div>

      {/* Contained Forge Modal (Overlay, not a new tab) */}
      <ForgeModal
        isOpen={isForgeModalOpen}
        onClose={() => setIsForgeModalOpen(false)}
      />
    </main>
  );
}
