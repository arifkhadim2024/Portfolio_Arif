import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    camera.position.set(0, 0, 24);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 2. Realistic Studio Lighting Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.45);
    scene.add(ambientLight);

    // Key Light (Warm Champagne Studio Light)
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 2.2);
    keyLight.position.set(12, 18, 14);
    scene.add(keyLight);

    // Fill Light (Cool Architectural Soft Fill)
    const fillLight = new THREE.DirectionalLight(0xe0e7ff, 0.8);
    fillLight.position.set(-14, -10, 8);
    scene.add(fillLight);

    // Subtle Rim Highlight
    const rimLight = new THREE.PointLight(0xd4d4d8, 1.5, 40);
    rimLight.position.set(-8, 12, -10);
    scene.add(rimLight);

    // 3. Architectural Floating 3D Geometries & Technical Forms
    const objectsGroup = new THREE.Group();
    scene.add(objectsGroup);

    // A. Brushed Dark Metal Torus
    const torusGeo = new THREE.TorusGeometry(3.6, 0.08, 24, 100);
    const metalMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      metalness: 0.95,
      roughness: 0.15,
    });
    const torusMesh = new THREE.Mesh(torusGeo, metalMat);
    torusMesh.position.set(6, 2, -4);
    torusMesh.rotation.x = Math.PI / 3;
    torusMesh.rotation.y = Math.PI / 6;
    objectsGroup.add(torusMesh);

    // B. Smoked Translucent Icosahedron
    const icoGeo = new THREE.IcosahedronGeometry(2.2, 0);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: 0x333333,
      transparent: true,
      opacity: 0.45,
      roughness: 0.1,
      metalness: 0.1,
      transmission: 0.6,
      ior: 1.45,
    });
    const icoMesh = new THREE.Mesh(icoGeo, glassMat);
    icoMesh.position.set(-7, -3, -2);
    objectsGroup.add(icoMesh);

    // Thin wireframe cage around icosahedron
    const icoWireGeo = new THREE.WireframeGeometry(icoGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: 0x888888,
      transparent: true,
      opacity: 0.35,
    });
    const icoWireMesh = new THREE.LineSegments(icoWireGeo, wireMat);
    icoMesh.add(icoWireMesh);

    // C. Minimalist Matte Ceramic Prism
    const octaGeo = new THREE.OctahedronGeometry(1.6, 0);
    const ceramicMat = new THREE.MeshStandardMaterial({
      color: 0xe5e5e5,
      roughness: 0.75,
      metalness: 0.05,
    });
    const octaMesh = new THREE.Mesh(octaGeo, ceramicMat);
    octaMesh.position.set(8, -5, -6);
    octaMesh.rotation.z = Math.PI / 4;
    objectsGroup.add(octaMesh);

    // D. Architectural Golden Technical Orbit Ring
    const goldRingGeo = new THREE.TorusGeometry(5.2, 0.03, 16, 120);
    const goldMat = new THREE.MeshStandardMaterial({
      color: 0xcca352,
      metalness: 0.9,
      roughness: 0.25,
      transparent: true,
      opacity: 0.65,
    });
    const goldRingMesh = new THREE.Mesh(goldRingGeo, goldMat);
    goldRingMesh.position.set(-4, 4, -8);
    goldRingMesh.rotation.x = -Math.PI / 4;
    objectsGroup.add(goldRingMesh);

    // E. Floating Technical Data Particles
    const particleCount = prefersReducedMotion ? 25 : 55;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 36;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 26;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 4;
    }

    const particleGeo = new THREE.BufferGeometry();
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particlePointsMat = new THREE.PointsMaterial({
      color: 0x777777,
      size: 0.15,
      transparent: true,
      opacity: 0.45,
    });
    const particleMesh = new THREE.Points(particleGeo, particlePointsMat);
    objectsGroup.add(particleMesh);

    // 4. Mouse Tracking & Smooth Cinematic Parallax
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('resize', handleResize);

    // 5. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth mouse interpolation
      currentMouseX += (targetMouseX - currentMouseX) * 0.04;
      currentMouseY += (targetMouseY - currentMouseY) * 0.04;

      if (!prefersReducedMotion) {
        // Camera parallax
        camera.position.x = currentMouseX * 1.8;
        camera.position.y = -currentMouseY * 1.8;
        camera.lookAt(0, 0, 0);

        // Object micro-rotations
        torusMesh.rotation.x = Math.PI / 3 + elapsed * 0.15 + currentMouseY * 0.4;
        torusMesh.rotation.y = Math.PI / 6 + elapsed * 0.18 + currentMouseX * 0.4;

        icoMesh.rotation.x = elapsed * 0.2 - currentMouseY * 0.3;
        icoMesh.rotation.y = elapsed * 0.25 + currentMouseX * 0.3;

        octaMesh.rotation.y = elapsed * 0.18;
        octaMesh.rotation.z = Math.PI / 4 + elapsed * 0.12;

        goldRingMesh.rotation.z = -elapsed * 0.1;
        goldRingMesh.rotation.x = -Math.PI / 4 + currentMouseY * 0.2;

        // Subtle light movement responding to cursor
        keyLight.position.x = 12 + currentMouseX * 8;
        keyLight.position.y = 18 - currentMouseY * 8;
      }

      renderer.render(scene, camera);
    };

    animate();

    // 6. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      torusGeo.dispose();
      metalMat.dispose();
      icoGeo.dispose();
      glassMat.dispose();
      icoWireGeo.dispose();
      wireMat.dispose();
      octaGeo.dispose();
      ceramicMat.dispose();
      goldRingGeo.dispose();
      goldMat.dispose();
      particleGeo.dispose();
      particlePointsMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none opacity-85"
      aria-hidden="true"
    />
  );
};
