import { useEffect, useRef } from 'react';
import './FloatingShapes.css';

const FloatingShapes = () => {
  const containerRef = useRef(null);
  
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    
    const shapeCount = 15;
    const shapes = [];
    
    const createShape = () => {
      const shape = document.createElement('div');
      shape.classList.add('floating-shape');
      
      // Randomly choose shape type
      const shapeTypes = ['circle', 'triangle', 'square', 'hexagon'];
      const shapeType = shapeTypes[Math.floor(Math.random() * shapeTypes.length)];
      shape.classList.add(`shape-${shapeType}`);
      
      // Random position
      shape.style.left = `${Math.random() * 90}%`;
      shape.style.top = `${Math.random() * 90}%`;
      
      // Random size between 20px and 80px
      const size = Math.random() * 60 + 20;
      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      
      // Random rotation
      shape.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      // Random animation duration between 20s and 50s
      const duration = Math.random() * 30 + 20;
      shape.style.animationDuration = `${duration}s`;
      
      // Random delay
      shape.style.animationDelay = `${Math.random() * 5}s`;
      
      // Random direction
      if (Math.random() > 0.5) {
        shape.style.animationDirection = 'reverse';
      }
      
      // Random opacity
      shape.style.opacity = Math.random() * 0.3 + 0.1;
      
      // Random border width
      shape.style.borderWidth = `${Math.random() * 3 + 1}px`;
      
      return shape;
    };
    
    for (let i = 0; i < shapeCount; i++) {
      const shape = createShape();
      container.appendChild(shape);
      shapes.push(shape);
    }
    
    return () => {
      shapes.forEach(shape => {
        if (shape.parentNode === container) {
          container.removeChild(shape);
        }
      });
    };
  }, []);
  
  return <div ref={containerRef} className="floating-shapes-container"></div>;
};

export default FloatingShapes; 