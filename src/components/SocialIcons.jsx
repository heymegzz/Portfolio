import { useState } from 'react';
import './SocialIcons.css';

const SocialIcons = () => {
  const [hoveredIcon, setHoveredIcon] = useState(null);
  
  const socialLinks = [
    { 
      name: 'LinkedIn', 
      icon: 'linkedin',
      brand: true,
      link: 'https://www.linkedin.com/in/meghna-nair-159458227/' 
    },
    { 
      name: 'GitHub', 
      icon: 'github',
      brand: true,
      link: 'https://github.com/heymegzz' 
    },
    { 
      name: 'Email', 
      icon: 'envelope',
      brand: false,
      link: 'mailto:meghnanair7569@gmail.com' 
    },
    { 
      name: 'Resume', 
      icon: 'file-download',
      brand: false,
      link: 'https://drive.google.com/file/d/1JgdaTPpqwnkxP1hA0yTE-kO7q458bXEE/view?usp=drive_link' 
    },
    { 
      name: 'LeetCode', 
      icon: 'code',
      brand: false,
      link: 'https://leetcode.com/u/heymegzz/' 
    },
    { 
      name: 'CodeForces', 
      icon: 'laptop-code',
      brand: false,
      link: 'https://codeforces.com/profile/heymegzz' 
    },
    { 
      name: 'CodeChef', 
      icon: 'terminal',
      brand: false,
      link: 'https://www.codechef.com/users/heymegzz' 
    }
  ];

  return (
    <div className="social-icons">
      {socialLinks.map((item, index) => (
        <a 
          key={index} 
          href={item.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className={`social-icon-link ${hoveredIcon === index ? 'hovered' : ''}`}
          onMouseEnter={() => setHoveredIcon(index)}
          onMouseLeave={() => setHoveredIcon(null)}
          aria-label={item.name}
        >
          <div className="social-icon">
            <i className={`${item.brand ? 'fab' : 'fas'} fa-${item.icon}`}></i>
            <div className="icon-glow"></div>
            <div className="icon-particles"></div>
          </div>
          <span className="icon-label">{item.name}</span>
        </a>
      ))}
    </div>
  );
};

export default SocialIcons; 