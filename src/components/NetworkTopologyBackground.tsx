"use client";

import React, { useEffect, useRef } from "react";
import { animate, remove } from "animejs";

interface NodePoint {
  id: number;
  nx: number; // normalized x (0 to 1)
  ny: number; // normalized y (0 to 1)
}

interface Edge {
  source: number;
  target: number;
  length: number;
}

interface Packet {
  id: number;
  source: number;
  target: number;
  progress: number;
  opacity: number;
  color: string;
}

interface NodePulse {
  id: number;
  nodeIndex: number;
  radius: number;
  opacity: number;
  color: string;
}

// 26 well-distributed normalized topology node coordinates (sparse, artistic layout)
const DEFAULT_NODES: NodePoint[] = [
  // Top region & corners
  { id: 0, nx: 0.04, ny: 0.08 },
  { id: 1, nx: 0.22, ny: 0.05 },
  { id: 2, nx: 0.42, ny: 0.07 },
  { id: 3, nx: 0.65, ny: 0.04 },
  { id: 4, nx: 0.85, ny: 0.09 },
  { id: 5, nx: 0.96, ny: 0.14 },

  // Upper-middle region
  { id: 6, nx: 0.08, ny: 0.28 },
  { id: 7, nx: 0.35, ny: 0.24 },
  { id: 8, nx: 0.58, ny: 0.22 },
  { id: 9, nx: 0.88, ny: 0.32 },

  // Center & middle edges
  { id: 10, nx: 0.03, ny: 0.52 },
  { id: 11, nx: 0.18, ny: 0.48 },
  { id: 12, nx: 0.48, ny: 0.46 },
  { id: 13, nx: 0.78, ny: 0.50 },
  { id: 14, nx: 0.95, ny: 0.55 },

  // Lower-middle region
  { id: 15, nx: 0.09, ny: 0.72 },
  { id: 16, nx: 0.32, ny: 0.68 },
  { id: 17, nx: 0.62, ny: 0.74 },
  { id: 18, nx: 0.91, ny: 0.70 },

  // Bottom region & corners
  { id: 19, nx: 0.05, ny: 0.92 },
  { id: 20, nx: 0.25, ny: 0.94 },
  { id: 21, nx: 0.46, ny: 0.90 },
  { id: 22, nx: 0.70, ny: 0.95 },
  { id: 23, nx: 0.89, ny: 0.91 },
  { id: 24, nx: 0.97, ny: 0.86 },
];

