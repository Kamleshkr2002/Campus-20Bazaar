import { useState, useEffect } from 'react';

export function useTypingAnimation(words, typingSpeed = 100, erasingSpeed = 50, pauseDuration = 2000) {
  const [displayText, setDisplayText] = useState('');
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    
    const timeout = setTimeout(() => {
      if (isTyping) {
        if (currentCharIndex < currentWord.length) {
          setDisplayText(currentWord.slice(0, currentCharIndex + 1));
          setCurrentCharIndex(prev => prev + 1);
        } else {
          // Word is fully typed, pause before erasing
          setTimeout(() => {
            setIsTyping(false);
          }, pauseDuration);
        }
      } else {
        if (currentCharIndex > 0) {
          setDisplayText(currentWord.slice(0, currentCharIndex - 1));
          setCurrentCharIndex(prev => prev - 1);
        } else {
          // Word is fully erased, move to next word
          setIsTyping(true);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isTyping ? typingSpeed : erasingSpeed);

    return () => clearTimeout(timeout);
  }, [currentCharIndex, currentWordIndex, isTyping, words, typingSpeed, erasingSpeed, pauseDuration]);

  return displayText;
}
