import { useState, useEffect } from 'react';
import './HolographicTech.css';

const HolographicTech = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  const techStack = [
    { name: 'React', icon: 'fab fa-react' },
    { name: 'JavaScript', icon: 'fab fa-js' },
    { name: 'HTML5', icon: 'fab fa-html5' },
    { name: 'CSS3', icon: 'fab fa-css3-alt' },
    { name: 'Node.js', icon: 'fab fa-node-js' },
    { name: 'Git', icon: 'fab fa-git-alt' },
    { name: 'MongoDB', icon: 'fas fa-database' },
    { name: 'AWS', icon: 'fab fa-aws' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((activeIndex + 1) % techStack.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex, techStack.length]);

  const handleIconClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="holographic-container">
      <div className="holo-ring"></div>
      <div className="holo-platform">
        <div className="main-tech-display">
          <i className={`${techStack[activeIndex].icon} holo-icon`}></i>
          <div className="tech-name">{techStack[activeIndex].name}</div>
        </div>
      </div>
      
      <div className="holo-controls">
        {techStack.map((tech, index) => (
          <div 
            key={tech.name}
            className={`control-icon ${index === activeIndex ? 'active' : ''}`}
            onClick={() => handleIconClick(index)}
          >
            <i className={tech.icon}></i>
          </div>
        ))}
      </div>
      
      <div className="holo-beams">
        <div className="beam beam-1"></div>
        <div className="beam beam-2"></div>
        <div className="beam beam-3"></div>
      </div>
    </div>
  );
};

export default HolographicTech; 