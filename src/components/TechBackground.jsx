import { useEffect, useRef } from 'react';
import './TechBackground.css';

const TechBackground = ({ page }) => {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d', { alpha: true });
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Get color based on current page
    const getColor = () => {
      switch(page) {
        case 'about':
          return [90, 40, 180]; // Darker purple
        case 'projects':
          return [148, 30, 200]; // Medium purple
        case 'contact':
          return [200, 90, 120]; // Dark pink
        default:
          return [90, 40, 180];
      }
    };
    
    // Initialize particles with fewer count
    let particles = [];
    const initParticles = () => {
      particles = [];
      // Significantly reduced particle count for better performance
      const particleCount = Math.min(50, Math.floor((canvas.width * canvas.height) / 40000));
      
      for (let i = 0; i < particleCount; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 1.5 + 1;
        // Very slow movement for better performance
        const speedX = (Math.random() - 0.5) * 0.1;
        const speedY = (Math.random() - 0.5) * 0.1;
        
        particles.push({
          x, y, size, speedX, speedY
        });
      }
    };
    
    // Draw the background with improved performance
    const drawBackground = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Create gradient
      const color = getColor();
      
      // Solid color background instead of gradient for better performance
      ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.03)`;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw grid lines with larger spacing
      ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.04)`;
      ctx.lineWidth = 1;
      
      // Draw grid with larger spacing (150px instead of 100px)
      const spacing = 150;
      
      // Horizontal lines - draw fewer lines
      for (let y = 0; y < canvas.height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      
      // Vertical lines - draw fewer lines
      for (let x = 0; x < canvas.width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Update position
        p.x += p.speedX;
        p.y += p.speedY;
        
        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.15)`;
        ctx.fill();
      }
    };
    
    // Animation loop with more aggressive throttling
    let lastTime = 0;
    const interval = 1000 / 15; // Target 15fps for much better performance
    
    const animate = (timestamp) => {
      const elapsed = timestamp - lastTime;
      
      if (elapsed > interval) {
        lastTime = timestamp - (elapsed % interval);
        drawBackground();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Initialize
    setCanvasDimensions();
    initParticles();
    animate(0);
    
    // Handle resize with debouncing
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setCanvasDimensions();
        initParticles();
      }, 300);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimeout);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [page]);
  
  return <canvas ref={canvasRef} className="tech-background"></canvas>;
};

export default TechBackground; 