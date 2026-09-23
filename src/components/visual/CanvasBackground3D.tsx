import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const CanvasBackground3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 50;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 2. Cosmic Paper Dust & Subtle Grid Nodes (Monochrome Ink)
    const particleCount = prefersReducedMotion ? 30 : 80;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const inkCol = new THREE.Color('#111111');
    const grayCol = new THREE.Color('#777777');
    const lightGrayCol = new THREE.Color('#AAAAAA');
    const colorPalette = [inkCol, grayCol, lightGrayCol];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 140;
      positions[i3 + 1] = (Math.random() - 0.5) * 140;
      positions[i3 + 2] = (Math.random() - 0.5) * 80;

      const selectedColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = selectedColor.r;
      colors[i3 + 1] = selectedColor.g;
      colors[i3 + 2] = selectedColor.b;

      scales[i] = Math.random() * 1.5 + 0.5;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Custom Particle Canvas Texture
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(17, 17, 17, 1)');
        gradient.addColorStop(0.5, 'rgba(17, 17, 17, 0.4)');
        gradient.addColorStop(1, 'rgba(17, 17, 17, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createParticleTexture();

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.8,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.25,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 3. Faint Architectural Constellation Lines
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x111111,
      transparent: true,
      opacity: 0.04,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * particleCount * 6);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Mouse Tracking
    let targetMouseX = 0;
    let targetMouseY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      targetMouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // 4. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse interpolation
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      if (!prefersReducedMotion) {
        particles.rotation.y = elapsedTime * 0.008 + mouseX * 0.08;
        particles.rotation.x = -mouseY * 0.08;
        lines.rotation.y = particles.rotation.y;
        lines.rotation.x = particles.rotation.x;
      }

      // Update lines dynamically connecting nearest particles
      if (!prefersReducedMotion) {
        let lineVertexIndex = 0;
        const posArray = particleGeometry.attributes.position.array as Float32Array;

        for (let i = 0; i < particleCount; i++) {
          for (let j = i + 1; j < particleCount; j++) {
            const dx = posArray[i * 3] - posArray[j * 3];
            const dy = posArray[i * 3 + 1] - posArray[j * 3 + 1];
            const dz = posArray[i * 3 + 2] - posArray[j * 3 + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

            if (dist < 16) {
              linePositions[lineVertexIndex++] = posArray[i * 3];
              linePositions[lineVertexIndex++] = posArray[i * 3 + 1];
              linePositions[lineVertexIndex++] = posArray[i * 3 + 2];

              linePositions[lineVertexIndex++] = posArray[j * 3];
              linePositions[lineVertexIndex++] = posArray[j * 3 + 1];
              linePositions[lineVertexIndex++] = posArray[j * 3 + 2];
            }
          }
        }
        lineGeometry.setDrawRange(0, lineVertexIndex / 3);
        lineGeometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 5. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-40 dark:opacity-30"
      aria-hidden="true"
    />
  );
};
