'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

export default function BackToTop() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 500);
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 12 }}
                    transition={{ duration: 0.25 }}
                    onClick={scrollToTop}
                    className="fixed bottom-20 right-4 sm:bottom-6 md:bottom-20 md:right-10 z-[100] w-11 h-11 flex items-center justify-center rounded-md bg-accent text-accent-foreground hover:brightness-110 transition-[filter] duration-300"
                    aria-label="Back to top"
                >
                    <ChevronUp aria-hidden="true" className="w-5 h-5" />
                </motion.button>
            )}
        </AnimatePresence>
    );
}
