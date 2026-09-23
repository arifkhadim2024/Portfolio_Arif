import * as THREE from 'three';

export interface MagneticParticlesSystem {
  points: THREE.Points;
  update: (elapsed: number, delta: number, cursorPos: THREE.Vector3, cursorIntensity: number) => void;
  dispose: () => void;
}

/**
 * Magnetic Iron Filings Particle System
 * Simulates iron filings drifting along magnetic field lines around the Neural Core,
 * reacting to the cursor position and fluid curl dynamics with restrained editorial colors.
 */
export function createMagneticParticles(
  particleCount: number = 750
): MagneticParticlesSystem {
  const positions = new Float32Array(particleCount * 3);
  const colors = new Float32Array(particleCount * 3);
  const scales = new Float32Array(particleCount);
  const initialRadii = new Float32Array(particleCount);
  const angles = new Float32Array(particleCount);
  const speeds = new Float32Array(particleCount);
  const inclinations = new Float32Array(particleCount);

  const charcoalCol = new THREE.Color('#333333');
  const offWhiteCol = new THREE.Color('#F2F1ED');
  const midGrayCol = new THREE.Color('#666666');
  const lightGrayCol = new THREE.Color('#999999');
  const palette = [charcoalCol, offWhiteCol, midGrayCol, lightGrayCol];

  for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;
    const r = 3.6 + Math.random() * 4.8;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(Math.random() * 2 - 1);

    initialRadii[i] = r;
    angles[i] = theta;
    speeds[i] = 0.2 + Math.random() * 0.4;
    inclinations[i] = (Math.random() - 0.5) * 1.2;

    positions[i3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = r * Math.cos(phi) * 0.8;
    positions[i3 + 2] = r * Math.sin(phi) * Math.sin(theta);

    const c = palette[Math.floor(Math.random() * palette.length)];
    colors[i3] = c.r;
    colors[i3 + 1] = c.g;
    colors[i3 + 2] = c.b;

    scales[i] = 0.8 + Math.random() * 1.6;
  }

  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

  // Generate circular particle texture with soft falloff
  const createDotTexture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(242, 240, 234, 1)');
      gradient.addColorStop(0.35, 'rgba(185, 161, 107, 0.8)');
      gradient.addColorStop(0.75, 'rgba(185, 161, 107, 0.2)');
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);
    }
    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  };

  const particleTexture = createDotTexture();

  const material = new THREE.PointsMaterial({
    size: 0.22,
    vertexColors: true,
    map: particleTexture,
    transparent: true,
    opacity: 0.75,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  const points = new THREE.Points(geometry, material);

  const update = (
    elapsed: number,
    _delta: number,
    cursorPos: THREE.Vector3,
    cursorIntensity: number
  ) => {
    const pos = geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      angles[i] += speeds[i] * 0.015;

      const r = initialRadii[i] + Math.sin(elapsed * 1.5 + i) * 0.35;
      const theta = angles[i];
      const yBase = Math.sin(theta * 2.0 + inclinations[i]) * 1.8;

      let targetX = r * Math.cos(theta);
      let targetY = yBase;
      let targetZ = r * Math.sin(theta);

      // Magnetic attraction toward cursor
      if (cursorIntensity > 0.05) {
        const dx = cursorPos.x - targetX;
        const dy = cursorPos.y - targetY;
        const dz = cursorPos.z - targetZ;
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < 4.5) {
          const pull = (1.0 - dist / 4.5) * cursorIntensity * 0.65;
          targetX += dx * pull;
          targetY += dy * pull;
          targetZ += dz * pull;
        }
      }

      // Smooth dampening towards target magnetic orbit
      pos[i3] += (targetX - pos[i3]) * 0.08;
      pos[i3 + 1] += (targetY - pos[i3 + 1]) * 0.08;
      pos[i3 + 2] += (targetZ - pos[i3 + 2]) * 0.08;
    }

    geometry.attributes.position.needsUpdate = true;
    points.rotation.y = elapsed * 0.05;
  };

  const dispose = () => {
    geometry.dispose();
    material.dispose();
    particleTexture.dispose();
  };

  return { points, update, dispose };
}
