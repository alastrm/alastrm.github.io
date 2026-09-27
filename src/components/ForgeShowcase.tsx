"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  GitBranch,
  RefreshCw,
  Server,
  ExternalLink,
  Activity,
} from "lucide-react";
import { animate, remove } from "animejs";

type StateStep = "PENDING" | "STARTING" | "HEALTH_CHECKING" | "TRAFFIC_SHIFT" | "ACTIVE";

const stateSteps: StateStep[] = [
  "PENDING",
  "STARTING",
  "HEALTH_CHECKING",
  "TRAFFIC_SHIFT",
  "ACTIVE",
];

export function ForgeShowcase() {
  const [activePool, setActivePool] = useState<"blue" | "green">("blue");
  const [isSwitching, setIsSwitching] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<StateStep>("ACTIVE");
  const [statusMessage, setStatusMessage] = useState<string>(
    "Serving production traffic via Traefik (100% weight)"
  );
  const [connsCount, setConnsCount] = useState<number>(128);
  const [blueWeight, setBlueWeight] = useState<number>(100);
  const [greenWeight, setGreenWeight] = useState<number>(0);

  const blueBarRef = useRef<HTMLDivElement | null>(null);
  const greenBarRef = useRef<HTMLDivElement | null>(null);
  const drainBarRef = useRef<HTMLDivElement | null>(null);
  const activeAnimationsRef = useRef<{ cancel?: () => void }[]>([]);

  useEffect(() => {
    const bBar = blueBarRef.current;
    const gBar = greenBarRef.current;
    const dBar = drainBarRef.current;
    const anims = activeAnimationsRef.current;

    return () => {
      anims.forEach((anim) => anim?.cancel?.());
      if (bBar) remove(bBar);
      if (gBar) remove(gBar);
      if (dBar) remove(dBar);
    };
  }, []);

  const triggerSwitch = () => {
    if (isSwitching) return;

    setIsSwitching(true);
    activeAnimationsRef.current.forEach((anim) => anim?.cancel?.());
    activeAnimationsRef.current = [];

    const toGreen = activePool === "blue";

    // 1. Set initial step
    setCurrentStep("STARTING");
    setStatusMessage("Step 1/4: Candidate container spawned. Awaiting health probe warmup...");

    // Animate state step progression
    const stepTimer1 = setTimeout(() => {
      setCurrentStep("HEALTH_CHECKING");
      setStatusMessage("Step 2/4: Synthetic GET /health probe returned 200 OK (latency: 1.8ms)");
    }, 600);

    const stepTimer2 = setTimeout(() => {
      setCurrentStep("TRAFFIC_SHIFT");
      setStatusMessage("Step 3/4: Traefik dynamic router reweighting. Steer new SYN requests...");

      // Animate Traffic Weights (Counters + Progress Bars)
      const weightObj = {
        blue: toGreen ? 100 : 0,
        green: toGreen ? 0 : 100,
      };

      const weightAnim = animate(weightObj, {
        blue: toGreen ? 0 : 100,
        green: toGreen ? 100 : 0,
        duration: 1800,
        ease: "inOutQuad",
        onUpdate: () => {
          setBlueWeight(Math.round(weightObj.blue));
          setGreenWeight(Math.round(weightObj.green));
        },
      });
      activeAnimationsRef.current.push(weightAnim);

      if (blueBarRef.current && greenBarRef.current) {
        animate(blueBarRef.current, {
          width: toGreen ? ["100%", "0%"] : ["0%", "100%"],
          duration: 1800,
          ease: "inOutQuad",
        });

        animate(greenBarRef.current, {
          width: toGreen ? ["0%", "100%"] : ["100%", "0%"],
          duration: 1800,
          ease: "inOutQuad",
        });
      }

      // Animate In-Flight Connection Draining (128 -> 0)
      const drainObj = { conns: 128 };
      const drainAnim = animate(drainObj, {
        conns: 0,
        duration: 1600,
        delay: 200,
        ease: "outQuad",
        onUpdate: () => {
          setConnsCount(Math.round(drainObj.conns));
        },
      });
      activeAnimationsRef.current.push(drainAnim);

      if (drainBarRef.current) {
        animate(drainBarRef.current, {
          width: ["100%", "0%"],
          duration: 1600,
          delay: 200,
          ease: "outQuad",
        });
      }
    }, 1200);

    const stepTimer3 = setTimeout(() => {
      setCurrentStep("ACTIVE");
      setActivePool(toGreen ? "green" : "blue");
      setIsSwitching(false);
      setStatusMessage(
        toGreen
          ? "Step 4/4: Complete! Green pool promoted to active. 0 in-flight requests dropped (0ms downtime)."
          : "Step 4/4: Complete! Blue pool promoted to active. 0 in-flight requests dropped (0ms downtime)."
      );
      setConnsCount(128);

      if (drainBarRef.current) {
        drainBarRef.current.style.width = "100%";
      }
    }, 3200);

    activeAnimationsRef.current.push({ cancel: () => clearTimeout(stepTimer1) });
    activeAnimationsRef.current.push({ cancel: () => clearTimeout(stepTimer2) });
    activeAnimationsRef.current.push({ cancel: () => clearTimeout(stepTimer3) });
  };

  return (
    <section id="forge" className="py-20 md:py-24 border-b border-white/[0.08] bg-[#09090b] scroll-mt-14">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-xs font-mono text-[#06b6d4] tracking-wider mb-2 flex items-center gap-1.5">
              <Server className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>FEATURED PROJECT • CONTROL PLANE</span>
            </div>

          </div>

          <a
            href="https://github.com/alastrm/Forge"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm border border-white/10 bg-[#121215] text-xs font-mono text-[#ededed] hover:border-white/30 hover:text-white transition-colors shrink-0"
          >
            <GitBranch className="w-3.5 h-3.5 text-[#06b6d4]" strokeWidth={1.5} />
            <span>github.com/alastrm/Forge</span>
            <ExternalLink className="w-3 h-3 text-[#71717a]" />
          </a>
        </div>

        {/* 3-sentence description from forge.md */}
        <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed mb-8 font-normal">
          Forge is a minimalist single-node deployment platform and control plane built
          entirely with the Python standard library. It provides an explicit SQLite-backed
          finite state machine, continuous state reconciliation, and automated Traefik
          reverse proxying without dropping active connections. Designed with zero external
          dependencies — no Celery, Redis, or heavy frameworks required.
        </p>

        {/* Architectural Pillars (from forge.md) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8 font-mono text-xs">
          <div className="p-3 bg-[#111114] border border-white/[0.06] rounded-xs">
            <span className="text-[10px] text-[#71717a] block mb-1">DEPENDENCIES</span>
            <span className="text-[#22c55e] font-medium">100% Python stdlib</span>
          </div>
          <div className="p-3 bg-[#111114] border border-white/[0.06] rounded-xs">
            <span className="text-[10px] text-[#71717a] block mb-1">STATE STORAGE</span>
            <span className="text-[#ededed] font-medium">SQLite WAL</span>
          </div>
          <div className="p-3 bg-[#111114] border border-white/[0.06] rounded-xs">
            <span className="text-[10px] text-[#71717a] block mb-1">RECONCILER</span>
            <span className="text-[#06b6d4] font-medium">Auto-drift cleanup</span>
          </div>
          <div className="p-3 bg-[#111114] border border-white/[0.06] rounded-xs">
            <span className="text-[10px] text-[#71717a] block mb-1">ROLLBACKS</span>
            <span className="text-[#22c55e] font-medium">Zero-rebuild</span>
          </div>
        </div>

        {/* INTERACTIVE BLUE/GREEN SWITCHER WIDGET */}
        <div className="p-6 rounded-sm border border-white/[0.08] bg-[#111114] relative shadow-lg">
          {/* Widget Header & Trigger Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 mb-6 border-b border-white/[0.08]">
            <div>
              <div className="text-xs font-mono text-[#71717a] mb-0.5">
                KINETIC DEMO • STATE MACHINE LIFECYCLE
              </div>
              <div className="text-sm font-medium text-white">
                Live Traefik Weighted Shifter & Connection Drainer
              </div>
            </div>

            <button
              onClick={triggerSwitch}
              disabled={isSwitching}
              className="flex items-center gap-2 px-4 py-2 rounded-sm bg-white text-black text-xs font-mono font-medium hover:bg-zinc-200 transition-all disabled:opacity-50 active:scale-[0.98] cursor-pointer"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isSwitching ? "animate-spin text-black" : "text-black"}`}
                strokeWidth={1.5}
              />
              <span>{isSwitching ? "Rotating Pools..." : "Trigger Switch"}</span>
            </button>
          </div>

          {/* Real-Time Finite State Machine Steps Bar */}
          <div className="mb-6 p-3 bg-[#09090b] border border-white/[0.06] rounded-xs">
            <div className="text-[10px] font-mono text-[#71717a] mb-2 flex items-center justify-between">
              <span>SQLITE STATE MACHINE:</span>
              <span className="text-[#06b6d4]">{currentStep}</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
              {stateSteps.map((step, idx) => {
                const isActive = currentStep === step;
                return (
                  <React.Fragment key={step}>
                    <span
                      className={`px-2 py-1 rounded-xs transition-all ${
                        isActive
                          ? "bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/40 font-semibold scale-105"
                          : "text-[#71717a] bg-white/[0.03]"
                      }`}
                    >
                      {step}
                    </span>
                    {idx < stateSteps.length - 1 && (
                      <span className="text-white/20 text-xs">➔</span>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Dual Nodes Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 font-mono text-xs">
            {/* Blue Pool Card */}
            <div
              className={`p-4 rounded-xs border transition-all duration-300 ${
                activePool === "blue"
                  ? "bg-[#09090b] border-[#22c55e]/40 shadow-sm"
                  : "bg-[#09090b]/60 border-white/[0.06] opacity-75"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      activePool === "blue" ? "bg-[#22c55e]" : "bg-[#71717a]"
                    }`}
                  />
                  <span className="font-semibold text-white">Blue Container Pool</span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-xs transition-colors ${
                    activePool === "blue"
                      ? "bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/20"
                      : "bg-white/5 text-[#71717a]"
                  }`}
                >
                  {activePool === "blue" ? "ACTIVE / SERVING" : "STANDBY"}
                </span>
              </div>

              <div className="space-y-1.5 text-[11px] text-[#71717a] mb-4">
                <div className="flex justify-between">
                  <span>Image Tag:</span>
                  <span className="text-[#ededed]">test-app:v1.2.0</span>
                </div>
                <div className="flex justify-between">
                  <span>Container ID:</span>
                  <span className="text-[#ededed]">app-a2bc81e</span>
                </div>
                <div className="flex justify-between">
                  <span>Traefik Weight:</span>
                  <span className="text-[#22c55e] font-semibold">{blueWeight}%</span>
                </div>
              </div>

              {/* Traffic Weight Bar */}
              <div>
                <div className="flex justify-between text-[10px] text-[#71717a] mb-1">
                  <span>Traffic Share</span>
                  <span className="text-[#ededed] font-medium">{blueWeight}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    ref={blueBarRef}
                    className="h-full bg-[#22c55e] rounded-full transition-all"
                    style={{ width: `${blueWeight}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Green Pool Card */}
            <div
              className={`p-4 rounded-xs border transition-all duration-300 ${
                activePool === "green"
                  ? "bg-[#09090b] border-[#06b6d4]/40 shadow-sm"
                  : "bg-[#09090b]/60 border-white/[0.06] opacity-75"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      activePool === "green" ? "bg-[#06b6d4]" : "bg-[#71717a]"
                    }`}
                  />
                  <span className="font-semibold text-white">Green Container Pool</span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-xs transition-colors ${
                    activePool === "green"
                      ? "bg-[#06b6d4]/10 text-[#06b6d4] border border-[#06b6d4]/20"
                      : "bg-white/5 text-[#71717a]"
                  }`}
                >
                  {activePool === "green" ? "ACTIVE / SERVING" : "STANDBY"}
                </span>
              </div>

              <div className="space-y-1.5 text-[11px] text-[#71717a] mb-4">
                <div className="flex justify-between">
                  <span>Image Tag:</span>
                  <span className="text-[#ededed]">test-app:v1.3.0</span>
                </div>
                <div className="flex justify-between">
                  <span>Container ID:</span>
                  <span className="text-[#ededed]">app-d91f42a</span>
                </div>
                <div className="flex justify-between">
                  <span>Traefik Weight:</span>
                  <span className="text-[#06b6d4] font-semibold">{greenWeight}%</span>
                </div>
              </div>

              {/* Traffic Weight Bar */}
              <div>
                <div className="flex justify-between text-[10px] text-[#71717a] mb-1">
                  <span>Traffic Share</span>
                  <span className="text-[#ededed] font-medium">{greenWeight}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div
                    ref={greenBarRef}
                    className="h-full bg-[#06b6d4] rounded-full transition-all"
                    style={{ width: `${greenWeight}%` }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Connection Draining Progress Meter & Status */}
          <div className="p-3.5 bg-[#09090b] border border-white/[0.06] rounded-xs font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] mb-2">
              <span className="text-[#a1a1aa] flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-[#22c55e]" strokeWidth={1.5} />
                <span className="text-white font-medium">{statusMessage}</span>
              </span>
              <span className="text-[#71717a]">
                Active Sockets:{" "}
                <span className="text-[#ededed] font-semibold font-mono">
                  {connsCount}
                </span>
              </span>
            </div>

            <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
              <div
                ref={drainBarRef}
                className="h-full bg-gradient-to-r from-[#22c55e] to-[#06b6d4] rounded-full transition-all"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
