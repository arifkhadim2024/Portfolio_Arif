import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface HeroCore3DProps {
  className?: string;
}

export const HeroCore3D: React.FC<HeroCore3DProps> = ({ className = '' }) => {
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
    camera.position.set(0, 0, 18);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const cyanPointLight = new THREE.PointLight(0x06b6d4, 3, 50);
    cyanPointLight.position.set(10, 10, 10);
    scene.add(cyanPointLight);

    const violetPointLight = new THREE.PointLight(0x8b5cf6, 3, 50);
    violetPointLight.position.set(-10, -10, 10);
    scene.add(violetPointLight);

    const rimLight = new THREE.DirectionalLight(0xffffff, 1.5);
    rimLight.position.set(0, 15, -10);
    scene.add(rimLight);

    // 3. Central Developer Core Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // A. Inner glowing nucleus sphere
    const nucleusGeo = new THREE.SphereGeometry(1.8, 32, 32);
    const nucleusMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x6366f1,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8,
    });
    const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
    coreGroup.add(nucleus);

    // B. Outer Crystalline Icosahedron Lattice
    const icoGeo = new THREE.IcosahedronGeometry(3.2, 0);
    const icoMat = new THREE.MeshPhysicalMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      metalness: 0.9,
      transmission: 0.6,
      ior: 1.5,
      wireframe: false,
    });
    const icosahedron = new THREE.Mesh(icoGeo, icoMat);
    coreGroup.add(icosahedron);

    // Wireframe edges overlay
    const icoWireGeo = new THREE.WireframeGeometry(icoGeo);
    const icoWireMat = new THREE.LineBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.7,
      linewidth: 2,
    });
    const icoWireframe = new THREE.LineSegments(icoWireGeo, icoWireMat);
    coreGroup.add(icoWireframe);

    // C. Orbital Energy Rings (Torus)
    const ring1Geo = new THREE.TorusGeometry(4.8, 0.04, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x818cf8,
      transparent: true,
      opacity: 0.6,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(5.6, 0.03, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      transparent: true,
      opacity: 0.5,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    coreGroup.add(ring2);

    // D. Floating 3D Tech Tokens (Cuboids)
    const tokenCount = 4;
    const tokens: THREE.Mesh[] = [];
    const tokenColors = [0x6366f1, 0x06b6d4, 0x10b981, 0xf59e0b];

    for (let i = 0; i < tokenCount; i++) {
      const tokenGeo = new THREE.BoxGeometry(0.7, 0.7, 0.7);
      const tokenMat = new THREE.MeshStandardMaterial({
        color: tokenColors[i],
        roughness: 0.2,
        metalness: 0.8,
        emissive: tokenColors[i],
        emissiveIntensity: 0.3,
      });
      const tokenMesh = new THREE.Mesh(tokenGeo, tokenMat);
      coreGroup.add(tokenMesh);
      tokens.push(tokenMesh);
    }

    // E. Micro Particle Field
    const particleCount = 80;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 5 + Math.random() * 4;

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particlesMat = new THREE.PointsMaterial({
      color: 0x06b6d4,
      size: 0.12,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
    });
    const particleField = new THREE.Points(particlesGeo, particlesMat);
    coreGroup.add(particleField);

    // 4. Mouse Tracking & Parallax
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isDragging = false;
    let previousMouseX = 0;
    let previousMouseY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;

      targetRotationY = x * 0.8;
      targetRotationX = -y * 0.8;

      cyanPointLight.position.x = 10 + x * 8;
      cyanPointLight.position.y = 10 - y * 8;
      violetPointLight.position.x = -10 - x * 8;
      violetPointLight.position.y = -10 + y * 8;

      if (isDragging) {
        const deltaX = e.clientX - previousMouseX;
        const deltaY = e.clientY - previousMouseY;
        coreGroup.rotation.y += deltaX * 0.01;
        coreGroup.rotation.x += deltaY * 0.01;
        previousMouseX = e.clientX;
        previousMouseY = e.clientY;
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      isDragging = true;
      previousMouseX = e.clientX;
      previousMouseY = e.clientY;
    };

    const handlePointerUp = () => {
      isDragging = false;
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

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('resize', handleResize);

    // 5. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      if (!prefersReducedMotion) {
        if (!isDragging) {
          coreGroup.rotation.y += (targetRotationY - coreGroup.rotation.y) * 0.05 + 0.005;
          coreGroup.rotation.x += (targetRotationX - coreGroup.rotation.x) * 0.05;
        }

        // Rotate individual orbital rings
        ring1.rotation.z = elapsed * 0.4;
        ring2.rotation.z = -elapsed * 0.3;

        // Pulse inner nucleus
        const scale = 1 + Math.sin(elapsed * 2) * 0.06;
        nucleus.scale.set(scale, scale, scale);

        // Orbit tech tokens in 3D
        tokens.forEach((token, index) => {
          const angle = elapsed * 0.6 + (index * (Math.PI * 2)) / tokenCount;
          const radius = 5.2;
          token.position.x = Math.cos(angle) * radius;
          token.position.z = Math.sin(angle) * radius;
          token.position.y = Math.sin(elapsed * 1.5 + index) * 1.5;
          token.rotation.x = elapsed * 1.2;
          token.rotation.y = elapsed * 1.2;
        });

        // Rotate particles
        particleField.rotation.y = elapsed * 0.1;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 6. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      nucleusGeo.dispose();
      nucleusMat.dispose();
      icoGeo.dispose();
      icoMat.dispose();
      icoWireGeo.dispose();
      icoWireMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-cursor="3d"
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none canvas-3d-interactive ${className}`}
    />
  );
};
