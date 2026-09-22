import * as THREE from 'three';

export interface NeuralCoreGeometryData {
  geometry: THREE.BufferGeometry;
  vertexCount: number;
}

/**
 * Procedurally generates 4 continuous 3D mathematical shapes sharing 100% identical vertex counts
 * and index topology for seamless GPU vertex shader interpolation without popping or artifacts.
 *
 * State 0: Organic Neural Star / Ferrofluid Core (Hero)
 * State 1: DNA Double Helix Lattice (Skills / AI)
 * State 2: Orthogonal Circuit / Neural Network Grid (Projects)
 * State 3: Torus Knot (p=2, q=3) Orbital Energy Ring (Experience / Equilibrium)
 */
export function createNeuralCoreGeometry(segmentsU: number = 80, segmentsV: number = 60): NeuralCoreGeometryData {
  const numVertsU = segmentsU + 1;
  const numVertsV = segmentsV + 1;
  const vertexCount = numVertsU * numVertsV;

  // Buffer Arrays for the 4 morph targets
  const posA = new Float32Array(vertexCount * 3); // State 0: Star / Sphere
  const normA = new Float32Array(vertexCount * 3);

  const posB = new Float32Array(vertexCount * 3); // State 1: DNA Double Helix
  const normB = new Float32Array(vertexCount * 3);

  const posC = new Float32Array(vertexCount * 3); // State 2: Circuit Grid
  const normC = new Float32Array(vertexCount * 3);

  const posD = new Float32Array(vertexCount * 3); // State 3: Torus Knot
  const normD = new Float32Array(vertexCount * 3);

  const uvs = new Float32Array(vertexCount * 2);

  // Helper vectors
  const p = new THREE.Vector3();
  const n = new THREE.Vector3();

  let idx = 0;
  let uvIdx = 0;

  for (let iv = 0; iv <= segmentsV; iv++) {
    const v = iv / segmentsV;
    for (let iu = 0; iu <= segmentsU; iu++) {
      const u = iu / segmentsU;

      uvs[uvIdx] = u;
      uvs[uvIdx + 1] = v;
      uvIdx += 2;

      const i3 = idx * 3;

      // ==========================================
      // STATE 0: Organic Neural Star / Ferrofluid Sphere
      // ==========================================
      {
        const theta = u * Math.PI * 2;
        const phi = v * Math.PI;
        const baseRadius = 3.2;

        // Subtle organic surface harmonic ripples
        const harmonic = 1.0 + 
          0.12 * Math.sin(theta * 3.0) * Math.cos(phi * 4.0) +
          0.06 * Math.sin(theta * 6.0 + 1.2) * Math.sin(phi * 3.0);

        const r = baseRadius * harmonic;
        const sinPhi = Math.sin(phi);

        p.set(
          r * sinPhi * Math.cos(theta),
          r * Math.cos(phi),
          r * sinPhi * Math.sin(theta)
        );

        n.copy(p).normalize();

        posA[i3] = p.x;
        posA[i3 + 1] = p.y;
        posA[i3 + 2] = p.z;

        normA[i3] = n.x;
        normA[i3 + 1] = n.y;
        normA[i3 + 2] = n.z;
      }

      // ==========================================
      // STATE 1: DNA Double Helix Lattice
      // ==========================================
      {
        const height = (v - 0.5) * 7.2; // Y range from -3.6 to +3.6
        const strand = u < 0.5 ? 0 : 1;
        const strandOffset = strand * Math.PI;
        const helixAngle = height * 1.35 + strandOffset;

        const helixRadius = 2.1;
        const tubeRadius = 0.42;

        // Local cross-section angle around the tube
        const tubeAngle = (u < 0.5 ? u * 2.0 : (u - 0.5) * 2.0) * Math.PI * 2;

        const cx = helixRadius * Math.cos(helixAngle);
        const cz = helixRadius * Math.sin(helixAngle);

        const cosTube = Math.cos(tubeAngle);
        const sinTube = Math.sin(tubeAngle);

        // Displace along tube normal
        p.set(
          cx + tubeRadius * cosTube * Math.cos(helixAngle),
          height + tubeRadius * sinTube,
          cz + tubeRadius * cosTube * Math.sin(helixAngle)
        );

        n.set(
          cosTube * Math.cos(helixAngle),
          sinTube,
          cosTube * Math.sin(helixAngle)
        ).normalize();

        posB[i3] = p.x;
        posB[i3 + 1] = p.y;
        posB[i3 + 2] = p.z;

        normB[i3] = n.x;
        normB[i3 + 1] = n.y;
        normB[i3 + 2] = n.z;
      }

      // ==========================================
      // STATE 2: Orthogonal Circuit / Neural Network Grid
      // ==========================================
      {
        // 3-tier circuit platform with stepped nodes
        const tier = Math.floor(v * 3.0);
        const localV = (v * 3.0) % 1.0;
        const yLevel = (tier - 1.0) * 2.2;

        const planeX = (u - 0.5) * 5.6;
        const planeZ = (localV - 0.5) * 5.6;

        // Circuit track grooves and stepped IC blocks
        const chipElevation = (Math.abs(planeX) < 1.4 && Math.abs(planeZ) < 1.4) ? 0.65 : 0.0;
        const busOffset = 0.15 * Math.sin(planeX * 4.0) * Math.cos(planeZ * 4.0);

        p.set(
          planeX + (Math.sin(u * 14.0) * 0.1),
          yLevel + chipElevation + busOffset,
          planeZ + (Math.cos(v * 14.0) * 0.1)
        );

        n.set(0, chipElevation > 0 ? 1 : 0.8, 0.2 * Math.sin(u * 8.0)).normalize();

        posC[i3] = p.x;
        posC[i3 + 1] = p.y;
        posC[i3 + 2] = p.z;

        normC[i3] = n.x;
        normC[i3 + 1] = n.y;
        normC[i3 + 2] = n.z;
      }

      // ==========================================
      // STATE 3: Torus Knot (p=2, q=3) Orbital Energy Ring
      // ==========================================
      {
        const pKnot = 2.0;
        const qKnot = 3.0;
        const t = u * Math.PI * 2;
        const tubeTheta = v * Math.PI * 2;

        const rMajor = 2.4 + 0.85 * Math.cos(qKnot * t);
        const knotX = rMajor * Math.cos(pKnot * t);
        const knotY = 1.35 * Math.sin(qKnot * t);
        const knotZ = rMajor * Math.sin(pKnot * t);

        const tubeRad = 0.48;

        // Calculate tangent for Frenet-like orientation
        const delta = 0.001;
        const tNext = t + delta;
        const rNext = 2.4 + 0.85 * Math.cos(qKnot * tNext);
        const nextX = rNext * Math.cos(pKnot * tNext);
        const nextY = 1.35 * Math.sin(qKnot * tNext);
        const nextZ = rNext * Math.sin(pKnot * tNext);

        const tangent = new THREE.Vector3(nextX - knotX, nextY - knotY, nextZ - knotZ).normalize();
        const normalVec = new THREE.Vector3(knotX, knotY * 0.5, knotZ).normalize();
        const binormal = new THREE.Vector3().crossVectors(tangent, normalVec).normalize();
        const refinedNormal = new THREE.Vector3().crossVectors(binormal, tangent).normalize();

        const cosTube = Math.cos(tubeTheta);
        const sinTube = Math.sin(tubeTheta);

        p.set(
          knotX + tubeRad * (cosTube * refinedNormal.x + sinTube * binormal.x),
          knotY + tubeRad * (cosTube * refinedNormal.y + sinTube * binormal.y),
          knotZ + tubeRad * (cosTube * refinedNormal.z + sinTube * binormal.z)
        );

        n.set(
          cosTube * refinedNormal.x + sinTube * binormal.x,
          cosTube * refinedNormal.y + sinTube * binormal.y,
          cosTube * refinedNormal.z + sinTube * binormal.z
        ).normalize();

        posD[i3] = p.x;
        posD[i3 + 1] = p.y;
        posD[i3 + 2] = p.z;

        normD[i3] = n.x;
        normD[i3 + 1] = n.y;
        normD[i3 + 2] = n.z;
      }

      idx++;
    }
  }

  // Generate triangle indices
  const indices: number[] = [];
  for (let iv = 0; iv < segmentsV; iv++) {
    for (let iu = 0; iu < segmentsU; iu++) {
      const a = iv * numVertsU + iu;
      const b = (iv + 1) * numVertsU + iu;
      const c = (iv + 1) * numVertsU + (iu + 1);
      const d = iv * numVertsU + (iu + 1);

      indices.push(a, b, d);
      indices.push(b, c, d);
    }
  }

  const geometry = new THREE.BufferGeometry();
  // Default position attribute starts at State 0
  geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(posA), 3));
  geometry.setAttribute('normal', new THREE.BufferAttribute(new Float32Array(normA), 3));
  geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

  // Custom attributes for GPU vertex morphing
  geometry.setAttribute('aPosA', new THREE.BufferAttribute(posA, 3));
  geometry.setAttribute('aNormA', new THREE.BufferAttribute(normA, 3));

  geometry.setAttribute('aPosB', new THREE.BufferAttribute(posB, 3));
  geometry.setAttribute('aNormB', new THREE.BufferAttribute(normB, 3));

  geometry.setAttribute('aPosC', new THREE.BufferAttribute(posC, 3));
  geometry.setAttribute('aNormC', new THREE.BufferAttribute(normC, 3));

  geometry.setAttribute('aPosD', new THREE.BufferAttribute(posD, 3));
  geometry.setAttribute('aNormD', new THREE.BufferAttribute(normD, 3));

  geometry.setIndex(indices);
  geometry.computeBoundingSphere();

  return { geometry, vertexCount };
}
