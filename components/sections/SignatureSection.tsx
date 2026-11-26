"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import AnimatedSignature from "@/components/ui/AnimatedSignature";
import AnimatedCollab from "@/components/ui/AnimatedCollab";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function SignatureSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    // Scroll progress scoped to this section — drives the handwriting animation
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });
    // Spring-smooth it so the pen feels natural, not jittery
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 40,
        damping: 25,
        restDelta: 0.001,
    });

    return (
        <section
            ref={containerRef}
            id="signature-section"
            className="relative w-full min-h-[100vh] md:min-h-[110vh] flex flex-col items-center justify-center py-16 md:py-24 z-10 overflow-hidden bg-background"
            style={{
                // Isolate this section's layout — prevents scroll animations
                // from triggering parent/sibling layout recalculations
                contain: 'layout',
            }}
        >
            <div className="relative w-full max-w-5xl px-8 flex flex-col items-center z-10">
                <motion.div
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="mb-8 md:mb-12"
                >
                    <span className="font-tech text-[10px] md:text-xs uppercase tracking-[0.3em] text-accent-text">
                        A note before you go
                    </span>
                </motion.div>

                {/* The line is his own, not a borrowed quote: it states how he
                    actually works instead of decorating the section with words
                    someone else said. */}
                <motion.p
                    initial={prefersReducedMotion ? {} : { opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="font-sans text-center text-foreground max-w-4xl text-xl md:text-3xl lg:text-4xl leading-relaxed mb-16 md:mb-24 font-light tracking-wide"
                >
                    I would rather ship something that runs and fix it in the
                    open than describe something perfect that never leaves the
                    notebook.
                </motion.p>

                <div className="relative w-full max-w-[90vw] lg:max-w-6xl h-48 md:h-80 lg:h-[500px] flex items-center justify-center -mt-8 md:-mt-12">
                    <AnimatedSignature />
                </div>
            </div>

            <div className="relative w-full max-w-[1400px] mx-auto mt-20 md:mt-32 z-0 opacity-60 pointer-events-none">
                <AnimatedCollab className="w-full h-auto" scrollProgress={smoothProgress} />
            </div>
        </section>
    );
}
