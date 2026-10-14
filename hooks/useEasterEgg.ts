'use client';

import { useState, useEffect } from 'react';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function useEasterEgg() {
  const [activated, setActivated] = useState(false);
  const [input, setInput] = useState<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const newInput = [...input, e.key];
      if (newInput.length > KONAMI_CODE.length) {
        newInput.shift();
      }
      setInput(newInput);

      if (newInput.join(',') === KONAMI_CODE.join(',')) {
        setActivated(true);
        setTimeout(() => setActivated(false), 5000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [input]);

  return activated;
}
