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

    // Optimized star management with object pooling
    const stars: { x: number; y: number; radius: number; color: string; speed: number }[] = [];
    const createStars = () => {
      stars.length = 0;
      const starCount = Math.min(200, Math.floor(canvas.width * canvas.height / 4000)); // Cap for performance

      for (let i = 0; i < starCount; i++) {
        const radius = 0.5 + Math.random() * 1;
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius,
          color: getStarColor(),
          speed: 0.02 + Math.random() * 0.05 // Slower for better performance
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

    // Optimized animation loop with performance improvements
    let animationFrameId: number;
    let lastFrameTime = 0;
    const targetFPS = 30; // Reduced FPS for better performance
    const frameInterval = 1000 / targetFPS;

    const render = (currentTime: number) => {
      if (currentTime - lastFrameTime < frameInterval) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      lastFrameTime = currentTime;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Batch star operations for better performance
      ctx.save();
      stars.forEach(star => {
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = star.color;
        ctx.fillRect(star.x - star.radius/2, star.y - star.radius/2, star.radius, star.radius); // Faster than arc

        star.y += star.speed;
        if (star.y > canvas.height) {
          star.y = -star.radius;
          star.x = Math.random() * canvas.width;
        }
      });
      ctx.restore();

      // Draw nebula clouds less frequently
      if (Math.floor(currentTime / 100) % 3 === 0) {
        drawNebulaClouds(ctx, canvas.width, canvas.height);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    // Optimized nebula cloud rendering with caching
    const gradientCache: CanvasGradient[] = [];
    const drawNebulaClouds = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
      const cloudCount = 2; // Reduced for performance
      const time = Date.now() * 0.00005; // Slower animation

      // Create gradients only once
      if (gradientCache.length === 0) {
        const colors = [
          ['rgba(75, 0, 130, 0.15)', 'rgba(75, 0, 130, 0)'],
          ['rgba(138, 43, 226, 0.1)', 'rgba(138, 43, 226, 0)']
        ];
        
        colors.forEach(colorPair => {
          const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 100);
          gradient.addColorStop(0, colorPair[0]);
          gradient.addColorStop(1, colorPair[1]);
          gradientCache.push(gradient);
        });
      }

      ctx.save();
      for (let i = 0; i < cloudCount; i++) {
        const x = width * (0.2 + 0.5 * Math.sin(time + i * 1.5));
        const y = height * (0.3 + 0.3 * Math.cos(time + i * 1.2));
        const radius = Math.min(width, height) * (0.15 + 0.08 * Math.sin(time * 0.5 + i));

        ctx.translate(x, y);
        ctx.scale(radius / 100, radius / 100);
        ctx.fillStyle = gradientCache[i % gradientCache.length];
        ctx.fillRect(-100, -100, 200, 200);
        ctx.resetTransform();
      }
      ctx.restore();
    };

    render(0);

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
        pointerEvents: 'none',
        willChange: 'transform'
      }}
    />
  );
}
