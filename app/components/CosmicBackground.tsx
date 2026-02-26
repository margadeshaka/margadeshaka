'use client';

import { useEffect, useRef } from 'react';

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Stars — white and warm tones only, no blue
    const stars: { x: number; y: number; radius: number; baseAlpha: number; twinkleSpeed: number; speed: number; color: string }[] = [];

    const createStars = () => {
      stars.length = 0;
      const starCount = Math.min(250, Math.floor(canvas.width * canvas.height / 3500));

      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: 0.3 + Math.random() * 1.2,
          baseAlpha: 0.4 + Math.random() * 0.6,
          twinkleSpeed: 0.5 + Math.random() * 2,
          speed: 0.01 + Math.random() * 0.03,
          color: getStarColor(),
        });
      }
    };

    const getStarColor = () => {
      const colors = [
        '255, 255, 255',     // pure white
        '255, 255, 240',     // warm white
        '255, 245, 220',     // soft cream
        '255, 235, 200',     // warm gold hint
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    createStars();
    window.addEventListener('resize', createStars);

    // Lightning state
    let lightningAlpha = 0;
    let lightningBranches: { x1: number; y1: number; x2: number; y2: number; width: number; alpha: number }[] = [];
    let nextLightningTime = Date.now() + 3000 + Math.random() * 8000;

    const createLightning = () => {
      lightningBranches = [];
      const startX = canvas.width * (0.1 + Math.random() * 0.8);
      const startY = 0;

      let x = startX;
      let y = startY;
      const endY = canvas.height * (0.3 + Math.random() * 0.4);
      const segments = 8 + Math.floor(Math.random() * 8);
      const stepY = (endY - startY) / segments;

      for (let i = 0; i < segments; i++) {
        const nextX = x + (Math.random() - 0.5) * 120;
        const nextY = y + stepY;

        lightningBranches.push({
          x1: x, y1: y, x2: nextX, y2: nextY,
          width: 2.5 - (i / segments) * 1.5,
          alpha: 1,
        });

        // Random side branches
        if (Math.random() > 0.6) {
          const branchLen = 20 + Math.random() * 60;
          const branchAngle = (Math.random() > 0.5 ? 1 : -1) * (0.3 + Math.random() * 0.8);
          lightningBranches.push({
            x1: nextX, y1: nextY,
            x2: nextX + Math.cos(branchAngle) * branchLen,
            y2: nextY + Math.sin(branchAngle + Math.PI / 4) * branchLen,
            width: 1,
            alpha: 0.6,
          });
        }

        x = nextX;
        y = nextY;
      }

      lightningAlpha = 1;
      nextLightningTime = Date.now() + 4000 + Math.random() * 12000;
    };

    // Animation
    let animationFrameId: number;
    let lastFrameTime = 0;
    const targetFPS = 30;
    const frameInterval = 1000 / targetFPS;

    const render = (currentTime: number) => {
      if (currentTime - lastFrameTime < frameInterval) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastFrameTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars with twinkling
      const time = currentTime * 0.001;
      ctx.save();
      stars.forEach(star => {
        const twinkle = 0.5 + 0.5 * Math.sin(time * star.twinkleSpeed + star.x);
        const alpha = star.baseAlpha * twinkle;
        ctx.globalAlpha = alpha;
        ctx.fillStyle = `rgba(${star.color}, ${alpha})`;

        // Larger stars get a soft glow
        if (star.radius > 1) {
          ctx.shadowBlur = 4;
          ctx.shadowColor = `rgba(${star.color}, 0.3)`;
        } else {
          ctx.shadowBlur = 0;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Slow drift
        star.y += star.speed;
        if (star.y > canvas.height + star.radius) {
          star.y = -star.radius;
          star.x = Math.random() * canvas.width;
        }
      });
      ctx.restore();

      // Lightning trigger
      if (Date.now() >= nextLightningTime) {
        createLightning();
      }

      // Draw lightning
      if (lightningAlpha > 0.01) {
        ctx.save();

        // Flash glow on the sky
        ctx.globalAlpha = lightningAlpha * 0.04;
        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Draw branches
        lightningBranches.forEach(branch => {
          ctx.globalAlpha = lightningAlpha * branch.alpha;
          ctx.strokeStyle = `rgba(255, 255, 255, ${lightningAlpha * branch.alpha})`;
          ctx.lineWidth = branch.width;
          ctx.shadowBlur = 12;
          ctx.shadowColor = `rgba(255, 255, 255, ${lightningAlpha * 0.6})`;
          ctx.beginPath();
          ctx.moveTo(branch.x1, branch.y1);
          ctx.lineTo(branch.x2, branch.y2);
          ctx.stroke();
        });

        ctx.restore();

        // Rapid decay
        lightningAlpha *= 0.88;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render(0);

    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      window.removeEventListener('resize', createStars);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10"
      style={{
        background: '#000000',
        pointerEvents: 'none',
        willChange: 'transform'
      }}
    />
  );
}
