import { useEffect, useRef } from 'react';
import './CircuitPattern.css';

const CircuitPattern = ({ page }) => {
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
    
    // Calculate color based on page
    const getColor = () => {
      switch(page) {
        case 'about':
          return [123, 63, 228]; // Purple
        case 'projects':
          return [189, 52, 254]; // Bright purple
        case 'contact':
          return [255, 148, 180]; // Pink
        default:
          return [123, 63, 228];
      }
    };
    
    const color = getColor();
    
    // Create nodes with optimized count
    let nodes = [];
    const initNodes = () => {
      nodes = [];
      // Only 10 nodes for maximum performance
      const nodeCount = 10;
      
      // Use fixed positions for About page to reduce stuttering
      if (page === 'about') {
        // Create a grid of nodes
        const cols = 4;
        const rows = 3;
        
        for (let i = 0; i < nodeCount; i++) {
          const col = i % cols;
          const row = Math.floor(i / cols);
          
          // Calculate positions with some variation
          const x = (canvas.width * 0.1) + (col * canvas.width * 0.8 / (cols - 1));
          const y = (canvas.height * 0.1) + (row * canvas.height * 0.8 / (Math.max(1, rows - 1)));
          
          // Very very slow movement
          const speedX = (Math.random() - 0.5) * 0.03;
          const speedY = (Math.random() - 0.5) * 0.03;
          
          nodes.push({
            x, y, size: 2, speedX, speedY
          });
        }
      } else {
        // Random positions for other pages
        for (let i = 0; i < nodeCount; i++) {
          // Distribute nodes across the screen
          const x = (canvas.width * 0.1) + (Math.random() * canvas.width * 0.8);
          const y = (canvas.height * 0.1) + (Math.random() * canvas.height * 0.8);
          // Very slow movement
          const speedX = (Math.random() - 0.5) * 0.08;
          const speedY = (Math.random() - 0.5) * 0.08;
          
          nodes.push({
            x, y, size: 2, speedX, speedY
          });
        }
      }
    };
    
    // Draw animated circuit pattern
    const drawCircuit = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update node positions
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Update position
        node.x += node.speedX;
        node.y += node.speedY;
        
        // Bounce off edges with padding
        const padding = 50;
        if (node.x < padding || node.x > canvas.width - padding) node.speedX *= -1;
        if (node.y < padding || node.y > canvas.height - padding) node.speedY *= -1;
        
        // Keep nodes within bounds
        node.x = Math.max(padding, Math.min(canvas.width - padding, node.x));
        node.y = Math.max(padding, Math.min(canvas.height - padding, node.y));
        
        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.2)`;
        ctx.fill();
      }
      
      // Connect nodes with limited connections
      for (let i = 0; i < nodes.length; i++) {
        // Connect to only 1-2 other nodes to reduce complexity
        const maxConnections = page === 'about' ? 2 : 3;
        
        for (let j = 1; j <= maxConnections; j++) {
          const toIdx = (i + j) % nodes.length;
          
          const fromNode = nodes[i];
          const toNode = nodes[toIdx];
          
          // Draw connection with right angles
          ctx.beginPath();
          ctx.moveTo(fromNode.x, fromNode.y);
          
          // Simpler paths - less complexity
          if (i % 2 === 0) {
            ctx.lineTo(toNode.x, fromNode.y);
            ctx.lineTo(toNode.x, toNode.y);
          } else {
            ctx.lineTo(fromNode.x, toNode.y);
            ctx.lineTo(toNode.x, toNode.y);
          }
          
          ctx.strokeStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.08)`;
          ctx.lineWidth = 1;
          ctx.stroke();
          
          // Only draw connection points on non-about pages (further optimization)
          if (page !== 'about') {
            const midX = (fromNode.x + toNode.x) / 2;
            const midY = (fromNode.y + toNode.y) / 2;
            
            ctx.beginPath();
            ctx.arc(midX, midY, 1, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${color[0]}, ${color[1]}, ${color[2]}, 0.1)`;
            ctx.fill();
          }
        }
      }
    };
    
    // Animation loop with throttling
    let lastTime = 0;
    const interval = 1000 / 10; // Target only 10fps for about page, 15fps for others
    
    const animate = (timestamp) => {
      const elapsed = timestamp - lastTime;
      
      if (elapsed > interval) {
        lastTime = timestamp - (elapsed % interval);
        drawCircuit();
      }
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Initialize
    setCanvasDimensions();
    initNodes();
    animate(0);
    
    // Handle resize with debouncing
    let resizeTimeout;
    const handleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => {
        setCanvasDimensions();
        initNodes();
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
  
  return <canvas ref={canvasRef} className="circuit-pattern"></canvas>;
};

export default CircuitPattern; 