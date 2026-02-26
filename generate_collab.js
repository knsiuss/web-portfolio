const fs = require('fs');
let svg = fs.readFileSync('collab.svg', 'utf-8');

// The original fill colors from SVG matches
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

const componentCode = `
'use client';

import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';
import { useRef } from 'react';

// Using the extracted paths from collab.svg
const pathsData = ${JSON.stringify(pathsData)};

export default function AnimatedCollab({ className = '', scrollProgress }: { className?: string; scrollProgress?: any }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end center"]
    });

    const fallbackValue = useMotionValue(0);
    // Use the progress prop from parent, or fallback to internal scroll
    const actualProgress = scrollProgress || scrollYProgress || fallbackValue;

    const draw = useTransform(actualProgress, [0.1, 0.7], [0, 1]);
    const fillOpacity = useTransform(actualProgress, [0.7, 0.9], [0, 1]);

    return (
        <div ref={containerRef} className={className}>
            <svg 
                viewBox="0 0 1536 1024" 
                className="w-full h-full drop-shadow-[0_0_15px_rgba(223,255,0,0.15)]"
                preserveAspectRatio="xMidYMid meet"
            >
                {pathsData.map((p, i) => (
                    <motion.path
                        key={i}
                        d={p.d}
                        style={{ pathLength: draw, fillOpacity: fillOpacity }}
                        stroke="#DFFF00"
                        strokeWidth="2"
                        fill={p.fill}
                    />
                ))}
            </svg>
        </div>
    );
}
`;

fs.writeFileSync('components/ui/AnimatedCollab.tsx', componentCode.trim() + '\n');
console.log("AnimatedCollab.tsx generated successfully!");
