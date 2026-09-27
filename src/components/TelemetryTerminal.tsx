"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Terminal as TerminalIcon,
  RotateCcw,
  Zap,
  AlertOctagon,
  TrendingUp,
  Copy,
  Check,
} from "lucide-react";
import { animate, remove } from "animejs";

interface LogEntry {
  id: string;
  timestamp: string;
  tag: string;
  level: "info" | "warn" | "error" | "success" | "routing";
  message: string;
}

const deployLogs: Omit<LogEntry, "id" | "timestamp">[] = [
  {
    tag: "FORGE_ORCHESTRATOR",
    level: "info",
    message: "Initializing rollout request: target_image=ghcr.io/alastrm/app:v1.5.0",
  },
  {
    tag: "DOCKER_ENGINE",
    level: "info",
    message: "Connected to /var/run/docker.sock via UNIX socket. Allocating private port slot: 8082",
  },
  {
    tag: "DOCKER_ENGINE",
    level: "info",
    message: "Container created: ID=7a91bf20c34e. Cgroups: CPU=1.5 cores, MemLimit=512MB",
  },
  {
    tag: "DOCKER_ENGINE",
    level: "info",
    message: "Container started. State: SPAWNED. Initiating synthetic warmup grace window (2.0s)...",
  },
  {
    tag: "HEALTHCHECK",
    level: "info",
    message: "Probe 1/3: GET http://127.0.0.1:8082/health -> 200 OK (latency: 2.1ms, DB_pool: connected)",
  },
  {
    tag: "HEALTHCHECK",
    level: "info",
    message: "Probe 2/3: GET http://127.0.0.1:8082/health -> 200 OK (latency: 1.8ms, Redis: ready)",
  },
  {
    tag: "HEALTHCHECK",
    level: "success",
    message: "Probe 3/3: GET http://127.0.0.1:8082/health -> 200 OK (latency: 1.4ms). HEALTH_CONSENSUS_REACHED.",
  },
  {
    tag: "STATE_MACHINE",
    level: "routing",
    message: "State transition: [SPAWNED] -> [HEALTHY] -> [TRAFFIC_SHIFT]",
  },
  {
    tag: "TRAEFIK_DYNAMIC",
    level: "routing",
    message: "Atomic weight shift: app-blue=80 / app-green=20 (router latency: 4.8ms)",
  },
  {
    tag: "TRAEFIK_DYNAMIC",
    level: "routing",
    message: "Anomaly audit: 0 error spikes. Shifting weights: app-blue=50 / app-green=50",
  },
  {
    tag: "TRAEFIK_DYNAMIC",
    level: "success",
    message: "Final weight rotation: app-blue=0 / app-green=100. All new SYN packets steered to Green.",
  },
  {
    tag: "STATE_MACHINE",
    level: "routing",
    message: "State transition: [TRAFFIC_SHIFT] -> [DRAINING]",
  },
  {
    tag: "CONNECTION_DRAIN",
    level: "warn",
    message: "SIGTERM emitted to Blue pool. Connection drain window active (grace_period: 15s)",
  },
  {
    tag: "CONNECTION_DRAIN",
    level: "info",
    message: "In-flight connection monitor: 142 -> 68 -> 12 -> 0 active sockets.",
  },
  {
    tag: "DOCKER_ENGINE",
    level: "info",
    message: "docker stop forge-blue-v1.4.2 -> EXIT 0. Volume locks released.",
  },
  {
    tag: "STATE_MACHINE",
    level: "success",
    message: "State transition: [DRAINING] -> [TERMINATED]. ROLLOUT COMPLETED IN 4,748ms. ZERO DOWNTIME.",
  },
];

