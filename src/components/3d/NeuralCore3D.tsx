import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createNeuralCoreGeometry } from './neuralCoreGeometry';
import { NeuralCoreShader } from './neuralCoreShader';
import { createMagneticParticles } from './neuralCoreParticles';

interface NeuralCore3DProps {
  className?: string;
  isPersistent?: boolean;
}

export const NeuralCore3D: React.FC<NeuralCore3DProps> = ({
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    // 1. Three.js Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 480;
    const height = container.clientHeight || 480;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 16);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.appendChild(renderer.domElement);

    // 2. Restrained Editorial Cosmic Lights (Charcoal + Subtle Warm Metallic + Off-White)
    const ambientLight = new THREE.AmbientLight(0xf2f0ea, 0.4);
    scene.add(ambientLight);

    const warmKeyLight = new THREE.PointLight(0x888888, 3.5, 50);
    warmKeyLight.position.set(10, 12, 12);
    scene.add(warmKeyLight);

    const offWhiteRimLight = new THREE.PointLight(0xf2f0ea, 2.5, 50);
    offWhiteRimLight.position.set(-10, -8, 10);
    scene.add(offWhiteRimLight);

    const charcoalFillLight = new THREE.DirectionalLight(0x222222, 1.0);
    charcoalFillLight.position.set(0, 15, -10);
    scene.add(charcoalFillLight);

    // 3. Central Living Neural Core Group
    const coreGroup = new THREE.Group();
    scene.add(coreGroup);

    // A. Procedural Morphing Geometry (4 states with 100% matched topology)
    const segmentsU = isMobile ? 48 : 80;
    const segmentsV = isMobile ? 36 : 60;
    const { geometry } = createNeuralCoreGeometry(segmentsU, segmentsV);

    // Custom Shader Material
    const coreMaterial = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.clone(NeuralCoreShader.uniforms),
      vertexShader: NeuralCoreShader.vertexShader,
      fragmentShader: NeuralCoreShader.fragmentShader,
      transparent: true,
      side: THREE.DoubleSide,
    });

    const coreMesh = new THREE.Mesh(geometry, coreMaterial);
    coreGroup.add(coreMesh);

    // B. Inner Subtle Glowing Nucleus
    const innerNucleusGeo = new THREE.SphereGeometry(1.6, 24, 24);
    const innerNucleusMat = new THREE.MeshBasicMaterial({
      color: 0x555555,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    });
    const innerNucleus = new THREE.Mesh(innerNucleusGeo, innerNucleusMat);
    coreGroup.add(innerNucleus);

    // C. Orbital Magnetic Energy Rings (Subtle Monochromatic)
    const ring1Geo = new THREE.TorusGeometry(4.6, 0.025, 16, 100);
    const ring1Mat = new THREE.MeshBasicMaterial({
      color: 0x333333,
      transparent: true,
      opacity: 0.35,
    });
    const ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
    ring1.rotation.x = Math.PI / 3;
    coreGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(5.4, 0.02, 16, 100);
    const ring2Mat = new THREE.MeshBasicMaterial({
      color: 0x888888,
      transparent: true,
      opacity: 0.25,
    });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 4;
    ring2.rotation.y = Math.PI / 6;
    coreGroup.add(ring2);

    // D. Magnetic Iron Filings Particle System
    const particleCount = isMobile ? 250 : 650;
    const magneticFilings = createMagneticParticles(particleCount);
    coreGroup.add(magneticFilings.points);

    // 4. True 3D Cursor Raycasting & Ferrofluid Interaction
    const raycaster = new THREE.Raycaster();
    const ndcMouse = new THREE.Vector2(-100, -100);
    const targetCursorPos = new THREE.Vector3(0, 0, 0);
    const smoothCursorPos = new THREE.Vector3(0, 0, 0);
    let targetIntensity = 0.0;
    let smoothIntensity = 0.0;

    const cameraPlane = new THREE.Plane();
    const planeIntersect = new THREE.Vector3();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      ndcMouse.set(x, y);

      // Check if cursor is over container or nearby
      const isInside = x >= -1.2 && x <= 1.2 && y >= -1.2 && y <= 1.2;
      targetIntensity = isInside ? 1.0 : 0.0;

      // Unproject 3D point on camera plane passing through core origin
      raycaster.setFromCamera(ndcMouse, camera);
      const camDir = camera.getWorldDirection(new THREE.Vector3()).negate();
      cameraPlane.setFromNormalAndCoplanarPoint(camDir, coreGroup.position);

      if (raycaster.ray.intersectPlane(cameraPlane, planeIntersect)) {
        // Convert world intersection to local coordinates of coreGroup
        targetCursorPos.copy(planeIntersect);
        coreGroup.worldToLocal(targetCursorPos);
      }
    };

    const handlePointerLeave = () => {
      targetIntensity = 0.0;
    };

    // 5. Radial Click / Tap Ripple Energy Impulse
    const handlePointerDown = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      ndcMouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ndcMouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      raycaster.setFromCamera(ndcMouse, camera);
      const camDir = camera.getWorldDirection(new THREE.Vector3()).negate();
      cameraPlane.setFromNormalAndCoplanarPoint(camDir, coreGroup.position);

      if (raycaster.ray.intersectPlane(cameraPlane, planeIntersect)) {
        const localClick = planeIntersect.clone();
        coreGroup.worldToLocal(localClick);

        coreMaterial.uniforms.uRippleOrigin.value.copy(localClick);
        coreMaterial.uniforms.uRippleTime.value = 0.0;
      }
    };

    // 6. Scroll-Driven 3D Morphing Calculation
    let targetMorphState = 0.0;
    let smoothMorphState = 0.0;

    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollProgress = docHeight > 0 ? scrollY / docHeight : 0;

      // 0.0 -> Hero (Star)
      // 1.0 -> Skills (DNA Helix)
      // 2.0 -> Projects (Circuit Grid)
      // 3.0 -> Experience / Contact (Torus Knot)
      targetMorphState = Math.min(Math.max(scrollProgress * 3.6, 0.0), 3.0);
    };

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    container.addEventListener('mouseleave', handlePointerLeave);
    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('resize', handleResize);

    // Initial scroll sync
    handleScroll();

    // 7. Master Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Update shader time uniforms
      coreMaterial.uniforms.uTime.value = elapsed;
      coreMaterial.uniforms.uRippleTime.value += delta;

      // Smooth cursor unprojected coordinate interpolation
      smoothCursorPos.lerp(targetCursorPos, 0.12);
      smoothIntensity += (targetIntensity - smoothIntensity) * 0.08;

      coreMaterial.uniforms.uCursorPos.value.copy(smoothCursorPos);
      coreMaterial.uniforms.uCursorIntensity.value = smoothIntensity;

      // Smooth scroll morph interpolation
      smoothMorphState += (targetMorphState - smoothMorphState) * 0.06;
      coreMaterial.uniforms.uMorphState.value = smoothMorphState;

      if (!prefersReducedMotion) {
        // Slow ambient core rotation
        coreGroup.rotation.y = elapsed * 0.14;
        coreGroup.rotation.x = Math.sin(elapsed * 0.3) * 0.08;

        // Individual orbital ring counter-rotations
        ring1.rotation.z = elapsed * 0.25;
        ring2.rotation.z = -elapsed * 0.2;

        // Inner nucleus pulse
        const pulse = 1.0 + Math.sin(elapsed * 2.0) * 0.04;
        innerNucleus.scale.set(pulse, pulse, pulse);

        // Update magnetic filings particle system
        magneticFilings.update(elapsed, delta, smoothCursorPos, smoothIntensity);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Lifecycle Disposal
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('scroll', handleScroll);
      container.removeEventListener('mouseleave', handlePointerLeave);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      coreMaterial.dispose();
      innerNucleusGeo.dispose();
      innerNucleusMat.dispose();
      ring1Geo.dispose();
      ring1Mat.dispose();
      ring2Geo.dispose();
      ring2Mat.dispose();
      magneticFilings.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      data-cursor="3d"
      className={`relative w-full h-full cursor-grab active:cursor-grabbing select-none canvas-3d-interactive ${className}`}
      title="Interactive 3D Neural Core • Click for energy shockwave • Move cursor for ferrofluid spikes"
    />
  );
};
