import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Cpu, 
  Zap, 
  Radio, 
  Activity,
  Maximize2,
  Minimize2
} from 'lucide-react';

export type CameraViewMode = 'perspective' | 'top' | 'sink' | 'network';
export type AlgorithmMode = 'standard' | 'ann' | 'pso' | 'depleted';

interface SensorNodeData {
  id: number;
  label: string;
  x: number;
  y: number;
  z: number;
  energy: number; // Joules (0.0 to 1.0)
  initialEnergy: number;
  isClusterHead: boolean;
  clusterId: number;
  isAnnSelected: boolean;
  isSleeping: boolean;
  distanceToSink: number;
  pdr: number;
}

interface Packet {
  mesh: THREE.Mesh;
  startPos: THREE.Vector3;
  targetPos: THREE.Vector3;
  progress: number;
  speed: number;
  fromNodeId: number;
  toNodeId: number;
  type: 'sensor-to-ch' | 'ch-to-sink';
}

interface NeuroSenseWSN3DProps {
  className?: string;
  isCompact?: boolean;
}

export const NeuroSenseWSN3D: React.FC<NeuroSenseWSN3DProps> = ({
  className = '',
  isCompact = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [currentView, setCurrentView] = useState<CameraViewMode>('perspective');
  const [algorithmMode, setAlgorithmMode] = useState<AlgorithmMode>('ann');
  const [hoveredNode, setHoveredNode] = useState<SensorNodeData | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeTelemetry, setActiveTelemetry] = useState({
    activeNodes: 86,
    avgEnergy: 0.74,
    packetsDelivered: 1420,
    lifetimeGain: '+38.5%',
    chCount: 6,
  });

  // Three.js References
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const nodesGroupRef = useRef<THREE.Group | null>(null);
  const linksGroupRef = useRef<THREE.Group | null>(null);
  const packetsGroupRef = useRef<THREE.Group | null>(null);
  const sinkMeshRef = useRef<THREE.Group | null>(null);
  const nodeMeshesRef = useRef<Map<number, THREE.Mesh>>(new Map());
  const nodesDataRef = useRef<SensorNodeData[]>([]);
  const packetsRef = useRef<Packet[]>([]);
  const isTransitioningCamera = useRef(false);
  const cameraTargetPos = useRef(new THREE.Vector3(0, 18, 32));
  const cameraTargetLookAt = useRef(new THREE.Vector3(0, 0, 0));

  // Generate 100 Sensor Nodes in a 3D Field
  const generateTopology = useCallback((): SensorNodeData[] => {
    const nodes: SensorNodeData[] = [];
    const nodeCount = 100;
    const clusterCount = 6;
    const clusterCenters = [
      { x: -14, z: -12, id: 1 },
      { x: 12, z: -14, id: 2 },
      { x: -16, z: 10, id: 3 },
      { x: 14, z: 12, id: 4 },
      { x: 0, z: -18, id: 5 },
      { x: -2, z: 16, id: 6 },
    ];

    for (let i = 0; i < nodeCount; i++) {
      let x: number, z: number, y: number;
      const isCH = i < clusterCount;
      let clusterId = 0;

      if (isCH) {
        x = clusterCenters[i].x;
        z = clusterCenters[i].z;
        y = Math.sin(x * 0.1) * Math.cos(z * 0.1) * 1.2;
        clusterId = clusterCenters[i].id;
      } else {
        // Assign to nearest cluster with Gaussian distribution
        const assignedCluster = clusterCenters[i % clusterCount];
        clusterId = assignedCluster.id;
        const radius = Math.random() * 11 + 1.5;
        const angle = Math.random() * Math.PI * 2;
        x = assignedCluster.x + Math.cos(angle) * radius;
        z = assignedCluster.z + Math.sin(angle) * radius;
        y = Math.sin(x * 0.12) * Math.cos(z * 0.12) * 1.5 + (Math.random() - 0.5) * 0.6;
      }

      // Distance to Sink (Sink is at 0, 1.5, 0)
      const distToSink = Math.sqrt(x * x + y * y + z * z);
      const isAnnSelected = isCH || (i % 7 !== 0 && Math.random() > 0.15);
      const isSleeping = !isCH && !isAnnSelected;
      const energy = isCH 
        ? 0.92 - Math.random() * 0.1 
        : isSleeping 
        ? 0.45 - Math.random() * 0.15 
        : 0.78 + Math.random() * 0.2;

      nodes.push({
        id: i + 1,
        label: `NODE-${String(i + 1).padStart(3, '0')}`,
        x,
        y,
        z,
        energy: Math.max(0.1, Number(energy.toFixed(2))),
        initialEnergy: 1.0,
        isClusterHead: isCH,
        clusterId,
        isAnnSelected,
        isSleeping,
        distanceToSink: Number(distToSink.toFixed(1)),
        pdr: Number((98.5 + Math.random() * 1.4).toFixed(1)),
      });
    }

    return nodes;
  }, []);

  // Initialize Three.js Scene
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0x0e0e0e, 0.012);

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 500;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 18, 32);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x0a0a0a, 1);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 2. OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.05; // Do not go under ground
    controls.minDistance = 6;
    controls.maxDistance = 80;
    controls.target.set(0, 0, 0);
    controlsRef.current = controls;

    // 3. Studio Realism Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const dirKeyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    dirKeyLight.position.set(20, 30, 20);
    dirKeyLight.castShadow = true;
    dirKeyLight.shadow.mapSize.width = 1024;
    dirKeyLight.shadow.mapSize.height = 1024;
    scene.add(dirKeyLight);

    // Accent emerald & metallic rim lights
    const emeraldRimLight = new THREE.PointLight(0x10b981, 2.5, 60);
    emeraldRimLight.position.set(-20, 15, -20);
    scene.add(emeraldRimLight);

    const warmFillLight = new THREE.PointLight(0xe5c07b, 1.8, 50);
    warmFillLight.position.set(20, 10, -15);
    scene.add(warmFillLight);

    // 4. Ground Grid & Topo Pedestal
    const gridHelper = new THREE.GridHelper(60, 30, 0x333333, 0x1a1a1a);
    gridHelper.position.y = -2;
    scene.add(gridHelper);

    // Faint subtle terrain surface
    const terrainGeo = new THREE.PlaneGeometry(60, 60, 32, 32);
    terrainGeo.rotateX(-Math.PI / 2);
    const posAttr = terrainGeo.attributes.position;
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vz = posAttr.getZ(i);
      posAttr.setY(i, Math.sin(vx * 0.1) * Math.cos(vz * 0.1) * 1.2 - 2.05);
    }
    terrainGeo.computeVertexNormals();

    const terrainMat = new THREE.MeshStandardMaterial({
      color: 0x121212,
      roughness: 0.85,
      metalness: 0.1,
      wireframe: false,
    });
    const terrainMesh = new THREE.Mesh(terrainGeo, terrainMat);
    terrainMesh.receiveShadow = true;
    scene.add(terrainMesh);

    // Wireframe overlay for technical grid aesthetic
    const terrainWireMat = new THREE.MeshBasicMaterial({
      color: 0x262626,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const terrainWireMesh = new THREE.Mesh(terrainGeo, terrainWireMat);
    scene.add(terrainWireMesh);

    // 5. Central Sink Base Station (Architectural Structure)
    const sinkGroup = new THREE.Group();
    sinkMeshRef.current = sinkGroup;
    sinkGroup.position.set(0, 0, 0);

    // Base platform
    const sinkBaseGeo = new THREE.CylinderGeometry(2.2, 2.6, 0.4, 32);
    const sinkBaseMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      metalness: 0.9,
      roughness: 0.2,
    });
    const sinkBase = new THREE.Mesh(sinkBaseGeo, sinkBaseMat);
    sinkBase.position.y = -1.8;
    sinkGroup.add(sinkBase);

    // Central Tower Mast
    const mastGeo = new THREE.CylinderGeometry(0.12, 0.25, 4.5, 16);
    const mastMat = new THREE.MeshStandardMaterial({
      color: 0xe5e5e5,
      metalness: 0.95,
      roughness: 0.1,
    });
    const mast = new THREE.Mesh(mastGeo, mastMat);
    mast.position.y = 0.5;
    sinkGroup.add(mast);

    // Sink Receiver Core Sphere
    const sinkCoreGeo = new THREE.SphereGeometry(0.65, 32, 32);
    const sinkCoreMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x10b981,
      emissiveIntensity: 0.8,
      roughness: 0.2,
      metalness: 0.8,
    });
    const sinkCore = new THREE.Mesh(sinkCoreGeo, sinkCoreMat);
    sinkCore.position.y = 2.8;
    sinkGroup.add(sinkCore);

    // Pulsing Signal Rings around Sink
    const sinkRingGeo = new THREE.RingGeometry(0.8, 0.95, 32);
    sinkRingGeo.rotateX(Math.PI / 2);
    const sinkRingMat = new THREE.MeshBasicMaterial({
      color: 0x10b981,
      transparent: true,
      opacity: 0.6,
      side: THREE.DoubleSide,
    });
    const sinkRing = new THREE.Mesh(sinkRingGeo, sinkRingMat);
    sinkRing.position.y = 2.8;
    sinkGroup.add(sinkRing);

    scene.add(sinkGroup);

    // 6. Build 100 Nodes & Links
    const nodes = generateTopology();
    nodesDataRef.current = nodes;

    const nodesGroup = new THREE.Group();
    nodesGroupRef.current = nodesGroup;
    scene.add(nodesGroup);

    const linksGroup = new THREE.Group();
    linksGroupRef.current = linksGroup;
    scene.add(linksGroup);

    const packetsGroup = new THREE.Group();
    packetsGroupRef.current = packetsGroup;
    scene.add(packetsGroup);

    // Create geometries & materials for nodes
    const normalNodeGeo = new THREE.SphereGeometry(0.28, 16, 16);
    const chNodeGeo = new THREE.OctahedronGeometry(0.55, 0);

    const activeNodeMat = new THREE.MeshStandardMaterial({
      color: 0xf5f5f5,
      metalness: 0.7,
      roughness: 0.2,
    });

    const chNodeMat = new THREE.MeshStandardMaterial({
      color: 0x10b981,
      emissive: 0x10b981,
      emissiveIntensity: 0.7,
      metalness: 0.9,
      roughness: 0.1,
    });

    const sleepNodeMat = new THREE.MeshStandardMaterial({
      color: 0x444444,
      metalness: 0.5,
      roughness: 0.8,
      transparent: true,
      opacity: 0.45,
    });

    // Spawn nodes in scene
    nodes.forEach((node) => {
      const mesh = new THREE.Mesh(
        node.isClusterHead ? chNodeGeo : normalNodeGeo,
        node.isClusterHead ? chNodeMat : node.isSleeping ? sleepNodeMat : activeNodeMat
      );
      mesh.position.set(node.x, node.y, node.z);
      mesh.userData = { nodeId: node.id };
      mesh.castShadow = true;
      mesh.receiveShadow = true;

      // Cluster Head halo ring
      if (node.isClusterHead) {
        const haloGeo = new THREE.RingGeometry(1.2, 1.35, 32);
        haloGeo.rotateX(Math.PI / 2);
        const haloMat = new THREE.MeshBasicMaterial({
          color: 0x10b981,
          transparent: true,
          opacity: 0.4,
          side: THREE.DoubleSide,
        });
        const halo = new THREE.Mesh(haloGeo, haloMat);
        halo.position.y = 0;
        mesh.add(halo);
      }

      nodesGroup.add(mesh);
      nodeMeshesRef.current.set(node.id, mesh);
    });

    // 7. Communication Links between Nodes, CHs & Sink
    const updateLinks = () => {
      // Clear existing links
      while (linksGroup.children.length > 0) {
        const child = linksGroup.children[0];
        linksGroup.remove(child);
      }

      const clusterHeadNodes = nodes.filter((n) => n.isClusterHead);
      const chPositionsMap = new Map<number, THREE.Vector3>();
      clusterHeadNodes.forEach((ch) => {
        chPositionsMap.set(ch.clusterId, new THREE.Vector3(ch.x, ch.y, ch.z));
      });

      // 1. Regular Node -> Assigned Cluster Head Link Lines
      const sensorLinePositions: number[] = [];
      nodes.forEach((node) => {
        if (!node.isClusterHead && !node.isSleeping) {
          const chPos = chPositionsMap.get(node.clusterId);
          if (chPos) {
            sensorLinePositions.push(node.x, node.y, node.z);
            sensorLinePositions.push(chPos.x, chPos.y, chPos.z);
          }
        }
      });

      const sensorLineGeo = new THREE.BufferGeometry();
      sensorLineGeo.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(sensorLinePositions, 3)
      );
      const sensorLineMat = new THREE.LineBasicMaterial({
        color: 0x555555,
        transparent: true,
        opacity: 0.25,
      });
      const sensorLines = new THREE.LineSegments(sensorLineGeo, sensorLineMat);
      linksGroup.add(sensorLines);

      // 2. Cluster Head -> Central Sink Major Backhaul Links
      const chToSinkPositions: number[] = [];
      clusterHeadNodes.forEach((ch) => {
        chToSinkPositions.push(ch.x, ch.y, ch.z);
        chToSinkPositions.push(0, 2.8, 0); // Sink Core position
      });

      const chLineGeo = new THREE.BufferGeometry();
      chLineGeo.setAttribute(
        'position',
        new THREE.Float32BufferAttribute(chToSinkPositions, 3)
      );
      const chLineMat = new THREE.LineBasicMaterial({
        color: 0x10b981,
        transparent: true,
        opacity: 0.65,
        linewidth: 2,
      });
      const chLines = new THREE.LineSegments(chLineGeo, chLineMat);
      linksGroup.add(chLines);
    };

    updateLinks();

    // 8. Raycaster for Node Hover HUD
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseVector.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVector.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(nodesGroup.children, true);

      if (intersects.length > 0) {
        let hitObject = intersects[0].object as THREE.Mesh;
        while (hitObject.parent && hitObject.parent !== nodesGroup && hitObject.parent.type === 'Group') {
          hitObject = hitObject.parent as unknown as THREE.Mesh;
        }

        const nodeId = hitObject.userData?.nodeId;
        if (nodeId) {
          const matched = nodesDataRef.current.find((n) => n.id === nodeId);
          if (matched) {
            setHoveredNode(matched);
            return;
          }
        }
      }
      setHoveredNode(null);
    };

    container.addEventListener('mousemove', handlePointerMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // 9. Packet Generation Cycle
    const packetGeo = new THREE.SphereGeometry(0.12, 8, 8);
    const sensorPacketMat = new THREE.MeshBasicMaterial({ color: 0xe5c07b });
    const chPacketMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });

    const spawnPacket = () => {
      if (!isPlaying) return;
      const activeNodes = nodesDataRef.current.filter((n) => !n.isSleeping && !n.isClusterHead);
      if (activeNodes.length === 0) return;

      const randomNode = activeNodes[Math.floor(Math.random() * activeNodes.length)];
      const ch = nodesDataRef.current.find((n) => n.isClusterHead && n.clusterId === randomNode.clusterId);
      if (!ch) return;

      // Spawn Sensor -> CH Packet
      const pMesh = new THREE.Mesh(packetGeo, sensorPacketMat);
      pMesh.position.set(randomNode.x, randomNode.y, randomNode.z);
      packetsGroup.add(pMesh);

      packetsRef.current.push({
        mesh: pMesh,
        startPos: new THREE.Vector3(randomNode.x, randomNode.y, randomNode.z),
        targetPos: new THREE.Vector3(ch.x, ch.y, ch.z),
        progress: 0,
        speed: 0.02 + Math.random() * 0.015,
        fromNodeId: randomNode.id,
        toNodeId: ch.id,
        type: 'sensor-to-ch',
      });
    };

    const packetInterval = setInterval(spawnPacket, 350);

    // 10. Main Render & Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Smooth Camera View Interpolation
      if (isTransitioningCamera.current) {
        camera.position.lerp(cameraTargetPos.current, 0.06);
        controls.target.lerp(cameraTargetLookAt.current, 0.06);
        if (camera.position.distanceTo(cameraTargetPos.current) < 0.2) {
          isTransitioningCamera.current = false;
        }
      }

      controls.update();

      // Sink core pulse
      if (sinkCore) {
        const pulse = 1 + Math.sin(elapsed * 4) * 0.08;
        sinkCore.scale.set(pulse, pulse, pulse);
        sinkRing.scale.set(1 + (elapsed % 1.5) * 1.2, 1 + (elapsed % 1.5) * 1.2, 1);
        (sinkRing.material as THREE.MeshBasicMaterial).opacity = 0.8 * (1 - (elapsed % 1.5) / 1.5);
      }

      // Rotate Cluster Head halos
      nodesGroup.children.forEach((nMesh) => {
        if (nMesh.children.length > 0) {
          nMesh.children[0].rotation.z = elapsed * 0.8;
        }
      });

      // Update Packets
      for (let i = packetsRef.current.length - 1; i >= 0; i--) {
        const p = packetsRef.current[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          packetsGroup.remove(p.mesh);
          packetsRef.current.splice(i, 1);

          // If sensor reached CH, spawn CH -> Sink packet
          if (p.type === 'sensor-to-ch') {
            const chMesh = new THREE.Mesh(packetGeo, chPacketMat);
            chMesh.position.copy(p.targetPos);
            packetsGroup.add(chMesh);

            packetsRef.current.push({
              mesh: chMesh,
              startPos: p.targetPos.clone(),
              targetPos: new THREE.Vector3(0, 2.8, 0),
              progress: 0,
              speed: 0.035,
              fromNodeId: p.toNodeId,
              toNodeId: 0, // Sink ID
              type: 'ch-to-sink',
            });
          } else {
            // Reached Sink -> Update delivered count
            setActiveTelemetry((prev) => ({
              ...prev,
              packetsDelivered: prev.packetsDelivered + 1,
            }));
          }
        } else {
          p.mesh.position.lerpVectors(p.startPos, p.targetPos, p.progress);
          // Parabolic arc for realistic RF hop
          p.mesh.position.y += Math.sin(p.progress * Math.PI) * 0.8;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    // 11. Cleanup
    return () => {
      cancelAnimationFrame(animId);
      clearInterval(packetInterval);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handlePointerMove);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      // Clean Three.js resources
      normalNodeGeo.dispose();
      chNodeGeo.dispose();
      activeNodeMat.dispose();
      chNodeMat.dispose();
      sleepNodeMat.dispose();
      terrainGeo.dispose();
      terrainMat.dispose();
      terrainWireMat.dispose();
      renderer.dispose();
    };
  }, [generateTopology, isPlaying]);

  // Switch Camera View Modes smoothly
  const handleSwitchView = (mode: CameraViewMode) => {
    setCurrentView(mode);
    isTransitioningCamera.current = true;

    switch (mode) {
      case 'top':
        cameraTargetPos.current.set(0, 42, 0.01);
        cameraTargetLookAt.current.set(0, 0, 0);
        break;
      case 'perspective':
        cameraTargetPos.current.set(0, 18, 32);
        cameraTargetLookAt.current.set(0, 0, 0);
        break;
      case 'sink':
        cameraTargetPos.current.set(3, 4.5, 6);
        cameraTargetLookAt.current.set(0, 2.5, 0);
        break;
      case 'network':
        cameraTargetPos.current.set(-28, 24, 28);
        cameraTargetLookAt.current.set(0, 0, 0);
        break;
    }
  };

  // Switch Routing & Algorithm Modes
  const handleSwitchAlgorithm = (mode: AlgorithmMode) => {
    setAlgorithmMode(mode);
    if (!nodesGroupRef.current) return;

    const activeNodeMat = new THREE.MeshStandardMaterial({ color: 0xf5f5f5, metalness: 0.7, roughness: 0.2 });
    const sleepNodeMat = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.5, roughness: 0.8, transparent: true, opacity: 0.35 });
    const annNodeMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, emissive: 0x38bdf8, emissiveIntensity: 0.5, metalness: 0.8, roughness: 0.2 });

    let activeCount = 0;
    let totalEnergy = 0;

    nodesDataRef.current.forEach((node) => {
      const mesh = nodeMeshesRef.current.get(node.id);
      if (!mesh) return;

      if (node.isClusterHead) {
        activeCount++;
        totalEnergy += node.energy;
        return;
      }

      if (mode === 'ann') {
        node.isSleeping = !node.isAnnSelected;
        mesh.material = node.isAnnSelected ? annNodeMat : sleepNodeMat;
      } else if (mode === 'pso') {
        node.isSleeping = node.distanceToSink > 22 && Math.random() > 0.4;
        mesh.material = !node.isSleeping ? activeNodeMat : sleepNodeMat;
      } else if (mode === 'depleted') {
        node.energy = Math.max(0.05, node.energy * 0.4);
        node.isSleeping = node.energy < 0.25;
        mesh.material = !node.isSleeping ? activeNodeMat : sleepNodeMat;
      } else {
        node.isSleeping = false;
        mesh.material = activeNodeMat;
      }

      if (!node.isSleeping) activeCount++;
      totalEnergy += node.energy;
    });

    setActiveTelemetry((prev) => ({
      ...prev,
      activeNodes: activeCount,
      avgEnergy: Number((totalEnergy / nodesDataRef.current.length).toFixed(2)),
      lifetimeGain: mode === 'ann' ? '+38.5%' : mode === 'pso' ? '+44.2%' : '+12.0%',
    }));
  };

  const handleResetCamera = () => {
    handleSwitchView('perspective');
  };

  return (
    <div
      className={`relative w-full rounded-2xl overflow-hidden border border-black/15 dark:border-white/15 bg-[#0A0A0A] text-[#F2F1ED] font-sans select-none shadow-2xl transition-all ${
        isFullscreen ? 'fixed inset-4 z-50 rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.8)]' : isCompact ? 'h-[440px]' : 'h-[580px] sm:h-[640px]'
      } ${className}`}
    >
      {/* 3D WebGL Canvas Viewport */}
      <div
        ref={containerRef}
        data-cursor="3d"
        className="w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Top Scientific Control Header Strip */}
      <div className="absolute top-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-b from-black/90 via-black/50 to-transparent flex flex-wrap items-center justify-between gap-3 pointer-events-none z-20 text-xs font-mono">
        <div className="flex items-center gap-2.5 pointer-events-auto">
          <div className="p-1.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            <Radio className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#F2F1ED] uppercase tracking-wider text-xs sm:text-sm">
                NeuroSense WSN // 3D Simulator
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase">
                Live 100-Node Digital Twin
              </span>
            </div>
            <div className="text-[10px] text-[#888888] hidden sm:block">
              ANN-Clustered Spatial Sensing • PSO-Hybrid Swarm Routing • Topology Field
            </div>
          </div>
        </div>

        {/* Top Right Controls: Views & Fullscreen */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          {(['perspective', 'top', 'sink', 'network'] as CameraViewMode[]).map((view) => (
            <button
              key={view}
              onClick={() => handleSwitchView(view)}
              className={`px-2.5 py-1 rounded text-[10px] uppercase font-mono tracking-wider transition-all cursor-pointer ${
                currentView === view
                  ? 'bg-white text-black font-bold shadow-md'
                  : 'bg-white/5 text-[#AAAAAA] hover:text-white hover:bg-white/10 border border-white/10'
              }`}
            >
              {view}
            </button>
          ))}

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-1.5 rounded bg-white/5 hover:bg-white/10 text-[#AAAAAA] hover:text-white border border-white/10 transition-colors cursor-pointer ml-1"
            title={isFullscreen ? 'Exit Fullscreen' : 'Expand Fullscreen'}
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Real-time Telemetry Floating HUD Bar (Bottom Left) */}
      <div className="absolute bottom-4 left-4 p-3.5 rounded-xl bg-black/85 backdrop-blur-md border border-white/15 text-xs font-mono z-20 space-y-2 pointer-events-auto max-w-[260px] sm:max-w-xs shadow-xl">
        <div className="flex items-center justify-between text-[10px] text-[#888888] uppercase tracking-widest pb-1.5 border-b border-white/10">
          <span className="flex items-center gap-1 text-emerald-400">
            <Activity className="w-3 h-3" /> Telemetry Stream
          </span>
          <span>100 NODES</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-[11px]">
          <div>
            <div className="text-[#888888] text-[9px] uppercase">Active Nodes</div>
            <div className="font-bold text-white flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              {activeTelemetry.activeNodes} / 100
            </div>
          </div>

          <div>
            <div className="text-[#888888] text-[9px] uppercase">Avg Energy</div>
            <div className="font-bold text-emerald-400 flex items-center gap-1">
              <Zap className="w-3 h-3" />
              {activeTelemetry.avgEnergy} J
            </div>
          </div>

          <div>
            <div className="text-[#888888] text-[9px] uppercase">Packets Sink</div>
            <div className="font-bold text-white">
              {activeTelemetry.packetsDelivered.toLocaleString()} pkts
            </div>
          </div>

          <div>
            <div className="text-[#888888] text-[9px] uppercase">Lifetime Gain</div>
            <div className="font-bold text-emerald-400">{activeTelemetry.lifetimeGain}</div>
          </div>
        </div>

        {/* Algorithm Strategy Switcher */}
        <div className="pt-2 border-t border-white/10">
          <div className="text-[9px] text-[#888888] uppercase tracking-wider mb-1.5 flex items-center gap-1">
            <Cpu className="w-3 h-3 text-[#38bdf8]" /> Optimisation Mode:
          </div>
          <div className="grid grid-cols-3 gap-1">
            <button
              onClick={() => handleSwitchAlgorithm('ann')}
              className={`px-1.5 py-1 rounded text-[9px] font-mono tracking-wider uppercase transition-colors cursor-pointer text-center ${
                algorithmMode === 'ann'
                  ? 'bg-[#38bdf8] text-black font-bold'
                  : 'bg-white/5 text-[#AAAAAA] hover:bg-white/10'
              }`}
            >
              ANN Cov
            </button>
            <button
              onClick={() => handleSwitchAlgorithm('pso')}
              className={`px-1.5 py-1 rounded text-[9px] font-mono tracking-wider uppercase transition-colors cursor-pointer text-center ${
                algorithmMode === 'pso'
                  ? 'bg-emerald-500 text-black font-bold'
                  : 'bg-white/5 text-[#AAAAAA] hover:bg-white/10'
              }`}
            >
              PSO Hop
            </button>
            <button
              onClick={() => handleSwitchAlgorithm('standard')}
              className={`px-1.5 py-1 rounded text-[9px] font-mono tracking-wider uppercase transition-colors cursor-pointer text-center ${
                algorithmMode === 'standard'
                  ? 'bg-white text-black font-bold'
                  : 'bg-white/5 text-[#AAAAAA] hover:bg-white/10'
              }`}
            >
              Standard
            </button>
          </div>
        </div>
      </div>

      {/* Hovered Node Minimal Technical HUD Overlay */}
      {hoveredNode && (
        <div className="absolute top-16 right-4 p-3.5 rounded-xl bg-black/90 backdrop-blur-md border border-emerald-500/40 text-xs font-mono z-20 space-y-2 pointer-events-none shadow-2xl animate-in fade-in duration-200 min-w-[210px]">
          <div className="flex items-center justify-between pb-1.5 border-b border-white/10 text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
            <span>{hoveredNode.label}</span>
            <span>{hoveredNode.isClusterHead ? '★ CLUSTER HEAD' : hoveredNode.isSleeping ? 'SLEEP DUTY' : 'ACTIVE SENSOR'}</span>
          </div>

          <div className="space-y-1 text-[11px]">
            <div className="flex justify-between">
              <span className="text-[#888888]">Residual Energy:</span>
              <span className="font-bold text-white">{hoveredNode.energy} J</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">Cluster Group:</span>
              <span className="font-bold text-emerald-400">CH-0{hoveredNode.clusterId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">Distance to Sink:</span>
              <span className="text-white">{hoveredNode.distanceToSink} m</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#888888]">Packet Success:</span>
              <span className="text-white">{hoveredNode.pdr}%</span>
            </div>
            <div className="flex justify-between text-[9px] text-[#666666] pt-1">
              <span>Pos (X,Y,Z):</span>
              <span>[{hoveredNode.x.toFixed(1)}, {hoveredNode.y.toFixed(1)}, {hoveredNode.z.toFixed(1)}]</span>
            </div>
          </div>
        </div>
      )}

      {/* Floating Bottom Right Interactive Quick Actions */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 pointer-events-auto z-20">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="p-2.5 rounded-xl bg-black/80 hover:bg-black text-white border border-white/15 backdrop-blur-md transition-colors cursor-pointer shadow-lg"
          title={isPlaying ? 'Pause Simulation' : 'Resume Simulation'}
        >
          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 text-emerald-400" />}
        </button>

        <button
          onClick={handleResetCamera}
          className="p-2.5 rounded-xl bg-black/80 hover:bg-black text-white border border-white/15 backdrop-blur-md transition-colors cursor-pointer shadow-lg"
          title="Reset Camera Angle"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Subtle Hint on Top Center */}
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] font-mono text-[#777777] uppercase tracking-widest pointer-events-none hidden md:block">
        DRAG TO ROTATE 3D // SCROLL TO ZOOM // HOVER NODES TO INSPECT TELEMETRY
      </div>
    </div>
  );
};
