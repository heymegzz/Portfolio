import { useEffect, useRef } from 'react';
import './CelestialSphere.css';

const CelestialSphere = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;
    let animationFrameId;
    let stars = [];
    let nebulae = [];
    let particles = [];
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      initElements();
    };

    const initElements = () => {
      // Create stars
      stars = [];
      for (let i = 0; i < 250; i++) {
        const distance = Math.random() * 0.8 + 0.2; // Distance from center (0.2-1.0)
        const angle = Math.random() * Math.PI * 2; // Random angle
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(canvas.width, canvas.height) * 0.45; // Sphere radius
        
        // Position stars in a circular pattern
        const x = centerX + Math.cos(angle) * radius * distance;
        const y = centerY + Math.sin(angle) * radius * distance;
        
        stars.push({
          x,
          y,
          radius: Math.random() * 1.8 + 0.5,
          color: getStarColor(),
          blinkSpeed: Math.random() * 0.02 + 0.005,
          blinkOffset: Math.random() * Math.PI * 2,
          angle,
          distance,
          orbitSpeed: (Math.random() * 0.0001 + 0.00001) * (Math.random() > 0.5 ? 1 : -1)
        });
      }

      // Create nebulae
      nebulae = [];
      for (let i = 0; i < 4; i++) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const angle = i * Math.PI / 2;
        const distance = Math.random() * 0.3 + 0.2;
        const radius = Math.min(canvas.width, canvas.height) * 0.2;
        
        nebulae.push({
          x: centerX + Math.cos(angle) * radius * distance,
          y: centerY + Math.sin(angle) * radius * distance,
          radius: Math.random() * 80 + 40,
          color: getNebulaColor(),
          speed: Math.random() * 0.001 + 0.0005,
          offset: Math.random() * Math.PI * 2,
          angle,
          distance,
          orbitSpeed: 0.00005 * (i % 2 === 0 ? 1 : -1)
        });
      }
      
      // Create floating particles
      particles = [];
      for (let i = 0; i < 40; i++) {
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = Math.min(canvas.width, canvas.height) * 0.45;
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 0.8 + 0.2;
        
        particles.push({
          x: centerX + Math.cos(angle) * radius * distance,
          y: centerY + Math.sin(angle) * radius * distance,
          size: Math.random() * 2 + 1,
          color: getParticleColor(),
          alpha: Math.random() * 0.5 + 0.3,
          angle,
          distance,
          orbitSpeed: (Math.random() * 0.0005 + 0.0002) * (Math.random() > 0.5 ? 1 : -1)
        });
      }
    };

    const getStarColor = () => {
      const colors = [
        '#FFFFFF',   // White
        '#F8F8FF',   // Ghost White
        '#FFFFF0',   // Ivory
        '#E6E6FA',   // Lavender
        '#FFC0CB',   // Pink
        '#ADD8E6'    // Light Blue
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const getNebulaColor = () => {
      const colors = [
        'rgba(58, 41, 255, 0.15)',    // Blue
        'rgba(123, 63, 228, 0.15)',   // Purple
        'rgba(189, 52, 254, 0.15)',   // Bright purple
        'rgba(255, 148, 180, 0.15)',  // Pink
        'rgba(255, 50, 50, 0.15)'     // Red
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };
    
    const getParticleColor = () => {
      const colors = [
        'rgba(58, 41, 255, 0.6)',     // Blue
        'rgba(123, 63, 228, 0.6)',    // Purple
        'rgba(189, 52, 254, 0.6)',    // Bright purple
        'rgba(255, 148, 180, 0.6)',   // Pink
        'rgba(255, 255, 255, 0.6)'    // White
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const drawStars = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.45;
      
      stars.forEach(star => {
        // Update star position by rotating around center
        star.angle += star.orbitSpeed;
        const x = centerX + Math.cos(star.angle) * radius * star.distance;
        const y = centerY + Math.sin(star.angle) * radius * star.distance;
        
        ctx.beginPath();
        const brightness = 0.5 + 0.5 * Math.sin(time * star.blinkSpeed + star.blinkOffset);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = brightness;
        ctx.arc(x, y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;
    };

    const drawNebulae = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.3;
      
      nebulae.forEach(nebula => {
        // Update nebula position
        nebula.angle += nebula.orbitSpeed;
        const x = centerX + Math.cos(nebula.angle) * radius * nebula.distance;
        const y = centerY + Math.sin(nebula.angle) * radius * nebula.distance;
        
        const nebulaRadius = nebula.radius * (1 + 0.1 * Math.sin(time * nebula.speed + nebula.offset));
        
        const gradient = ctx.createRadialGradient(
          x, y, 0,
          x, y, nebulaRadius
        );
        
        gradient.addColorStop(0, nebula.color);
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, nebulaRadius, 0, Math.PI * 2);
        ctx.fill();
      });
    };
    
    const drawParticles = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.45;
      
      particles.forEach(particle => {
        // Update particle position
        particle.angle += particle.orbitSpeed;
        const x = centerX + Math.cos(particle.angle) * radius * particle.distance;
        const y = centerY + Math.sin(particle.angle) * radius * particle.distance;
        
        ctx.beginPath();
        ctx.fillStyle = particle.color;
        ctx.globalAlpha = particle.alpha;
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;
    };

    const drawCelestialSphere = () => {
      // Main celestial sphere
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const sphereRadius = Math.min(canvas.width, canvas.height) * 0.45;
      
      // Outer glow effect
      const outerGlow = ctx.createRadialGradient(
        centerX, centerY, sphereRadius * 0.8,
        centerX, centerY, sphereRadius * 1.2
      );
      
      outerGlow.addColorStop(0, 'rgba(58, 41, 255, 0.1)');
      outerGlow.addColorStop(0.5, 'rgba(189, 52, 254, 0.08)');
      outerGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      
      ctx.fillStyle = outerGlow;
      ctx.beginPath();
      ctx.arc(centerX, centerY, sphereRadius * 1.2, 0, Math.PI * 2);
      ctx.fill();
      
      // Orbital rings
      for (let i = 0; i < 3; i++) {
        const ringRadius = sphereRadius * (0.6 + i * 0.15);
        const ringWidth = 1 + 0.3 * Math.sin(time * 0.015 + i);
        const rotationOffset = time * 0.0002 * (i % 2 === 0 ? 1 : -1);
        
        ctx.strokeStyle = `rgba(255, 148, 180, ${0.2 - i * 0.05})`;
        ctx.lineWidth = ringWidth;
        ctx.beginPath();
        ctx.arc(centerX, centerY, ringRadius, 0, Math.PI * 2);
        ctx.stroke();
      }
      
      // Small orbiting particles with trails
      for (let i = 0; i < 8; i++) {
        const orbitRadius = sphereRadius * (0.7 + i * 0.04);
        const orbitSpeed = 0.001 * (1 + i * 0.1);
        const particleAngle = time * orbitSpeed + i * Math.PI / 4;
        const particleX = centerX + Math.cos(particleAngle) * orbitRadius;
        const particleY = centerY + Math.sin(particleAngle) * orbitRadius;
        
        // Particle trails
        const trailLength = 6;
        for (let j = 0; j < trailLength; j++) {
          const trailFade = (trailLength - j) / trailLength;
          const trailAngle = particleAngle - (j * 0.1);
          const trailX = centerX + Math.cos(trailAngle) * orbitRadius;
          const trailY = centerY + Math.sin(trailAngle) * orbitRadius;
          
          const trailGradient = ctx.createRadialGradient(
            trailX, trailY, 0,
            trailX, trailY, 3 * trailFade
          );
          
          trailGradient.addColorStop(0, `rgba(255, 255, 255, ${0.4 * trailFade})`);
          trailGradient.addColorStop(1, `rgba(255, 148, 180, 0)`);
          
          ctx.fillStyle = trailGradient;
          ctx.beginPath();
          ctx.arc(trailX, trailY, 3 * trailFade, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Main particle
        const particleGradient = ctx.createRadialGradient(
          particleX, particleY, 0,
          particleX, particleY, 4
        );
        
        particleGradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        particleGradient.addColorStop(1, 'rgba(255, 148, 180, 0)');
        
        ctx.fillStyle = particleGradient;
        ctx.beginPath();
        ctx.arc(particleX, particleY, 4, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Background
      ctx.fillStyle = 'rgba(10, 10, 20, 0)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      drawCelestialSphere();
      drawNebulae();
      drawParticles();
      drawStars();
      
      time += 1;
      animationFrameId = requestAnimationFrame(draw);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div ref={containerRef} className="celestial-sphere-container">
      <canvas ref={canvasRef} className="celestial-canvas"></canvas>
    </div>
  );
};

export default CelestialSphere; 