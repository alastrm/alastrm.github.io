"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  X,
  RefreshCw,
  GitBranch,
  ExternalLink,
  Activity,
  Terminal,
  Layers,
  ShieldCheck,
  CheckCircle2,
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

interface ForgeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ForgeModal({ isOpen, onClose }: ForgeModalProps) {
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
  const modalBoxRef = useRef<HTMLDivElement | null>(null);
  const activeAnimationsRef = useRef<{ cancel?: () => void }[]>([]);

  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Entrance animation for modal
  useEffect(() => {
    if (isOpen && modalBoxRef.current) {
      animate(modalBoxRef.current, {
        opacity: [0, 1],
        scale: [0.96, 1],
        duration: 250,
        ease: "outQuad",
      });
    }
  }, [isOpen]);

  // Cleanup on unmount
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

  const triggerSwitch = useCallback(() => {
    if (isSwitching) return;

    setIsSwitching(true);
    activeAnimationsRef.current.forEach((anim) => anim?.cancel?.());
    activeAnimationsRef.current = [];

    const toGreen = activePool === "blue";

    // Step 1: Starting
    setCurrentStep("STARTING");
    setStatusMessage("Step 1/4: Candidate container spawned. Awaiting health probe warmup...");

    // Step 2: Health checking
    const stepTimer1 = setTimeout(() => {
      setCurrentStep("HEALTH_CHECKING");
      setStatusMessage("Step 2/4: In-namespace synthetic GET /health returned 200 OK (latency: 1.4ms)");
    }, 600);

    // Step 3: Traffic shift
    const stepTimer2 = setTimeout(() => {
      setCurrentStep("TRAFFIC_SHIFT");
      setStatusMessage("Step 3/4: Traefik dynamic router reweighting. Steer new SYN requests...");

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

    // Step 4: Complete
    const stepTimer3 = setTimeout(() => {
      setCurrentStep("ACTIVE");
      setActivePool(toGreen ? "green" : "blue");
      setIsSwitching(false);
      setStatusMessage(
        toGreen
          ? "Step 4/4: Complete! Green pool promoted to active. 0 dropped connections (0ms downtime)."
          : "Step 4/4: Complete! Blue pool promoted to active. 0 dropped connections (0ms downtime)."
      );
      setConnsCount(128);

      if (drainBarRef.current) {
        drainBarRef.current.style.width = "100%";
      }
    }, 3200);

    activeAnimationsRef.current.push({ cancel: () => clearTimeout(stepTimer1) });
    activeAnimationsRef.current.push({ cancel: () => clearTimeout(stepTimer2) });
    activeAnimationsRef.current.push({ cancel: () => clearTimeout(stepTimer3) });
  }, [activePool, isSwitching]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/80 backdrop-blur-md animate-fade-in"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      {/* Modal Box */}
      <div
        ref={modalBoxRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#0d0d10] border border-white/10 rounded-2xl shadow-2xl p-5 sm:p-7 text-[#ededed] font-sans flex flex-col"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between gap-4 pb-5 border-b border-white/[0.08]">
          <div>
            <div className="flex items-center gap-2 mb-2">
            </div>
            <h2 className="font-display text-2xl sm:text-3xl font-normal tracking-tight text-white">
              Forge Orchestrator
            </h2>
            <p className="text-xs sm:text-sm text-[#a1a1aa] mt-1 max-w-2xl leading-relaxed">
              Minimalist single-node deployment control plane built with the Python standard library.
              Features an explicit SQLite WAL state machine, continuous reconciliation, and zero-downtime Traefik proxying.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#a1a1aa] hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Section 1: Kinetic Interactive Blue/Green Switcher */}
        <div className="mt-6 p-4 sm:p-5 rounded-xl border border-white/[0.08] bg-[#121216]">
          {/* Widget Header & Switch Button */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-5 border-b border-white/[0.06]">
            <div>
              <div className="text-[11px] font-mono text-[#06b6d4] tracking-wide flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5" strokeWidth={1.5} />
                <span>INTERACTIVE KINETIC RUNTIME</span>
              </div>
              <h3 className="font-display text-lg sm:text-xl font-normal text-white mt-0.5">
                Live Traefik Weighted Shifter & Connection Drainer
              </h3>
            </div>

            <button
              onClick={triggerSwitch}
              disabled={isSwitching}
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-md bg-white text-black text-xs font-mono font-medium hover:bg-zinc-200 transition-all disabled:opacity-50 active:scale-[0.98] cursor-pointer shrink-0 shadow-sm"
            >
              <RefreshCw
                className={`w-3.5 h-3.5 ${isSwitching ? "animate-spin text-black" : "text-black"}`}
                strokeWidth={1.5}
              />
              <span>{isSwitching ? "Executing Rollout..." : "Trigger Switch"}</span>
            </button>
          </div>

          {/* SQLite State Machine Steps */}
          <div className="mb-5 p-3 bg-[#09090b] border border-white/[0.06] rounded-lg">
            <div className="text-[10px] font-mono text-[#71717a] mb-2 flex items-center justify-between">
              <span>SQLITE WAL STATE MACHINE:</span>
              <span className="text-[#06b6d4] font-semibold">{currentStep}</span>
            </div>
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-[11px]">
              {stateSteps.map((step, idx) => {
                const isActive = currentStep === step;
                return (
                  <React.Fragment key={step}>
                    <span
                      className={`px-2 py-0.5 rounded-sm transition-all ${
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

          {/* Dual Container Pools */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-5 font-mono text-xs">
            {/* Blue Pool */}
            <div
              className={`p-3.5 rounded-lg border transition-all duration-300 ${
                activePool === "blue"
                  ? "bg-[#09090b] border-[#22c55e]/40 shadow-sm"
                  : "bg-[#09090b]/50 border-white/[0.06] opacity-75"
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      activePool === "blue" ? "bg-[#22c55e]" : "bg-[#71717a]"
                    }`}
                  />
                  <span className="font-semibold text-white">Blue Container Pool</span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-sm ${
                    activePool === "blue"
                      ? "bg-[#22c55e]/15 text-[#22c55e] border border-[#22c55e]/30 font-medium"
                      : "bg-white/5 text-[#71717a]"
                  }`}
                >
                  {activePool === "blue" ? "SERVING" : "STANDBY"}
                </span>
              </div>

              <div className="space-y-1 text-[11px] text-[#71717a] mb-3">
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

              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  ref={blueBarRef}
                  className="h-full bg-[#22c55e] rounded-full transition-all"
                  style={{ width: `${blueWeight}%` }}
                />
              </div>
            </div>

            {/* Green Pool */}
            <div
              className={`p-3.5 rounded-lg border transition-all duration-300 ${
                activePool === "green"
                  ? "bg-[#09090b] border-[#06b6d4]/40 shadow-sm"
                  : "bg-[#09090b]/50 border-white/[0.06] opacity-75"
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      activePool === "green" ? "bg-[#06b6d4]" : "bg-[#71717a]"
                    }`}
                  />
                  <span className="font-semibold text-white">Green Container Pool</span>
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 rounded-sm ${
                    activePool === "green"
                      ? "bg-[#06b6d4]/15 text-[#06b6d4] border border-[#06b6d4]/30 font-medium"
                      : "bg-white/5 text-[#71717a]"
                  }`}
                >
                  {activePool === "green" ? "SERVING" : "STANDBY"}
                </span>
              </div>

              <div className="space-y-1 text-[11px] text-[#71717a] mb-3">
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

              <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  ref={greenBarRef}
                  className="h-full bg-[#06b6d4] rounded-full transition-all"
                  style={{ width: `${greenWeight}%` }}
                />
              </div>
            </div>
          </div>

          {/* Connection Drainer Meter */}
          <div className="p-3 bg-[#09090b] border border-white/[0.06] rounded-lg font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[11px] mb-2">
              <span className="text-[#ededed] flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e]" strokeWidth={1.5} />
                <span>{statusMessage}</span>
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

        {/* Section 2: Real Architectural Artifacts from forge.md */}
        <div className="mt-6 pt-5 border-t border-white/[0.08] space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-lg sm:text-xl font-normal text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-[#06b6d4]" strokeWidth={1.5} />
              <span>Engineered Invariants & CLI Interface</span>
            </h3>
            <span className="text-[11px] font-mono text-[#22c55e]">105 Tests Passing</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs font-mono">
            <div className="p-3 bg-[#121216] border border-white/[0.06] rounded-lg">
              <div className="text-[10px] text-[#71717a] mb-1 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-[#22c55e]" />
                <span>ZERO DEPENDENCIES</span>
              </div>
              <p className="text-[11px] text-[#ededed] leading-relaxed">
                100% Python stdlib (<code className="text-[#06b6d4]">http.server</code>, <code className="text-[#06b6d4]">sqlite3</code>, <code className="text-[#06b6d4]">queue</code>). Zero Celery/Redis overhead.
              </p>
            </div>

            <div className="p-3 bg-[#121216] border border-white/[0.06] rounded-lg">
              <div className="text-[10px] text-[#71717a] mb-1 flex items-center gap-1">
                <Layers className="w-3 h-3 text-[#06b6d4]" />
                <span>RECONCILIATION LOOP</span>
              </div>
              <p className="text-[11px] text-[#ededed] leading-relaxed">
                Continual background reconciliation diffs desired SQLite states against live Docker containers.
              </p>
            </div>

            <div className="p-3 bg-[#121216] border border-white/[0.06] rounded-lg">
              <div className="text-[10px] text-[#71717a] mb-1 flex items-center gap-1">
                <Activity className="w-3 h-3 text-[#22c55e]" />
                <span>INSTANT ROLLBACKS</span>
              </div>
              <p className="text-[11px] text-[#ededed] leading-relaxed">
                Re-tags historical container images from SQLite revision records with zero rebuild steps.
              </p>
            </div>
          </div>

          {/* Real CLI Code Snippet */}
          <div className="bg-[#09090b] border border-white/[0.08] rounded-xl p-3.5 font-mono text-[12px] text-[#ededed]">
            <div className="flex items-center gap-1.5 pb-2.5 mb-2.5 border-b border-white/[0.06] text-[#71717a] text-[11px]">
              <Terminal className="w-3.5 h-3.5 text-[#06b6d4]" strokeWidth={1.5} />
              <span>forge-cli — real command interface</span>
            </div>
            <pre className="overflow-x-auto text-[11px] leading-relaxed">
              <span className="text-[#71717a]"># Deploy application with zero-downtime blue/green switch</span>{'\n'}
              <span className="text-[#22c55e]">$</span> forge deploy{'\n'}
              <span className="text-[#71717a]">Enqueued: dep-14e9fbc7 [BUILDING ➔ HEALTH_CHECKING ➔ ACTIVE]</span>{'\n\n'}
              <span className="text-[#71717a]"># Instant zero-rebuild rollback to previous revision</span>{'\n'}
              <span className="text-[#22c55e]">$</span> forge rollback my-service rev-a2bc81e{'\n\n'}
              <span className="text-[#71717a]"># Real-time HTTP log streaming with in-flight secret scrubbing</span>{'\n'}
              <span className="text-[#22c55e]">$</span> forge logs -f
            </pre>
          </div>
        </div>

        {/* Modal Footer with Link to GitHub */}
        <div className="mt-6 pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-xs text-[#71717a]">
            Source code, architecture diagrams & SQLite schemas available on GitHub.
          </div>

          <a
            href="https://github.com/alastrm/Forge"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#18181c] border border-white/10 hover:border-white/30 text-white text-xs font-mono font-medium transition-colors"
          >
            <GitBranch className="w-3.5 h-3.5 text-[#06b6d4]" strokeWidth={1.5} />
            <span>github.com/alastrm/Forge</span>
            <ExternalLink className="w-3 h-3 text-[#71717a]" />
          </a>
        </div>
      </div>
    </div>
  );
}
