'use client';

import { motion, useTransform, MotionValue, useMotionValue } from "framer-motion";
import useReducedMotion from "@/hooks/useReducedMotion";

interface AnimatedSignatureProps {
    scrollProgress?: MotionValue<number>;
}

export default function AnimatedSignature({ scrollProgress }: AnimatedSignatureProps) {
    const prefersReducedMotion = useReducedMotion();

    const PATH_MAIN =
        "M6017 8334 c-30 -16 -30 -20 -6 -81 48 -119 -211 -562 -607 -1038 -94 -112 -142 -168 -297 -342 -100 -113 -442 -453 -591 -588 -120 -109 -348 -296 -354 -291 -5 6 56 190 235 711 185 540 302 896 349 1065 31 110 38 152 39 227 0 84 -2 94 -25 119 -36 39 -101 65 -166 65 -74 1 -89 -15 -115 -122 -52 -219 -232 -782 -361 -1129 -262 -704 -492 -1077 -813 -1318 -296 -222 -616 -276 -726 -121 -29 41 -36 107 -15 147 36 70 14 102 -69 102 -93 0 -152 -48 -181 -147 -67 -230 167 -443 486 -443 289 0 565 126 839 385 35 33 61 52 58 43 -3 -10 -18 -55 -32 -102 l-25 -83 -92 -38 c-137 -57 -238 -149 -238 -217 0 -42 24 -83 63 -107 47 -29 76 -26 123 9 38 29 60 38 50 22 -10 -16 -144 -557 -194 -782 -107 -480 -146 -733 -146 -956 l-1 -170 28 -38 c48 -62 100 -90 176 -94 49 -2 75 2 101 15 38 20 39 26 15 93 -14 36 -16 64 -11 145 23 347 165 1058 340 1705 l53 195 70 -1 c244 -5 513 -210 760 -579 282 -423 564 -1137 585 -1485 l3 -45 52 0 c57 1 90 19 127 69 19 25 21 41 20 169 0 170 -17 257 -97 498 -81 245 -203 517 -315 705 l-49 81 64 -5 c83 -6 134 14 201 79 54 52 161 206 227 323 20 36 40 68 45 71 5 3 7 -18 5 -47 -9 -158 41 -261 154 -318 65 -33 156 -26 208 16 50 40 98 112 171 259 l60 120 0 -90 c-1 -121 23 -164 119 -214 28 -14 121 -17 134 -4 6 6 25 62 44 125 41 138 144 420 210 573 71 166 272 561 281 552 1 -1 -13 -56 -32 -122 -46 -162 -100 -434 -114 -578 -16 -148 -1 -282 39 -361 46 -90 156 -142 248 -117 70 19 112 76 208 284 l59 128 18 -70 c20 -84 38 -119 77 -158 43 -43 97 -66 168 -71 54 -4 69 -1 108 22 91 54 165 163 340 505 50 97 95 176 100 175 6 0 23 -19 40 -43 21 -29 27 -46 20 -55 -6 -7 -51 -67 -100 -132 -125 -164 -187 -257 -250 -377 -99 -189 -116 -280 -69 -375 75 -151 249 -184 433 -81 191 107 332 284 382 477 41 163 21 334 -61 509 l-38 82 130 156 c72 86 132 155 134 153 2 -2 -6 -37 -17 -78 -36 -140 -62 -321 -63 -450 -1 -112 2 -131 23 -178 30 -66 89 -118 157 -138 60 -17 92 -12 149 23 62 39 146 161 247 362 l43 84 6 -79 c10 -130 58 -210 154 -255 129 -60 247 18 380 253 l70 123 6 -86 c7 -106 35 -168 92 -210 98 -71 193 -59 296 35 31 29 226 251 316 361 22 26 53 62 68 79 16 17 40 46 54 64 14 17 34 32 45 32 11 0 134 29 272 65 419 107 699 161 966 185 395 35 774 -26 846 -136 25 -38 21 -121 -9 -180 -158 -311 -662 -583 -1557 -840 -232 -66 -747 -198 -1020 -260 -1864 -424 -2787 -706 -3651 -1115 -824 -389 -1491 -883 -1733 -1281 -122 -201 -121 -364 3 -428 38 -20 149 -31 191 -20 47 13 104 51 108 73 3 14 -4 17 -40 17 -54 0 -92 19 -96 48 -4 27 55 138 107 202 327 405 1002 852 1876 1243 313 140 823 330 1240 460 552 173 1046 301 2140 556 898 210 1286 318 1665 468 359 142 622 296 796 468 259 254 291 516 91 731 -105 113 -299 188 -558 215 -140 15 -501 6 -659 -16 -246 -33 -592 -104 -697 -142 -10 -3 75 86 188 198 114 112 227 233 252 269 110 160 141 237 135 336 -3 54 -10 72 -43 121 -22 31 -60 71 -83 88 -39 27 -51 30 -115 30 -63 -1 -82 -6 -157 -42 -236 -115 -509 -374 -622 -590 -61 -118 -82 -184 -82 -268 -1 -101 33 -167 117 -230 l26 -20 -132 -139 c-73 -77 -187 -196 -255 -265 l-123 -126 6 55 c12 104 84 356 184 646 143 414 148 437 99 499 -26 33 -89 65 -129 65 -55 0 -88 -47 -158 -225 -113 -285 -374 -816 -474 -964 -55 -83 -114 -151 -130 -151 -18 0 1 140 37 281 40 154 118 387 205 614 67 172 74 217 40 271 -41 66 -142 104 -198 75 -13 -7 -48 -68 -91 -157 -39 -80 -70 -147 -70 -150 0 -23 -324 -678 -400 -809 -65 -113 -143 -222 -147 -208 -7 20 28 208 63 343 47 175 132 436 204 625 31 82 60 164 63 181 13 69 -29 137 -105 168 -51 22 -83 20 -111 -6 -23 -22 -101 -187 -154 -328 -18 -48 -41 -82 -87 -130 -34 -36 -109 -119 -166 -185 -57 -66 -107 -122 -110 -125 -3 -3 -36 -42 -74 -87 -37 -46 -71 -83 -74 -83 -12 1 -101 124 -131 181 -16 30 -32 68 -36 85 -14 70 46 208 150 344 53 69 198 207 202 193 2 -6 -8 -41 -21 -78 -19 -49 -23 -72 -16 -85 26 -49 98 -31 165 41 99 106 122 227 58 307 -37 46 -108 91 -155 98 -93 15 -239 -68 -389 -221 -162 -165 -256 -330 -279 -491 -15 -105 -3 -172 53 -288 l43 -90 -81 -150 c-98 -181 -153 -272 -210 -346 -53 -68 -122 -133 -135 -125 -15 9 -12 151 5 246 23 131 98 428 155 609 129 409 138 456 101 516 -42 68 -145 100 -192 59 -32 -29 -93 -167 -150 -339 -27 -83 -71 -203 -98 -266 -27 -63 -86 -203 -131 -310 -97 -230 -194 -435 -238 -505 l-32 -50 0 41 c0 141 86 489 245 989 88 275 87 359 -4 404 -55 28 -85 32 -140 20 -43 -9 -59 -19 -102 -67 -109 -122 -329 -485 -455 -749 -32 -67 -59 -121 -61 -119 -2 1 3 22 11 47 8 24 31 107 51 184 20 77 64 221 97 320 63 190 68 228 34 280 -36 54 -138 82 -184 50 -52 -37 -107 -173 -197 -488 -60 -208 -72 -240 -183 -487 -133 -298 -247 -511 -313 -590 l-29 -34 0 34 c0 89 56 338 133 590 46 148 65 205 181 528 72 199 79 244 46 298 -36 58 -121 94 -171 73 -23 -9 -39 -32 -74 -106 l-44 -94 -32 36 c-36 40 -82 67 -147 84 -58 16 -149 -1 -227 -42 -176 -93 -429 -460 -560 -812 -79 -211 -123 -457 -109 -605 l7 -65 -39 45 c-158 186 -351 340 -527 420 -72 33 -235 80 -277 80 -47 0 -54 12 -39 69 12 49 16 52 113 117 396 263 913 720 1306 1154 442 489 800 1008 869 1260 24 86 27 186 7 234 -35 84 -187 135 -269 90z m5457 -1366 c-14 -48 -64 -136 -119 -213 -121 -169 -360 -418 -412 -431 -34 -9 -73 11 -73 36 0 80 174 303 348 447 93 78 240 182 255 183 5 0 5 -10 1 -22z m-5695 -808 c23 -12 51 -80 51 -124 0 -57 -125 -409 -184 -520 -178 -333 -386 -633 -469 -678 -32 -17 -39 8 -33 127 7 178 84 421 215 685 115 231 277 456 359 499 45 24 39 23 61 11z m2606 -802 c42 -143 -3 -316 -114 -441 -80 -88 -220 -177 -256 -163 -14 5 -16 14 -11 48 10 60 60 176 120 273 65 109 226 335 237 335 4 0 15 -23 24 -52z";
    const PATH_DOT_1 =
        "M9375 7544 c-47 -24 -84 -64 -120 -129 -34 -60 -78 -187 -90 -257 -17 -102 66 -199 151 -177 38 11 65 53 194 305 91 177 93 182 80 214 -9 21 -25 37 -46 46 -44 19 -132 18 -169 -2z";
    const PATH_DOT_2 =
        "M8095 7461 c-96 -56 -193 -186 -244 -328 -39 -105 -41 -175 -8 -224 47 -71 127 -99 173 -61 12 9 53 82 92 162 39 80 95 180 124 223 29 44 59 90 66 104 21 37 7 86 -34 122 -47 41 -100 42 -169 2z";

    // Dummy motion value fallback so hooks never get 'undefined'
    const fallbackMotionValue = useMotionValue(0);
    const actualProgress = scrollProgress || fallbackMotionValue;

    // ----------------------------------------------------
    // AUTO-ANIMATE (If scrollProgress is undefined - Loading/Hero)
    // ----------------------------------------------------
    const timeBasedVariants: any = {
        hidden: { pathLength: 0, fillOpacity: 0, strokeOpacity: 0 },
        visible: (custom: number) => {
            const isMain = custom === 0;
            const duration = isMain ? 2.0 : 0.2;
            const delay = isMain ? 0.2 : custom === 1 ? 2.2 : 2.4;
            return {
                pathLength: 1,
                fillOpacity: 1,
                strokeOpacity: 1,
                transition: {
                    pathLength: { duration, ease: "easeInOut", delay },
                    strokeOpacity: { duration: 0.1, delay },
                    fillOpacity: { duration: 0.5, ease: "easeIn", delay: delay + duration - 0.2 },
                },
            };
        },
    };

    // ----------------------------------------------------
    // SCROLL-SCRUBBING (If scrollProgress exists - Footer Section)
    // ----------------------------------------------------
    // Maps 0.1 -> 0.7 of scroll progress to drawing the main signature
    const drawMain = useTransform(actualProgress, [0.1, 0.7], [0, 1]);
    // Maps 0.7 -> 0.8 of scroll to dot 1
    const drawDot1 = useTransform(actualProgress, [0.7, 0.8], [0, 1]);
    // Maps 0.8 -> 0.9 of scroll to dot 2
    const drawDot2 = useTransform(actualProgress, [0.8, 0.9], [0, 1]);

    // Fill opacity fades in exactly at the end (0.9 to 1.0)
    const fillOpacityVal = useTransform(actualProgress, [0.9, 1], [0, 1]);

    if (prefersReducedMotion) {
        return (
            <svg
                viewBox="0 0 1536 1024"
                className="w-full h-full drop-shadow-[0_0_15px_rgba(223,255,0,0.15)]"
                preserveAspectRatio="xMidYMid meet"
            >
                <g transform="translate(0, 1024) scale(0.1, -0.1)" fill="var(--racing-red, #DFFF00)" stroke="none">
                    <path d={PATH_MAIN} />
                    <path d={PATH_DOT_1} />
                    <path d={PATH_DOT_2} />
                </g>
            </svg>
        );
    }

    // --- RENDER SCROLL SCRUBBING VERSION ---
    if (scrollProgress) {
        return (
            <motion.svg
                viewBox="0 0 1536 1024"
                className="w-full h-full drop-shadow-[0_0_15px_rgba(223,255,0,0.15)] pointer-events-none"
                preserveAspectRatio="xMidYMid meet"
                style={{ opacity: useTransform(actualProgress, [0, 0.1], [0, 1]) }}
            >
                <g transform="translate(0, 1024) scale(0.1, -0.1)" fill="var(--racing-red, #DFFF00)" stroke="var(--racing-red, #DFFF00)">
                    <motion.path
                        d={PATH_MAIN}
                        style={{ pathLength: drawMain, fillOpacity: fillOpacityVal }}
                        strokeWidth="15"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <motion.path
                        d={PATH_DOT_1}
                        style={{ pathLength: drawDot1, fillOpacity: fillOpacityVal }}
                        strokeWidth="15"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    <motion.path
                        d={PATH_DOT_2}
                        style={{ pathLength: drawDot2, fillOpacity: fillOpacityVal }}
                        strokeWidth="15"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </g>
            </motion.svg>
        );
    }

    // --- RENDER AUTO-ANIMATE VERSION ---
    return (
        <svg
            viewBox="0 0 1536 1024"
            className="w-full h-full drop-shadow-[0_0_15px_rgba(223,255,0,0.15)] pointer-events-none"
            preserveAspectRatio="xMidYMid meet"
        >
            <g transform="translate(0, 1024) scale(0.1, -0.1)" fill="var(--racing-red, #DFFF00)" stroke="var(--racing-red, #DFFF00)">
                <motion.path
                    d={PATH_MAIN}
                    variants={timeBasedVariants}
                    initial="hidden"
                    animate="visible"
                    custom={0}
                    strokeWidth="15"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <motion.path
                    d={PATH_DOT_1}
                    variants={timeBasedVariants}
                    initial="hidden"
                    animate="visible"
                    custom={1}
                    strokeWidth="15"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <motion.path
                    d={PATH_DOT_2}
                    variants={timeBasedVariants}
                    initial="hidden"
                    animate="visible"
                    custom={2}
                    strokeWidth="15"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </g>
        </svg>
    );
}
