import { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  life: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  decay: number;
  size: number;
}

export function GlowCursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointsRef = useRef<Point[]>([]);
  const particlesRef = useRef<Particle[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastX = -100;
    let lastY = -100;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resize);
    resize();

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      // Interpolate for smoother trails if the mouse moves very fast
      if (lastX !== -100 && lastY !== -100) {
        const dist = Math.hypot(x - lastX, y - lastY);
        const steps = Math.min(Math.floor(dist / 5), 10); // cap extra steps
        
        for (let i = 1; i <= steps; i++) {
          pointsRef.current.push({
            x: lastX + (x - lastX) * (i / steps),
            y: lastY + (y - lastY) * (i / steps),
            life: 1.0,
          });
        }
      }
      
      pointsRef.current.push({ x, y, life: 1.0 });

      // Emit glowing sparks / particles randomly when moving
      if (Math.random() > 0.4) {
        const count = Math.floor(Math.random() * 2) + 1;
        for (let i = 0; i < count; i++) {
          particlesRef.current.push({
            x: x + (Math.random() - 0.5) * 10,
            y: y + (Math.random() - 0.5) * 10,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            life: 1.0,
            decay: 0.015 + Math.random() * 0.02, // Fades out in about ~40-60 frames
            size: Math.random() * 2.5 + 1.5,
          });
        }
      }

      lastX = x;
      lastY = y;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Enable blending for glowing energy look
      ctx.globalCompositeOperation = 'screen';

      // Draw Main Energy Trail (Points)
      pointsRef.current.forEach((p) => {
        const ratio = p.life;
        const radius = 10 * ratio; // Center glow radius
        
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        
        // Intensity and transparency lowered for a softer look
        ctx.fillStyle = `rgba(255, 255, 255, ${ratio * 0.25})`;
        
        // Outer glow
        ctx.shadowBlur = 30 * ratio; 
        ctx.shadowColor = `rgba(255, 255, 255, ${ratio * 0.5})`;
        
        ctx.fill();
      });

      // Draw Spark Particles
      particlesRef.current.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.life * 0.5})`;
        ctx.shadowBlur = 15 * p.life;
        ctx.shadowColor = `rgba(255, 255, 255, ${p.life * 0.6})`;
        ctx.fill();
      });

      // Reset composite operation
      ctx.globalCompositeOperation = 'source-over';

      // Update lifecycles and positions
      pointsRef.current.forEach(p => { p.life -= 0.02; }); // Controls length of tail
      pointsRef.current = pointsRef.current.filter(p => p.life > 0);

      particlesRef.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.life -= p.decay;
      });
      particlesRef.current = particlesRef.current.filter(p => p.life > 0);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[5]"
    />
  );
}