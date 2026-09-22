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

    // 2. Cosmic Dust & Micro Starfield (Metallic Gold, Radiant Champagne, Warm Bronze)
    const particleCount = prefersReducedMotion ? 45 : 140;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);

    const goldColor = new THREE.Color('#D4AF37');
    const radiantColor = new THREE.Color('#F5C542');
    const champagneColor = new THREE.Color('#F3E8CB');
    const bronzeColor = new THREE.Color('#94771C');
    const softWarmWhite = new THREE.Color('#FFF8E7');
    const colorPalette = [goldColor, radiantColor, champagneColor, bronzeColor, softWarmWhite];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 130;
      positions[i3 + 1] = (Math.random() - 0.5) * 130;
      positions[i3 + 2] = (Math.random() - 0.5) * 90;

      const selectedColor = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i3] = selectedColor.r;
      colors[i3 + 1] = selectedColor.g;
      colors[i3 + 2] = selectedColor.b;

      scales[i] = Math.random() * 2 + 1;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    particleGeometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

    // Custom Particle Canvas Texture (soft radiant glow dot)
    const createParticleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 248, 231, 1)');
        gradient.addColorStop(0.3, 'rgba(245, 197, 66, 0.8)');
        gradient.addColorStop(0.7, 'rgba(212, 175, 55, 0.2)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const particleTexture = createParticleTexture();

    const particleMaterial = new THREE.PointsMaterial({
      size: 1.4,
      vertexColors: true,
      map: particleTexture,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 3. Faint Cosmic Constellation Lines (Metallic Gold / Champagne)
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    });

    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * particleCount * 6);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Mouse Tracking with smooth spring-like dampening
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
        particles.rotation.y = elapsedTime * 0.02 + mouseX * 0.14;
        particles.rotation.x = -mouseY * 0.14;
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

            if (dist < 18) {
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
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-70 dark:opacity-70 light:opacity-25"
      aria-hidden="true"
    />
  );
};
