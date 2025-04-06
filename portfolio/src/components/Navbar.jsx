import { useEffect, useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [activeLink, setActiveLink] = useState('home');
  const [scrolled, setScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onUpdateActiveLink = (value) => {
    setActiveLink(value);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div 
        className="navbar-logo" 
        onMouseEnter={() => setLogoHovered(true)}
        onMouseLeave={() => setLogoHovered(false)}
      >
        <span className={`logo-text ${logoHovered ? 'hovered' : ''}`}>{'{M::N}'}</span>
        <div className="logo-glitch-effect"></div>
      </div>
      <div className="navbar-links">
        <a 
          href="#home" 
          className={activeLink === 'home' ? 'active' : ''} 
          onClick={() => onUpdateActiveLink('home')}
        >
          <span className="link-text">Home</span>
        </a>
        <a 
          href="#about" 
          className={activeLink === 'about' ? 'active' : ''} 
          onClick={() => onUpdateActiveLink('about')}
        >
          <span className="link-text">About</span>
        </a>
        <a 
          href="#projects" 
          className={activeLink === 'projects' ? 'active' : ''} 
          onClick={() => onUpdateActiveLink('projects')}
        >
          <span className="link-text">Projects</span>
        </a>
        <a 
          href="#contact" 
          className={activeLink === 'contact' ? 'active' : ''} 
          onClick={() => onUpdateActiveLink('contact')}
        >
          <span className="link-text">Contact Me</span>
        </a>
      </div>
    </nav>
  );
}

export default Navbar; 