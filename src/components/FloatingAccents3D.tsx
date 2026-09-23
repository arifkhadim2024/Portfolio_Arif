import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Octahedron, Torus, Icosahedron, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShapes: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      setMousePos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mousePos.x * 0.4 + state.clock.elapsedTime * 0.1,
        delta * 2
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mousePos.y * 0.3,
        delta * 2
      );
    }
  });

  return (
    <group ref={groupRef}>
      {/* Top Right Violet Floating Octahedron */}
      <Float speed={2.5} rotationIntensity={0.8} floatIntensity={1.2}>
        <mesh position={[2.2, 1.4, 0]} scale={0.45}>
          <Octahedron args={[1, 0]} />
          <meshStandardMaterial
            color="#7C3AED"
            emissive="#7C3AED"
            emissiveIntensity={0.7}
            roughness={0.1}
            metalness={0.9}
            wireframe
          />
        </mesh>
      </Float>

      {/* Center Cyan Iridescent Torus */}
      <Float speed={3} rotationIntensity={0.6} floatIntensity={1}>
        <mesh position={[-2.4, -0.8, 0.2]} scale={0.55}>
          <Torus args={[1, 0.05, 16, 64]} />
          <meshStandardMaterial
            color="#22D3EE"
            emissive="#06B6D4"
            emissiveIntensity={0.6}
            roughness={0.1}
            metalness={0.95}
          />
        </mesh>
      </Float>

      {/* Bottom Right Magenta Crystal Icosahedron */}
      <Float speed={3.5} rotationIntensity={1} floatIntensity={1.5}>
        <mesh position={[2.0, -1.5, 0.4]} scale={0.35}>
          <Icosahedron args={[1, 0]} />
          <MeshDistortMaterial
            color="#F472B6"
            emissive="#EC4899"
            emissiveIntensity={0.6}
            distort={0.3}
            speed={2}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>

      {/* Top Left Lime Accent Node */}
      <Float speed={4} rotationIntensity={1.2} floatIntensity={1.8}>
        <mesh position={[-1.8, 1.6, -0.2]} scale={0.25}>
          <Octahedron args={[1, 0]} />
          <meshStandardMaterial
            color="#A3E635"
            emissive="#A3E635"
            emissiveIntensity={0.8}
            roughness={0.2}
            metalness={0.8}
            wireframe
          />
        </mesh>
      </Float>
    </group>
  );
};

interface FloatingAccents3DProps {
  className?: string;
}

const checkWebGLSupport = () => {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(canvas.getContext('webgl') || canvas.getContext('experimental-webgl'));
  } catch {
    return false;
  }
};

export const FloatingAccents3D: React.FC<FloatingAccents3DProps> = ({ className = '' }) => {
  const [isSupported] = useState<boolean>(checkWebGLSupport);

  if (!isSupported) return null;

  return (
    <div className={`w-full h-full pointer-events-none relative ${className}`} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)}
        gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.2} />
          <directionalLight position={[5, 5, 5]} intensity={2.5} color="#FFFFFF" />
          <pointLight position={[-2, 2, 2]} intensity={2} color="#7C3AED" />
          <pointLight position={[2, -2, 2]} intensity={2} color="#22D3EE" />
          <pointLight position={[0, 0, 3]} intensity={1.5} color="#F472B6" />
          <FloatingShapes />
        </Suspense>
      </Canvas>
    </div>
  );
};
