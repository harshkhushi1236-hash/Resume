import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

/**
 * High-performance procedural WebGL centerpiece.
 * Renders:
 *  - Mode 'hero': Articulated 3D Robotic Finger over a forged obsidian pedestal with embers & rune ring.
 *                 Hovering over the finger triggers a power-grip curl & cyan tendon glow.
 *                 Clicking the finger invokes onSelectCenterpiece().
 *  - Mode 'armory': Interactive 3D artifact pedestal switching between:
 *                 'finger' (with live flexAngle slider), 'kart', 'fuelcell', and 'turbine'.
 */
export default function RoboticCanvas({
  mode = 'hero',
  activeModel = 'finger',
  flexAngle = 0.25,
  onHoverChange,
  onSelectCenterpiece
}) {
  const mountRef = useRef(null);
  const stateRef = useRef({
    mode,
    activeModel,
    flexAngle,
    isHovered: false,
    onHoverChange,
    onSelectCenterpiece
  });

  useEffect(() => {
    stateRef.current.mode = mode;
    stateRef.current.activeModel = activeModel;
    stateRef.current.flexAngle = flexAngle;
    stateRef.current.onHoverChange = onHoverChange;
    stateRef.current.onSelectCenterpiece = onSelectCenterpiece;
  }, [mode, activeModel, flexAngle, onHoverChange, onSelectCenterpiece]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Scene & Fog
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x07090d, 0.055);

    const camera = new THREE.PerspectiveCamera(
      42,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.35, 6.2);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: true
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // Dramatic God-of-War Rim & Forge Lighting
    const ambientLight = new THREE.AmbientLight(0x1e293b, 1.4);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xfff1dc, 2.6);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const rimAmber = new THREE.PointLight(0xf59e0b, 7.5, 14);
    rimAmber.position.set(-3.2, 2.2, -2.2);
    scene.add(rimAmber);

    const rimCyan = new THREE.PointLight(0x06b6d4, 5.5, 12);
    rimCyan.position.set(3.2, 0.6, 2.4);
    scene.add(rimCyan);

    // Shared PBR Materials
    const titaniumMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.88,
      roughness: 0.24
    });

    const darkSteelMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.35
    });

    const carbonMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.4,
      roughness: 0.65
    });

    const cyanGlowMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x06b6d4,
      emissiveIntensity: 1.6,
      metalness: 0.2,
      roughness: 0.2
    });

    const amberGlowMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      emissive: 0xd97706,
      emissiveIntensity: 1.4,
      metalness: 0.3,
      roughness: 0.25
    });

    // Forged Pedestal Base
    const pedestalGroup = new THREE.Group();
    pedestalGroup.position.set(0, -1.75, 0);
    scene.add(pedestalGroup);

    const baseDisk = new THREE.Mesh(
      new THREE.CylinderGeometry(1.65, 2.05, 0.28, 36),
      darkSteelMat
    );
    pedestalGroup.add(baseDisk);

    const runeRingGeo = new THREE.RingGeometry(1.75, 1.88, 64);
    const runeRingMat = new THREE.MeshBasicMaterial({
      color: 0xf59e0b,
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.55
    });
    const runeRing = new THREE.Mesh(runeRingGeo, runeRingMat);
    runeRing.rotation.x = -Math.PI / 2;
    runeRing.position.y = 0.16;
    pedestalGroup.add(runeRing);

    const outerPulseRing = new THREE.Mesh(
      new THREE.RingGeometry(2.08, 2.13, 64),
      new THREE.MeshBasicMaterial({
        color: 0x06b6d4,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.35
      })
    );
    outerPulseRing.rotation.x = -Math.PI / 2;
    outerPulseRing.position.y = 0.15;
    pedestalGroup.add(outerPulseRing);

    // =========================================================
    // 1. ARTICULATED ROBOTIC FINGER ASSEMBLY (MCP -> PIP -> DIP)
    // =========================================================
    const fingerRoot = new THREE.Group();
    fingerRoot.position.set(0, -1.35, 0);
    scene.add(fingerRoot);

    // Palm / Metacarpal Servo Housing
    const palmBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.95, 0.72, 0.68),
      darkSteelMat
    );
    palmBase.position.y = 0.36;
    fingerRoot.add(palmBase);

    const servoCore = new THREE.Mesh(
      new THREE.CylinderGeometry(0.22, 0.22, 0.78, 20),
      cyanGlowMat
    );
    servoCore.rotation.z = Math.PI / 2;
    servoCore.position.set(0, 0.42, 0);
    fingerRoot.add(servoCore);

    // Helper to build a phalanx link with joint drum & tendon conduit
    function createPhalanx(length, radiusTop, radiusBot) {
      const jointPivot = new THREE.Group();

      // Joint Pin Drum
      const drum = new THREE.Mesh(
        new THREE.CylinderGeometry(radiusBot * 1.08, radiusBot * 1.08, radiusBot * 2.15, 24),
        amberGlowMat
      );
      drum.rotation.z = Math.PI / 2;
      jointPivot.add(drum);

      // Outer Armor Shell
      const shell = new THREE.Mesh(
        new THREE.CylinderGeometry(radiusTop, radiusBot, length, 20),
        titaniumMat
      );
      shell.position.y = length / 2;
      jointPivot.add(shell);

      // Carbon Dorsal Plate
      const dorsal = new THREE.Mesh(
        new THREE.BoxGeometry(radiusBot * 1.3, length * 0.82, radiusBot * 0.55),
        carbonMat
      );
      dorsal.position.set(0, length / 2, -radiusBot * 0.72);
      jointPivot.add(dorsal);

      // Glowing Palmar Tendon Cable
      const tendon = new THREE.Mesh(
        new THREE.CylinderGeometry(0.032, 0.032, length * 0.92, 10),
        cyanGlowMat
      );
      tendon.position.set(0, length / 2, radiusBot * 0.85);
      jointPivot.add(tendon);

      return jointPivot;
    }

    // MCP Joint -> Proximal Phalanx
    const mcpPivot = createPhalanx(1.18, 0.31, 0.36);
    mcpPivot.position.set(0, 0.76, 0);
    fingerRoot.add(mcpPivot);

    // PIP Joint -> Middle Phalanx
    const pipPivot = createPhalanx(0.92, 0.25, 0.30);
    pipPivot.position.set(0, 1.18, 0);
    mcpPivot.add(pipPivot);

    // DIP Joint -> Distal Phalanx + Tactile Sensor Tip
    const dipPivot = createPhalanx(0.72, 0.19, 0.24);
    dipPivot.position.set(0, 0.92, 0);
    pipPivot.add(dipPivot);

    const sensorTip = new THREE.Mesh(
      new THREE.SphereGeometry(0.20, 20, 20),
      cyanGlowMat
    );
    sensorTip.position.set(0, 0.72, 0);
    dipPivot.add(sensorTip);

    // =========================================================
    // 2. GO-KART CHASSIS ASSEMBLY
    // =========================================================
    const kartGroup = new THREE.Group();
    kartGroup.visible = false;
    scene.add(kartGroup);

    const chassisPlate = new THREE.Mesh(
      new THREE.BoxGeometry(1.45, 0.14, 2.55),
      darkSteelMat
    );
    kartGroup.add(chassisPlate);

    const rollCage = new THREE.Mesh(
      new THREE.TorusGeometry(0.62, 0.055, 12, 28, Math.PI),
      amberGlowMat
    );
    rollCage.position.set(0, 0.12, -0.2);
    kartGroup.add(rollCage);

    const seat = new THREE.Mesh(
      new THREE.BoxGeometry(0.75, 0.65, 0.65),
      carbonMat
    );
    seat.position.set(0, 0.36, -0.25);
    seat.rotation.x = -0.22;
    kartGroup.add(seat);

    const wheelGeo = new THREE.CylinderGeometry(0.36, 0.36, 0.26, 24);
    const wheelPositions = [
      [-0.88, -0.05, 0.95],
      [0.88, -0.05, 0.95],
      [-0.95, -0.05, -0.95],
      [0.95, -0.05, -0.95]
    ];
    wheelPositions.forEach(([x, y, z]) => {
      const w = new THREE.Mesh(wheelGeo, titaniumMat);
      w.rotation.z = Math.PI / 2;
      w.position.set(x, y, z);
      kartGroup.add(w);
    });

    // =========================================================
    // 3. WATER FUEL CELL REACTOR ASSEMBLY
    // =========================================================
    const fuelCellGroup = new THREE.Group();
    fuelCellGroup.visible = false;
    scene.add(fuelCellGroup);

    const outerTank = new THREE.Mesh(
      new THREE.CylinderGeometry(0.85, 0.85, 2.2, 28, 1, true),
      new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        transparent: true,
        opacity: 0.25,
        metalness: 0.2,
        roughness: 0.1,
        side: THREE.DoubleSide
      })
    );
    fuelCellGroup.add(outerTank);

    for (let i = -3; i <= 3; i++) {
      const plate = new THREE.Mesh(
        new THREE.CylinderGeometry(0.62, 0.62, 0.06, 24),
        i % 2 === 0 ? titaniumMat : cyanGlowMat
      );
      plate.position.y = i * 0.24;
      fuelCellGroup.add(plate);
    }

    const topCap = new THREE.Mesh(
      new THREE.CylinderGeometry(0.92, 0.92, 0.18, 28),
      darkSteelMat
    );
    topCap.position.y = 1.15;
    fuelCellGroup.add(topCap);

    const botCap = topCap.clone();
    botCap.position.y = -1.15;
    fuelCellGroup.add(botCap);

    // =========================================================
    // 4. RAILWAY SURFACE BLASTING TURBINE / NOZZLE ASSEMBLY
    // =========================================================
    const turbineGroup = new THREE.Group();
    turbineGroup.visible = false;
    scene.add(turbineGroup);

    const rotorHub = new THREE.Mesh(
      new THREE.CylinderGeometry(0.45, 0.45, 1.6, 24),
      titaniumMat
    );
    rotorHub.rotation.z = Math.PI / 2;
    turbineGroup.add(rotorHub);

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI * 2;
      const blade = new THREE.Mesh(
        new THREE.BoxGeometry(0.14, 1.15, 0.42),
        i % 2 === 0 ? amberGlowMat : darkSteelMat
      );
      blade.position.set(0, Math.cos(angle) * 0.85, Math.sin(angle) * 0.85);
      blade.rotation.x = angle;
      turbineGroup.add(blade);
    }

    // =========================================================
    // ATMOSPHERIC FORGE EMBERS (PARTICLE SYSTEM)
    // =========================================================
    const emberCount = 140;
    const emberPositions = new Float32Array(emberCount * 3);
    const emberSpeeds = new Float32Array(emberCount);

    for (let i = 0; i < emberCount; i++) {
      emberPositions[i * 3] = (Math.random() - 0.5) * 9;
      emberPositions[i * 3 + 1] = (Math.random() - 0.5) * 6;
      emberPositions[i * 3 + 2] = (Math.random() - 0.5) * 7;
      emberSpeeds[i] = 0.004 + Math.random() * 0.012;
    }

    const emberGeo = new THREE.BufferGeometry();
    emberGeo.setAttribute('position', new THREE.BufferAttribute(emberPositions, 3));
    const emberMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.045,
      transparent: true,
      opacity: 0.75
    });
    const embers = new THREE.Points(emberGeo, emberMat);
    scene.add(embers);

    // =========================================================
    // RAYCASTING FOR HOVER POP-OUT & CLICK INTERACTION
    // =========================================================
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2(-99, -99);
    const mouseParallax = { x: 0, y: 0 };

    const handlePointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      mouseParallax.x = pointer.x;
      mouseParallax.y = pointer.y;
    };

    const handleClick = () => {
      if (stateRef.current.mode === 'hero' && stateRef.current.isHovered) {
        if (stateRef.current.onSelectCenterpiece) {
          stateRef.current.onSelectCenterpiece();
        }
      }
    };

    renderer.domElement.addEventListener('pointermove', handlePointerMove);
    renderer.domElement.addEventListener('click', handleClick);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // =========================================================
    // ANIMATION LOOP
    // =========================================================
    let frameId;
    const clock = new THREE.Clock();
    let currentCurl = 0.18;
    let currentScale = 1.0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const { mode: curMode, activeModel: curModel, flexAngle: curFlex } = stateRef.current;

      // Toggle visible model based on page & selection
      fingerRoot.visible = curMode === 'hero' || curModel === 'finger';
      kartGroup.visible = curMode === 'armory' && curModel === 'kart';
      fuelCellGroup.visible = curMode === 'armory' && curModel === 'fuelcell';
      turbineGroup.visible = curMode === 'armory' && curModel === 'turbine';

      // Hover detection on Hero centerpiece
      if (curMode === 'hero') {
        raycaster.setFromCamera(pointer, camera);
        const hits = raycaster.intersectObjects(fingerRoot.children, true);
        const hoveredNow = hits.length > 0;
        if (hoveredNow !== stateRef.current.isHovered) {
          stateRef.current.isHovered = hoveredNow;
          renderer.domElement.style.cursor = hoveredNow ? 'pointer' : 'default';
          if (stateRef.current.onHoverChange) {
            stateRef.current.onHoverChange(hoveredNow);
          }
        }
      } else {
        renderer.domElement.style.cursor = 'default';
      }

      // Target curl & pop-out scale
      const targetCurl =
        curMode === 'hero'
          ? stateRef.current.isHovered
            ? 0.82
            : 0.18 + Math.sin(elapsed * 1.8) * 0.06
          : curFlex;

      const targetScale =
        curMode === 'hero' && stateRef.current.isHovered ? 1.12 : 1.0;

      currentCurl += (targetCurl - currentCurl) * 0.09;
      currentScale += (targetScale - currentScale) * 0.09;

      // Apply biomechanical joint flexion (MCP, PIP, DIP ratios)
      mcpPivot.rotation.x = currentCurl * 0.68;
      pipPivot.rotation.x = currentCurl * 0.92;
      dipPivot.rotation.x = currentCurl * 0.78;

      fingerRoot.scale.setScalar(currentScale);
      fingerRoot.rotation.y =
        curMode === 'hero'
          ? Math.sin(elapsed * 0.5) * 0.35 + mouseParallax.x * 0.35
          : elapsed * 0.45;

      // Dynamic Tendon Glow Intensity
      cyanGlowMat.emissiveIntensity =
        curMode === 'hero' && stateRef.current.isHovered
          ? 2.8 + Math.sin(elapsed * 10) * 0.5
          : 1.5;

      // Rotate secondary Armory models
      if (kartGroup.visible) {
        kartGroup.rotation.y = elapsed * 0.45;
        kartGroup.position.y = Math.sin(elapsed * 1.5) * 0.1;
      }
      if (fuelCellGroup.visible) {
        fuelCellGroup.rotation.y = elapsed * 0.55;
        fuelCellGroup.position.y = Math.sin(elapsed * 1.8) * 0.12;
      }
      if (turbineGroup.visible) {
        turbineGroup.rotation.y = elapsed * 0.35;
        turbineGroup.rotation.x = elapsed * 1.4;
      }

      // Pedestal Rune Ring Animation
      runeRing.rotation.z = elapsed * 0.25;
      outerPulseRing.rotation.z = -elapsed * 0.18;
      const ringScale =
        curMode === 'hero' && stateRef.current.isHovered
          ? 1.18 + Math.sin(elapsed * 6) * 0.04
          : 1.0;
      outerPulseRing.scale.setScalar(ringScale);

      // Drift Forge Embers upward
      const posArr = emberGeo.attributes.position.array;
      for (let i = 0; i < emberCount; i++) {
        posArr[i * 3 + 1] += emberSpeeds[i];
        if (posArr[i * 3 + 1] > 3.2) {
          posArr[i * 3 + 1] = -2.8;
        }
      }
      emberGeo.attributes.position.needsUpdate = true;

      // Camera Framing (Shift slightly right on Hero so left God-of-War menu is crystal clear)
      const targetCamX = curMode === 'hero' ? -1.15 + mouseParallax.x * 0.25 : -0.9;
      const targetCamY = curMode === 'hero' ? 1.15 + mouseParallax.y * 0.2 : 1.35;
      const targetCamZ = curMode === 'hero' ? 5.6 : 5.2;

      camera.position.x += (targetCamX - camera.position.x) * 0.06;
      camera.position.y += (targetCamY - camera.position.y) * 0.06;
      camera.position.z += (targetCamZ - camera.position.z) * 0.06;
      camera.lookAt(curMode === 'hero' ? -0.45 : -0.35, -0.15, 0);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointermove', handlePointerMove);
      renderer.domElement.removeEventListener('click', handleClick);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="fixed inset-0 z-0 w-full h-full"
      aria-label="Interactive 3D Mechanical Engineering Viewport"
    />
  );
}
