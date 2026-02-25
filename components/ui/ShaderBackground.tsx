'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';

// 1. Create the Custom Shader Material
const TopographicMaterial = shaderMaterial(
  {
    u_time: 0,
    u_resolution: new THREE.Vector2(),
    u_colorBg: new THREE.Color('#0a110a'), // Dark olive/racing green
    u_colorLine: new THREE.Color('#dfff00') // Neon acid green
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      // Bypass camera projection matrix so a 2x2 plane perfectly covers the entire screen
      gl_Position = vec4(position.xy, 0.0, 1.0);
    }
  `,
  // Fragment Shader
  `
    uniform float u_time;
    uniform vec2 u_resolution;
    uniform vec3 u_colorBg;
    uniform vec3 u_colorLine;
    varying vec2 vUv;

    // Ashima's 2D Simplex Noise
    vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }
    float snoise(vec2 v){
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
              -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v -   i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
        dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      // Fix aspect ratio
      vec2 st = vUv;
      st.x *= u_resolution.x / u_resolution.y;
      
      // Zoom level - ULTRA LOW FREQUENCY (Macro scale)
      vec2 pos = st * 0.8; 
      // EXTREMELY SLOW MOVEMENT
      float t = u_time * 0.02; 

      // Domain warping for organic, flowing blobs instead of rigid noise
      vec2 warp = vec2(
        snoise(pos * 0.5 + vec2(t * 0.3, -t * 0.2)),
        snoise(pos * 0.5 + vec2(-t * 0.2, t * 0.3))
      );

      // Generate base noise field
      float n = snoise(pos * 0.6 + warp * 0.8 - t * 0.1);

      // Map noise to repeating concentric contour lines using fract
      // MASSIVE SPACING: extremely low multiplier (e.g. 1.5 to 2.0)
      float lines = fract(n * 2.0); 

      // SMOOTH, SWEEPING CURVES / SUBTLE APPEARANCE
      float thickness = 0.02; // Thin, anti-aliased lines
      float edge = smoothstep(0.5 - thickness, 0.5, lines) - smoothstep(0.5, 0.5 + thickness, lines);

      // Blend softly with the background. Raised to 30% so it's actually visible on all monitors.
      vec3 finalColor = mix(u_colorBg, u_colorLine, edge * 0.3);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

// 2. Extend R3F so we can use <topographicMaterial />
extend({ TopographicMaterial });

// Add TypeScript declaration for the custom material
declare global {
  namespace JSX {
    interface IntrinsicElements {
      topographicMaterial: any;
    }
  }
}

// 3. Component that updates the uniform and renders the plane
function ShaderPlane() {
  const materialRef = useRef<any>(null);

  // Track resolution so the shader maintains correct aspect ratio
  const resolution = useMemo(() => new THREE.Vector2(
    typeof window !== 'undefined' ? window.innerWidth : 1,
    typeof window !== 'undefined' ? window.innerHeight : 1
  ), []);

  useFrame((state) => {
    if (materialRef.current) {
      // Slow down the time multiplier slightly for more regal, less frantic movement
      materialRef.current.u_time = state.clock.elapsedTime * 0.5;

      // Update resolution in case window was resized
      if (typeof window !== 'undefined') {
        materialRef.current.u_resolution.set(window.innerWidth, window.innerHeight);
      }
    }
  });

  return (
    <mesh>
      {/* Plane that covers the entire camera view */}
      <planeGeometry args={[2, 2]} />
      {/* @ts-ignore - React Three Fiber custom element typing */}
      <topographicMaterial ref={materialRef} u_resolution={resolution} />
    </mesh>
  );
}

// 4. Main Exported Canvas Component
export default function ShaderBackground() {
  return (
    <div className="absolute inset-0 z-0 w-full h-full pointer-events-none bg-[#0a110a]">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: false, alpha: false, powerPreference: "default" }} // Relaxed power preference
        dpr={1} // CRITICAL FOR PERFORMANCE: Clamp pixel ratio to 1.
        resize={{ scroll: false }} // Prevent unnecessary resizes on scroll
      >
        <ShaderPlane />
      </Canvas>
    </div>
  );
}
