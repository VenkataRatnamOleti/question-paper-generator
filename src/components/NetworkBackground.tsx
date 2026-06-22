import { useEffect, useRef } from "react";

export default function NetworkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Particle class
    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 0.5;
        this.vy = (Math.random() - 0.5) * 0.5;
        this.radius = Math.random() * 1.5 + 1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > width) this.vx = -this.vx;
        if (this.y < 0 || this.y > height) this.vy = -this.vy;
      }

      draw(c: CanvasRenderingContext2D) {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        c.fillStyle = "rgba(0, 212, 255, 0.4)";
        c.fill();
      }
    }

    const particles: Particle[] = [];
    const particleCount = Math.min(60, Math.floor((width * height) / 25000));

    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    // Resize handler
    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw lines between particles that are close
      for (let i = 0; i < particles.length; i++) {
        const p1 = particles[i];
        p1.update();
        p1.draw(ctx);

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 212, 255, ${0.15 * (1 - dist / 150)})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 bg-dark-bg">
      <canvas ref={canvasRef} className="absolute inset-0 block" />

      {/* Futuristic Floating Colored Glow Spheres (recreated exactly from the app screenshots) */}
      <div className="absolute top-[10%] left-[15%] w-72 h-72 rounded-full bg-blue-600/10 mix-blend-screen filter blur-[80px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-[15%] right-[20%] w-96 h-96 rounded-full bg-orange-600/10 mix-blend-screen filter blur-[100px] animate-pulse-slow pointer-events-none" style={{ animationDelay: "2s" }} />
      <div className="absolute top-[50%] left-[80%] w-64 h-64 rounded-full bg-purple-500/10 mix-blend-screen filter blur-[85px] animate-pulse-slow pointer-events-none" style={{ animationDelay: "4s" }} />
      <div className="absolute bottom-[40%] left-[5%] w-80 h-80 rounded-full bg-emerald-500/10 mix-blend-screen filter blur-[90px] animate-pulse-slow pointer-events-none" style={{ animationDelay: "1s" }} />
    </div>
  );
}
