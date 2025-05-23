import { useState, useEffect } from 'react';

export function useTypewriter(text: string, delay: number = 40, startDelay: number = 0) {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!text) return;
    
    // Reset when text changes
    setDisplayText('');
    setCurrentIndex(0);
    
    const startTimeout = setTimeout(() => {
      setStarted(true);
    }, startDelay);
    
    return () => clearTimeout(startTimeout);
  }, [text, startDelay]);
  
  useEffect(() => {
    if (!started || !text) return;
    
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, delay);
      
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, started, text]);
  
  const isComplete = displayText.length === text.length;
  
  return { displayText, isComplete };
}