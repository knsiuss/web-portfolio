"use client";

import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import AnimatedSignature from "@/components/ui/AnimatedSignature";
import useReducedMotion from "@/hooks/useReducedMotion";

export default function SignatureSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const prefersReducedMotion = useReducedMotion();

    // The scroll method: maps the user's scroll progress linearly into the drawing progress
    const { scrollYProgress } = useScroll({
        target: containerRef,
        // Start drawing when the top of the section enters the bottom of the viewport
        // Finish drawing when the top of the section hits the middle of the viewport
        offset: ["start end", "center center"],
    });

    return (
        <section
            ref={containerRef}
            id="signature-section"
            className="relative w-full min-h-[60vh] md:min-h-[80vh] flex flex-col items-center justify-center py-24 md:py-32 z-10 overflow-hidden bg-[#050505]"
        >
            {/* Background Decorative Grid/Lines */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
            </div>

            {/* Subtle Glow Behind Signature */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] md:w-[60%] md:h-[60%] bg-[#C5F542] opacity-[0.03] blur-[100px] pointer-events-none rounded-full" />

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
                        <span className="w-8 md:w-12 h-[1px] bg-[#C5F542]/50" />
                        <span
                            className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-[#C5F542] animate-pulse"
                            style={{ boxShadow: "0 0 10px rgba(197,245,66,0.8)" }}
                        />
                        <span className="w-8 md:w-12 h-[1px] bg-[#C5F542]/50" />
                    </div>
                    <span
                        className="font-tech text-glow-neon text-[10px] md:text-sm uppercase tracking-[0.4em] text-[#C5F542]"
                        style={{ textShadow: "0 0 15px rgba(197,245,66,0.6)" }}
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
                    className="font-sans italic text-center text-white/90 max-w-4xl text-xl md:text-3xl lg:text-4xl leading-relaxed mb-16 md:mb-24 font-light tracking-wide"
                >
                    "I build high-performance data pipelines and intelligent systems with
                    the same precision and relentless pursuit of speed found in
                    motorsport. Always pushing the limits, always optimizing for the win."
                </motion.p>

                {/* Animated Signature Wrapper - MASSIVE SIZE */}
                <div className="relative w-full max-w-[90vw] lg:max-w-6xl h-48 md:h-80 lg:h-[500px] flex items-center justify-center -mt-8 md:-mt-12">
                    {/* Corner accents - Technical Vibe (Scaled UP) */}
                    <div className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 border-t-[3px] border-l-[3px] border-white/20" />
                    <div className="absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 border-t-[3px] border-r-[3px] border-white/20" />
                    <div className="absolute bottom-0 left-0 w-6 h-6 md:w-8 md:h-8 border-b-[3px] border-l-[3px] border-white/20" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 border-b-[3px] border-r-[3px] border-white/20" />

                    <AnimatedSignature scrollProgress={scrollYProgress} />
                </div>
            </div>
        </section>
    );
}