export function NetworkTopologyBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let isRunning = true;
    let animationFrameId: number;

    const packets: Packet[] = [];
    const pulses: NodePulse[] = [];
    const activeAnims: { cancel?: () => void }[] = [];
    let packetSeq = 0;
    let pulseSeq = 0;

    // Fixed topology edges between nearby nodes
    let edges: Edge[] = [];

    const buildEdges = (w: number, h: number) => {
      edges = [];
      const threshold = Math.hypot(w, h) * 0.22; // dynamic distance limit

      for (let i = 0; i < DEFAULT_NODES.length; i++) {
        for (let j = i + 1; j < DEFAULT_NODES.length; j++) {
          const n1 = DEFAULT_NODES[i];
          const n2 = DEFAULT_NODES[j];
          const dx = (n1.nx - n2.nx) * w;
          const dy = (n1.ny - n2.ny) * h;
          const dist = Math.hypot(dx, dy);

          // Connect if within threshold and not too clustered
          if (dist < threshold && dist > 50) {
            edges.push({ source: i, target: j, length: dist });
          }
        }
      }
    };

    const resize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildEdges(width, height);
    };

    resize();
    window.addEventListener("resize", resize);

    // Spawns a packet that travels along a random edge using Anime.js
    const spawnPacket = () => {
      if (!isRunning || edges.length === 0) return;

      // Keep 3 to 6 active packets at any time
      if (packets.length >= 6) return;

      const edge = edges[Math.floor(Math.random() * edges.length)];
      // 50% chance forward or backward
      const isForward = Math.random() > 0.5;
      const source = isForward ? edge.source : edge.target;
      const target = isForward ? edge.target : edge.source;

      // Color selection matching site accents: emerald green or Traefik cyan
      const isCyan = Math.random() > 0.45;
      const color = isCyan ? "#06b6d4" : "#22c55e";

      const packet: Packet = {
        id: packetSeq++,
        source,
        target,
        progress: 0,
        opacity: 0,
        color,
      };

      packets.push(packet);

      // Animate packet progress from 0 to 1 with Anime.js
      const duration = 2000 + Math.random() * 2200; // 2s - 4.2s smooth transit
      const anim = animate(packet, {
        progress: 1,
        duration,
        ease: "easeInOutSine",
        onUpdate: () => {
          // Smooth fade in / fade out curve:
          // 0 -> 0.15: fade in from 0 to 1
          // 0.15 -> 0.85: fully visible
          // 0.85 -> 1.0: fade out from 1 to 0
          if (packet.progress < 0.15) {
            packet.opacity = packet.progress / 0.15;
          } else if (packet.progress > 0.85) {
            packet.opacity = (1 - packet.progress) / 0.15;
          } else {
            packet.opacity = 1;
          }
        },
        onComplete: () => {
          // Remove finished packet
          const idx = packets.indexOf(packet);
          if (idx !== -1) packets.splice(idx, 1);

          // Trigger subtle destination node ripple pulse
          const pulse: NodePulse = {
            id: pulseSeq++,
            nodeIndex: target,
            radius: 2,
            opacity: 0.55,
            color,
          };
          pulses.push(pulse);

          const pulseAnim = animate(pulse, {
            radius: 8,
            opacity: 0,
            duration: 800,
            ease: "outQuad",
            onComplete: () => {
              const pIdx = pulses.indexOf(pulse);
              if (pIdx !== -1) pulses.splice(pIdx, 1);
            },
          });
          activeAnims.push(pulseAnim);
        },
      });

      activeAnims.push(anim);
    };

    // Stagger packet creation loop
    const packetInterval = setInterval(() => {
      // 70% chance to spawn if room
      if (Math.random() < 0.75) {
        spawnPacket();
      }
    }, 700);

    // Initial warm-up: spawn 3 initial packets
    for (let i = 0; i < 3; i++) {
      setTimeout(spawnPacket, i * 400);
    }

    // Animation Render Loop
    const render = () => {
      if (!isRunning) return;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw connecting lines (very low-opacity cyan/green)
      ctx.lineWidth = 1;
      ctx.strokeStyle = "rgba(6, 182, 212, 0.055)";

      for (let i = 0; i < edges.length; i++) {
        const edge = edges[i];
        const n1 = DEFAULT_NODES[edge.source];
        const n2 = DEFAULT_NODES[edge.target];

        const x1 = n1.nx * width;
        const y1 = n1.ny * height;
        const x2 = n2.nx * width;
        const y2 = n2.ny * height;

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }

      // 2. Draw static nodes (tiny dots barely visible at rest)
      for (let i = 0; i < DEFAULT_NODES.length; i++) {
        const node = DEFAULT_NODES[i];
        const x = node.nx * width;
        const y = node.ny * height;

        ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }

      // 3. Draw destination pulses (subtle ripple when packet arrives)
      for (let i = 0; i < pulses.length; i++) {
        const pulse = pulses[i];
        const node = DEFAULT_NODES[pulse.nodeIndex];
        const x = node.nx * width;
        const y = node.ny * height;

        ctx.save();
        ctx.strokeStyle = pulse.color;
        ctx.globalAlpha = Math.max(0, pulse.opacity);
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(x, y, pulse.radius, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      // 4. Draw active traveling packets (bright dots with faint glow)
      for (let i = 0; i < packets.length; i++) {
        const packet = packets[i];
        const n1 = DEFAULT_NODES[packet.source];
        const n2 = DEFAULT_NODES[packet.target];

        const x1 = n1.nx * width;
        const y1 = n1.ny * height;
        const x2 = n2.nx * width;
        const y2 = n2.ny * height;

        const currentX = x1 + (x2 - x1) * packet.progress;
        const currentY = y1 + (y2 - y1) * packet.progress;

        ctx.save();
        ctx.globalAlpha = Math.max(0, Math.min(1, packet.opacity * 0.85));

        // Subtle glow aura
        ctx.shadowColor = packet.color;
        ctx.shadowBlur = 6;
        ctx.fillStyle = packet.color;

        // Packet head
        ctx.beginPath();
        ctx.arc(currentX, currentY, 2, 0, Math.PI * 2);
        ctx.fill();

        // Subtle trailing tail
        const tailProgress = Math.max(0, packet.progress - 0.05);
        const tailX = x1 + (x2 - x1) * tailProgress;
        const tailY = y1 + (y2 - y1) * tailProgress;

        ctx.strokeStyle = packet.color;
        ctx.lineWidth = 1.2;
        ctx.globalAlpha = packet.opacity * 0.4;
        ctx.beginPath();
        ctx.moveTo(currentX, currentY);
        ctx.lineTo(tailX, tailY);
        ctx.stroke();

        ctx.restore();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    // Cleanup on unmount
    return () => {
      isRunning = false;
      clearInterval(packetInterval);
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      activeAnims.forEach((anim) => anim?.cancel?.());
      remove(canvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
}
