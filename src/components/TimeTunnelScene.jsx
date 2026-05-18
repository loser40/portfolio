/**
 * TimeTunnelScene.jsx — natural brightness fix
 */

import { useRef, useMemo, useEffect, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import { assetPath } from "../utils/assets";

function lerp(a, b, t) { return a + (b - a) * t; }

function TunnelRing({ z, radius = 4, color }) {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.z = clock.getElapsedTime() * 0.08 * (z % 2 === 0 ? 1 : -1);
  });
  return (
    <mesh ref={meshRef} position={[0, 0, z]} rotation={[0, 0, 0]}>
      <torusGeometry args={[radius, 0.08, 8, 80]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5}
        transparent opacity={0.55} side={THREE.DoubleSide} />
    </mesh>
  );
}

function Particles({ count = 180 }) {
  const points = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = 1.5 + Math.random() * 2.5;
      arr[i * 3] = Math.cos(angle) * r;
      arr[i * 3 + 1] = Math.sin(angle) * r;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 60;
    }
    return arr;
  }, [count]);
  useFrame(({ clock }) => {
    if (!points.current) return;
    points.current.rotation.z = clock.getElapsedTime() * 0.04;
  });
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.045} color="#a78bfa" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

function TimeMachinePlane({ mouseX, mouseY }) {
  const meshRef = useRef();
  const texture = useTexture(assetPath("/machine.png"));

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.position.y = Math.sin(t * 0.8) * 0.12;
    meshRef.current.position.x = Math.sin(t * 0.5) * 0.05;
    meshRef.current.rotation.y = lerp(meshRef.current.rotation.y, mouseX * 0.25, 0.06);
    meshRef.current.rotation.x = lerp(meshRef.current.rotation.x, -mouseY * 0.15, 0.06);
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <planeGeometry args={[5.2, 2.925]} />
      <meshStandardMaterial
        map={texture}
        transparent
        alphaTest={0.05}
        side={THREE.DoubleSide}
        emissiveMap={texture}
        emissive={"#ffffff"}
        emissiveIntensity={0.35}   // ← was 0.75, now subtle — natural colours
      />
    </mesh>
  );
}

export default function TimeTunnelScene({ scrollProgress }) {
  const { camera } = useThree();
  const cameraZ = useRef(5);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => setMouse({
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: (e.clientY / window.innerHeight) * 2 - 1,
    });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame(() => {
    const targetZ = 5 - scrollProgress * 25;
    cameraZ.current = lerp(cameraZ.current, targetZ, 0.05);
    camera.position.z = cameraZ.current;
    camera.position.x = lerp(camera.position.x, mouse.x * 0.3, 0.04);
    camera.position.y = lerp(camera.position.y, mouse.y * 0.2, 0.04);
    camera.lookAt(0, 0, cameraZ.current - 5);
  });

  const rings = useMemo(() => {
    const arr = [];
    const colors = ["#7c3aed", "#3b82f6", "#06b6d4", "#8b5cf6", "#2563eb"];
    for (let i = 0; i < 30; i++)
      arr.push({ z: -i * 2.5, radius: 3.5 + (i % 3) * 0.4, color: colors[i % colors.length] });
    return arr;
  }, []);

  return (
    <>
      {/* Natural balanced lighting — not too dark, not blown out */}
      <ambientLight intensity={0.9} />                       {/* was 1.8 — halved */}
      <pointLight position={[0, 0, 3]}   intensity={2.2} color="#ffffff" distance={15} decay={2} />
      <pointLight position={[-3, 2, -2]} intensity={1.0} color="#7c3aed" distance={12} decay={2} />
      <pointLight position={[3, -2, -5]} intensity={0.9} color="#06b6d4" distance={12} decay={2} />
      <pointLight position={[0, 3,  2]}  intensity={0.8} color="#a78bfa" distance={10} decay={2} />

      <fog attach="fog" args={["#0a0520", 8, 35]} />

      {rings.map((r, i) => <TunnelRing key={i} z={r.z} radius={r.radius} color={r.color} />)}
      <Particles count={200} />
      <TimeMachinePlane mouseX={mouse.x} mouseY={mouse.y} />
    </>
  );
}
