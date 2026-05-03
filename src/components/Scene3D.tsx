"use client";

import { useRef, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Html, Line } from "@react-three/drei";
import * as THREE from "three";

const SKILLS = [
  { name: "Unity", color: "#00d1e1" },
  { name: "VR", color: "#8b5cf6" },
  { name: "C#", color: "#239120" },
  { name: "Gorilla Tag", color: "#22c55e" },
  { name: "Physics", color: "#f97316" },
  { name: "Next.js", color: "#ffffff" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "Node.js", color: "#339933" },
  { name: "React", color: "#61DAFB" },
  { name: "Tailwind", color: "#06B6D4" },
  { name: "Git", color: "#F05032" },
  { name: "Hurricane VR", color: "#14b8a6" },
  { name: "Gameplay", color: "#fb7185" },
];

function fibonacciSphere(
  n: number,
  radius: number
): [number, number, number][] {
  const points: [number, number, number][] = [];
  const phi = Math.PI * (Math.sqrt(5) - 1);
  for (let i = 0; i < n; i++) {
    const y = 1 - (i / (n - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = phi * i;
    points.push([
      Math.cos(theta) * r * radius,
      y * radius,
      Math.sin(theta) * r * radius,
    ]);
  }
  return points;
}

function Core() {
  const innerRef = useRef<THREE.Mesh>(null);
  const outerRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (innerRef.current) {
      innerRef.current.rotation.x = t * 0.15;
      innerRef.current.rotation.y = t * 0.2;
      const s = 1 + Math.sin(t * 0.5) * 0.08;
      innerRef.current.scale.setScalar(s);
    }
    if (outerRef.current) {
      outerRef.current.rotation.x = -t * 0.1;
      outerRef.current.rotation.z = t * 0.12;
    }
    if (glowRef.current) {
      const gs = 1.2 + Math.sin(t * 0.8) * 0.15;
      glowRef.current.scale.setScalar(gs);
    }
  });

  return (
    <group>
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshBasicMaterial
          color="#f97316"
          transparent
          opacity={0.04}
        />
      </mesh>
      {/* Solid core */}
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[0.3, 1]} />
        <meshStandardMaterial
          color="#f97316"
          emissive="#f97316"
          emissiveIntensity={0.6}
          transparent
          opacity={0.4}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {/* Wireframe shell */}
      <mesh ref={outerRef}>
        <icosahedronGeometry args={[0.5, 1]} />
        <meshBasicMaterial wireframe color="#f97316" transparent opacity={0.2} />
      </mesh>
    </group>
  );
}

function SkillNode({
  position,
  skill,
  index,
  hoveredIndex,
  onHover,
  onUnhover,
}: {
  position: [number, number, number];
  skill: { name: string; color: string };
  index: number;
  hoveredIndex: number | null;
  onHover: () => void;
  onUnhover: () => void;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const isHovered = hoveredIndex === index;
  const anyHovered = hoveredIndex !== null;

  // Animate the ENTIRE group so mesh + label move together
  useFrame((state) => {
    if (!groupRef.current) return;
    const baseY = position[1];
    groupRef.current.position.y =
      baseY + Math.sin(state.clock.elapsedTime * 0.6 + index * 1.5) * 0.04;
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Hit area - larger invisible sphere for easier hovering */}
      <mesh
        onPointerEnter={(e) => {
          e.stopPropagation();
          onHover();
        }}
        onPointerLeave={onUnhover}
        visible={false}
      >
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshBasicMaterial transparent opacity={0} />
      </mesh>

      {/* Visible node */}
      <mesh>
        <sphereGeometry args={[isHovered ? 0.1 : 0.05, 16, 16]} />
        <meshStandardMaterial
          color={isHovered ? skill.color : "#f97316"}
          emissive={isHovered ? skill.color : "#f97316"}
          emissiveIntensity={isHovered ? 2 : 0.4}
          transparent
          opacity={anyHovered && !isHovered ? 0.3 : 1}
        />
      </mesh>

      {/* Hover ring */}
      {isHovered && (
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.16, 0.005, 8, 32]} />
          <meshBasicMaterial color={skill.color} transparent opacity={0.6} />
        </mesh>
      )}

      {/* Label - inside the same group, moves with the node */}
      <Html
        position={[0, 0.15, 0]}
        center
        sprite
        style={{ pointerEvents: "none", userSelect: "none" }}
      >
        <div
          style={{
            color: isHovered ? skill.color : "#888",
            fontSize: isHovered ? "12px" : "10px",
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: isHovered ? 700 : 500,
            whiteSpace: "nowrap",
            padding: isHovered ? "2px 8px" : "1px 4px",
            borderRadius: "4px",
            background: isHovered ? "rgba(0,0,0,0.8)" : "rgba(0,0,0,0.4)",
            border: isHovered ? `1px solid ${skill.color}50` : "1px solid transparent",
            textShadow: isHovered
              ? `0 0 10px ${skill.color}`
              : "none",
            transition: "all 0.2s ease",
            opacity: anyHovered && !isHovered ? 0.15 : 1,
          }}
        >
          {skill.name}
        </div>
      </Html>
    </group>
  );
}

