'use client';

import { useState, useEffect } from 'react';

export default function useEasterEgg() {
  const [activated, setActivated] = useState(false);
  const [input, setInput] = useState<string[]>([]);
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newInput = [...input, e.key];
      if (newInput.length > konamiCode.length) {
        newInput.shift();
      }
      setInput(newInput);

      if (newInput.join(',') === konamiCode.join(',')) {
        setActivated(true);
        setTimeout(() => setActivated(false), 5000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input]);

  return activated;
}
