"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  GitBranch,
  Radio,
  FileCode,
} from "lucide-react";
import { animate, remove } from "animejs";

type NodeType = "ingress" | "traefik" | "blue_pool" | "green_pool" | "storage";
type DeployPhase = "blue_100" | "split_50" | "green_100";

interface NodeTelemetry {
  id: NodeType;
  title: string;
  category: string;
  status: string;
  statusColor: string;
  metrics: { label: string; value: string }[];
  tags: string[];
  configSnippet: string;
  invariants: string;
}

const nodeData: Record<NodeType, NodeTelemetry> = {
  ingress: {
    id: "ingress",
    title: "Client Edge & Gateway",
    category: "INGRESS / L4-L7 BOUNDARY",
    status: "HEALTHY",
    statusColor: "text-[#22c55e]",
    metrics: [
      { label: "Throughput", value: "18,520 req/s" },
      { label: "Active Sockets", value: "42,104" },
      { label: "Protocol", value: "HTTP/2 + TLS 1.3" },
      { label: "Edge Handshake", value: "0.8ms avg" },
    ],
    tags: [
      "rate_limit: 5000/s",
      "keepalive: 65s",
      "tls: ChaCha20-Poly1305",
      "geo_route: anycast",
    ],
    configSnippet: `# Edge Gateway Invariant
stream {
  limit_conn_zone $binary_remote_addr zone=addr:20m;
  upstream traefik_backend {
    server 10.0.4.10:443 max_fails=2 fail_timeout=5s;
    keepalive 256;
  }
}`,
    invariants:
      "Terminates public TLS certificates with 0ms renegotiation overhead; proxies raw TCP/HTTP to Traefik internal overlay mesh.",
  },
  traefik: {
    id: "traefik",
    title: "Traefik Ingress Supervisor",
    category: "DYNAMIC REVERSE PROXY",
    status: "ROUTING_ACTIVE",
    statusColor: "text-[#06b6d4]",
    metrics: [
      { label: "Healthcheck Freq", value: "2,500ms" },
      { label: "Probe Timeout", value: "800ms" },
      { label: "Drain Window", value: "30.0s" },
      { label: "Weight Switch Latency", value: "< 12ms" },
    ],
    tags: [
      "provider: file + docker",
      "algorithm: wrr (weighted)",
      "healthcheck: /health",
      "draining: active_conns_zero",
    ],
    configSnippet: `# Traefik Dynamic Ingress Provider
http:
  services:
    forge-service:
      weighted:
        services:
          - name: blue-pool@docker
            weight: var(--blue-weight)
          - name: green-pool@docker
            weight: var(--green-weight)
      healthCheck:
        path: /health
        interval: 2500ms
        timeout: 800ms`,
    invariants:
      "Performs atomic route switching via dynamic weighted round-robin. Does not drop active HTTP keep-alive or WebSocket frames during transition.",
  },
  blue_pool: {
    id: "blue_pool",
    title: "Blue Container Pool (v1.4.2)",
    category: "ACTIVE COMPUTE WORKERS",
    status: "SERVING",
    statusColor: "text-[#22c55e]",
    metrics: [
      { label: "Image Digest", value: "sha256:c83a19e2" },
      { label: "Worker Count", value: "4 Replicas" },
      { label: "Memory RSS", value: "214MB / 512MB" },
      { label: "CPU Cgroup", value: "1.5 vCPU quota" },
    ],
    tags: [
      "runtime: containerd 1.7",
      "conns: 128 active",
      "probe: 200 OK (1.4ms)",
      "signals: SIGTERM graceful",
    ],
    configSnippet: `# Docker Engine API Container Allocation
{
  "Image": "registry.sys/engine:v1.4.2",
  "HostConfig": {
    "Memory": 536870912,
    "CpuQuota": 150000,
    "RestartPolicy": { "Name": "on-failure", "MaximumRetryCount": 3 }
  },
  "Labels": { "traefik.enable": "true", "forge.pool": "blue" }
}`,
    invariants:
      "Stable production pool. Receives incoming traffic until Green pool passes 3 consecutive synthetic health checks.",
  },
  green_pool: {
    id: "green_pool",
    title: "Green Container Pool (v1.5.0)",
    category: "STAGED / CANARY TARGET",
    status: "STANDBY_READY",
    statusColor: "text-[#06b6d4]",
    metrics: [
      { label: "Image Digest", value: "sha256:f19d44a9" },
      { label: "Worker Count", value: "4 Replicas" },
      { label: "Memory RSS", value: "198MB / 512MB" },
      { label: "Warmup State", value: "3/3 Probes Valid" },
    ],
    tags: [
      "pre-warmed: true",
      "db_schema: v24 migrated",
      "synthetic_test: passed",
      "rollback_arm: armed",
    ],
    configSnippet: `# Staged Rollout Target Validation
probe_target: "http://10.0.12.44:8080/health"
expected_code: 200
synthetic_payload_latency: 2.1ms
state_assertion: "GREEN_WARMED_AND_HEALTHY"`,
    invariants:
      "Spawned in isolation. Inbound port opens only after internal connection pool to PostgreSQL & Redis is established and verified.",
  },
  storage: {
    id: "storage",
    title: "PostgreSQL 16 & Redis 7 Streams",
    category: "STATE & STREAMING TIER",
    status: "LINEARIZABLE",
    statusColor: "text-[#22c55e]",
    metrics: [
      { label: "Postgres Pool", value: "PgBouncer (24/120)" },
      { label: "WAL Replica Lag", value: "0.8ms" },
      { label: "Redis Stream Lag", value: "0 msgs" },
      { label: "Stream Read p99", value: "1.2ms" },
    ],
    tags: [
      "postgres: read-committed",
      "redis: XADD / XREADGROUP",
      "dlq: enabled",
      "backpressure: reactive",
    ],
    configSnippet: `# Async Pipeline Broker Spec
POSTGRES_POOL_SIZE = 40
PGBOUNCER_POOL_MODE = "transaction"
REDIS_CONSUMER_GROUP = "engine-workers-v1"
REDIS_BLOCK_MS = 2000
REDIS_BATCH_SIZE = 100`,
    invariants:
      "All state mutations are idempotently committed via distributed advisory locks. Redis Streams consumer groups guarantee at-least-once task delivery.",
  },
};