const rollbackLogs: Omit<LogEntry, "id" | "timestamp">[] = [
  {
    tag: "FORGE_ORCHESTRATOR",
    level: "info",
    message: "Rollout canary initiated: target_image=ghcr.io/alastrm/app:v1.5.1-canary",
  },
  {
    tag: "DOCKER_ENGINE",
    level: "info",
    message: "Spawned canary container ID=e482ca0199f1 on internal port 8083",
  },
  {
    tag: "HEALTHCHECK",
    level: "warn",
    message: "Probe 1/3: GET http://127.0.0.1:8083/health -> 500 INTERNAL_SERVER_ERROR (DB migration mismatch)",
  },
  {
    tag: "HEALTHCHECK",
    level: "error",
    message: "Probe 2/3: GET http://127.0.0.1:8083/health -> CONNECTION_REFUSED (Process panic in worker #2)",
  },
  {
    tag: "CRITICAL_ANOMALY",
    level: "error",
    message: "HealthcheckThresholdExceeded: 2 consecutive failures. BREACH OF INVARIANT #4.",
  },
  {
    tag: "STATE_MACHINE",
    level: "error",
    message: "EMERGENCY ABORT: State transition to [ROLLBACK_TRIGGERED]",
  },
  {
    tag: "TRAEFIK_DYNAMIC",
    level: "routing",
    message: "Atomic lock: Reverting all weights to 100% Blue pool. (Execution time: 11.8ms)",
  },
  {
    tag: "DOCKER_ENGINE",
    level: "warn",
    message: "SIGKILL sent to unhealthy canary ID=e482ca0199f1. Cgroup memory freed.",
  },
  {
    tag: "INCIDENT_RECORDER",
    level: "info",
    message: "Crash stacktrace dumped to /var/log/forge/canary_crash_dump.json",
  },
  {
    tag: "VERIFICATION",
    level: "success",
    message: "Edge traffic verified intact. Client HTTP 200 rate: 100.0%. ZERO CLIENT IMPACT RECORDED.",
  },
];

const spikeLogs: Omit<LogEntry, "id" | "timestamp">[] = [
  {
    tag: "TRAFFIC_TELEMETRY",
    level: "warn",
    message: "Inbound request surge detected at Edge: 2,400 req/s -> 18,750 req/s (+681%)",
  },
  {
    tag: "REDIS_STREAMS",
    level: "warn",
    message: "Ingestion backpressure warning: stream lag +480 msgs. Consumer latency: 3.8ms",
  },
  {
    tag: "PGBOUNCER_POOL",
    level: "info",
    message: "Pool saturation reaches 78% (94/120 active connections). Transaction mode engaged.",
  },
  {
    tag: "AUTOSCALER",
    level: "routing",
    message: "Reactive scaling rule breached: threshold=80%. Triggering +4 dynamic worker replicas.",
  },
  {
    tag: "DOCKER_ENGINE",
    level: "info",
    message: "Containers spawned: forge-worker-[05,06,07,08]. Fast attach to internal overlay network.",
  },
  {
    tag: "TRAEFIK_DYNAMIC",
    level: "routing",
    message: "Dynamic upstream register: 8 backend targets operational in load balancer.",
  },
  {
    tag: "REDIS_STREAMS",
    level: "success",
    message: "Pel entries reclaimed. Consumer stream lag normalized to 0 msgs.",
  },
  {
    tag: "TELEMETRY_STEADY",
    level: "success",
    message: "Throughput stable at 18,920 req/s. p50: 1.1ms, p95: 3.4ms, p99: 4.1ms. 0 errors dropped.",
  },
];

