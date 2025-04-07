import { useState, useEffect, useRef } from 'react';
import './SkillsShowcase.css';

const SkillsShowcase = () => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <div className="skills-showcase" ref={containerRef}>
      <h3>Technical Skills</h3>
      
      <div className={`skills-orbit-container ${isVisible ? 'animate' : ''}`}>
        <div className="skills-orbit">
          {skills.map((skill, index) => (
            <div 
              key={index} 
              className="skill-icon-wrapper"
              style={{ 
                '--index': index, 
                '--total': skills.length,
                '--delay': `${index * 0.1}s`,
                '--color': skill.color
              }}
            >
              <div className="skill-icon">
                <i className={skill.icon}></i>
              </div>
              <div className="skill-name">{skill.name}</div>
            </div>
          ))}
        </div>
        
        <div className="core-circle">
          <div className="pulse-circle"></div>
        </div>
        
        <div className="connecting-lines">
          {skills.map((_, index) => (
            <div 
              key={index} 
              className="connecting-line"
              style={{ 
                '--index': index, 
                '--total': skills.length,
                '--delay': `${index * 0.1}s`
              }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsShowcase; 