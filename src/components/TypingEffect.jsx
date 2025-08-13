import React, { useEffect, useState } from 'react';
import '../style/TypingEffect.css'; 

const TypingEffect = ({ text, speed = 50, className = '' }) => {
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setDisplayedText(prev => prev + text[currentIndex]);
      currentIndex++;
      if (currentIndex === text.length) {
        clearInterval(intervalId);
      }
    }, speed);

    return () => clearInterval(intervalId);
  }, [text, speed]);

  return <span className={className}>{displayedText}</span>;
};

export default TypingEffect;
