import * as THREE from 'three';

export const NeuralCoreShader = {
  uniforms: {
    uTime: { value: 0.0 },
    uMorphState: { value: 0.0 },
    uCursorPos: { value: new THREE.Vector3(0, 0, 0) },
    uCursorIntensity: { value: 0.0 },
    uRippleOrigin: { value: new THREE.Vector3(0, 0, 0) },
    uRippleTime: { value: 10.0 }, // Large initial value = no active ripple
    uGoldColor: { value: new THREE.Color('#D4AF37') },
    uSecondaryGold: { value: new THREE.Color('#F5C542') },
    uChampagne: { value: new THREE.Color('#F3E8CB') },
    uDeepBase: { value: new THREE.Color('#070709') },
    uLightPos: { value: new THREE.Vector3(12.0, 14.0, 10.0) },
  },

  vertexShader: /* glsl */ `
    attribute vec3 aPosA;
    attribute vec3 aNormA;
    attribute vec3 aPosB;
    attribute vec3 aNormB;
    attribute vec3 aPosC;
    attribute vec3 aNormC;
    attribute vec3 aPosD;
    attribute vec3 aNormD;

    uniform float uTime;
    uniform float uMorphState; // 0.0 to 3.0
    uniform vec3 uCursorPos;
    uniform float uCursorIntensity;
    uniform vec3 uRippleOrigin;
    uniform float uRippleTime;

    varying vec3 vNormal;
    varying vec3 vWorldPos;
    varying vec2 vUv;
    varying float vFerroDeform;
    varying float vRippleEnergy;
    varying float vNoisePattern;

    // ----------------------------------------------------
    // Simplex 3D Noise Functions
    // ----------------------------------------------------
    vec4 permute(vec4 x) {
      return mod(((x * 34.0) + 1.0) * x, 289.0);
    }
    vec4 taylorInvSqrt(vec4 r) {
      return 1.79284291400159 - 0.85373472095314 * r;
    }

    float snoise(vec3 v) {
      const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

      vec3 i  = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);

      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);

      vec3 x1 = x0 - i1 + 1.0 * C.xxx;
      vec3 x2 = x0 - i2 + 2.0 * C.xxx;
      vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;

      i = mod(i, 289.0);
      vec4 p = permute(permute(permute(
                i.z + vec4(0.0, i1.z, i2.z, 1.0))
              + i.y + vec4(0.0, i1.y, i2.y, 1.0))
              + i.x + vec4(0.0, i1.x, i2.x, 1.0));

      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;

      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);

      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);

      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);

      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));

      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);

      vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;

      vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
    }

    void main() {
      vUv = uv;

      // 1. Morph interpolation across 4 geometric states
      vec3 basePos;
      vec3 baseNorm;

      float m = clamp(uMorphState, 0.0, 3.0);

      if (m < 1.0) {
        float t = smoothstep(0.0, 1.0, m);
        basePos = mix(aPosA, aPosB, t);
        baseNorm = normalize(mix(aNormA, aNormB, t));
      } else if (m < 2.0) {
        float t = smoothstep(0.0, 1.0, m - 1.0);
        basePos = mix(aPosB, aPosC, t);
        baseNorm = normalize(mix(aNormB, aNormC, t));
      } else {
        float t = smoothstep(0.0, 1.0, m - 2.0);
        basePos = mix(aPosC, aPosD, t);
        baseNorm = normalize(mix(aNormC, aNormD, t));
      }

      // 2. Ambient Simplex Noise Breathing
      float noiseVal = snoise(basePos * 0.8 + vec3(uTime * 0.45));
      vNoisePattern = noiseVal;
      vec3 displacedPos = basePos + baseNorm * (noiseVal * 0.08);

      // 3. True Cursor-Reactive Ferrofluid Magnetic Spiking
      vec3 toCursor = uCursorPos - displacedPos;
      float distToCursor = length(toCursor);

      float ferroSpikeNoise = snoise(basePos * 3.5 + vec3(uTime * 1.5));
      float ferroFalloff = smoothstep(4.8, 0.0, distToCursor) * (1.0 / (1.0 + 0.3 * distToCursor * distToCursor));
      float ferroDeform = ferroFalloff * uCursorIntensity;

      // Spike displacement along normal + magnetic attraction toward cursor vector
      vec3 spikeDir = normalize(baseNorm * 0.6 + normalize(toCursor + vec3(0.001)) * 0.4);
      displacedPos += spikeDir * (ferroDeform * (1.5 + ferroSpikeNoise * 0.8));
      vFerroDeform = ferroDeform;

      // 4. Radial Click/Tap Ripple Energy Shockwave
      float rippleDist = length(basePos - uRippleOrigin);
      float rippleWave = 0.0;
      if (uRippleTime < 1.2) {
        float wavePhase = rippleDist * 14.0 - uRippleTime * 20.0;
        float waveEnvelope = exp(-uRippleTime * 4.2) * smoothstep(uRippleTime * 3.5, 0.0, rippleDist);
        rippleWave = sin(wavePhase) * waveEnvelope;
        displacedPos += baseNorm * (rippleWave * 0.45);
      }
      vRippleEnergy = clamp(rippleWave * 2.0 + (1.0 - smoothstep(0.0, 0.8, uRippleTime)) * 0.4, 0.0, 1.5);

      // Final normal with perturbation
      vNormal = normalize(normalMatrix * (baseNorm + vec3(noiseVal * 0.15)));

      vec4 worldPosition = modelMatrix * vec4(displacedPos, 1.0);
      vWorldPos = worldPosition.xyz;

      gl_Position = projectionMatrix * viewMatrix * worldPosition;
    }
  `,

  fragmentShader: /* glsl */ `
    uniform float uTime;
    uniform vec3 uGoldColor;
    uniform vec3 uSecondaryGold;
    uniform vec3 uChampagne;
    uniform vec3 uDeepBase;
    uniform vec3 uLightPos;

    varying vec3 vNormal;
    varying vec3 vWorldPos;
    varying vec2 vUv;
    varying float vFerroDeform;
    varying float vRippleEnergy;
    varying float vNoisePattern;

    void main() {
      vec3 N = normalize(vNormal);
      vec3 V = normalize(cameraPosition - vWorldPos);
      vec3 L = normalize(uLightPos - vWorldPos);
      vec3 H = normalize(L + V);

      // 1. Physical Fresnel Rim Factor
      float NdotV = max(dot(N, V), 0.0);
      float fresnel = pow(1.0 - NdotV, 3.2);

      // 2. Diffuse and Specular Reflection (Gold Metallic Core)
      float NdotL = max(dot(N, L), 0.0);
      float NdotH = max(dot(N, H), 0.0);
      float specular = pow(NdotH, 28.0) * 1.8;

      // 3. Procedural Neural Energy Veins
      float veinPulse = sin(vUv.x * 24.0 + vUv.y * 18.0 + uTime * 2.0 + vNoisePattern * 3.0) * 0.5 + 0.5;
      float coreGlow = smoothstep(0.72, 1.0, veinPulse) * 0.9;

      // 4. Color Compositing: Dark Obsidian Metal -> Liquid Gold -> Radiant Champagne
      vec3 baseObsidian = uDeepBase + vec3(0.015, 0.012, 0.008);
      vec3 moltenGold = mix(uGoldColor, uSecondaryGold, vNoisePattern * 0.5 + 0.5);

      // Blend surface based on diffuse and vein energy
      vec3 surfaceColor = mix(baseObsidian, moltenGold, NdotL * 0.45 + coreGlow * 0.6);

      // Add ferrofluid spike heat (spikes glow brighter gold when active)
      surfaceColor += uSecondaryGold * (vFerroDeform * 1.6);

      // Add ripple energy shockwave glow
      surfaceColor += uChampagne * (vRippleEnergy * 1.4);

      // Add champagne specular highlights
      surfaceColor += uChampagne * specular;

      // Add luxury Fresnel rim lighting (Gold / Champagne border glow)
      vec3 rimColor = mix(uGoldColor, uChampagne, fresnel);
      surfaceColor += rimColor * (fresnel * 1.25);

      // Subtle atmospheric dark depth
      surfaceColor = clamp(surfaceColor, 0.0, 1.0);

      gl_FragColor = vec4(surfaceColor, 0.98);
    }
  `
};
