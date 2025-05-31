'use client';

import { Canvas, useThree } from '@react-three/fiber';
import {
  OrbitControls,
  Environment,
  useTexture,
} from '@react-three/drei';
import { Suspense, useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useChakra } from '../context/ChakraContext';
import { useLogging } from '../context/LoggingContext';
import ModelLoader from './ModelLoader';
import gsap from 'gsap';

/*******************************************************************
 *  CameraController – scroll/point-driven camera moves
 *******************************************************************/
function CameraController() {
  const { camera } = useThree();
  const { activePointId, chakraPoints } = useChakra();

  useEffect(() => {
    if (!activePointId) return;

    const activePoint = chakraPoints.find((p) => p.id === activePointId);
    if (!activePoint) return;

    gsap.to(camera.position, {
      x: activePoint.cameraPosition[0],
      y: activePoint.cameraPosition[1],
      z: activePoint.cameraPosition[2],
      duration: 1.5,
      ease: 'power2.inOut',
    });

    gsap.to({}, {
      duration: 1.5,
      ease: 'power2.inOut',
      onUpdate: () => camera.lookAt(0, 0, 0),
    });
  }, [activePointId, chakraPoints, camera]);

  return null;
}

/*******************************************************************
 *  SudarshanChakra – tries to load the GLB, otherwise shows a Vedic
 *  fallback. When the GLB loads we replace its materials with the
 *  gold PBR + emissive core textures we generated earlier.
 *******************************************************************/
function SudarshanChakra() {
  const groupRef = useRef<THREE.Group>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const logging = useLogging();
  const [modelLoaded, setModelLoaded] = useState(false);

  /* ---------- Load PBR textures ---------- */
  const [goldBase, goldNormal, goldRough, coreEmissive] = useTexture([
    '/textures/gold_basecolor.png',
    '/textures/gold_normal.png',
    '/textures/gold_roughness.png',
    '/textures/blue_core_emissive.png',
  ]);

  // Create reusable materials (memoised)
  const goldMaterial = new THREE.MeshStandardMaterial({
    map: goldBase,
    normalMap: goldNormal,
    roughnessMap: goldRough,
    metalness: 1,
    roughness: 0.25,
  });

  const coreMaterial = new THREE.MeshStandardMaterial({
    emissive: new THREE.Color(0x3399ff),
    emissiveMap: coreEmissive,
    emissiveIntensity: 2,
    metalness: 0,
    roughness: 0.5,
  });

  /* ---------- Callbacks ---------- */
  const applyMaterials = (root: THREE.Object3D) => {
    root.traverse((obj: any) => {
      if (!obj.isMesh) return;
      // Heuristic: sphere => core, everything else => blades & rings
      if (obj.geometry.type === 'SphereGeometry') {
        obj.material = coreMaterial;
      } else {
        obj.material = goldMaterial;
      }
      obj.castShadow = true;
      obj.receiveShadow = true;
    });
  };

  const handleModelLoad = () => {
    logging.info('Sudarshan Chakra GLB loaded');
    if (groupRef.current) applyMaterials(groupRef.current);
    setModelLoaded(true);
  };

  const handleModelError = (err: Error) => {
    logging.error('Failed to load Sudarshan Chakra GLB', {
      error: err.message,
    });
    setModelLoaded(false);
  };

  /* ---------- Simple idle rotation ---------- */
  useEffect(() => {
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (groupRef.current) groupRef.current.rotation.y += 0.01;
      if (glowRef.current) glowRef.current.rotation.y += 0.005;
    };
    animate();
    return () => cancelAnimationFrame(frameId);
  }, []);

  /* ---------- Procedural fallback (Vedic-style placeholder) ---------- */
  const fallbackChakra = (
      <group ref={groupRef}>
        {/* Outer glow */}
        <mesh ref={glowRef} position={[0, 0, -0.1]}>
          <torusGeometry args={[3.2, 0.4, 32, 100]} />
          <meshStandardMaterial
              color="#4B0082"
              emissive="#9370DB"
              emissiveIntensity={0.8}
              transparent
              opacity={0.6}
              side={THREE.DoubleSide}
          />
        </mesh>

        {/* Gold disc */}
        <mesh>
          <torusGeometry args={[3, 0.2, 32, 100]} />
          <meshStandardMaterial
              color="#FFD700"
              emissive="#FF6600"
              emissiveIntensity={0.7}
              metalness={0.8}
              roughness={0.2}
          />
        </mesh>

        {/* 108 spokes */}
        {Array.from({ length: 108 }).map((_, i) => (
            <mesh key={i} rotation={[0, (i / 108) * Math.PI * 2, 0]}>
              <boxGeometry args={[3, 0.08, 0.08]} />
              <meshStandardMaterial
                  color="#FFD700"
                  emissive="#FF6600"
                  emissiveIntensity={0.5}
              />
            </mesh>
        ))}

        {/* Core sphere */}
        <mesh>
          <sphereGeometry args={[0.5, 32, 32]} />
          <meshStandardMaterial
              color="#ffffff"
              emissive="#FFCC00"
              emissiveIntensity={1}
              metalness={0.9}
              roughness={0.1}
          />
        </mesh>

        {/* Fire rim */}
        <mesh position={[0, 0, 0.05]}>
          <ringGeometry args={[2.9, 3.1, 64]} />
          <meshStandardMaterial
              color="#FF3300"
              emissive="#FF6600"
              emissiveIntensity={1}
              transparent
              opacity={0.8}
          />
        </mesh>

        {/* Lights */}
        <pointLight position={[0, 0, 1]} intensity={2} color="#FF6600" distance={5} />
        <pointLight position={[0, 0, -1]} intensity={1} color="#4B0082" distance={8} />
      </group>
  );

  return (
      <group ref={groupRef}>
        <ModelLoader
            modelPath="/models/sudarshan_chakra_detailed.glb"
            fallbackComponent={fallbackChakra}
            onLoad={handleModelLoad}
            onError={handleModelError}
        />
      </group>
  );
}

/*******************************************************************
 *  Scene wrapper – provides lights, environment and controls
 *******************************************************************/
export default function ChakraScene() {
  return (
      <Canvas shadows camera={{ position: [0, 0, 10], fov: 45 }}>
        {/* Global lighting */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        <Suspense fallback={null}>
          <SudarshanChakra />
          <CameraController />
          <Environment preset="night" />
        </Suspense>

        {/* If you prefer manual view manipulation, uncomment: */}
        {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
      </Canvas>
  );
}
