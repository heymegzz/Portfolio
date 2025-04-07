import { useState, useEffect, useRef } from 'react';
import './TypewriterText.css';

const TypewriterText = ({ text, delay = 100, onComplete }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const cursorRef = useRef(null);
  const firstRenderRef = useRef(true);

  useEffect(() => {
    // Reset animation on component mount or text change
    if (firstRenderRef.current) {
      setDisplayText('');
      setCurrentIndex(0);
      setIsComplete(false);
      firstRenderRef.current = false;
    }
  }, [text]);

  useEffect(() => {
    if (isComplete) return;

    let timeout;
    
    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
      }, 500);
      return () => clearTimeout(timeout);
    }

    if (currentIndex === text.length && !isComplete) {
      setIsComplete(true);
      if (onComplete) onComplete();
      return;
    }

    const baseDelay = Math.random() * 50 + delay;
    
    timeout = setTimeout(() => {
      setDisplayText(text.substring(0, currentIndex + 1));
      setCurrentIndex(prevIndex => prevIndex + 1);
      
      // Small chance of a glitch effect - reduced probability
      if (Math.random() < 0.02) {
        const glitchChar = '!@#$%^&*()_+-={}[]|;:,.<>?/'.charAt(
          Math.floor(Math.random() * '!@#$%^&*()_+-={}[]|;:,.<>?/'.length)
        );
        setDisplayText(prevText => prevText.slice(0, -1) + glitchChar);
        setIsPaused(true);
      }
    }, baseDelay);

    return () => clearTimeout(timeout);
  }, [currentIndex, delay, isComplete, isPaused, onComplete, text]);

  useEffect(() => {
    // Cursor blinking effect
    const cursor = cursorRef.current;
    if (!cursor) return;
    
    const blinkInterval = setInterval(() => {
      cursor.style.opacity = cursor.style.opacity === '0' ? '1' : '0';
    }, 530);
    
    return () => clearInterval(blinkInterval);
  }, []);

  return (
    <div className="typewriter-container">
      <span className="typewriter-text">{displayText}</span>
      <span ref={cursorRef} className={`typewriter-cursor ${isComplete ? 'complete' : ''}`}>|</span>
    </div>
  );
};

export default TypewriterText; 