function Connections({
  positions,
  hoveredIndex,
}: {
  positions: [number, number, number][];
  hoveredIndex: number | null;
}) {
  const lines = useMemo(() => {
    const result: { from: number; to: number; points: THREE.Vector3[] }[] = [];
    for (let i = 0; i < positions.length; i++) {
      for (let j = i + 1; j < positions.length; j++) {
        const dist = new THREE.Vector3(...positions[i]).distanceTo(
          new THREE.Vector3(...positions[j])
        );
        if (dist < 2.5) {
          result.push({
            from: i,
            to: j,
            points: [
              new THREE.Vector3(...positions[i]),
              new THREE.Vector3(...positions[j]),
            ],
          });
        }
      }
    }
    return result;
  }, [positions]);

  return (
    <>
      {lines.map((line, i) => {
        const isHighlighted =
          hoveredIndex !== null &&
          (line.from === hoveredIndex || line.to === hoveredIndex);
        return (
          <Line
            key={i}
            points={line.points}
            color={isHighlighted ? "#f97316" : "#f97316"}
            opacity={isHighlighted ? 0.4 : 0.05}
            transparent
            lineWidth={isHighlighted ? 1.5 : 0.5}
          />
        );
      })}
    </>
  );
}

function OrbitalRing({
  radius,
  speed,
  color,
  tilt,
}: {
  radius: number;
  speed: number;
  color: string;
  tilt: [number, number, number];
}) {
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.z = state.clock.elapsedTime * speed;
    }
  });

  return (
    <mesh ref={ref} rotation={tilt}>
      <torusGeometry args={[radius, 0.004, 8, 128]} />
      <meshBasicMaterial color={color} transparent opacity={0.12} />
    </mesh>
  );
}

function FloatingParticles({ count = 60 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: new THREE.Vector3(
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6,
        (Math.random() - 0.5) * 6
      ),
      speed: Math.random() * 0.5 + 0.2,
      offset: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame((state) => {
    if (!meshRef.current) return;
    particles.forEach((p, i) => {
      dummy.position.copy(p.position);
      dummy.position.y += Math.sin(state.clock.elapsedTime * p.speed + p.offset) * 0.1;
      const s = 0.015 + Math.sin(state.clock.elapsedTime * 0.5 + p.offset) * 0.008;
      dummy.scale.setScalar(s);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#f97316" transparent opacity={0.4} />
    </instancedMesh>
  );
}

function Scene() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const groupRef = useRef<THREE.Group>(null);

  const positions = useMemo(() => fibonacciSphere(SKILLS.length, 2.0), []);

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.0015;
    }
  });

  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1} color="#f97316" />
      <pointLight position={[-5, -3, -5]} intensity={0.5} color="#fb923c" />
      <pointLight position={[0, -5, 3]} intensity={0.3} color="#f59e0b" />

      <group ref={groupRef}>
        <Core />

        {SKILLS.map((skill, i) => (
          <SkillNode
            key={skill.name}
            position={positions[i]}
            skill={skill}
            index={i}
            hoveredIndex={hoveredIndex}
            onHover={() => setHoveredIndex(i)}
            onUnhover={() => setHoveredIndex(null)}
          />
        ))}

        <Connections positions={positions} hoveredIndex={hoveredIndex} />

        <OrbitalRing
          radius={1.2}
          speed={0.3}
          color="#f97316"
          tilt={[0.3, 0, 0]}
        />
        <OrbitalRing
          radius={2.5}
          speed={-0.15}
          color="#fb923c"
          tilt={[1.2, 0.5, 0]}
        />
        <OrbitalRing
          radius={3.0}
          speed={0.1}
          color="#f59e0b"
          tilt={[0.8, -0.3, 0.5]}
        />
      </group>

      <FloatingParticles />

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={false}
        maxPolarAngle={Math.PI / 1.4}
        minPolarAngle={Math.PI / 3.5}
        rotateSpeed={0.4}
      />
    </>
  );
}

export default function Scene3D() {
  return (
    <div className="h-full w-full" data-cursor="pointer">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}
