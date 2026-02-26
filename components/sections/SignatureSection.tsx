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
            className="relative w-full min-h-[120vh] md:min-h-[150vh] flex flex-col items-center justify-center py-24 md:py-32 z-10 overflow-hidden bg-background"
        >
            {/* Background Decorative Grid/Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            {/* Subtle Glow Behind Signature */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] md:w-[60%] md:h-[60%] bg-racing-red opacity-[0.03] blur-[100px] pointer-events-none rounded-full" />

            <div className="relative w-full max-w-5xl px-8 flex flex-col items-center z-10">
                {/* Label */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="flex flex-col items-center mb-8 md:mb-12"
                >
                    <div className="flex items-center gap-4 mb-4">
                        <span className="w-8 md:w-12 h-[1px] bg-racing-red/50" />
                        <span
                            className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-racing-red animate-pulse"
                        />
                        <span className="w-8 md:w-12 h-[1px] bg-racing-red/50" />
                    </div>
                    <span
                        className="font-tech text-glow-neon text-[10px] md:text-sm uppercase tracking-[0.4em] text-racing-red"
                    >
                        Message from Kanisius
                    </span>
                </motion.div>

                {/* Message Content */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                    className="font-sans italic text-center text-foreground/90 max-w-4xl text-xl md:text-3xl lg:text-4xl leading-relaxed mb-16 md:mb-24 font-light tracking-wide"
                >
                    &ldquo;Failure is an option here. If things are not failing, you are not innovating enough.&rdquo;
                </motion.p>

                {/* Animated Signature Wrapper - MASSIVE SIZE */}
                <div className="relative w-full max-w-[90vw] lg:max-w-6xl h-48 md:h-80 lg:h-[500px] flex items-center justify-center -mt-8 md:-mt-12">
                    {/* Corner accents - Technical Vibe (Scaled UP) */}
                    <div className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 border-t-[3px] border-l-[3px] border-foreground/20" />
                    <div className="absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 border-t-[3px] border-r-[3px] border-foreground/20" />
                    <div className="absolute bottom-0 left-0 w-6 h-6 md:w-8 md:h-8 border-b-[3px] border-l-[3px] border-foreground/20" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 border-b-[3px] border-r-[3px] border-foreground/20" />

                    <AnimatedSignature />
                </div>
            </div>

            {/* Let's Collaborate SVG Graphic - Moved below signature, before Contact Section */}
            <div className="relative w-full max-w-[1400px] mx-auto mt-20 md:mt-32 z-0 opacity-60 pointer-events-none">
                <AnimatedCollab className="w-full h-auto" scrollProgress={smoothProgress} />
            </div>
        </section>
    );
}
