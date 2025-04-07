import { useEffect, useRef } from 'react';
import './CosmicOrb.css';

const CosmicOrb = () => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const container = containerRef.current;
    let animationFrameId;
    let time = 0;
    
    // Arrays for different elements
    let stars = [];
    let orbitingParticles = [];
    let rings = [];

    const resizeCanvas = () => {
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
      initElements();
    };

    const initElements = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const baseRadius = Math.min(canvas.width, canvas.height) * 0.3;
      
      // Create stars - reduced number for less cluttered look
      stars = [];
      for (let i = 0; i < 60; i++) {
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius: Math.random() * 1.5 + 0.5,
          color: getStarColor(),
          blinkSpeed: Math.random() * 0.02 + 0.005,
          blinkOffset: Math.random() * Math.PI * 2
        });
      }
      
      // Create orbiting particles
      orbitingParticles = [];
      for (let i = 0; i < 5; i++) {
        // Create particle groups around different orbits
        const groupCount = Math.floor(Math.random() * 5) + 3;
        const orbitRadius = baseRadius * (0.6 + i * 0.2);
        const orbitSpeed = 0.0005 * (1 + i * 0.2) * (i % 2 === 0 ? 1 : -1);
        
        for (let j = 0; j < groupCount; j++) {
          const angle = (j / groupCount) * Math.PI * 2;
          const particleCount = Math.floor(Math.random() * 3) + 1;
          
          for (let k = 0; k < particleCount; k++) {
            const particleOffset = (Math.random() - 0.5) * 0.2;
            orbitingParticles.push({
              baseAngle: angle,
              angle: angle + particleOffset,
              distance: orbitRadius + Math.random() * 10 - 5,
              radius: Math.random() * 3 + 1,
              color: getParticleColor(),
              speed: orbitSpeed * (0.8 + Math.random() * 0.4),
              trail: []
            });
          }
        }
      }
      
      // Create rings
      rings = [];
      for (let i = 0; i < 5; i++) {
        rings.push({
          radius: baseRadius * (0.5 + i * 0.15),
          width: 1 + Math.random() * 1.5,
          color: getRingColor(),
          rotationSpeed: 0.0001 * (1 + i * 0.5) * (i % 2 === 0 ? 1 : -1),
          rotationAngle: Math.random() * Math.PI * 2,
          eccentricity: Math.random() * 0.3
        });
      }
    };

    const getStarColor = () => {
      const colors = [
        '#FFFFFF', // White
        '#F8F8FF', // Ghost White
        '#E6E6FA', // Lavender
        '#FFC0CB', // Pink
        '#ADD8E6'  // Light Blue
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const getParticleColor = () => {
      const colors = [
        '#7B3FE4', // Purple
        '#BD34FE', // Bright purple
        '#FF94B4', // Pink
        '#3A29FF'  // Blue
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };
    
    const getRingColor = () => {
      const colors = [
        'rgba(123, 63, 228, 0.4)',  // Purple
        'rgba(189, 52, 254, 0.4)',  // Bright purple
        'rgba(255, 148, 180, 0.4)', // Pink
        'rgba(58, 41, 255, 0.4)'    // Blue
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const drawStars = () => {
      stars.forEach(star => {
        ctx.beginPath();
        const brightness = 0.5 + 0.5 * Math.sin(time * star.blinkSpeed + star.blinkOffset);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = brightness * 0.7; // Reduced opacity
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });
      ctx.globalAlpha = 1.0;
    };
    
    const drawCentralOrb = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = Math.min(canvas.width, canvas.height) * 0.15;
      
      // Glow effect
      const glowGradient = ctx.createRadialGradient(
        centerX, centerY, radius * 0.5,
        centerX, centerY, radius * 2
      );
      
      glowGradient.addColorStop(0, 'rgba(123, 63, 228, 0.3)');
      glowGradient.addColorStop(0.5, 'rgba(255, 148, 180, 0.2)');
      glowGradient.addColorStop(1, 'rgba(58, 41, 255, 0)');
      
      ctx.fillStyle = glowGradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius * 2, 0, Math.PI * 2);
      ctx.fill();
      
      // Core
      const gradient = ctx.createRadialGradient(
        centerX - radius * 0.2, centerY - radius * 0.2, 0,
        centerX, centerY, radius
      );
      
      gradient.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
      gradient.addColorStop(0.3, 'rgba(255, 148, 180, 0.7)');
      gradient.addColorStop(0.6, 'rgba(123, 63, 228, 0.5)');
      gradient.addColorStop(1, 'rgba(58, 41, 255, 0.3)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
      
      // Pulsating light rays
      const pulseFactor = 0.5 + 0.5 * Math.sin(time * 0.02);
      ctx.globalAlpha = 0.3 * pulseFactor;
      
      for (let i = 0; i < 12; i++) {
        const angle = i * Math.PI / 6;
        const rayLength = radius * (2 + pulseFactor);
        
        ctx.strokeStyle = i % 2 === 0 ? 
          'rgba(255, 148, 180, 0.5)' : 
          'rgba(123, 63, 228, 0.5)';
        
        ctx.lineWidth = 1 + pulseFactor;
        ctx.beginPath();
        ctx.moveTo(
          centerX + Math.cos(angle) * radius * 0.9,
          centerY + Math.sin(angle) * radius * 0.9
        );
        ctx.lineTo(
          centerX + Math.cos(angle) * rayLength,
          centerY + Math.sin(angle) * rayLength
        );
        ctx.stroke();
      }
      
      ctx.globalAlpha = 1.0;
    };
    
    const drawRings = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      rings.forEach(ring => {
        // Update rotation angle
        ring.rotationAngle += ring.rotationSpeed;
        
        // Draw ring
        ctx.strokeStyle = ring.color;
        ctx.lineWidth = ring.width;
        ctx.beginPath();
        
        // Draw elliptical ring
        ctx.ellipse(
          centerX, centerY,
          ring.radius,
          ring.radius * (1 - ring.eccentricity),
          ring.rotationAngle,
          0, Math.PI * 2
        );
        
        ctx.stroke();
      });
    };
    
    const drawOrbitingParticles = () => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      orbitingParticles.forEach(particle => {
        // Update angle
        particle.angle += particle.speed;
        
        // Calculate position
        const x = centerX + Math.cos(particle.angle) * particle.distance;
        const y = centerY + Math.sin(particle.angle) * particle.distance;
        
        // Add to trail
        particle.trail.push({ x, y });
        if (particle.trail.length > 10) {
          particle.trail.shift();
        }
        
        // Draw trail
        if (particle.trail.length > 1) {
          ctx.beginPath();
          ctx.moveTo(particle.trail[0].x, particle.trail[0].y);
          
          for (let i = 1; i < particle.trail.length; i++) {
            ctx.lineTo(particle.trail[i].x, particle.trail[i].y);
          }
          
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = particle.radius * 0.5;
          ctx.globalAlpha = 0.5;
          ctx.stroke();
          ctx.globalAlpha = 1.0;
        }
        
        // Draw particle
        ctx.beginPath();
        ctx.fillStyle = particle.color;
        ctx.arc(x, y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      });
    };
    
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Increment time
      time += 1;
      
      // Draw elements
      drawStars();
      drawRings();
      drawCentralOrb();
      drawOrbitingParticles();
      
      // Request next frame
      animationFrameId = requestAnimationFrame(draw);
    };

    // Set up canvas and start animation
    resizeCanvas();
    draw();
    
    // Add resize event listener
    window.addEventListener('resize', resizeCanvas);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="cosmic-orb-container" ref={containerRef}>
      <canvas className="cosmic-canvas" ref={canvasRef}></canvas>
    </div>
  );
};

export default CosmicOrb; 