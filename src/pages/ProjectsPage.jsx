import { useState, useEffect } from 'react';
import TechBackground from '../components/TechBackground';
import CircuitPattern from '../components/CircuitPattern';
import './ProjectsPage.css';

const ProjectsPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  const projects = [
    {
      id: 1,
      title: "Snake Game",
      technologies: ["HTML", "CSS", "JavaScript"],
      description: "Classic Snake Game with smooth movement and collision detection.",
      icon: "gamepad",
      links: {
        live: "https://heymegzz.github.io/snake-game/",
        github: "https://github.com/heymegzz/snake-game"
      }
    },
    {
      id: 2,
      title: "Digital Clock",
      technologies: ["HTML", "CSS", "JavaScript"],
      description: "Real-time digital clock with a responsive UI.",
      icon: "clock",
      links: {
        live: "https://heymegzz.github.io/digi-clock-project/",
        github: "https://github.com/heymegzz/digi-clock-project"
      }
    },
    {
      id: 3,
      title: "Meditation App",
      technologies: ["HTML", "CSS", "JavaScript"],
      description: "Custom meditation timer with a minimalist, user-friendly design.",
      icon: "spa",
      links: {
        live: "https://heymegzz.github.io/js-projects/",
        github: "https://github.com/heymegzz/js-projects"
      }
    }
  ];

  const filteredProjects = projects;

  return (
    <section id="projects" className="projects-section">
      <TechBackground page="projects" />
      <CircuitPattern page="projects" />
      <div className={`projects-container ${isVisible ? 'visible' : ''}`}>
        <div className="section-header">
          <h2>MY PROJECTS</h2>
          <div className="header-line"></div>
        </div>

        <div className="projects-grid">
          {filteredProjects.map(project => (
            <div key={project.id} className="project-card">
              <div className="project-icon">
                <i className={`fas fa-${project.icon}`}></i>
              </div>
              <div className="project-info">
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="project-tech">
                  {project.technologies.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
                <div className="project-card-links">
                  <a href={project.links.github} target="_blank" rel="noopener noreferrer" className="project-link">
                    <i className="fab fa-github"></i> Code
                  </a>
                  <a href={project.links.live} target="_blank" rel="noopener noreferrer" className="project-link">
                    <i className="fas fa-external-link-alt"></i> Live Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsPage; 