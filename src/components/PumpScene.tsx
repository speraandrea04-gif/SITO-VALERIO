"use client";
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshStandardMaterial } from "three";
import * as THREE from "three";

interface PumpProps {
  explode: number;
  rotation: number;
}

function PumpPart({
  geometry,
  color,
  metalness = 0.8,
  roughness = 0.2,
  position,
  rotation,
  explodeDir,
  explodeFactor,
}: {
  geometry: THREE.BufferGeometry;
  color: string;
  metalness?: number;
  roughness?: number;
  position: [number, number, number];
  rotation?: [number, number, number];
  explodeDir: [number, number, number];
  explodeFactor: number;
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (!mesh.current) return;
    mesh.current.position.set(
      position[0] + explodeDir[0] * explodeFactor,
      position[1] + explodeDir[1] * explodeFactor,
      position[2] + explodeDir[2] * explodeFactor
    );
  });

  return (
    <mesh ref={mesh} geometry={geometry} rotation={rotation ?? [0, 0, 0]}>
      <meshStandardMaterial color={color} metalness={metalness} roughness={roughness} />
    </mesh>
  );
}

export default function PumpScene({ explode, rotation }: PumpProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = rotation;
  });

  const geos = useMemo(() => ({
    // Main pump housing (big cylinder)
    housing: new THREE.CylinderGeometry(0.9, 0.9, 1.4, 32),
    // Housing end caps
    capFront: new THREE.CylinderGeometry(0.9, 0.9, 0.12, 32),
    capBack: new THREE.CylinderGeometry(0.9, 0.9, 0.12, 32),
    // Motor section
    motor: new THREE.CylinderGeometry(0.65, 0.65, 1.8, 32),
    motorCap: new THREE.CylinderGeometry(0.65, 0.65, 0.1, 32),
    // Impeller (star-like disc)
    impeller: new THREE.TorusGeometry(0.55, 0.12, 8, 6),
    impellerHub: new THREE.CylinderGeometry(0.18, 0.18, 0.3, 16),
    // Inlet pipe
    inlet: new THREE.CylinderGeometry(0.22, 0.22, 1.2, 16),
    inletFlange: new THREE.CylinderGeometry(0.35, 0.35, 0.1, 16),
    // Outlet pipe
    outlet: new THREE.CylinderGeometry(0.18, 0.18, 1.0, 16),
    outletFlange: new THREE.CylinderGeometry(0.3, 0.3, 0.1, 16),
    // Bolts
    bolt: new THREE.CylinderGeometry(0.06, 0.06, 0.4, 8),
    // Shaft
    shaft: new THREE.CylinderGeometry(0.08, 0.08, 3.2, 12),
    // Bearing
    bearing: new THREE.TorusGeometry(0.22, 0.08, 8, 16),
    // Cooling fins
    fin: new THREE.BoxGeometry(0.08, 1.8, 0.5),
  }), []);

  const e = explode;

  const boltAngles = [0, 60, 120, 180, 240, 300].map(a => (a * Math.PI) / 180);

  return (
    <group ref={groupRef}>
      {/* Main housing */}
      <PumpPart
        geometry={geos.housing}
        color="#4a90b8"
        metalness={0.9}
        roughness={0.15}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        explodeDir={[0, 0, 0]}
        explodeFactor={e}
      />

      {/* Front cap */}
      <PumpPart
        geometry={geos.capFront}
        color="#3a7aa0"
        position={[0, 0, 0.78]}
        rotation={[Math.PI / 2, 0, 0]}
        explodeDir={[0, 0, 1.2]}
        explodeFactor={e}
      />

      {/* Back cap */}
      <PumpPart
        geometry={geos.capBack}
        color="#3a7aa0"
        position={[0, 0, -0.78]}
        rotation={[Math.PI / 2, 0, 0]}
        explodeDir={[0, 0, -1.2]}
        explodeFactor={e}
      />

      {/* Motor */}
      <PumpPart
        geometry={geos.motor}
        color="#2d5a6e"
        metalness={0.85}
        roughness={0.2}
        position={[0, 0, -2.0]}
        rotation={[Math.PI / 2, 0, 0]}
        explodeDir={[0, 0, -1.8]}
        explodeFactor={e}
      />

      {/* Motor cap */}
      <PumpPart
        geometry={geos.motorCap}
        color="#1e3f4f"
        position={[0, 0, -3.0]}
        rotation={[Math.PI / 2, 0, 0]}
        explodeDir={[0, 0, -3.0]}
        explodeFactor={e}
      />

      {/* Impeller */}
      <PumpPart
        geometry={geos.impeller}
        color="#f97316"
        metalness={0.7}
        roughness={0.3}
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        explodeDir={[0, 0.8, 0.5]}
        explodeFactor={e}
      />

      {/* Impeller hub */}
      <PumpPart
        geometry={geos.impellerHub}
        color="#fb923c"
        position={[0, 0, 0]}
        rotation={[Math.PI / 2, 0, 0]}
        explodeDir={[0, 0.6, 0.4]}
        explodeFactor={e}
      />

      {/* Shaft */}
      <PumpPart
        geometry={geos.shaft}
        color="#94a3b8"
        metalness={1}
        roughness={0.1}
        position={[0, 0, -0.8]}
        rotation={[Math.PI / 2, 0, 0]}
        explodeDir={[0.8, 0, 0]}
        explodeFactor={e}
      />

      {/* Bearings */}
      <PumpPart
        geometry={geos.bearing}
        color="#cbd5e1"
        metalness={1}
        roughness={0.05}
        position={[0, 0, 0.5]}
        rotation={[Math.PI / 2, 0, 0]}
        explodeDir={[0.5, 1.0, 0.8]}
        explodeFactor={e}
      />
      <PumpPart
        geometry={geos.bearing}
        color="#cbd5e1"
        metalness={1}
        roughness={0.05}
        position={[0, 0, -1.5]}
        rotation={[Math.PI / 2, 0, 0]}
        explodeDir={[-0.5, 1.0, -0.8]}
        explodeFactor={e}
      />

      {/* Inlet pipe */}
      <PumpPart
        geometry={geos.inlet}
        color="#5ba3c9"
        position={[0, -1.5, 0.2]}
        rotation={[0, 0, 0]}
        explodeDir={[0, -1.5, 0]}
        explodeFactor={e}
      />
      <PumpPart
        geometry={geos.inletFlange}
        color="#4a90b8"
        position={[0, -2.15, 0.2]}
        explodeDir={[0, -1.8, 0]}
        explodeFactor={e}
      />

      {/* Outlet pipe */}
      <PumpPart
        geometry={geos.outlet}
        color="#5ba3c9"
        position={[1.2, 0.5, 0.2]}
        rotation={[0, 0, Math.PI / 3]}
        explodeDir={[1.5, 0.5, 0]}
        explodeFactor={e}
      />
      <PumpPart
        geometry={geos.outletFlange}
        color="#4a90b8"
        position={[1.85, 0.9, 0.2]}
        rotation={[0, 0, Math.PI / 3]}
        explodeDir={[2.0, 0.8, 0]}
        explodeFactor={e}
      />

      {/* Bolts around front cap */}
      {boltAngles.map((angle, i) => (
        <PumpPart
          key={i}
          geometry={geos.bolt}
          color="#64748b"
          metalness={0.9}
          roughness={0.1}
          position={[Math.cos(angle) * 1.05, Math.sin(angle) * 1.05, 0.78]}
          rotation={[Math.PI / 2, 0, 0]}
          explodeDir={[Math.cos(angle) * 0.8, Math.sin(angle) * 0.8, 1.5]}
          explodeFactor={e}
        />
      ))}

      {/* Cooling fins on motor */}
      {[0, 1, 2, 3].map((i) => (
        <PumpPart
          key={`fin-${i}`}
          geometry={geos.fin}
          color="#1e3f4f"
          metalness={0.7}
          roughness={0.3}
          position={[
            Math.cos((i * Math.PI) / 2) * 0.72,
            Math.sin((i * Math.PI) / 2) * 0.72,
            -2.0,
          ]}
          rotation={[0, 0, (i * Math.PI) / 2]}
          explodeDir={[
            Math.cos((i * Math.PI) / 2) * 1.2,
            Math.sin((i * Math.PI) / 2) * 1.2,
            -1.5,
          ]}
          explodeFactor={e}
        />
      ))}
    </group>
  );
}
