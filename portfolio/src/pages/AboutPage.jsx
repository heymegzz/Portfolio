import React from 'react';
import TechBackground from '../components/TechBackground';
import CircuitPattern from '../components/CircuitPattern';
import SkillCloud from '../components/SkillCloud';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <section id="about" className="about-section">
      <TechBackground page="about" />
      <CircuitPattern page="about" />
      <div className="about-container visible">
        <div className="section-header">
          <h2>ABOUT ME</h2>
          <div className="header-line"></div>
        </div>

        <div className="about-content">
          <div className="about-text">
            <p>
              Hi, I'm currently a first-year BTech student at Newton School of Technology, specializing in Computer Science and Artificial Intelligence. 🚀
            </p>
            <p>
              I'm passionate about tech and love bringing ideas to life through code. I'm currently working with HTML, CSS, JavaScript, and Python, and actively exploring modern tools like React, TypeScript, and Three.js to build dynamic and engaging web experiences.
            </p>
            <p>
              Lately, I've developed a keen interest in Artificial Intelligence and Machine Learning—fascinated by how machines can learn, think, and solve problems. Alongside that, I'm diving into the world of Competitive Programming to sharpen my problem-solving skills and think more efficiently under pressure.
            </p>
            <p>
              I'm always eager to learn, experiment, and push my limits—whether it's building projects from scratch or tackling a new algorithm. My goal is to grow into a developer who builds tech that's not just functional but meaningful.
            </p>
            <p>
              Let's create something amazing! 💻✨
            </p>
          </div>

          <div className="expertise-boxes">
            <div className="expertise-box">
              <h3>💻 Web Development</h3>
              <p>Websites aren't just code for me—they're canvases.</p>
              <p>I started with the basics—HTML, CSS, and JavaScript—and fell in love with how lines of code could shape what people see and feel online.</p>
              <p>Today, I work with tools like React, Vite, and Three.js to bring ideas to life. I use Git & GitHub to manage my builds and keep things neat, and sometimes dabble with Figma to sketch out ideas before they become reality.</p>
              <p>My goal? Build websites that aren't just responsive—but remembered.</p>
            </div>
            
            <div className="expertise-box">
              <h3>🧠 DSA & Competitive Programming</h3>
              <p>For me, problem-solving isn't just a skill—it's a sport.</p>
              <p>I've solved 300+ questions on Codeforces, with a max contest rating of 1000+, and I'm just getting started.</p>
              <p>Competitive programming helps me think sharper, code cleaner, and tackle challenges with logic and speed.</p>
              <p>💻 Platforms I practice on:</p>
              <ul>
                <li>Codeforces (main battleground)</li>
                <li>LeetCode</li>
                <li>CodeChef</li>
                <li>GeeksforGeeks</li>
              </ul>
              <p>Every bug is a puzzle, and every solution is a win. 🧩</p>
            </div>
          </div>
          
          <SkillCloud />
        </div>
      </div>
    </section>
  );
};

export default AboutPage; 