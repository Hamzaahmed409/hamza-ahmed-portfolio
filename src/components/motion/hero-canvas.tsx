"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

const PARTICLE_COUNT = 100;

function Particles({ active }: { active: boolean }) {
  const pointsRef = useRef<THREE.Points>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  const geometry = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const speeds = new Float32Array(PARTICLE_COUNT);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 12;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 4;
      speeds[i] = 0.15 + Math.random() * 0.35;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.userData.speeds = speeds;
    return geo;
  }, []);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        size: 0.045,
        color: "#7a9bc7",
        transparent: true,
        opacity: 0.55,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    [],
  );

  useEffect(() => {
    function onMove(e: PointerEvent) {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  useFrame((state) => {
    if (!active || !pointsRef.current) return;
    const t = state.clock.elapsedTime;
    const pos = geometry.attributes.position.array as Float32Array;
    const speeds = geometry.userData.speeds as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const ix = i * 3;
      const s = speeds[i];
      pos[ix + 1] += Math.sin(t * s + i) * 0.002;
      pos[ix] += Math.cos(t * s * 0.7 + i * 0.5) * 0.0015;
    }
    geometry.attributes.position.needsUpdate = true;
    pointsRef.current.rotation.y = mouse.current.x * 0.08;
    pointsRef.current.rotation.x = mouse.current.y * 0.05;
    pointsRef.current.position.x = mouse.current.x * 0.25;
    pointsRef.current.position.y = mouse.current.y * 0.15;

    const scale = size.width < 640 ? 0.85 : 1;
    pointsRef.current.scale.setScalar(scale);
  });

  return <points ref={pointsRef} geometry={geometry} material={material} />;
}

function SoftOrbs({ active }: { active: boolean }) {
  const group = useRef<THREE.Group>(null);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    function onMove(e: PointerEvent) {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    }
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  useFrame((state) => {
    if (!active || !group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.z = Math.sin(t * 0.12) * 0.08;
    group.current.position.x = THREE.MathUtils.lerp(
      group.current.position.x,
      mouse.current.x * 0.4,
      0.04,
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      mouse.current.y * 0.25,
      0.04,
    );
  });

  return (
    <group ref={group}>
      <mesh position={[-2.2, 0.8, -2]}>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshBasicMaterial color="#1b3a6b" transparent opacity={0.12} />
      </mesh>
      <mesh position={[2.6, -0.6, -2.5]}>
        <sphereGeometry args={[1.1, 32, 32]} />
        <meshBasicMaterial color="#8ba3c7" transparent opacity={0.1} />
      </mesh>
      <mesh position={[0.4, 1.4, -3]}>
        <sphereGeometry args={[0.7, 24, 24]} />
        <meshBasicMaterial color="#a8bdd8" transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

function Scene({ active }: { active: boolean }) {
  return (
    <>
      <ambientLight intensity={0.4} />
      <SoftOrbs active={active} />
      <Particles active={active} />
    </>
  );
}

export function HeroCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(true);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    function onChange() {
      setReduced(mq.matches);
    }
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0.05 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (reduced) return null;

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 opacity-70 dark:opacity-50"
      aria-hidden
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 6], fov: 45 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        style={{ width: "100%", height: "100%" }}
        frameloop={active ? "always" : "never"}
      >
        <Scene active={active} />
      </Canvas>
    </div>
  );
}
