import React, { useState, useRef } from 'react';
const letters = "HELLO WORLD".split("");
export default function ScrambleText({ text }) {
  const [displayText, setDisplayText] = useState(text);
  const intervalRef = useRef(null);

  const handleMouseOver = () => {
    let iteration = 0;
    
    // Clear existing interval to prevent overlapping animations
    clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setDisplayText(prev => 
        text
          .split("")
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            // Return a random letter
            return letters[Math.floor(Math.random() * 26)];
          })
          .join("")
      );
      
      // Stop the interval when the full text is revealed
      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
      }
      
      // Adjust this value to change the reveal speed
      iteration += 1 / 3; 
    }, 30);
  };
  return (
    <h1 
      onMouseOver={handleMouseOver}
      className="text-9xl   tracking-tight mb-4 text-green-300 cursor-crosshair inline-block font-mono"
    >
      {displayText}
    </h1>
  );
}