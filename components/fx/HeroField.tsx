"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * HeroField — full-viewport 3D gold column scene (upcomers-style
 * hero with real geometry, lighting, and reflections).
 *
 * Behaviour:
 * - Hidden + paused in light mode.
 * - `prefers-reduced-motion` → one static frame, no loop.
 * - WebGL unavailable → no-op (CSS aurora fallback).
 * - Disposed on unmount.
 */

function createScene(host: HTMLDivElement) {
  const width = host.clientWidth || window.innerWidth;
  const height = host.clientHeight || window.innerHeight;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x0b0a07, 0.018);

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 200);
  camera.position.set(0, 5, 18);
  camera.lookAt(0, 2, 0);

  // ─── Materials ───
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.85,
    roughness: 0.18,
    envMapIntensity: 1.5,
  });
  const darkGoldMat = new THREE.MeshStandardMaterial({
    color: 0x8a6410,
    metalness: 0.9,
    roughness: 0.25,
    envMapIntensity: 1.2,
  });
  const brightGoldMat = new THREE.MeshStandardMaterial({
    color: 0xf5d570,
    metalness: 0.8,
    roughness: 0.15,
    envMapIntensity: 1.8,
  });

  // ─── Columns — grid of varying heights ───
  const columns: THREE.Mesh[] = [];
  const gridX = 9;
  const gridZ = 6;
  const spacingX = 2.4;
  const spacingZ = 2.8;

  for (let ix = 0; ix < gridX; ix++) {
    for (let iz = 0; iz < gridZ; iz++) {
      const x = (ix - (gridX - 1) / 2) * spacingX + (Math.random() - 0.5) * 0.6;
      const z = (iz - (gridZ - 1) / 2) * spacingZ - 3 + (Math.random() - 0.5) * 0.5;

      // Height varies — taller in center, shorter at edges
      const distFromCenter = Math.sqrt(
        Math.pow(ix - (gridX - 1) / 2, 2) + Math.pow(iz - (gridZ - 1) / 2, 2)
      );
      const baseHeight = 1.5 + Math.random() * 2.5;
      const centerBoost = Math.max(0, 3.5 - distFromCenter * 0.6);
      const h = baseHeight + centerBoost;

      const w = 0.8 + Math.random() * 0.7;
      const d = 0.8 + Math.random() * 0.7;

      const geo = new THREE.BoxGeometry(w, h, d);
      geo.translate(0, h / 2, 0);

      const matChoice = Math.random();
      const mat = matChoice < 0.5 ? goldMat : matChoice < 0.8 ? darkGoldMat : brightGoldMat;
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, 0, z);
      mesh.rotation.y = Math.random() * 0.3 - 0.15;
      scene.add(mesh);
      columns.push(mesh);
    }
  }

  // ─── Floor — dark reflective plane ───
  const floorGeo = new THREE.PlaneGeometry(80, 80);
  const floorMat = new THREE.MeshStandardMaterial({
    color: 0x0a0906,
    metalness: 0.95,
    roughness: 0.08,
    envMapIntensity: 0.8,
  });
  const floor = new THREE.Mesh(floorGeo, floorMat);
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = 0;
  scene.add(floor);

  // ─── Lighting ───
  // Key light — warm gold from top-right
  const keyLight = new THREE.DirectionalLight(0xf5d570, 2.5);
  keyLight.position.set(8, 15, 5);
  scene.add(keyLight);

  // Fill light — subtle gold from left
  const fillLight = new THREE.DirectionalLight(0xd4af37, 0.8);
  fillLight.position.set(-6, 8, 3);
  scene.add(fillLight);

  // Rim light — cool accent from behind
  const rimLight = new THREE.DirectionalLight(0x14b8a6, 0.6);
  rimLight.position.set(0, 6, -10);
  scene.add(rimLight);

  // Ambient — very low, let the lights do the work
  const ambient = new THREE.AmbientLight(0x1a1508, 0.4);
  scene.add(ambient);

  // Point glow — center hero glow
  const pointGlow = new THREE.PointLight(0xd4af37, 3, 25, 1.5);
  pointGlow.position.set(0, 4, 2);
  scene.add(pointGlow);

  // ─── Environment map (simple gradient for reflections) ───
  const envSize = 128;
  const envData = new Uint8Array(envSize * envSize * 4);
  for (let y = 0; y < envSize; y++) {
    for (let x = 0; x < envSize; x++) {
      const i = (y * envSize + x) * 4;
      const t = y / envSize;
      // Dark bottom → gold → dark top
      const r = Math.floor(10 + t * 180 * Math.sin(t * Math.PI));
      const g = Math.floor(9 + t * 130 * Math.sin(t * Math.PI));
      const b = Math.floor(6 + t * 30 * Math.sin(t * Math.PI));
      envData[i] = r;
      envData[i + 1] = g;
      envData[i + 2] = b;
      envData[i + 3] = 255;
    }
  }
  const envTexture = new THREE.DataTexture(envData, envSize, envSize, THREE.RGBAFormat);
  envTexture.mapping = THREE.EquirectangularReflectionMapping;
  envTexture.needsUpdate = true;
  scene.environment = envTexture;

  return { renderer, scene, camera, columns, pointGlow, envTexture };
}

