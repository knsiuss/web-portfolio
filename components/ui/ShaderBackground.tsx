'use client';

import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { shaderMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { extend } from '@react-three/fiber';
import { useTheme } from 'next-themes';

// 1. Create the Custom Shader Material
const TopographicMaterial = shaderMaterial(
  {
    u_time: 0,
    u_resolution: new THREE.Vector2(),
    u_colorBg: new THREE.Color('#0a110a'),
    u_colorLine: new THREE.Color('#dfff00')
  },
  // Vertex Shader
  `
    varying vec2 vUv;
    void main() {
      vUv = uv;
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
      vec2 st = vUv;
      st.x *= u_resolution.x / u_resolution.y;
      vec2 pos = st * 0.8;
      float t = u_time * 0.02;

      vec2 warp = vec2(
        snoise(pos * 0.5 + vec2(t * 0.3, -t * 0.2)),
        snoise(pos * 0.5 + vec2(-t * 0.2, t * 0.3))
      );

      float n = snoise(pos * 0.6 + warp * 0.8 - t * 0.1);
      float lines = fract(n * 2.0);
      float thickness = 0.02;
      float edge = smoothstep(0.5 - thickness, 0.5, lines) - smoothstep(0.5, 0.5 + thickness, lines);
      vec3 finalColor = mix(u_colorBg, u_colorLine, edge * 0.3);

      gl_FragColor = vec4(finalColor, 1.0);
    }
  `
);

extend({ TopographicMaterial });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      topographicMaterial: any;
    }
  }
}

// Receives isDark so it can update the WebGL uniforms when theme changes
function ShaderPlane({ isDark }: { isDark: boolean }) {
  const materialRef = useRef<any>(null);

  const resolution = useMemo(() => new THREE.Vector2(
    typeof window !== 'undefined' ? window.innerWidth : 1,
    typeof window !== 'undefined' ? window.innerHeight : 1
  ), []);

  // Switch shader colors when theme changes
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.u_colorBg = new THREE.Color(isDark ? '#0a110a' : '#e8f0e8');
      materialRef.current.u_colorLine = new THREE.Color(isDark ? '#dfff00' : '#5a8a00');
    }
  }, [isDark]);

  useFrame((state) => {
    if (materialRef.current) {
      materialRef.current.u_time = state.clock.elapsedTime * 0.5;
      if (typeof window !== 'undefined') {
        materialRef.current.u_resolution.set(window.innerWidth, window.innerHeight);
      }
    }
  });

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      {/* @ts-ignore */}
      <topographicMaterial ref={materialRef} u_resolution={resolution} />
    </mesh>
  );
}

export default function ShaderBackground() {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme !== 'light';

  return (
    <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 1] }}
        gl={{ antialias: false, alpha: false, powerPreference: "default" }}
        dpr={1}
        resize={{ scroll: false }}
      >
        <ShaderPlane isDark={isDark} />
      </Canvas>
    </div>
  );
}
