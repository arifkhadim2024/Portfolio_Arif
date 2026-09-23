import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { skillsData } from '../../data/skills';
import type { Skill, SkillCategory } from '../../types';

interface SkillEcosystem3DProps {
  selectedCategory: SkillCategory;
}

export const SkillEcosystem3D: React.FC<SkillEcosystem3DProps> = ({
  selectedCategory,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<Skill | null>(null);

  const filteredSkills = selectedCategory === 'all'
    ? skillsData
    : skillsData.filter((s) => s.category === selectedCategory);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 5, 24);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // 2. Lighting (Neutral Studio Lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const coreLight = new THREE.PointLight(0xffffff, 3.0, 35);
    coreLight.position.set(0, 0, 0);
    scene.add(coreLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
    keyLight.position.set(10, 15, 10);
    scene.add(keyLight);

    // 3. Central Core "ARIF KHADIM"
    const centralGroup = new THREE.Group();
    scene.add(centralGroup);

    // Core Sphere in Obsidian Black
    const coreGeo = new THREE.SphereGeometry(2.2, 32, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      emissive: 0x050505,
      emissiveIntensity: 0.3,
      roughness: 0.3,
      metalness: 0.7,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    centralGroup.add(coreMesh);

    // Core Outer Wireframe in Charcoal
    const haloGeo = new THREE.IcosahedronGeometry(2.8, 1);
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x555555,
      wireframe: true,
      transparent: true,
      opacity: 0.3,
    });
    const haloMesh = new THREE.Mesh(haloGeo, haloMat);
    centralGroup.add(haloMesh);

    // Orbital Circles Guides
    const orbitRadii = [6.5, 9.5, 12.5, 15.5];
    const orbitRings: THREE.Line[] = [];

    orbitRadii.forEach((radius, idx) => {
      const ringGeo = new THREE.BufferGeometry();
      const points = [];
      const segments = 64;
      for (let i = 0; i <= segments; i++) {
        const theta = (i / segments) * Math.PI * 2;
        points.push(new THREE.Vector3(Math.cos(theta) * radius, 0, Math.sin(theta) * radius));
      }
      ringGeo.setFromPoints(points);
      const ringMat = new THREE.LineBasicMaterial({
        color: idx % 2 === 0 ? 0x222222 : 0x666666,
        transparent: true,
        opacity: idx % 2 === 0 ? 0.12 : 0.08,
      });
      const ringLine = new THREE.Line(ringGeo, ringMat);
      scene.add(ringLine);
      orbitRings.push(ringLine);
    });

    // 4. Create Skill Mesh Nodes
    const ecosystemGroup = new THREE.Group();
    scene.add(ecosystemGroup);

    // Helper to generate Canvas Textures for tech labels
    const createLabelTexture = (text: string, isFeatured: boolean = false) => {
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 128;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = 'rgba(17, 17, 17, 0.95)';
        ctx.strokeStyle = isFeatured ? 'rgba(255, 255, 255, 0.8)' : 'rgba(255, 255, 255, 0.25)';
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.roundRect(8, 8, 240, 112, 20);
        ctx.fill();
        ctx.stroke();

        ctx.font = 'bold 26px "Space Grotesk", sans-serif';
        ctx.fillStyle = '#F2F1ED';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(text, 128, 64);
      }
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      return texture;
    };

    interface SkillNodeObject {
      skill: Skill;
      group: THREE.Group;
      mesh: THREE.Mesh;
      sprite: THREE.Sprite;
      orbitRadius: number;
      orbitSpeed: number;
      orbitAngle: number;
      orbitInclination: number;
      baseScale: number;
    }

    const skillNodes: SkillNodeObject[] = [];
    const sphereGeo = new THREE.SphereGeometry(0.75, 24, 24);

    filteredSkills.forEach((skill, index) => {
      const nodeGroup = new THREE.Group();

      const orbitIndex = index % orbitRadii.length;
      const orbitRadius = orbitRadii[orbitIndex] + (Math.random() - 0.5) * 1.5;
      const orbitAngle = (index / filteredSkills.length) * Math.PI * 2;
      const orbitSpeed = 0.08 / (orbitIndex + 1);
      const orbitInclination = (Math.random() - 0.5) * 0.4;

      // Node Sphere (Obsidian / Charcoal)
      const sphereMat = new THREE.MeshStandardMaterial({
        color: skill.featured ? 0x111111 : 0x333333,
        emissive: skill.featured ? 0x222222 : 0x111111,
        emissiveIntensity: 0.3,
        roughness: 0.3,
        metalness: 0.7,
      });
      const mesh = new THREE.Mesh(sphereGeo, sphereMat);
      mesh.userData = { skill };
      nodeGroup.add(mesh);

      // Node Label Sprite
      const spriteTexture = createLabelTexture(skill.name, Boolean(skill.featured));
      const spriteMat = new THREE.SpriteMaterial({
        map: spriteTexture,
        transparent: true,
        opacity: 0.95,
      });
      const sprite = new THREE.Sprite(spriteMat);
      sprite.scale.set(3, 1.5, 1);
      sprite.position.y = 1.2;
      nodeGroup.add(sprite);

      ecosystemGroup.add(nodeGroup);

      skillNodes.push({
        skill,
        group: nodeGroup,
        mesh,
        sprite,
        orbitRadius,
        orbitSpeed,
        orbitAngle,
        orbitInclination,
        baseScale: skill.featured ? 1.15 : 0.95,
      });
    });

    // 5. Active Connection Beam (Monochrome Line)
    const beamGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, 0),
    ]);
    const beamMat = new THREE.LineBasicMaterial({
      color: 0x111111,
      transparent: true,
      opacity: 0.6,
      linewidth: 2,
    });
    const connectionBeam = new THREE.Line(beamGeo, beamMat);
    connectionBeam.visible = false;
    scene.add(connectionBeam);

    // 6. Raycasting for Mouse Interaction
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-100, -100);
    let targetCameraAngleX = 0;
    let targetCameraAngleY = 0;
    let isMouseDown = false;
    let previousX = 0;
    let previousY = 0;

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      if (!isMouseDown) {
        targetCameraAngleX = mouse.x * 0.4;
        targetCameraAngleY = mouse.y * 0.3;
      } else {
        const deltaX = e.clientX - previousX;
        const deltaY = e.clientY - previousY;
        ecosystemGroup.rotation.y += deltaX * 0.008;
        ecosystemGroup.rotation.x += deltaY * 0.008;
        previousX = e.clientX;
        previousY = e.clientY;
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      isMouseDown = true;
      previousX = e.clientX;
      previousY = e.clientY;
    };

    const handlePointerUp = () => {
      isMouseDown = false;
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
    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);
    window.addEventListener('resize', handleResize);

    // 7. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();
    let currentHovered: SkillNodeObject | null = null;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Spin central core
      centralGroup.rotation.y = elapsed * 0.15;
      haloMesh.rotation.x = -elapsed * 0.1;
      haloMesh.rotation.y = elapsed * 0.18;

      // Orbit tech nodes
      skillNodes.forEach((node) => {
        if (!prefersReducedMotion && (!currentHovered || currentHovered !== node)) {
          node.orbitAngle += node.orbitSpeed * 0.02;
        }

        const x = Math.cos(node.orbitAngle) * node.orbitRadius;
        const z = Math.sin(node.orbitAngle) * node.orbitRadius;
        const y = Math.sin(elapsed + node.orbitAngle) * 1.0 + x * node.orbitInclination;

        node.group.position.set(x, y, z);
      });

      // Raycast to find hovered node
      raycaster.setFromCamera(mouse, camera);
      const interactiveMeshes = skillNodes.map((n) => n.mesh);
      const intersects = raycaster.intersectObjects(interactiveMeshes);

      if (intersects.length > 0) {
        const hitMesh = intersects[0].object as THREE.Mesh;
        const hitNode = skillNodes.find((n) => n.mesh === hitMesh);

        if (hitNode) {
          currentHovered = hitNode;
          setHoveredSkill(hitNode.skill);

          // Elevate hovered node toward camera
          hitNode.group.scale.set(1.3, 1.3, 1.3);

          // Connection beam to center
          const worldPos = new THREE.Vector3();
          hitNode.group.getWorldPosition(worldPos);
          beamGeo.setFromPoints([new THREE.Vector3(0, 0, 0), worldPos]);
          connectionBeam.visible = true;

          // Dim other nodes slightly
          skillNodes.forEach((other) => {
            if (other !== hitNode) {
              (other.mesh.material as THREE.MeshStandardMaterial).opacity = 0.35;
              (other.mesh.material as THREE.MeshStandardMaterial).transparent = true;
              other.sprite.material.opacity = 0.35;
              other.group.scale.set(other.baseScale * 0.85, other.baseScale * 0.85, other.baseScale * 0.85);
            }
          });
        }
      } else {
        if (currentHovered) {
          currentHovered = null;
          setHoveredSkill(null);
          connectionBeam.visible = false;

          skillNodes.forEach((node) => {
            (node.mesh.material as THREE.MeshStandardMaterial).opacity = 1;
            (node.mesh.material as THREE.MeshStandardMaterial).transparent = false;
            node.sprite.material.opacity = 0.95;
            node.group.scale.set(node.baseScale, node.baseScale, node.baseScale);
          });
        }
      }

      // Smooth camera tilt
      if (!isMouseDown) {
        camera.position.x += (targetCameraAngleX * 8 - camera.position.x) * 0.05;
        camera.position.y += (5 + targetCameraAngleY * 5 - camera.position.y) * 0.05;
        camera.lookAt(0, 0, 0);
      }

      renderer.render(scene, camera);
    };

    animate();

    // 8. Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      window.removeEventListener('resize', handleResize);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      coreGeo.dispose();
      coreMat.dispose();
      haloGeo.dispose();
      haloMat.dispose();
      sphereGeo.dispose();
      orbitRings.forEach((r) => {
        r.geometry.dispose();
        (r.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, [filteredSkills, selectedCategory]);

  return (
    <div className="relative w-full h-[450px] sm:h-[520px] lg:h-[580px] select-none rounded-2xl overflow-hidden border border-black/10 dark:border-white/10 bg-white/40 dark:bg-neutral-900/40">
      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        data-cursor="3d"
        className="w-full h-full cursor-grab active:cursor-grabbing canvas-3d-interactive"
      />

      {/* Floating Info Overlay for Active Skill */}
      {hoveredSkill && (
        <div className="absolute top-4 left-4 p-4 rounded-xl bg-[#111111]/95 text-[#F2F1ED] border border-white/20 shadow-xl backdrop-blur-md pointer-events-none z-20 max-w-xs">
          <div className="flex items-center gap-2 mb-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            <h4 className="text-sm font-bold font-display uppercase tracking-tight text-[#F2F1ED]">
              {hoveredSkill.name}
            </h4>
          </div>
          <div className="flex items-center gap-2 text-xs text-[#888888] font-mono uppercase tracking-wider">
            <span>{hoveredSkill.category}</span>
            {hoveredSkill.level && <span>• {hoveredSkill.level}</span>}
          </div>
        </div>
      )}

      {/* Control Hint in Corner */}
      <div className="absolute bottom-4 right-4 text-[10px] font-mono uppercase tracking-wider text-[#888888] bg-[#F2F1ED]/80 dark:bg-[#111111]/80 px-3 py-1 rounded-md border border-black/10 dark:border-white/10 backdrop-blur-sm pointer-events-none hidden sm:block">
        Click & Drag to Rotate 3D Constellation
      </div>
    </div>
  );
};
