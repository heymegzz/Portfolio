import { useState, useEffect, useRef } from 'react';
import './TechSkillsOrb.css';

const TechSkillsOrb = () => {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const skills = [
    { name: 'HTML5', icon: 'fab fa-html5', color: '#E34F26' },
    { name: 'CSS3', icon: 'fab fa-css3-alt', color: '#1572B6' },
    { name: 'JavaScript', icon: 'fab fa-js-square', color: '#F7DF1E' },
    { name: 'React', icon: 'fab fa-react', color: '#61DAFB' },
    { name: 'Node.js', icon: 'fab fa-node-js', color: '#339933' },
    { name: 'Python', icon: 'fab fa-python', color: '#3776AB' },
    { name: 'Git', icon: 'fab fa-git-alt', color: '#F05032' },
    { name: 'GitHub', icon: 'fab fa-github', color: '#ffffff' },
    { name: 'NPM', icon: 'fab fa-npm', color: '#CB3837' },
    { name: 'TypeScript', icon: 'devicon-typescript-plain', color: '#3178C6' },
    { name: 'VS Code', icon: 'devicon-vscode-plain', color: '#007ACC' },
    { name: 'Three.js', icon: 'devicon-threejs-original', color: '#000000' },
  ];

  // Intersection Observer to detect when component is visible
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.disconnect();
      }
    };
  }, []);

  // Canvas animation setup
  useEffect(() => {
    if (!isVisible || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setDimensions({ width, height });
        canvas.width = width;
        canvas.height = height;
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);

    // Create skill particles
    let particles = [];
    const particleCount = 80;
    
    const initParticles = () => {
      particles = [];
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      for (let i = 0; i < particleCount; i++) {
        // Random angle and distance from center
        const angle = Math.random() * Math.PI * 2;
        const distance = 80 + Math.random() * 150;
        
        // Position based on angle and distance
        const x = centerX + Math.cos(angle) * distance;
        const y = centerY + Math.sin(angle) * distance;
        
        // Random skill from list
        const skill = skills[Math.floor(Math.random() * skills.length)];
        
        // Create particle
        particles.push({
          x, y,
          size: 8 + Math.random() * 20,
          color: skill.color,
          icon: skill.icon,
          name: skill.name,
          angle,
          distance,
          orbitSpeed: 0.0005 + Math.random() * 0.001,
          pulseSpeed: 0.01 + Math.random() * 0.02,
          pulseSize: Math.random() * 0.2,
          alpha: 0.7 + Math.random() * 0.3,
          hovered: false
        });
      }
    };

    // Animation loop
    let animationId;
    
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Draw connecting lines
      drawConnectionLines(centerX, centerY);
      
      // Draw center glow
      drawCenterGlow(centerX, centerY);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Update position based on orbit
        p.angle += p.orbitSpeed;
        p.x = centerX + Math.cos(p.angle) * p.distance;
        p.y = centerY + Math.sin(p.angle) * p.distance;
        
        // Pulse size
        const pulse = Math.sin(Date.now() * p.pulseSpeed) * p.pulseSize;
        const currentSize = p.size * (1 + pulse);
        
        // Draw particle
        drawParticle(p, currentSize);
      }
      
      animationId = requestAnimationFrame(animate);
    };
    
    // Draw connecting lines between particles and center
    const drawConnectionLines = (centerX, centerY) => {
      ctx.globalAlpha = 0.15;
      
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Draw line from center to particle
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = p.color;
        ctx.lineWidth = 0.5;
        ctx.stroke();
        
        // Connect to nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          
          if (dist < 100) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            
            // Gradient between two particle colors
            const gradient = ctx.createLinearGradient(p.x, p.y, p2.x, p2.y);
            gradient.addColorStop(0, p.color);
            gradient.addColorStop(1, p2.color);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      ctx.globalAlpha = 1;
    };
    
    // Draw center glow
    const drawCenterGlow = (centerX, centerY) => {
      // Center core
      ctx.beginPath();
      ctx.arc(centerX, centerY, 25, 0, Math.PI * 2);
      
      const gradient = ctx.createRadialGradient(
        centerX, centerY, 0,
        centerX, centerY, 25
      );
      gradient.addColorStop(0, 'rgba(123, 63, 228, 1)');
      gradient.addColorStop(0.6, 'rgba(189, 52, 254, 0.8)');
      gradient.addColorStop(1, 'rgba(189, 52, 254, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Outer glow
      const pulseSize = 20 * Math.sin(Date.now() * 0.001) + 40;
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, pulseSize, 0, Math.PI * 2);
      
      const outerGradient = ctx.createRadialGradient(
        centerX, centerY, 25,
        centerX, centerY, pulseSize
      );
      outerGradient.addColorStop(0, 'rgba(123, 63, 228, 0.2)');
      outerGradient.addColorStop(1, 'rgba(123, 63, 228, 0)');
      
      ctx.fillStyle = outerGradient;
      ctx.fill();
    };
    
    // Draw individual skill particles
    const drawParticle = (p, size) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      
      // Background circle
      ctx.beginPath();
      ctx.arc(0, 0, size, 0, Math.PI * 2);
      ctx.fillStyle = p.hovered ? p.color : `rgba(20, 20, 43, 0.8)`;
      ctx.strokeStyle = p.color;
      ctx.lineWidth = 2;
      ctx.fill();
      ctx.stroke();
      
      // Icon or text
      ctx.fillStyle = p.hovered ? "#fff" : p.color;
      ctx.font = `${Math.floor(size * 0.8)}px FontAwesome, "Courier New", monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      // Use fontawesome icon or first letter of skill name
      if (p.icon.includes('devicon')) {
        ctx.fillText(p.name.charAt(0), 0, 0);
      } else {
        ctx.fillText('\uf108', 0, 0); // Default computer icon if icon not available
      }
      
      // Skill name tooltip if hovered
      if (p.hovered) {
        ctx.fillStyle = '#fff';
        ctx.font = '12px "Poppins", sans-serif';
        ctx.fillText(p.name, 0, size + 15);
      }
      
      ctx.restore();
    };
    
    // Handle mouse interaction
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      // Check each particle
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = mouseX - p.x;
        const dy = mouseY - p.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        // Hover effect
        p.hovered = distance < p.size + 5;
      }
    };
    
    // Initialize and start animation
    initParticles();
    animate();
    
    // Add event listeners
    canvas.addEventListener('mousemove', handleMouseMove);
    
    // Clean up
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', updateDimensions);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [isVisible, dimensions]);

  return (
    <div className="tech-skills-orb" ref={containerRef}>
      <h3>Technical Skills</h3>
      <div className={`orb-container ${isVisible ? 'visible' : ''}`}>
        <canvas ref={canvasRef} className="skills-canvas" />
        <div className="orb-legend">
          <p>Hover over icons to see skills</p>
        </div>
      </div>
    </div>
  );
};

export default TechSkillsOrb; 