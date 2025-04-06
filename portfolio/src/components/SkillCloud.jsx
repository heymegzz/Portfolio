import React from 'react';
import './SkillCloud.css';

const SkillCloud = () => {
  // List of skills with their icons and colors
  const skills = [
    { name: 'HTML5', icon: 'fab fa-html5', color: '#E34F26' },
    { name: 'CSS3', icon: 'fab fa-css3-alt', color: '#1572B6' },
    { name: 'JavaScript', icon: 'fab fa-js-square', color: '#F7DF1E' },
    { name: 'React', icon: 'fab fa-react', color: '#61DAFB' },
    { name: 'Python', icon: 'fab fa-python', color: '#3776AB' },
    { name: 'Git', icon: 'fab fa-git-alt', color: '#F05032' },
    { name: 'GitHub', icon: 'fab fa-github', color: '#ffffff' },
    { name: 'VS Code', icon: 'fas fa-code', color: '#007ACC' },
  ];

  return (
    <div className="skill-cloud">
      <h3>Technical Skills</h3>
      
      <div className="cloud-container">
        {skills.map((skill, index) => (
          <div 
            key={index} 
            className="skill-bubble"
            style={{ 
              '--color': skill.color,
            }}
          >
            <div className="bubble-icon">
              <i className={skill.icon}></i>
            </div>
            <div className="bubble-name">{skill.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillCloud; 