import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export const HeartParticles: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: Particle[] = [];
    const maxParticles = 50;

    const createParticle = () => {
      return {
        x: Math.random() * canvas.width,
        y: canvas.height + 50,
        vx: (Math.random() - 0.5) * 2,
        vy: -Math.random() * 3 - 2,
        life: 0,
        maxLife: Math.random() * 100 + 100,
      };
    };

    const drawHeart = (x: number, y: number, size: number, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = `rgba(255, 192, 203, ${alpha})`;
      ctx.translate(x, y);
      ctx.scale(size, size);
      
      ctx.beginPath();
      ctx.arc(-5, -5, 5, 0, Math.PI * 2);
      ctx.arc(5, -5, 5, 0, Math.PI * 2);
      ctx.moveTo(0, 5);
      ctx.lineTo(-10, -5);
      ctx.lineTo(10, -5);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Add new particles
      if (particles.length < maxParticles && Math.random() < 0.3) {
        particles.push(createParticle());
      }

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life++;

        const alpha = 1 - (p.life / p.maxLife);
        const size = 0.5 + (1 - alpha) * 0.5;

        if (p.life >= p.maxLife || p.y < -50) {
          particles.splice(i, 1);
        } else {
          drawHeart(p.x, p.y, size, alpha);
        }
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
};