export function ArchitectureCanvas() {
  const [selectedNode, setSelectedNode] = useState<NodeType>("traefik");
  const [deployPhase, setDeployPhase] = useState<DeployPhase>("blue_100");
  const svgRef = useRef<SVGSVGElement | null>(null);

  // Anime.js loop cleanup
  useEffect(() => {
    if (!svgRef.current) return;

    // Select packet pulse targets
    const pulseLines = svgRef.current.querySelectorAll(".pulse-flow-line");
    if (!pulseLines || pulseLines.length === 0) return;

    const animInstance = animate(pulseLines, {
      strokeDashoffset: [160, 0],
      duration: 1800,
      ease: "linear",
      loop: true,
    });

    return () => {
      animInstance.cancel();
      remove(pulseLines);
    };
  }, [deployPhase]);

  const activeTelemetry = nodeData[selectedNode];

  // Routing weights calculated from deployPhase
  const blueWeight =
    deployPhase === "blue_100" ? 100 : deployPhase === "split_50" ? 50 : 0;
  const greenWeight =
    deployPhase === "blue_100" ? 0 : deployPhase === "split_50" ? 50 : 100;

  return (
    <section
      id="architecture"
      className="py-20 md:py-28 border-b border-white/[0.08] bg-[#08080a] relative isolate z-10 scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-[#06b6d4] tracking-wider mb-2">
              <GitBranch className="w-3.5 h-3.5" strokeWidth={1.5} />
              <span>SYSTEM TOPOLOGY // DATA FLOW & ORCHESTRATION</span>
            </div>
            <h2 className="font-[family-name:var(--font-zodiak)] text-3xl sm:text-4xl md:text-5xl font-normal text-[#ededed] tracking-tight">
              Interactive Ingress & Service Topology
            </h2>
          </div>

          {/* Deploy Phase Interactive Switcher */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 border border-white/[0.1] bg-[#111114] p-1.5 rounded-xs font-mono text-xs">
            <span className="text-[10px] text-[#71717a] px-2 py-1">PHASE:</span>
            <button
              onClick={() => setDeployPhase("blue_100")}
              className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
                deployPhase === "blue_100"
                  ? "bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/40 font-medium"
                  : "text-[#a1a1aa] hover:text-white"
              }`}
            >
              100% Blue
            </button>
            <button
              onClick={() => setDeployPhase("split_50")}
              className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
                deployPhase === "split_50"
                  ? "bg-[#06b6d4]/20 text-[#06b6d4] border border-[#06b6d4]/40 font-medium"
                  : "text-[#a1a1aa] hover:text-white"
              }`}
            >
              50 / 50 Canary Shift
            </button>
            <button
              onClick={() => setDeployPhase("green_100")}
              className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
                deployPhase === "green_100"
                  ? "bg-[#22c55e]/20 text-[#22c55e] border border-[#22c55e]/40 font-medium"
                  : "text-[#a1a1aa] hover:text-white"
              }`}
            >
              100% Green (Drained)
            </button>
          </div>
        </div>

        {/* Main Grid: Interactive Canvas + Telemetry Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Topology Canvas Area (7 Cols) */}
          <div className="lg:col-span-7 bg-[#111114] border border-white/[0.08] rounded-xs p-5 relative overflow-hidden">
            {/* Header info bar */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.06] text-[11px] font-mono text-[#71717a]">
              <div className="flex items-center gap-2">
                <Radio className="w-3.5 h-3.5 text-[#22c55e] animate-pulse" strokeWidth={1.5} />
                <span className="text-[#ededed]">NETWORK MESH: ACTIVE</span>
              </div>
              <span className="text-[#06b6d4]">CLICK ANY COMPONENT TO AUDIT INVARIANTS</span>
            </div>

            {/* SVG Data Flow Canvas */}
            <div className="relative w-full aspect-[16/10] min-h-[380px] sm:min-h-[440px] flex items-center justify-center">
              <svg
                ref={svgRef}
                viewBox="0 0 760 480"
                className="w-full h-full select-none"
                style={{ overflow: "visible" }}
              >
                <defs>
                  {/* Subtle Grid Pattern in SVG */}
                  <pattern
                    id="canvas-grid"
                    width="24"
                    height="24"
                    patternUnits="userSpaceOnUse"
                  >
                    <circle cx="2" cy="2" r="0.75" fill="rgba(255,255,255,0.06)" />
                  </pattern>

                  {/* Gradient for links */}
                  <linearGradient id="link-grad-blue" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#22c55e" stopOpacity="0.8" />
                  </linearGradient>
                </defs>

                {/* Grid Background */}
                <rect width="760" height="480" fill="url(#canvas-grid)" />

                {/* CONNECTING WIRES (Static Paths) */}
                {/* 1. Ingress (110, 240) -> Traefik (280, 240) */}
                <path
                  d="M 170 240 L 250 240"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="2"
                  fill="none"
                />
                {/* 2. Traefik (370, 220) -> Blue Pool (480, 160) */}
                <path
                  d="M 370 220 C 420 220, 430 160, 480 160"
                  stroke={blueWeight > 0 ? "rgba(34, 197, 94, 0.3)" : "rgba(255,255,255,0.06)"}
                  strokeWidth="2"
                  fill="none"
                />
                {/* 3. Traefik (370, 260) -> Green Pool (480, 320) */}
                <path
                  d="M 370 260 C 420 260, 430 320, 480 320"
                  stroke={greenWeight > 0 ? "rgba(6, 182, 212, 0.4)" : "rgba(255,255,255,0.06)"}
                  strokeWidth="2"
                  fill="none"
                />
                {/* 4. Blue Pool (590, 160) -> Storage (640, 220) */}
                <path
                  d="M 590 160 C 615 160, 620 220, 640 220"
                  stroke={blueWeight > 0 ? "rgba(34, 197, 94, 0.25)" : "rgba(255,255,255,0.05)"}
                  strokeWidth="2"
                  fill="none"
                />
                {/* 5. Green Pool (590, 320) -> Storage (640, 260) */}
                <path
                  d="M 590 320 C 615 320, 620 260, 640 260"
                  stroke={greenWeight > 0 ? "rgba(6, 182, 212, 0.3)" : "rgba(255,255,255,0.05)"}
                  strokeWidth="2"
                  fill="none"
                />

                {/* ANIMATED PACKET PULSE TRACERS (Anime.js targets) */}
                {/* Ingress -> Traefik */}
                <path
                  className="pulse-flow-line"
                  d="M 170 240 L 250 240"
                  stroke="#22c55e"
                  strokeWidth="2.5"
                  strokeDasharray="12 24"
                  fill="none"
                />

                {/* Traefik -> Blue Pool (if weight > 0) */}
                {blueWeight > 0 && (
                  <path
                    className="pulse-flow-line"
                    d="M 370 220 C 420 220, 430 160, 480 160"
                    stroke="#22c55e"
                    strokeWidth={blueWeight === 100 ? "3" : "2"}
                    strokeDasharray="14 26"
                    fill="none"
                  />
                )}

                {/* Traefik -> Green Pool (if weight > 0) */}
                {greenWeight > 0 && (
                  <path
                    className="pulse-flow-line"
                    d="M 370 260 C 420 260, 430 320, 480 320"
                    stroke="#06b6d4"
                    strokeWidth={greenWeight === 100 ? "3" : "2"}
                    strokeDasharray="14 26"
                    fill="none"
                  />
                )}

                {/* Blue Pool -> Storage */}
                {blueWeight > 0 && (
                  <path
                    className="pulse-flow-line"
                    d="M 590 160 C 615 160, 620 220, 640 220"
                    stroke="#22c55e"
                    strokeWidth="2"
                    strokeDasharray="10 20"
                    fill="none"
                  />
                )}

                {/* Green Pool -> Storage */}
                {greenWeight > 0 && (
                  <path
                    className="pulse-flow-line"
                    d="M 590 320 C 615 320, 620 260, 640 260"
                    stroke="#06b6d4"
                    strokeWidth="2"
                    strokeDasharray="10 20"
                    fill="none"
                  />
                )}

                {/* NODE 1: Ingress / Edge */}
                <g
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => setSelectedNode("ingress")}
                >
                  <rect
                    x="50"
                    y="190"
                    width="120"
                    height="100"
                    rx="4"
                    fill="#08080a"
                    stroke={selectedNode === "ingress" ? "#22c55e" : "rgba(255,255,255,0.18)"}
                    strokeWidth={selectedNode === "ingress" ? "2.5" : "1"}
                  />
                  <rect x="50" y="190" width="120" height="22" rx="4" fill="#16161a" />
                  <text x="60" y="205" fill="#71717a" fontSize="9" fontFamily="monospace">
                    PORT 443 / 80
                  </text>
                  <text x="60" y="232" fill="#ededed" fontSize="11" fontWeight="600" fontFamily="monospace">
                    Client Edge
                  </text>
                  <text x="60" y="250" fill="#22c55e" fontSize="9" fontFamily="monospace">
                    18.5k req/s
                  </text>
                  <text x="60" y="268" fill="#71717a" fontSize="8" fontFamily="monospace">
                    TLS 1.3 Term
                  </text>
                  <circle cx="155" cy="201" r="3" fill="#22c55e" />
                  {/* Invisible Hit Area */}
                  <rect x="50" y="190" width="120" height="100" fill="transparent" pointerEvents="all" />
                </g>

                {/* NODE 2: Traefik Ingress Supervisor */}
                <g
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => setSelectedNode("traefik")}
                >
                  <rect
                    x="250"
                    y="180"
                    width="120"
                    height="120"
                    rx="4"
                    fill="#08080a"
                    stroke={selectedNode === "traefik" ? "#06b6d4" : "rgba(255,255,255,0.18)"}
                    strokeWidth={selectedNode === "traefik" ? "2.5" : "1"}
                  />
                  <rect x="250" y="180" width="120" height="22" rx="4" fill="#16161a" />
                  <text x="260" y="195" fill="#06b6d4" fontSize="9" fontFamily="monospace">
                    DYNAMIC ROUTER
                  </text>
                  <text x="260" y="222" fill="#ededed" fontSize="11" fontWeight="600" fontFamily="monospace">
                    Traefik v3.1
                  </text>
                  <text x="260" y="240" fill="#a1a1aa" fontSize="9" fontFamily="monospace">
                    WRR Balancer
                  </text>
                  <text x="260" y="258" fill="#22c55e" fontSize="9" fontFamily="monospace">
                    B:{blueWeight}% | G:{greenWeight}%
                  </text>
                  <text x="260" y="276" fill="#71717a" fontSize="8" fontFamily="monospace">
                    Probe: 2.5s
                  </text>
                  <circle cx="355" cy="191" r="3" fill="#06b6d4" />
                  {/* Invisible Hit Area */}
                  <rect x="250" y="180" width="120" height="120" fill="transparent" pointerEvents="all" />
                </g>

                {/* NODE 3: Blue Pool (v1.4.2) */}
                <g
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => setSelectedNode("blue_pool")}
                >
                  <rect
                    x="480"
                    y="110"
                    width="110"
                    height="95"
                    rx="4"
                    fill="#08080a"
                    stroke={
                      selectedNode === "blue_pool"
                        ? "#22c55e"
                        : blueWeight > 0
                        ? "rgba(34,197,94,0.4)"
                        : "rgba(255,255,255,0.1)"
                    }
                    strokeWidth={selectedNode === "blue_pool" ? "2.5" : "1"}
                  />
                  <rect x="480" y="110" width="110" height="20" rx="4" fill="#16161a" />
                  <text x="488" y="124" fill={blueWeight > 0 ? "#22c55e" : "#71717a"} fontSize="8" fontFamily="monospace">
                    {blueWeight > 0 ? "BLUE: ACTIVE" : "BLUE: DRAINED"}
                  </text>
                  <text x="488" y="148" fill="#ededed" fontSize="10" fontWeight="600" fontFamily="monospace">
                    Pool v1.4.2
                  </text>
                  <text x="488" y="166" fill="#a1a1aa" fontSize="9" fontFamily="monospace">
                    Weight: {blueWeight}%
                  </text>
                  <text x="488" y="184" fill="#71717a" fontSize="8" fontFamily="monospace">
                    4 Replicas
                  </text>
                  <circle cx="575" cy="120" r="3" fill={blueWeight > 0 ? "#22c55e" : "#71717a"} />
                  {/* Invisible Hit Area */}
                  <rect x="480" y="110" width="110" height="95" fill="transparent" pointerEvents="all" />
                </g>

                {/* NODE 4: Green Pool (v1.5.0) */}
                <g
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => setSelectedNode("green_pool")}
                >
                  <rect
                    x="480"
                    y="275"
                    width="110"
                    height="95"
                    rx="4"
                    fill="#08080a"
                    stroke={
                      selectedNode === "green_pool"
                        ? "#06b6d4"
                        : greenWeight > 0
                        ? "rgba(6,182,212,0.5)"
                        : "rgba(255,255,255,0.1)"
                    }
                    strokeWidth={selectedNode === "green_pool" ? "2.5" : "1"}
                  />
                  <rect x="480" y="275" width="110" height="20" rx="4" fill="#16161a" />
                  <text x="488" y="289" fill={greenWeight > 0 ? "#06b6d4" : "#71717a"} fontSize="8" fontFamily="monospace">
                    {greenWeight > 0 ? "GREEN: SERVING" : "GREEN: STAGED"}
                  </text>
                  <text x="488" y="313" fill="#ededed" fontSize="10" fontWeight="600" fontFamily="monospace">
                    Pool v1.5.0
                  </text>
                  <text x="488" y="331" fill="#a1a1aa" fontSize="9" fontFamily="monospace">
                    Weight: {greenWeight}%
                  </text>
                  <text x="488" y="349" fill="#71717a" fontSize="8" fontFamily="monospace">
                    Warmup: 200 OK
                  </text>
                  <circle cx="575" cy="285" r="3" fill={greenWeight > 0 ? "#06b6d4" : "#eab308"} />
                  {/* Invisible Hit Area */}
                  <rect x="480" y="275" width="110" height="95" fill="transparent" pointerEvents="all" />
                </g>

                {/* NODE 5: Postgres 16 & Redis Streams */}
                <g
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => setSelectedNode("storage")}
                >
                  <rect
                    x="640"
                    y="190"
                    width="110"
                    height="100"
                    rx="4"
                    fill="#08080a"
                    stroke={selectedNode === "storage" ? "#22c55e" : "rgba(255,255,255,0.18)"}
                    strokeWidth={selectedNode === "storage" ? "2.5" : "1"}
                  />
                  <rect x="640" y="190" width="110" height="22" rx="4" fill="#16161a" />
                  <text x="648" y="205" fill="#71717a" fontSize="8" fontFamily="monospace">
                    STATE & STREAMS
                  </text>
                  <text x="648" y="232" fill="#ededed" fontSize="10" fontWeight="600" fontFamily="monospace">
                    PG 16 + Redis
                  </text>
                  <text x="648" y="250" fill="#22c55e" fontSize="9" fontFamily="monospace">
                    Lag: 0.8ms
                  </text>
                  <text x="648" y="268" fill="#71717a" fontSize="8" fontFamily="monospace">
                    PgBouncer: 24/120
                  </text>
                  <circle cx="735" cy="201" r="3" fill="#22c55e" />
                  {/* Invisible Hit Area */}
                  <rect x="640" y="190" width="110" height="100" fill="transparent" pointerEvents="all" />
                </g>
              </svg>
            </div>

            {/* Quick node selector buttons below canvas */}
            <div className="flex flex-wrap items-center gap-1.5 pt-4 mt-2 border-t border-white/[0.06] font-mono text-[11px]">
              <span className="text-[#71717a] mr-2">AUDIT NODE:</span>
              {(Object.keys(nodeData) as NodeType[]).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedNode(key)}
                  className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
                    selectedNode === key
                      ? "bg-white/[0.15] text-white border border-white/30 font-medium"
                      : "text-[#71717a] hover:text-[#a1a1aa] bg-white/[0.03] border border-transparent"
                  }`}
                >
                  {nodeData[key].title.split(" ")[0]}
                </button>
              ))}
            </div>
          </div>

          {/* Node Inspector Telemetry Panel (5 Cols) */}
          <div className="lg:col-span-5 bg-[#111114] border border-white/[0.08] rounded-xs p-5 font-mono flex flex-col justify-between shadow-xl">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-white/[0.08]">
                <div className="flex flex-col">
                  <span className="text-[10px] text-[#71717a] tracking-wider">
                    {activeTelemetry.category}
                  </span>
                  <span className="text-base font-semibold text-[#ededed]">
                    {activeTelemetry.title}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 px-2 py-0.5 border border-white/10 bg-[#08080a] text-[10px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e]" />
                  <span className={activeTelemetry.statusColor}>
                    {activeTelemetry.status}
                  </span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 mb-4">
                {activeTelemetry.metrics.map((m) => (
                  <div
                    key={m.label}
                    className="p-2.5 bg-[#08080a] border border-white/[0.06] rounded-xs"
                  >
                    <div className="text-[10px] text-[#71717a]">{m.label}</div>
                    <div className="text-xs font-semibold text-[#ededed] mt-0.5">
                      {m.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Tags & Routing Invariants */}
              <div className="mb-4">
                <div className="text-[10px] text-[#71717a] mb-1.5">
                  ROUTING INVARIANTS & TAGS
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {activeTelemetry.tags.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 text-[10px] bg-[#16161a] border border-white/[0.06] text-[#a1a1aa] rounded-xs"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Configuration Snippet */}
              <div className="mb-4">
                <div className="flex items-center justify-between text-[10px] text-[#71717a] mb-1.5">
                  <span className="flex items-center gap-1">
                    <FileCode className="w-3 h-3 text-[#06b6d4]" strokeWidth={1.5} />
                    SPECIFICATION SNAPSHOT
                  </span>
                  <span>READONLY</span>
                </div>
                <pre className="p-3 bg-[#08080a] border border-white/[0.08] text-[10px] text-[#a1a1aa] overflow-x-auto rounded-xs leading-relaxed font-mono">
                  <code>{activeTelemetry.configSnippet}</code>
                </pre>
              </div>
            </div>

            {/* Invariant Explanation */}
            <div className="p-3 bg-[#08080a] border border-white/[0.06] rounded-xs text-[11px] text-[#71717a] leading-relaxed">
              <span className="text-[#ededed] font-medium mr-1">System Invariant:</span>
              {activeTelemetry.invariants}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