export function HeroField({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;

    let disposed = false;
    let raf = 0;
    let running = false;
    let sceneData: ReturnType<typeof createScene> | null = null;

    const isLight = () => document.documentElement.classList.contains("light");
    const reduceMotion = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const build = () => {
      try {
        sceneData = createScene(host);
        const { renderer, scene, camera, columns, pointGlow } = sceneData;

        // Mouse tracking
        const mouse = { x: 0, y: 0 };
        const target = { x: 0, y: 0 };
        const onMove = (e: MouseEvent) => {
          mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
          mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener("mousemove", onMove, { passive: true });

        const onResize = () => {
          if (!renderer || disposed) return;
          const w = host.clientWidth || window.innerWidth;
          const h = host.clientHeight || window.innerHeight;
          renderer.setSize(w, h);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        };
        window.addEventListener("resize", onResize);

        const render = (time: number) => {
          if (disposed || !renderer) return;
          const t = time * 0.001;

          // Smooth camera orbit
          target.x += (mouse.x - target.x) * 0.02;
          target.y += (mouse.y - target.y) * 0.02;

          camera.position.x = target.x * 3;
          camera.position.y = 5 + target.y * 1.5;
          camera.lookAt(0, 2, 0);

          // Subtle column sway
          for (let i = 0; i < columns.length; i++) {
            const col = columns[i];
            col.rotation.z = Math.sin(t * 0.3 + i * 0.5) * 0.008;
          }

          // Pulsing point glow
          pointGlow.intensity = 2.5 + Math.sin(t * 0.8) * 0.8;

          renderer.render(scene, camera);
        };

        const frame = (time: number) => {
          if (disposed) return;
          render(time);
          raf = requestAnimationFrame(frame);
        };

        const start = () => {
          if (running || disposed) return;
          running = true;
          raf = requestAnimationFrame(frame);
        };
        const stop = () => {
          running = false;
          cancelAnimationFrame(raf);
        };

        const applyTheme = () => {
          if (!host) return;
          if (isLight()) {
            stop();
            host.style.opacity = "0";
          } else {
            host.style.opacity = "1";
            if (reduceMotion()) {
              stop();
              render(0);
            } else {
              start();
            }
          }
        };

        const observer = new MutationObserver(applyTheme);
        observer.observe(document.documentElement, {
          attributes: true,
          attributeFilter: ["class"],
        });

        applyTheme();

        return () => {
          disposed = true;
          stop();
          observer.disconnect();
          window.removeEventListener("mousemove", onMove);
          window.removeEventListener("resize", onResize);
          renderer.dispose();
          scene.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.geometry.dispose();
              child.material.dispose();
            }
          });
          sceneData?.envTexture.dispose();
          if (renderer.domElement.parentNode === host) {
            host.removeChild(renderer.domElement);
          }
        };
      } catch {
        return () => { disposed = true; };
      }
    };

    const cleanup = build();
    return cleanup;
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{ transition: "opacity 0.3s ease" }}
    />
  );
}
