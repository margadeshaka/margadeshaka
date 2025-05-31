'use client';

import { useEffect, useRef } from 'react';

export default function CosmicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);

    // Create stars
    const stars: { x: number; y: number; radius: number; color: string; speed: number }[] = [];
    const createStars = () => {
      stars.length = 0; // Clear existing stars
      const starCount = Math.floor(canvas.width * canvas.height / 3000);

      for (let i = 0; i < starCount; i++) {
        const radius = Math.random() * 1.5;
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius,
          color: getStarColor(),
          speed: 0.05 + Math.random() * 0.1
        });
      }
    };

    const getStarColor = () => {
      const colors = [
        'rgba(255, 255, 255, 0.8)',
        'rgba(173, 216, 230, 0.8)',
        'rgba(255, 223, 186, 0.8)',
        'rgba(186, 218, 255, 0.8)',
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    createStars();
    window.addEventListener('resize', createStars);

    // Animation loop
    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.fill();

        // Move stars slightly for subtle motion
        star.y += star.speed;

        // Reset position if star goes off screen
        if (star.y > canvas.height) {
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });

      // Draw nebula-like clouds
      drawNebulaClouds(ctx, canvas.width, canvas.height);

      animationFrameId = requestAnimationFrame(render);
    };

    const drawNebulaClouds = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      // Create a few large, very transparent colored areas
      const cloudCount = 3;
      const time = Date.now() * 0.0001;

      for (let i = 0; i < cloudCount; i++) {
        const x = width * (0.2 + 0.6 * Math.sin(time + i * 1.5));
        const y = height * (0.3 + 0.4 * Math.cos(time + i * 1.2));
        const radius = Math.min(width, height) * (0.2 + 0.1 * Math.sin(time * 0.7 + i));

        const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius);

        // Different colors for each cloud
        if (i % 3 === 0) {
          gradient.addColorStop(0, 'rgba(75, 0, 130, 0.2)'); // Indigo
          gradient.addColorStop(1, 'rgba(75, 0, 130, 0)');
        } else if (i % 3 === 1) {
          gradient.addColorStop(0, 'rgba(138, 43, 226, 0.15)'); // BlueViolet
          gradient.addColorStop(1, 'rgba(138, 43, 226, 0)');
        } else {
          gradient.addColorStop(0, 'rgba(65, 105, 225, 0.1)'); // RoyalBlue
          gradient.addColorStop(1, 'rgba(65, 105, 225, 0)');
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    render();

    // Cleanup
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
        background: 'linear-gradient(to bottom, #000000, #191932)',
        pointerEvents: 'none'
      }}
    />
  );
}
