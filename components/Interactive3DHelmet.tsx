'use client';

import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment, ContactShadows, PresentationControls } from '@react-three/drei';
import * as THREE from 'three';

// 3D Helmet Model Component
function HelmetModel({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const meshRef = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  
  // Create procedural helmet geometry
  const helmetGeometry = new THREE.SphereGeometry(1.5, 64, 64);
  const visorGeometry = new THREE.CylinderGeometry(1.2, 1.4, 0.8, 32, 1, false, 0, Math.PI);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    
    // Smooth rotation based on mouse
    const targetRotationX = mousePosition.y * 0.5;
    const targetRotationY = mousePosition.x * 0.5;
    
    meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, targetRotationX, 0.1);
    meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, targetRotationY + state.clock.elapsedTime * 0.1, 0.1);
    
    // Floating animation
    meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
  });

  return (
    <group ref={meshRef} scale={viewport.width > 6 ? 1.2 : 0.8}>
      {/* Main Helmet Shell */}
      <mesh geometry={helmetGeometry} castShadow receiveShadow>
        <meshStandardMaterial 
          color="#111" 
          roughness={0.3} 
          metalness={0.8}
          envMapIntensity={1}
        />
      </mesh>
      
      {/* Helmet Stripe - McLaren Orange/Red */}
      <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0.5, 1.48]}>
        <torusGeometry args={[1.3, 0.05, 16, 100]} />
        <meshStandardMaterial color="#DFFF00" emissive="#DFFF00" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Visor */}
      <mesh 
        geometry={visorGeometry} 
        rotation={[Math.PI / 2, 0, 0]} 
        position={[0, 0.2, 0.5]}
        castShadow
      >
        <meshStandardMaterial 
          color="#000" 
          roughness={0.1} 
          metalness={0.9}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* Side Intake Vents */}
      <mesh position={[-1.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#222" roughness={0.5} metalness={0.7} />
      </mesh>
      <mesh position={[1.4, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
        <meshStandardMaterial color="#222" roughness={0.5} metalness={0.7} />
      </mesh>
      
      {/* Top Air Intake */}
      <mesh position={[0, 1.5, -0.3]}>
        <boxGeometry args={[0.8, 0.3, 0.6]} />
        <meshStandardMaterial color="#DFFF00" roughness={0.4} metalness={0.6} />
      </mesh>
      
      {/* Chin Guard */}
      <mesh position={[0, -0.8, 0.8]}>
        <sphereGeometry args={[0.9, 32, 32, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.4} metalness={0.7} />
      </mesh>
      
      {/* Sponsor Logos (Decals) */}
      <mesh position={[0, 0.3, 1.45]} rotation={[0, 0, 0]}>
        <planeGeometry args={[0.4, 0.15]} />
        <meshStandardMaterial 
          color="#DFFF00" 
          emissive="#DFFF00" 
          emissiveIntensity={0.3}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
}

// Main 3D Scene Component
function Scene({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={1}
        castShadow
      />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#DFFF00" />
      <pointLight position={[10, 10, -5]} intensity={0.3} color="#fff" />
      
      <PresentationControls
        global
        rotation={[0, 0, 0]}
        polar={[-0.4, 0.4]}
        azimuth={[-0.5, 0.5]}
        snap
      >
        <HelmetModel mousePosition={mousePosition} />
      </PresentationControls>
      
      <ContactShadows 
        position={[0, -2, 0]} 
        opacity={0.4} 
        scale={10} 
        blur={2.5} 
        far={4} 
      />
      
      <Environment preset="city" />
    </>
  );
}

// Export Main Component
export default function Interactive3DHelmet() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePosition({ x, y });
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, []);

  return (
    <div ref={containerRef} className="w-full h-[600px] md:h-[800px] cursor-move">
      <Canvas
        shadows
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <Scene mousePosition={mousePosition} />
      </Canvas>
      
      {/* Overlay Instructions */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 pointer-events-none">
        <p className="font-tech text-xs uppercase tracking-wider text-white/40">
          Move cursor to rotate • Drag to explore
        </p>
      </div>
    </div>
  );
}
