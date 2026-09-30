import React from "react";

export function ForgeStateMachineSvg() {
  return (
    <div className="w-full overflow-x-auto py-2 -mx-1 px-1">
      <svg
        viewBox="0 0 780 140"
        className="w-full min-w-[580px] h-auto font-mono text-[11px] select-none"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Forge Finite State Machine Diagram"
      >
        <defs>
          <marker
            id="arrow"
            viewBox="0 0 8 8"
            refX="6"
            refY="4"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 6 4 L 0 6.5 z" fill="var(--muted)" />
          </marker>
          <marker
            id="arrow-fail"
            viewBox="0 0 8 8"
            refX="6"
            refY="4"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 6 4 L 0 6.5 z" fill="var(--muted)" />
          </marker>
          <marker
            id="arrow-active"
            viewBox="0 0 8 8"
            refX="6"
            refY="4"
            markerWidth="6"
            markerHeight="6"
            orient="auto-start-reverse"
          >
            <path d="M 0 1.5 L 6 4 L 0 6.5 z" fill="var(--state-active)" />
          </marker>
        </defs>

        {/* Happy Path Transitions (Top Row: y=37) */}
        {/* PENDING -> BUILDING */}
        <line
          x1="100"
          y1="37"
          x2="138"
          y2="37"
          stroke="var(--muted)"
          strokeWidth="1.2"
          markerEnd="url(#arrow)"
        />

        {/* BUILDING -> STARTING */}
        <line
          x1="232"
          y1="37"
          x2="270"
          y2="37"
          stroke="var(--muted)"
          strokeWidth="1.2"
          markerEnd="url(#arrow)"
        />

        {/* STARTING -> HEALTH_CHECKING */}
        <line
          x1="364"
          y1="37"
          x2="402"
          y2="37"
          stroke="var(--muted)"
          strokeWidth="1.2"
          markerEnd="url(#arrow)"
        />

        {/* HEALTH_CHECKING -> ACTIVE */}
        <line
          x1="552"
          y1="37"
          x2="600"
          y2="37"
          stroke="var(--state-active)"
          strokeWidth="1.5"
          markerEnd="url(#arrow-active)"
        />

        {/* Failure Branches (Down to y=92) */}
        {/* HEALTH_CHECKING -> FAILED */}
        <path
          d="M 478 54 L 478 90"
          stroke="var(--muted)"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          markerEnd="url(#arrow-fail)"
        />

        {/* ACTIVE -> ROLLED_BACK */}
        <path
          d="M 644 54 L 644 90"
          stroke="var(--muted)"
          strokeWidth="1.2"
          strokeDasharray="3 3"
          markerEnd="url(#arrow-fail)"
        />

        {/* --- Node 1: PENDING --- */}
        <rect
          x="16"
          y="20"
          width="84"
          height="34"
          rx="0"
          stroke="var(--border)"
          strokeWidth="1.2"
          fill="var(--bg)"
        />
        <text
          x="58"
          y="38"
          fill="var(--fg)"
          textAnchor="middle"
          dominantBaseline="middle"
          fontWeight="500"
        >
          PENDING
        </text>

        {/* --- Node 2: BUILDING --- */}
        <rect
          x="140"
          y="20"
          width="92"
          height="34"
          rx="0"
          stroke="var(--border)"
          strokeWidth="1.2"
          fill="var(--bg)"
        />
        <text
          x="186"
          y="38"
          fill="var(--fg)"
          textAnchor="middle"
          dominantBaseline="middle"
          fontWeight="500"
        >
          BUILDING
        </text>

        {/* --- Node 3: STARTING --- */}
        <rect
          x="272"
          y="20"
          width="92"
          height="34"
          rx="0"
          stroke="var(--border)"
          strokeWidth="1.2"
          fill="var(--bg)"
        />
        <text
          x="318"
          y="38"
          fill="var(--fg)"
          textAnchor="middle"
          dominantBaseline="middle"
          fontWeight="500"
        >
          STARTING
        </text>

        {/* --- Node 4: HEALTH_CHECKING --- */}
        <rect
          x="404"
          y="20"
          width="148"
          height="34"
          rx="0"
          stroke="var(--border)"
          strokeWidth="1.2"
          fill="var(--bg)"
        />
        <text
          x="478"
          y="38"
          fill="var(--fg)"
          textAnchor="middle"
          dominantBaseline="middle"
          fontWeight="500"
        >
          HEALTH_CHECKING
        </text>

        {/* --- Node 5: ACTIVE (Promoted state) --- */}
        <rect
          x="602"
          y="18"
          width="84"
          height="38"
          rx="0"
          stroke="var(--state-active)"
          strokeWidth="1.8"
          fill="var(--bg)"
        />
        <text
          x="644"
          y="38"
          fill="var(--state-active)"
          textAnchor="middle"
          dominantBaseline="middle"
          fontWeight="600"
        >
          ACTIVE
        </text>

        {/* --- Failure Node: FAILED --- */}
        <rect
          x="428"
          y="92"
          width="100"
          height="30"
          rx="0"
          stroke="var(--border)"
          strokeWidth="1"
          strokeDasharray="2 2"
          fill="var(--bg)"
        />
        <text
          x="478"
          y="108"
          fill="var(--muted)"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
        >
          FAILED
        </text>

        {/* --- Failure Node: ROLLED_BACK --- */}
        <rect
          x="589"
          y="92"
          width="110"
          height="30"
          rx="0"
          stroke="var(--border)"
          strokeWidth="1"
          strokeDasharray="2 2"
          fill="var(--bg)"
        />
        <text
          x="644"
          y="108"
          fill="var(--muted)"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="10"
        >
          ROLLED_BACK
        </text>
      </svg>
    </div>
  );
}
