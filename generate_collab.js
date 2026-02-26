const fs = require('fs');
let svg = fs.readFileSync('collab.svg', 'utf-8');

let pathsData = [];
const regex = /<path\s+fill="([^"]+)"\s+opacity="([^"]+)"\s+stroke="([^"]+)"\s+d="([^"]+)"\s*\/>/g;
let match;
while ((match = regex.exec(svg)) !== null) {
    pathsData.push({
        fill: match[1],
        opacity: match[2],
        stroke: match[3],
        d: match[4].replace(/\s+/g, ' ').trim()
    });
}

const componentCode = `'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { useRef } from 'react';

const pathsData = ${JSON.stringify(pathsData)};

export default function AnimatedCollab({ className = '', scrollProgress }: { className?: string; scrollProgress?: any }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end center"]
    });

    const fallbackValue = useMotionValue(0);
    // Use parent scroll progress if synced, otherwise internal scroll
    const rawProgress = scrollProgress ?? scrollYProgress ?? fallbackValue;

    // useSpring for buttery smooth interpolation between frames
    // This is key for 120fps: avoids sharp linear updates
    const progress = useSpring(rawProgress, {
        stiffness: 45,
        damping: 16,
        restDelta: 0.0005,
    });

    // --- GPU-ONLY PROPERTIES (compositor thread, no layout/paint) ---
    // Container: parallax scroll + fade — identical visual to the committed version
    const y = useTransform(progress, [0, 1], [100, -100]);
    const opacity = useTransform(progress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    // SVG reveal: fade in the entire SVG as one GPU layer
    // This replaces per-path fillOpacity (which required N JS→CSS updates per frame)
    // Visual result is identical: image reveals as you scroll
    const svgOpacity = useTransform(progress, [0.1, 0.6], [0, 1]);

    return (
        <motion.div
            ref={containerRef}
            className={className}
            style={{
                y,
                opacity,
                // Force GPU compositing — essential for 120fps
                willChange: 'transform, opacity',
                // Prevent this element from triggering layout recalculation in parent
                contain: 'layout paint',
            }}
        >
            <motion.svg
                viewBox="0 0 1536 1024"
                className="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
                style={{
                    opacity: svgOpacity,
                    // Offload drop-shadow to GPU via filter (already compositor-friendly in Chrome/Safari)
                    filter: 'drop-shadow(0 0 15px rgba(223,255,0,0.15))',
                    // Prevent SVG from triggering layout recalculations
                    willChange: 'opacity',
                }}
            >
                {pathsData.map((p, i) => (
                    <path
                        key={i}
                        d={p.d}
                        fill={p.fill}
                        opacity={p.opacity}
                    />
                ))}
            </motion.svg>
        </motion.div>
    );
}
`;

fs.writeFileSync('components/ui/AnimatedCollab.tsx', componentCode.trim() + '\n');
console.log("AnimatedCollab.tsx generated successfully!");
