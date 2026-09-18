import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface ContactSphere3DProps {
  className?: string;
}

export const ContactSphere3D: React.FC<ContactSphere3DProps> = ({ className = '' }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 20);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 2. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x06b6d4, 4, 30);
    pointLight.position.set(5, 5, 10);
    scene.add(pointLight);

    // 3. Central Pulsing Beacon Sphere
    const beaconGroup = new THREE.Group();
    scene.add(beaconGroup);

    const sphereGeo = new THREE.SphereGeometry(2.5, 32, 32);
    const sphereMat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      emissive: 0x06b6d4,
      emissiveIntensity: 0.7,
      roughness: 0.15,
      metalness: 0.85,
    });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    beaconGroup.add(sphere);

    // Outer wireframe shell
    const shellGeo = new THREE.IcosahedronGeometry(3.6, 1);
    const shellMat = new THREE.MeshBasicMaterial({
      color: 0x8b5cf6,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const shell = new THREE.Mesh(shellGeo, shellMat);
    beaconGroup.add(shell);

    // 4. Inward Converging Particle Vortex
    const particleCount = 120;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleInitialRadii = new Float32Array(particleCount);
    const particleSpeeds = new Float32Array(particleCount);
    const particleAngles = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particleInitialRadii[i] = 4 + Math.random() * 8;
      particleSpeeds[i] = 0.02 + Math.random() * 0.03;
      particleAngles[i] = Math.random() * Math.PI * 2;

      const x = Math.cos(particleAngles[i]) * particleInitialRadii[i];
      const y = (Math.random() - 0.5) * 6;
      const z = Math.sin(particleAngles[i]) * particleInitialRadii[i];

      particlePositions[i * 3] = x;
      particlePositions[i * 3 + 1] = y;
      particlePositions[i * 3 + 2] = z;
    }

    const vortexGeo = new THREE.BufferGeometry();
    vortexGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const vortexMat = new THREE.PointsMaterial({
      color: 0x06b6d4,
      size: 0.18,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });
    const vortex = new THREE.Points(vortexGeo, vortexMat);
    beaconGroup.add(vortex);

    // Mouse Tracking
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      targetY = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
    };

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // 5. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        beaconGroup.rotation.y += (targetX * 0.5 - beaconGroup.rotation.y) * 0.05 + 0.005;
        beaconGroup.rotation.x += (targetY * 0.5 - beaconGroup.rotation.x) * 0.05;

        shell.rotation.y = -elapsed * 0.3;
        shell.rotation.z = elapsed * 0.2;

        // Pulse Sphere
        const scale = 1 + Math.sin(elapsed * 2.5) * 0.08;
        sphere.scale.set(scale, scale, scale);

        // Update vortex particle positions (converge toward center and re-emerge)
        const posArray = vortexGeo.attributes.position.array as Float32Array;
        for (let i = 0; i < particleCount; i++) {
          particleAngles[i] += 0.02;
          particleInitialRadii[i] -= particleSpeeds[i];

          if (particleInitialRadii[i] < 2.6) {
            particleInitialRadii[i] = 10 + Math.random() * 3;
          }

          posArray[i * 3] = Math.cos(particleAngles[i]) * particleInitialRadii[i];
          posArray[i * 3 + 1] = Math.sin(elapsed * 1.2 + i) * 2.5;
          posArray[i * 3 + 2] = Math.sin(particleAngles[i]) * particleInitialRadii[i];
        }
        vortexGeo.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 6. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      sphereGeo.dispose();
      sphereMat.dispose();
      shellGeo.dispose();
      shellMat.dispose();
      vortexGeo.dispose();
      vortexMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full pointer-events-none select-none ${className}`}
    />
  );
};
