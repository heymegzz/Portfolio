import { useEffect, useRef } from 'react';
import './CodeRain.css';

const CodeRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let columns;
    let drops = [];

    // Characters to display
    const tech = [
      'R', 'E', 'A', 'C', 'T', 'J', 'S', 'H', 'T', 'M', 'L', 'C', 'S', 'S',
      '{', '}', '(', ')', '=', '>', '<', '/', '!', '$', '#', '@', '&', '*',
      '0', '1'
    ];

    function getRandomChar() {
      return tech[Math.floor(Math.random() * tech.length)];
    }

    function getRandomColor() {
      const colors = [
        '#7B3FE4', // Purple
        '#BD34FE', // Bright purple
        '#FF94B4', // Pink
        '#3A29FF'  // Blue
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    }

    function initCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      const fontSize = 14;
      columns = Math.floor(canvas.width / fontSize);
      
      // Initialize drops
      drops = [];
      for (let i = 0; i < columns; i++) {
        // Random starting position
        drops[i] = Math.random() * -canvas.height;
      }
    }

    function draw() {
      // Add semi-transparent black rectangle on top of previous frame
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const fontSize = 14;
      
      for (let i = 0; i < drops.length; i++) {
        // Random character
        const text = getRandomChar();
        
        // Random color with gradient-like effect based on position
        const gradient = ctx.createLinearGradient(0, drops[i] - fontSize, 0, drops[i]);
        gradient.addColorStop(0, 'rgba(58, 41, 255, 0.2)');
        gradient.addColorStop(1, getRandomColor());
        
        ctx.fillStyle = gradient;
        ctx.font = `${fontSize}px 'Fira Code', monospace`;
        
        // Draw character
        ctx.fillText(text, i * fontSize, drops[i]);
        
        // Move drop down
        drops[i] += fontSize * (Math.random() * 0.5 + 0.5);
        
        // Reset drop to top with random offset when it reaches bottom
        if (drops[i] > canvas.height * 1.5) {
          drops[i] = Math.random() * -canvas.height;
        }
      }
      
      animationFrameId = requestAnimationFrame(draw);
    }

    // Handle window resize
    const handleResize = () => {
      initCanvas();
    };

    window.addEventListener('resize', handleResize);
    initCanvas();
    draw();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="code-rain-canvas"></canvas>;
};

export default CodeRain; 