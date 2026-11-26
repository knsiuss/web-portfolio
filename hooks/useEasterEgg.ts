'use client';

import { useState, useEffect, useRef } from 'react';

const KONAMI_CODE = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

export default function useEasterEgg() {
  const [activated, setActivated] = useState(false);
  // A ref keeps the buffer out of the effect's dependencies, so the listener
  // registers once instead of being torn down and rebuilt on every keystroke.
  const bufferRef = useRef<string[]>([]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const buffer = [...bufferRef.current, e.key].slice(-KONAMI_CODE.length);
      bufferRef.current = buffer;

      if (buffer.join(',') === KONAMI_CODE.join(',')) {
        bufferRef.current = [];
        setActivated(true);
        setTimeout(() => setActivated(false), 5000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return activated;
}