export function TelemetryTerminal() {
  const [logs, setLogs] = useState<LogEntry[]>([
    {
      id: "initial-0",
      timestamp: "15:20:00.100",
      tag: "SYSTEM_INIT",
      level: "info",
      message: "forge-cli v2.4.1 (x86_64-pc-linux-gnu) initialized. Ready for operations.",
    },
    {
      id: "initial-1",
      timestamp: "15:20:00.120",
      tag: "TRAEFIK_SUPERVISOR",
      level: "success",
      message: "Dynamic file provider listening at /etc/traefik/dynamic/*.yml",
    },
    {
      id: "initial-2",
      timestamp: "15:20:00.140",
      tag: "ORCHESTRATOR",
      level: "info",
      message: "Primary pool: Blue (v1.4.2) [100% weight]. Ready for interactive execution.",
    },
  ]);

  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);
  const [progressPercent, setProgressPercent] = useState<number>(100);
  const [copied, setCopied] = useState<boolean>(false);

  const logsContainerRef = useRef<HTMLDivElement | null>(null);
  const progressBarRef = useRef<HTMLDivElement | null>(null);
  const activeTimersRef = useRef<NodeJS.Timeout[]>([]);

  // Cleanup on unmount
  useEffect(() => {
    const barEl = progressBarRef.current;
    const timers = activeTimersRef.current;
    return () => {
      timers.forEach(clearTimeout);
      if (barEl) {
        remove(barEl);
      }
    };
  }, []);

  // Auto-scroll when new logs arrive
  useEffect(() => {
    if (logsContainerRef.current) {
      logsContainerRef.current.scrollTop = logsContainerRef.current.scrollHeight;
    }
  }, [logs]);

  const executeSimulation = (
    templateLogs: Omit<LogEntry, "id" | "timestamp">[],
    simulationName: string
  ) => {
    // Clear previous simulation timers cleanly
    activeTimersRef.current.forEach(clearTimeout);
    activeTimersRef.current = [];

    setIsRunning(true);
    setActiveSimulation(simulationName);
    setProgressPercent(0);

    // Animate progress bar using Anime.js
    if (progressBarRef.current) {
      remove(progressBarRef.current);
      animate(progressBarRef.current, {
        width: ["0%", "100%"],
        duration: templateLogs.length * 320,
        ease: "linear",
      });
    }

    // Append delimiter header
    const nowHeader = new Date().toISOString().substring(11, 23);
    setLogs((prev) => [
      ...prev,
      {
        id: `delim-${Date.now()}`,
        timestamp: nowHeader,
        tag: "SIMULATION_START",
        level: "routing",
        message: `>>> INITIATING CLI EMULATION: [${simulationName.toUpperCase()}] <<<`,
      },
    ]);

    // Stream logs line by line with authentic timings
    templateLogs.forEach((template, index) => {
      const timer = setTimeout(() => {
        const timeStr = new Date().toISOString().substring(11, 23);
        setLogs((prev) => [
          ...prev,
          {
            id: `sim-${Date.now()}-${index}`,
            timestamp: timeStr,
            tag: template.tag,
            level: template.level,
            message: template.message,
          },
        ]);

        if (index === templateLogs.length - 1) {
          setIsRunning(false);
          setActiveSimulation(null);
          setProgressPercent(100);
        }
      }, (index + 1) * 320);

      activeTimersRef.current.push(timer);
    });
  };

  const handleClear = () => {
    activeTimersRef.current.forEach(clearTimeout);
    activeTimersRef.current = [];
    setIsRunning(false);
    setActiveSimulation(null);
    setProgressPercent(100);

    const timeStr = new Date().toISOString().substring(11, 23);
    setLogs([
      {
        id: "cleared-0",
        timestamp: timeStr,
        tag: "TERMINAL_RESET",
        level: "info",
        message: "Buffer flushed. Ready for instructions.",
      },
    ]);
  };

  const handleCopyLogs = () => {
    const text = logs
      .map((l) => `[${l.timestamp}] [${l.tag}] ${l.message}`)
      .join("\n");
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getLevelStyle = (level: LogEntry["level"]) => {
    switch (level) {
      case "success":
        return "text-[#22c55e]";
      case "routing":
        return "text-[#06b6d4]";
      case "warn":
        return "text-yellow-400";
      case "error":
        return "text-red-400 font-semibold";
      case "info":
      default:
        return "text-[#a1a1aa]";
    }
  };

  return (
    <section
      id="telemetry"
      className="py-20 md:py-28 border-b border-white/[0.08] bg-[#08080a] relative isolate z-10 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#22c55e] tracking-wider mb-2">
              <TerminalIcon className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>LIVE TELEMETRY EMULATOR // FORGE SUPERVISOR CONSOLE</span>
            </div>
            <h2 className="font-[family-name:var(--font-zodiak)] text-3xl sm:text-4xl md:text-5xl font-normal text-[#ededed] tracking-tight">
              Interactive Systems Terminal
            </h2>
            <p className="font-mono text-sm text-[#a1a1aa] mt-2 max-w-2xl">
              Trigger operational scenarios to observe deterministic state machine
              transitions, synthetic health probing, Traefik weighted shifts, and failover containment.
            </p>
          </div>

          {/* Action Trigger Buttons */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
            <button
              onClick={() => executeSimulation(deployLogs, "Blue-Green Deploy")}
              className={`flex items-center gap-1.5 px-3.5 py-2 bg-[#111114] border rounded-xs transition-colors cursor-pointer ${
                activeSimulation === "Blue-Green Deploy"
                  ? "border-[#22c55e] bg-[#22c55e]/15 text-[#22c55e]"
                  : "border-[#22c55e]/40 text-[#22c55e] hover:bg-[#22c55e]/10"
              }`}
            >
              <Zap className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>[Simulate Blue-Green Deploy]</span>
            </button>

            <button
              onClick={() => executeSimulation(rollbackLogs, "Failover / Auto-Rollback")}
              className={`flex items-center gap-1.5 px-3.5 py-2 bg-[#111114] border rounded-xs transition-colors cursor-pointer ${
                activeSimulation === "Failover / Auto-Rollback"
                  ? "border-red-500 bg-red-500/15 text-red-400"
                  : "border-red-500/40 text-red-400 hover:bg-red-500/10"
              }`}
            >
              <AlertOctagon className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>[Trigger Failover / Auto-Rollback]</span>
            </button>

            <button
              onClick={() => executeSimulation(spikeLogs, "Traffic Spike")}
              className={`flex items-center gap-1.5 px-3.5 py-2 bg-[#111114] border rounded-xs transition-colors cursor-pointer ${
                activeSimulation === "Traffic Spike"
                  ? "border-[#06b6d4] bg-[#06b6d4]/15 text-[#06b6d4]"
                  : "border-[#06b6d4]/40 text-[#06b6d4] hover:bg-[#06b6d4]/10"
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>[Simulate Traffic Spike]</span>
            </button>

            <button
              onClick={handleClear}
              className="flex items-center gap-1 px-3 py-2 bg-[#111114] border border-white/10 text-[#71717a] hover:text-white rounded-xs transition-colors cursor-pointer"
              title="Flush Log Buffer"
            >
              <RotateCcw className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>[Clear]</span>
            </button>
          </div>
        </div>

        {/* Terminal Window Box */}
        <div className="border border-white/[0.1] bg-[#0c0c0e] rounded-xs shadow-2xl overflow-hidden font-mono text-xs">
          {/* Terminal Window Header Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-[#111114] border-b border-white/[0.08]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ef4444]/60 border border-[#ef4444]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#eab308]/60 border border-[#eab308]/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-[#22c55e]/60 border border-[#22c55e]/80" />
              <span className="text-[11px] text-[#71717a] ml-2">
                forge-cli v2.4.1 (x86_64-pc-linux-gnu) — madi@forge-node-01:~#
              </span>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-1.5 text-[10px] text-[#71717a]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                <span>DAEMON: HEALTHY</span>
              </div>

              <button
                onClick={handleCopyLogs}
                className="flex items-center gap-1 px-2 py-0.5 text-[10px] text-[#a1a1aa] hover:text-white border border-white/10 bg-[#08080a] rounded-xs transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-[#22c55e]" />
                    <span>COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3 h-3" />
                    <span>COPY BUFFER</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Progress bar line for active simulation */}
          <div className="h-[2px] bg-white/[0.04] w-full">
            <div
              ref={progressBarRef}
              className={`h-full ${
                activeSimulation?.includes("Rollback")
                  ? "bg-red-500"
                  : activeSimulation?.includes("Spike")
                  ? "bg-[#06b6d4]"
                  : "bg-[#22c55e]"
              } transition-all`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Log Stream Output Container */}
          <div
            ref={logsContainerRef}
            className="p-4 sm:p-6 bg-[#08080a] min-h-[380px] max-h-[480px] overflow-y-auto space-y-1.5 selection:bg-white/20 select-text"
          >
            {logs.map((log) => (
              <div
                key={log.id}
                className="flex items-start gap-2.5 font-mono leading-relaxed hover:bg-white/[0.02] px-1 py-0.5 rounded-xs"
              >
                <span className="text-[#52525b] select-none shrink-0 text-[11px]">
                  [{log.timestamp}]
                </span>
                <span className="text-[#71717a] shrink-0 font-medium text-[11px]">
                  [{log.tag}]
                </span>
                <span className={`${getLevelStyle(log.level)} break-all text-[11px]`}>
                  {log.message}
                </span>
              </div>
            ))}

            {/* Pulsing CLI Cursor Prompt */}
            <div className="flex items-center gap-2 pt-2 text-[#71717a] select-none text-[11px]">
              <span className="text-[#22c55e]">madi@forge-node-01:~$</span>
              <span className="inline-block w-2 h-4 bg-[#ededed] animate-pulse" />
            </div>
          </div>

          {/* Terminal Footer Bar */}
          <div className="px-4 py-2 bg-[#111114] border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-2 text-[10px] text-[#71717a]">
            <div className="flex items-center gap-4">
              <span>SOCKET: /var/run/docker.sock</span>
              <span>PID: 1042</span>
              <span>BUFFER: {logs.length} events</span>
            </div>
            <div>
              {isRunning ? (
                <span className="text-yellow-400 animate-pulse">
                  EXECUTING {activeSimulation?.toUpperCase()}...
                </span>
              ) : (
                <span className="text-[#22c55e]">CONSOLE IDLE & LISTENING</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
