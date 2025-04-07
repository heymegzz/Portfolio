import { useEffect, useRef } from 'react';
import './TechCircle.css';

const TechCircle = () => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    
    // Set canvas dimensions
    const updateCanvasSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    
    window.addEventListener('resize', updateCanvasSize);
    updateCanvasSize();
    
    // Circle parameters - slightly shifted to the right
    const radius = Math.min(canvas.width, canvas.height) * 0.35 / dpr;
    const centerX = (canvas.width / (2 * dpr)) + 20; // Shifted right
    const centerY = canvas.height / (2 * dpr);
    
    // Create particles
    const createParticles = () => {
      const particles = [];
      const particleCount = 100;
      
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * radius * 0.2 + radius * 0.8;
        
        particles.push({
          x: centerX + Math.cos(angle) * distance,
          y: centerY + Math.sin(angle) * distance,
          size: Math.random() * 3 + 1,
          color: getRandomColor(),
          speed: Math.random() * 0.01 + 0.005,
          angle,
          distance,
          amplitude: Math.random() * 20 + 10,
          phase: Math.random() * Math.PI * 2,
          connectionCount: Math.floor(Math.random() * 3) + 2
        });
      }
      
      return particles;
    };
    
    const getRandomColor = () => {
      const colors = [
        { r: 58, g: 41, b: 255 },  // #3A29FF
        { r: 255, g: 148, b: 180 }, // #FF94B4
        { r: 255, g: 50, b: 50 }    // #FF3232
      ];
      
      const color = colors[Math.floor(Math.random() * colors.length)];
      return `rgba(${color.r}, ${color.g}, ${color.b}, ${Math.random() * 0.5 + 0.3})`;
    };
    
    particlesRef.current = createParticles();
    
    // Draw function
    const draw = (timestamp) => {
      ctx.clearRect(0, 0, canvas.width / dpr, canvas.height / dpr);
      
      // Draw outer circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(58, 41, 255, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw middle circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.85, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 148, 180, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Draw inner circle
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 0.7, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 50, 50, 0.15)';
      ctx.lineWidth = 1;
      ctx.stroke();
      
      // Update and draw particles
      particlesRef.current.forEach((particle, i) => {
        // Update position with oscillation
        particle.angle += particle.speed;
        const oscillation = Math.sin(timestamp * 0.001 + particle.phase) * particle.amplitude;
        
        particle.x = centerX + Math.cos(particle.angle) * (particle.distance + oscillation);
        particle.y = centerY + Math.sin(particle.angle) * (particle.distance + oscillation);
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();
        
        // Draw connections to nearby particles
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const otherParticle = particlesRef.current[j];
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < radius * 0.4) {
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = `rgba(123, 104, 238, ${0.1 - distance / (radius * 4)})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      });
      
      // Draw tech words
      const words = ['React', 'HTML/CSS', 'JavaScript', 'AI/ML', 'CP', 'Front-End'];
      const angleStep = (Math.PI * 2) / words.length;
      
      words.forEach((word, i) => {
        const angle = i * angleStep;
        const x = centerX + Math.cos(angle) * (radius * 1.25);
        const y = centerY + Math.sin(angle) * (radius * 1.25);
        
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle + Math.PI / 2);
        ctx.textAlign = 'center';
        ctx.font = '13px "Inter", sans-serif';
        ctx.textBaseline = 'middle';
        
        const gradient = ctx.createLinearGradient(-50, 0, 50, 0);
        gradient.addColorStop(0, 'rgba(58, 41, 255, 0.9)');
        gradient.addColorStop(1, 'rgba(255, 148, 180, 0.9)');
        
        ctx.fillStyle = gradient;
        ctx.fillText(word, 0, 0);
        ctx.restore();
      });
      
      animationRef.current = requestAnimationFrame(draw);
    };
    
    animationRef.current = requestAnimationFrame(draw);
    
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', updateCanvasSize);
    };
  }, []);

  return (
    <div className="tech-circle">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default TechCircle; 