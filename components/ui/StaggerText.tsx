'use client';

import { motion } from 'framer-motion';

interface StaggerTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function StaggerText({ text, className = '', delay = 0 }: StaggerTextProps) {
  const letters = text.split('');

  return (
    <motion.span className={className}>
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.03,
            ease: [0.22, 1, 0.36, 1]
          }}
          style={{ display: 'inline-block' }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.span>
  );
}
