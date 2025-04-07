import { useState, useEffect } from 'react';
import TypewriterText from '../components/TypewriterText';
import SocialIcons from '../components/SocialIcons';
import CosmicOrb from '../components/CosmicOrb';
import './HomePage.css';

const HomePage = () => {
  const [bioVisible, setBioVisible] = useState(false);
  const [socialVisible, setSocialVisible] = useState(false);

  const handleTypewriterComplete = () => {
    setBioVisible(true);
  };

  useEffect(() => {
    if (bioVisible) {
      const timer = setTimeout(() => {
        setSocialVisible(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [bioVisible]);

  return (
    <section id="home" className="home-section">
      <div className="home-content">
        <div className="home-text">
          <h1 className="name">
            <TypewriterText 
              text="MEGHNA NAIR" 
              delay={100}
              onComplete={handleTypewriterComplete}
            />
          </h1>
          
          <div className={`bio ${bioVisible ? 'visible' : ''}`}>
            <p>
              Hey, I'm a front end developer passionate about crafting visually stunning and 
              highly interactive web experiences. As an AI/ML enthusiast and competitive programming 
              aficionado, I love solving complex problems and optimizing performance. Always eager to 
              learn, innovate and push boundaries - let's create something amazing together!
            </p>
          </div>
          
          <div className={`social-section ${socialVisible ? 'visible' : ''}`}>
            <SocialIcons />
          </div>
        </div>
        
        <div className="home-visual">
          <div className="cosmic-container">
            <CosmicOrb />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage; 