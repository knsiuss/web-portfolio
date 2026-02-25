'use client';

import { motion } from 'framer-motion';
import useReducedMotion from '@/hooks/useReducedMotion';

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
}

export default function SplitText({ text, className = "", delay = 0 }: SplitTextProps) {
    const prefersReducedMotion = useReducedMotion();
    const characters = text.split('');

    if (prefersReducedMotion) {
        return <span className={className}>{text}</span>;
    }

    return (
        <span className={`inline-block ${className}`}>
            {characters.map((char, i) => (
                <span
                    key={`${char}-${i}`}
                    className="inline-block overflow-hidden"
                    style={{ paddingRight: char === ' ' ? '0.3em' : '0' }}
                >
                    <motion.span
                        className="inline-block"
                        initial={{ y: '120%', opacity: 0 }}
                        animate={{ y: '0%', opacity: 1 }}
                        // LN4 Style Custom Easing: [0.16, 1, 0.3, 1] - Expo.out equivalent
                        transition={{
                            duration: 0.8,
                            ease: [0.16, 1, 0.3, 1],
                            delay: delay + i * 0.04, // 40ms stagger per character
                        }}
                    >
                        {char === ' ' ? '\u00A0' : char}
                    </motion.span>
                </span>
            ))}
        </span>
    );
}
