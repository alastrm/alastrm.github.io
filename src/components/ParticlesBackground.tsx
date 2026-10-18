"use client";

import React, { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
}

export function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let compact = false;
    let maxDistance = 150;
    const desktopParticleCount = 42;
    const particles: Particle[] = [];
    const connectionCounts = new Uint8Array(desktopParticleCount);

    // Retina support matching "retina_detect: true"
    const setupCanvasSize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const previousWidth = width;
      const previousHeight = height;
      width = Math.max(1, window.innerWidth);
      height = Math.max(1, window.innerHeight);
      compact = width <= 760;
      maxDistance = compact ? Math.min(110, width * 0.28) : 150;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Preserve distribution when mobile browser chrome changes the viewport.
      for (const p of particles) {
        p.x = ((p.x / previousWidth) * width + width) % width;
        p.y = ((p.y / previousHeight) * height + height) % height;
      }

      const count = compact
        ? Math.max(8, Math.min(18, Math.round((width * height) / 28000)))
        : desktopParticleCount;
      particles.length = Math.min(particles.length, count);
      while (particles.length < count) particles.push(createParticle());
    };

    function createParticle(): Particle {
      const angle = Math.random() * Math.PI * 2;
      // Very slow, calm speed
      const speed = 0.18 + Math.random() * 0.22;
      // Size ~1.8
      const radius = 1.4 + Math.random() * 0.9;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        radius,
      };
    }

    setupCanvasSize();

    const handleResize = () => {
      setupCanvasSize();
    };

    window.addEventListener("resize", handleResize);

    // Render loop
    const render = () => {
      const isDark = document.documentElement.classList.contains("dark");

      // In light theme, disable particles completely
      if (!isDark) {
        ctx.clearRect(0, 0, width, height);
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Dark theme particles
      const dotColor = compact ? "rgba(255, 255, 255, 0.30)" : "rgba(255, 255, 255, 0.38)";
      const lineRgb = "255, 255, 255";
      const maxLineOpacity = compact ? 0.12 : 0.18;
      if (compact) connectionCounts.fill(0);

      // 1. Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Ambient slow movement (no hover/click interactivity)
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around borders
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, compact ? p.radius * 0.8 : p.radius, 0, Math.PI * 2);
        ctx.fillStyle = dotColor;
        ctx.fill();

        // 2. Connect nearby particles with subtle lines
        for (let j = i + 1; j < particles.length; j++) {
          // Two links per point keep mobile clusters from becoming dense meshes.
          if (compact && (connectionCounts[i] >= 2 || connectionCounts[j] >= 2)) continue;
          const p2 = particles[j];
          const dist = Math.hypot(p.x - p2.x, p2.y - p.y);

          if (dist < maxDistance) {
            const alpha = (1 - dist / maxDistance) * maxLineOpacity;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${lineRgb}, ${alpha})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
            if (compact) {
              connectionCounts[i]++;
              connectionCounts[j]++;
            }
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 w-full h-full"
      aria-hidden="true"
    />
  );
}
