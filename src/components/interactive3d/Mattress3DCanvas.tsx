import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { MATTRESS_LAYERS } from '../../data/interactive3DData';
import {
  createQuiltedFabricTexture,
  createEPFoamTexture,
  createReboundFoamTexture,
  createMemoryFoamTexture,
  createLatexPincoreTexture,
  createPocketSpringTexture,
  createNaturalCoirTexture,
  createMattressBorderTexture,
} from './threeTextures';

interface Mattress3DCanvasProps {
  isExploded: boolean;
  selectedLayerIndex: number;
  onSelectLayer: (index: number) => void;
  onToggleExplode: (exploded: boolean) => void;
  onProjectHotspots?: (hotspotPositions: Array<{ id: string; screenX: number; screenY: number; visible: boolean }>) => void;
}

export const Mattress3DCanvas: React.FC<Mattress3DCanvasProps> = ({
  isExploded,
  selectedLayerIndex,
  onSelectLayer,
  onToggleExplode,
  onProjectHotspots,
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [hasWebGL, setHasWebGL] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  // References to dynamic 3D elements for animation loop
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const layerMeshesRef = useRef<THREE.Mesh[]>([]);
  const outerBorderRef = useRef<THREE.Mesh | null>(null);
  const presentationLightRef = useRef<THREE.SpotLight | null>(null);

  // Animation target states
  const animStateRef = useRef({
    isExploded,
    selectedLayerIndex,
    currentExplodeProgress: isExploded ? 1 : 0,
    targetExplodeProgress: isExploded ? 1 : 0,
    cameraPos: new THREE.Vector3(3.8, 2.6, 5.2),
    targetCameraPos: new THREE.Vector3(3.8, 2.6, 5.2),
    cameraLookAt: new THREE.Vector3(0, 0.1, 0),
    targetCameraLookAt: new THREE.Vector3(0, 0.1, 0),
  });

  // Keep state updated in refs for the render loop
  useEffect(() => {
    animStateRef.current.isExploded = isExploded;
    animStateRef.current.selectedLayerIndex = selectedLayerIndex;
    animStateRef.current.targetExplodeProgress = isExploded ? 1 : 0;

    // Adjust camera target based on state
    if (!isExploded) {
      animStateRef.current.targetCameraPos.set(3.8, 2.6, 5.2);
      animStateRef.current.targetCameraLookAt.set(0, 0.1, 0);
    } else {
      // Focus slightly toward the selected layer or full exploded stack
      const activeLayer = MATTRESS_LAYERS[selectedLayerIndex];
      const targetY = activeLayer ? activeLayer.explodedY : 0.2;
      animStateRef.current.targetCameraPos.set(3.4, Math.max(1.8, targetY + 1.2), 4.5);
      animStateRef.current.targetCameraLookAt.set(0, targetY * 0.5, 0);
    }
  }, [isExploded, selectedLayerIndex]);

  // Main Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // WebGL support check
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        setHasWebGL(false);
        setIsLoading(false);
        return;
      }
    } catch {
      setHasWebGL(false);
      setIsLoading(false);
      return;
    }

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 50);
    camera.position.set(3.8, 2.6, 5.2);
    camera.lookAt(0, 0.1, 0);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // -------------------------------------------------------------
    // LIGHTING: Natural Daylight + Warm Bedside Lamps + Presentation Spotlight
    // -------------------------------------------------------------
    // 1. Soft Warm Ambient Fill
    const ambientLight = new THREE.AmbientLight(0xfff6ec, 0.85);
    scene.add(ambientLight);

    // 2. Large Window Morning Daylight (Directional)
    const windowDaylight = new THREE.DirectionalLight(0xfffbf2, 1.4);
    windowDaylight.position.set(-5, 7, 4);
    windowDaylight.castShadow = true;
    windowDaylight.shadow.mapSize.width = 1024;
    windowDaylight.shadow.mapSize.height = 1024;
    windowDaylight.shadow.camera.near = 0.5;
    windowDaylight.shadow.camera.far = 25;
    windowDaylight.shadow.bias = -0.0005;
    scene.add(windowDaylight);

    // 3. Warm Bedside Lamp 1 (Left nightstand)
    const leftLamp = new THREE.PointLight(0xff9e2a, 2.2, 7, 1.8);
    leftLamp.position.set(-2.8, 0.9, -1.2);
    scene.add(leftLamp);

    // 4. Warm Bedside Lamp 2 (Right nightstand)
    const rightLamp = new THREE.PointLight(0xff9e2a, 2.2, 7, 1.8);
    rightLamp.position.set(2.8, 0.9, -1.2);
    scene.add(rightLamp);

    // 5. Cinematic Exploded-View Presentation Key Spotlight (Smoothly ramps on when open)
    const presentationLight = new THREE.SpotLight(0xffefd2, isExploded ? 2.4 : 0.4, 12, Math.PI / 3, 0.4, 1.5);
    presentationLight.position.set(2.5, 4.5, 3.5);
    presentationLight.target.position.set(0, 0.2, 0);
    scene.add(presentationLight);
    scene.add(presentationLight.target);
    presentationLightRef.current = presentationLight;

    // -------------------------------------------------------------
    // BEDROOM ENVIRONMENT GEOMETRY: Bed Frame, Headboard, Nightstands, Lamps
    // -------------------------------------------------------------
    // 1. Floor
    const floorGeo = new THREE.PlaneGeometry(16, 16);
    const floorMat = new THREE.MeshStandardMaterial({
      color: 0x36271c,
      roughness: 0.85,
      metalness: 0.05,
    });
    const floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -1.15;
    floor.receiveShadow = true;
    scene.add(floor);

    // 2. Bed Base Platform (Upholstered Forest Green Velvet)
    const bedBaseGeo = new THREE.BoxGeometry(3.5, 0.42, 4.5);
    const bedBaseMat = new THREE.MeshStandardMaterial({
      color: 0x0c2f23, // Deep forest green
      roughness: 0.82,
      metalness: 0.08,
    });
    const bedBase = new THREE.Mesh(bedBaseGeo, bedBaseMat);
    bedBase.position.set(0, -0.65, 0);
    bedBase.castShadow = true;
    bedBase.receiveShadow = true;
    scene.add(bedBase);

    // 3. Tall Fluted Headboard
    const headboardGeo = new THREE.BoxGeometry(4.2, 2.2, 0.35);
    const headboardMat = new THREE.MeshStandardMaterial({
      color: 0x09261c, // Dark evergreen velvet
      roughness: 0.85,
      metalness: 0.05,
    });
    const headboard = new THREE.Mesh(headboardGeo, headboardMat);
    headboard.position.set(0, 0.45, -2.35);
    headboard.castShadow = true;
    scene.add(headboard);

    // Vertical fluting ribs on headboard
    for (let x = -1.8; x <= 1.8; x += 0.4) {
      const ribGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.1, 8);
      const ribMat = new THREE.MeshStandardMaterial({
        color: 0x061e16,
        roughness: 0.9,
      });
      const rib = new THREE.Mesh(ribGeo, ribMat);
      rib.position.set(x, 0.45, -2.18);
      scene.add(rib);
    }

    // 4. Nightstands (Natural Oak Finish)
    const nightstandGeo = new THREE.BoxGeometry(0.9, 0.7, 0.8);
    const nightstandMat = new THREE.MeshStandardMaterial({
      color: 0x423120, // Natural warm oak
      roughness: 0.75,
      metalness: 0.05,
    });

    const leftStand = new THREE.Mesh(nightstandGeo, nightstandMat);
    leftStand.position.set(-2.8, -0.6, -1.2);
    scene.add(leftStand);

    const rightStand = new THREE.Mesh(nightstandGeo, nightstandMat);
    rightStand.position.set(2.8, -0.6, -1.2);
    scene.add(rightStand);

    // 5. Bedside Lamps (Glowing Fabric Shades + Brass Bases)
    const createLamp = (x: number, z: number) => {
      const group = new THREE.Group();
      group.position.set(x, -0.25, z);

      // Brass base
      const baseGeo = new THREE.CylinderGeometry(0.14, 0.16, 0.04, 16);
      const brassMat = new THREE.MeshStandardMaterial({
        color: 0xbd8b43, // Champagne gold
        roughness: 0.3,
        metalness: 0.8,
      });
      const lampBase = new THREE.Mesh(baseGeo, brassMat);
      group.add(lampBase);

      // Brass stem
      const stemGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.45, 12);
      const stem = new THREE.Mesh(stemGeo, brassMat);
      stem.position.y = 0.22;
      group.add(stem);

      // Glowing linen lamp shade
      const shadeGeo = new THREE.CylinderGeometry(0.22, 0.28, 0.35, 24, 1, true);
      const shadeMat = new THREE.MeshStandardMaterial({
        color: 0xfff0d0,
        emissive: 0xffa438,
        emissiveIntensity: 0.85,
        roughness: 0.6,
        side: THREE.DoubleSide,
      });
      const shade = new THREE.Mesh(shadeGeo, shadeMat);
      shade.position.y = 0.52;
      group.add(shade);

      return group;
    };

    scene.add(createLamp(-2.8, -1.2));
    scene.add(createLamp(2.8, -1.2));

    // -------------------------------------------------------------
    // PROCEDURAL TEXTURES FOR MATTRESS
    // -------------------------------------------------------------
    const quiltedTex = createQuiltedFabricTexture();
    const epTex = createEPFoamTexture();
    const reboundTex = createReboundFoamTexture();
    const memoryTex = createMemoryFoamTexture();
    const latexTex = createLatexPincoreTexture();
    const springTex = createPocketSpringTexture();
    const coirTex = createNaturalCoirTexture();
    const borderTex = createMattressBorderTexture();

    // -------------------------------------------------------------
    // 7 PHYSICAL MATTRESS LAYER MESHES
    // -------------------------------------------------------------
    const layerMeshes: THREE.Mesh[] = [];

    MATTRESS_LAYERS.forEach((layerData, idx) => {
      const { dimensions } = layerData;
      // Use smooth rounded box or cylinder for layer geometry
      const layerGeo = new THREE.BoxGeometry(dimensions.width, dimensions.height, dimensions.depth);

      // Select specific procedural texture & material settings
      let layerMat: THREE.MeshStandardMaterial;

      switch (layerData.textureType) {
        case 'quilted':
          layerMat = new THREE.MeshStandardMaterial({
            map: quiltedTex,
            roughness: 0.85,
            metalness: 0.04,
            color: 0xfffcf7,
          });
          break;
        case 'foam-ep':
          layerMat = new THREE.MeshStandardMaterial({
            map: epTex,
            roughness: 0.72,
            metalness: 0.02,
            color: 0xf5efe6,
          });
          break;
        case 'foam-rebound':
          layerMat = new THREE.MeshStandardMaterial({
            map: reboundTex,
            roughness: 0.68,
            metalness: 0.02,
            color: 0xe8ede6,
          });
          break;
        case 'memory-foam':
          layerMat = new THREE.MeshStandardMaterial({
            map: memoryTex,
            roughness: 0.62,
            metalness: 0.03,
            color: 0xe6e0d3,
          });
          break;
        case 'latex-pincore':
          layerMat = new THREE.MeshStandardMaterial({
            map: latexTex,
            roughness: 0.58,
            metalness: 0.04,
            color: 0xdde7dd,
          });
          break;
        case 'pocket-springs':
          layerMat = new THREE.MeshStandardMaterial({
            map: springTex,
            roughness: 0.38,
            metalness: 0.42,
            color: 0xe6eaed,
          });
          break;
        case 'natural-coir':
          layerMat = new THREE.MeshStandardMaterial({
            map: coirTex,
            roughness: 0.95,
            metalness: 0.01,
            color: 0x825f3c,
          });
          break;
        default:
          layerMat = new THREE.MeshStandardMaterial({
            color: new THREE.Color(layerData.color),
            roughness: layerData.roughness,
            metalness: layerData.metalness,
          });
      }

      const layerMesh = new THREE.Mesh(layerGeo, layerMat);
      layerMesh.position.set(0, layerData.closedY, 0);
      layerMesh.castShadow = true;
      layerMesh.receiveShadow = true;
      layerMesh.userData = { layerIndex: idx, layerId: layerData.id };

      scene.add(layerMesh);
      layerMeshes.push(layerMesh);
    });

    layerMeshesRef.current = layerMeshes;

    // -------------------------------------------------------------
    // OUTER QUILTED PERIMETER CASING / BORDER (Visible when closed)
    // -------------------------------------------------------------
    const borderGeo = new THREE.BoxGeometry(3.22, 1.05, 4.22);
    // Cut open top & bottom by applying border material only to side faces
    const borderMatSide = new THREE.MeshStandardMaterial({
      map: borderTex,
      roughness: 0.8,
      metalness: 0.05,
    });
    const transparentMat = new THREE.MeshBasicMaterial({ transparent: true, opacity: 0 });
    // BoxGeometry materials: [px, nx, py, ny, pz, nz]
    const borderMaterials = [
      borderMatSide, // Right side
      borderMatSide, // Left side
      transparentMat, // Top (transparent to reveal quilted top)
      transparentMat, // Bottom
      borderMatSide, // Front (features embroidered Mindfree badge)
      borderMatSide, // Back
    ];
    const outerBorder = new THREE.Mesh(borderGeo, borderMaterials);
    outerBorder.position.set(0, 0.12, 0);
    outerBorder.castShadow = true;
    scene.add(outerBorder);
    outerBorderRef.current = outerBorder;

    setIsLoading(false);

    // -------------------------------------------------------------
    // INTERACTION: Raycasting on Hover & Click
    // -------------------------------------------------------------
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(layerMeshes);

      if (intersects.length > 0) {
        container.style.cursor = 'pointer';
      } else {
        container.style.cursor = 'default';
      }
    };

    const handleClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(layerMeshes);

      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const hitIndex = hit.userData.layerIndex;
        if (typeof hitIndex === 'number') {
          // If closed, open the mattress and select this layer!
          if (!animStateRef.current.isExploded) {
            onToggleExplode(true);
          }
          onSelectLayer(hitIndex);
        }
      } else {
        // Clicking outer mattress border when closed also opens it!
        const borderHits = raycaster.intersectObject(outerBorder);
        if (borderHits.length > 0 && !animStateRef.current.isExploded) {
          onToggleExplode(true);
          onSelectLayer(0);
        }
      }
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('click', handleClick);

    // -------------------------------------------------------------
    // ANIMATION & RENDER LOOP
    // -------------------------------------------------------------
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const anim = animStateRef.current;
      // Smoothly interpolate explode progress (0 = fully closed, 1 = fully exploded)
      anim.currentExplodeProgress += (anim.targetExplodeProgress - anim.currentExplodeProgress) * 0.08;

      // Smooth camera interpolation
      camera.position.lerp(anim.targetCameraPos, 0.06);
      anim.cameraLookAt.lerp(anim.targetCameraLookAt, 0.06);
      camera.lookAt(anim.cameraLookAt);

      // Smooth presentation spotlight intensity ramp
      if (presentationLightRef.current) {
        const targetIntensity = anim.isExploded ? 2.4 : 0.4;
        presentationLightRef.current.intensity += (targetIntensity - presentationLightRef.current.intensity) * 0.08;
      }

      // Smooth outer border fade/drop
      if (outerBorderRef.current) {
        // Border stays snug when closed; drops smoothly down when exploded
        outerBorderRef.current.position.y = 0.12 - anim.currentExplodeProgress * 1.2;
        // Fade opacity
        borderMaterials.forEach((mat) => {
          if (mat instanceof THREE.MeshStandardMaterial) {
            mat.transparent = true;
            mat.opacity = Math.max(0, 1 - anim.currentExplodeProgress * 1.4);
          }
        });
      }

      // Update positions for all 7 layer meshes
      const p = anim.currentExplodeProgress;
      layerMeshes.forEach((mesh, idx) => {
        const data = MATTRESS_LAYERS[idx];
        const isSelected = anim.isExploded && anim.selectedLayerIndex === idx;

        // Base interpolated Y position
        const targetLayerY = THREE.MathUtils.lerp(data.closedY, data.explodedY, p);
        // If selected layer, add slight extra lift/emphasis (+0.12)
        const selectedOffset = isSelected ? 0.12 : 0;

        mesh.position.y += (targetLayerY + selectedOffset - mesh.position.y) * 0.1;

        // Subtle hover/selected highlight
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat) {
          const targetEmissive = isSelected ? new THREE.Color(0x382810) : new THREE.Color(0x000000);
          mat.emissive.lerp(targetEmissive, 0.1);
        }
      });

      // Project 3D Hotspot Screen Coordinates for HUD
      if (onProjectHotspots && container) {
        const rect = container.getBoundingClientRect();
        const projected = MATTRESS_LAYERS.map((layer, idx) => {
          const mesh = layerMeshes[idx];
          if (!mesh) return { id: layer.id, screenX: 0, screenY: 0, visible: false };

          const worldPos = new THREE.Vector3(
            layer.hotspot.position[0],
            mesh.position.y,
            layer.hotspot.position[2]
          );
          worldPos.project(camera);

          const screenX = ((worldPos.x + 1) * rect.width) / 2;
          const screenY = ((-worldPos.y + 1) * rect.height) / 2;
          const visible = p > 0.4 && worldPos.z < 1.0;

          return { id: layer.id, screenX, screenY, visible };
        });

        onProjectHotspots(projected);
      }

      renderer.render(scene, camera);
    };

    animate();

    // -------------------------------------------------------------
    // RESIZE LISTENER
    // -------------------------------------------------------------
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // -------------------------------------------------------------
    // CLEANUP
    // -------------------------------------------------------------
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('click', handleClick);

      // Dispose Three.js objects
      scene.clear();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full min-h-[540px] lg:min-h-[640px] flex items-center justify-center select-none overflow-hidden">
      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full absolute inset-0 cursor-grab active:cursor-grabbing" />

      {/* Fallback for non-WebGL devices */}
      {!hasWebGL && (
        <div className="relative z-10 flex flex-col items-center justify-center p-8 bg-[#071F52]/80 backdrop-blur-md rounded-2xl text-center max-w-md mx-auto border border-[#E3262E]/30">
          <div className="w-12 h-12 rounded-full bg-[#E3262E]/20 flex items-center justify-center text-[#E3262E] mb-4">
            ✦
          </div>
          <h3 className="font-serif text-2xl text-[#F8FAFC] mb-2">3D Mattress Explorer</h3>
          <p className="text-sm text-[#F8FAFC]/70 mb-4">
            WebGL is not supported in this browser. You can still explore the individual material specifications below.
          </p>
          <img
            src="/images/mindfree/3d-bedroom-bg.webp"
            alt="Mindfree Luxury Mattress"
            className="w-full h-48 object-cover rounded-xl border border-white/10"
          />
        </div>
      )}

      {/* Loading Overlay */}
      {isLoading && hasWebGL && (
        <div className="absolute inset-0 bg-[#041230]/40 backdrop-blur-xs flex items-center justify-center pointer-events-none z-20">
          <div className="flex items-center gap-3 px-5 py-3 rounded-full bg-[#071F52]/90 border border-[#E3262E]/40 shadow-xl">
            <div className="w-4 h-4 border-2 border-[#E3262E] border-t-transparent rounded-full animate-spin" />
            <span className="text-xs uppercase tracking-widest text-[#F8FAFC]/90 font-medium">
              Initializing 3D Model...
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
