import React, { useRef, useState, useEffect, Suspense, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere, Torus, Octahedron, Icosahedron, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Floating Neural Particles Network with deterministic distribution
const ParticleConstellation = () => {
  const count = 120;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Deterministic pseudo-random distribution
      const s1 = Math.sin(i * 32.123);
      const s2 = Math.cos(i * 45.456);
      const s3 = Math.sin(i * 78.789);
      pos[i * 3] = s1 * 4.2;
      pos[i * 3 + 1] = s2 * 4.2;
      pos[i * 3 + 2] = s3 * 3.0;
    }
    return pos;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((_, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.05;
      pointsRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#22D3EE"
        size={0.055}
        sizeAttenuation
        depthWrite={false}
        opacity={0.75}
      />
    </Points>
  );
};

// Interactive Hero 3D Artefact
const HeroGeometry: React.FC<{ isNight: boolean }> = ({ isNight }) => {
  const groupRef = useRef<THREE.Group>(null);
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const octaRef = useRef<THREE.Mesh>(null);
  const icoRef = useRef<THREE.Mesh>(null);
  const limeSatelliteRef = useRef<THREE.Mesh>(null);

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
      // Smooth lerp towards cursor coordinates
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        mousePos.x * 0.9 + state.clock.elapsedTime * 0.12,
        delta * 3
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -mousePos.y * 0.6,
        delta * 3
      );
    }

    if (coreRef.current) {
      coreRef.current.rotation.z += delta * 0.15;
    }

    if (ring1Ref.current) {
      ring1Ref.current.rotation.x += delta * 0.35;
      ring1Ref.current.rotation.y -= delta * 0.25;
    }

    if (ring2Ref.current) {
      ring2Ref.current.rotation.y += delta * 0.3;
      ring2Ref.current.rotation.z += delta * 0.2;
    }

    if (octaRef.current) {
      octaRef.current.rotation.y += delta * 0.5;
    }

    if (icoRef.current) {
      icoRef.current.rotation.x -= delta * 0.4;
    }

    if (limeSatelliteRef.current) {
      limeSatelliteRef.current.rotation.z += delta * 0.6;
    }
  });

  return (
    <group ref={groupRef} position={[0, 0, 0]}>
      {/* Particle background cloud */}
      <ParticleConstellation />

      {/* Outer Glowing Electric Violet Torus Ring */}
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.8}>
        <mesh ref={ring1Ref} scale={1.85}>
          <Torus args={[1.25, 0.035, 24, 120]} />
          <meshStandardMaterial
            color={isNight ? '#7C3AED' : '#8B5CF6'}
            roughness={0.1}
            metalness={0.9}
            emissive="#7C3AED"
            emissiveIntensity={0.8}
          />
        </mesh>
      </Float>

      {/* Secondary Cyan Accent Ring */}
      <Float speed={2.5} rotationIntensity={0.7} floatIntensity={1}>
        <mesh ref={ring2Ref} scale={1.5}>
          <Torus args={[1.1, 0.028, 20, 100]} />
          <meshStandardMaterial
            color="#22D3EE"
            roughness={0.1}
            metalness={0.95}
            emissive="#06B6D4"
            emissiveIntensity={0.7}
          />
        </mesh>
      </Float>

      {/* Central Organic Distorted Core Sphere with Deep Surface Reflections */}
      <Float speed={3} rotationIntensity={0.8} floatIntensity={1.2}>
        <Sphere ref={coreRef} args={[1, 64, 64]} scale={1.15}>
          <MeshDistortMaterial
            color={isNight ? '#1E1D24' : '#2A2933'}
            attach="material"
            distort={0.45}
            speed={2.2}
            roughness={0.15}
            metalness={0.95}
            clearcoat={1}
            clearcoatRoughness={0.1}
          />
        </Sphere>
      </Float>

      {/* Inner Glowing Crystal Octahedron (Hot Pink / Magenta) */}
      <Float speed={4} rotationIntensity={1} floatIntensity={1.5}>
        <mesh ref={octaRef} scale={0.58}>
          <Octahedron args={[1, 0]} />
          <meshStandardMaterial
            color="#F472B6"
            emissive="#EC4899"
            emissiveIntensity={0.9}
            roughness={0.1}
            metalness={0.9}
            wireframe
          />
        </mesh>
      </Float>

      {/* Magenta Satellite Floating Node */}
      <Float speed={3} rotationIntensity={1.2} floatIntensity={2}>
        <mesh ref={icoRef} position={[2, 1.2, 0.5]} scale={0.25}>
          <Icosahedron args={[1, 0]} />
          <meshStandardMaterial
            color="#F472B6"
            emissive="#F472B6"
            emissiveIntensity={0.85}
            roughness={0.2}
            metalness={0.8}
          />
        </mesh>
      </Float>

      {/* Lime Accent Floating Node */}
      <Float speed={3.5} rotationIntensity={1.4} floatIntensity={1.8}>
        <mesh ref={limeSatelliteRef} position={[-2.1, -1.1, 0.6]} scale={0.2}>
          <Octahedron args={[1, 0]} />
          <meshStandardMaterial
            color="#A3E635"
            emissive="#A3E635"
            emissiveIntensity={0.75}
            roughness={0.2}
            metalness={0.8}
            wireframe
          />
        </mesh>
      </Float>
    </group>
  );
};

interface Canvas3DProps {
  isNight?: boolean;
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

export const Canvas3D: React.FC<Canvas3DProps> = ({ isNight = false }) => {
  const [isSupported] = useState(checkWebGLSupport);

  if (!isSupported) {
    return (
      <div className="w-full h-full flex items-center justify-center pointer-events-none">
        <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-[#7C3AED]/20 via-[#F472B6]/20 to-[#22D3EE]/20 border border-[#7C3AED]/30 animate-pulse-glow blur-sm" />
      </div>
    );
  }

  return (
    <div className="w-full h-full relative pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5.2], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={1.5} />
          <directionalLight position={[10, 10, 5]} intensity={3} color="#FFFFFF" />
          <directionalLight position={[-10, -10, -5]} intensity={2.2} color="#7C3AED" />
          <pointLight position={[0, 0, 3]} intensity={2.8} color="#22D3EE" />
          <pointLight position={[-3, 2, -2]} intensity={2.0} color="#F472B6" />
          <pointLight position={[3, -2, 2]} intensity={1.5} color="#A3E635" />
          <HeroGeometry isNight={isNight} />
        </Suspense>
      </Canvas>
    </div>
  );
};
