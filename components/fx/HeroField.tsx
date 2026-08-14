"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useScroll } from "framer-motion";

/**
 * HeroField — full-viewport 3D gold column skyline (upcomers-style hero).
 *
 * Cinematics:
 * - Entrance dolly: camera travels from (0, 4.2, 22) → resting (0, 5, 18)
 *   over ~2s expo-out as the staged DOM timeline plays (Hero.tsx owns the DOM
 *   choreography; this owns the WebGL).
 * - Scroll reaction: as the hero scrolls away, the camera dollies forward
 *   (z 18→14) and up (y 5→6.4) while fog thickens — the "hand-off" feel.
 * - Gold dust particle field (additive Points, shader drift + twinkle).
 * - Ambient idle: breathing grid rotation, gentle camera bob, pulsing point
 *   glow, slow teal rim glow orbiting behind the grid.
 * - Ground glow plane (radial gold wash under the grid).
 *
 * Behaviour:
 * - Hidden + paused in light mode.
 * - `prefers-reduced-motion` → one static resting frame, no loops, no intro.
 * - WebGL unavailable → no-op (CSS aurora fallback).
 * - Paused when the hero is off-screen (IntersectionObserver).
 * - Disposed on unmount.
 */

const EASE_OUT_EXPO = (p: number) => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p));
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function makeParticleTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,255,255,1)");
  g.addColorStop(0.35, "rgba(255,240,200,0.9)");
  g.addColorStop(1, "rgba(255,220,140,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

function makeGroundGlowTexture(): THREE.CanvasTexture {
  const size = 256;
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(212,175,55,0.85)");
  g.addColorStop(0.4, "rgba(138,100,16,0.35)");
  g.addColorStop(1, "rgba(138,100,16,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

/**
 * buildNebula — fullscreen domain-warped fbm aurora field (Rev 2).
 * Deepest layer of the scene: renders behind the column skyline, on the
 * render-loop clock only (zero input required). Gold ramp with a ≤15%
 * teal fringe; a screen-space "quiet zone" dims the region behind the
 * copy block so H1/CTA reading surfaces get engineered separation.
 */
function buildNebula(isMobile: boolean, width: number, height: number) {
  const octaves = isMobile ? 3 : 5;
  const uniforms = {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(width, height) },
    uAspect: { value: width / height },
    uQuietCenter: { value: new THREE.Vector2(isMobile ? 0.5 : 0.3, isMobile ? 0.34 : 0.5) },
    uQuietSize: { value: new THREE.Vector2(isMobile ? 0.9 : 0.62, isMobile ? 0.6 : 0.62) },
    uQuietStrength: { value: isMobile ? 0.45 : 0.5 },
    uTealBlend: { value: 0.15 },
    uOpacity: { value: 0 },
  };

  const mat = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      precision highp float;
      uniform float uTime;
      uniform vec2 uResolution;
      uniform float uAspect;
      uniform vec2 uQuietCenter;
      uniform vec2 uQuietSize;
      uniform float uQuietStrength;
      uniform float uTealBlend;
      uniform float uOpacity;
      varying vec2 vUv;

      #define OCTAVES ${octaves}

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
        for (int i = 0; i < OCTAVES; i++) {
          v += a * noise(p);
          p = rot * p * 2.02;
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = vUv;
        // isotropic noise space (aspect-corrected), slow clock scroll
        vec2 p = (uv - 0.5) * vec2(uAspect, 1.0) * 2.4;
        p += uTime * 0.045;

        // domain warp — the flowing aurora current (~50s morph cycle)
        vec2 q = vec2(fbm(p + uTime * 0.04), fbm(p - uTime * 0.055));
        vec2 r = vec2(
          fbm(p + 2.0 * q + vec2(1.7, 9.2) + uTime * 0.03),
          fbm(p + 2.0 * q + vec2(8.3, 2.8) - uTime * 0.035)
        );
        float f = fbm(p + 2.6 * r);

        // gold ramp: dark -> gold -> bright (thresholds match the ~0.2-0.5
        // range the warped fbm actually produces at this scale)
        vec3 dark = vec3(0.541, 0.392, 0.063);   // #8a6410
        vec3 gold = vec3(0.831, 0.686, 0.216);   // #d4af37
        vec3 bright = vec3(0.961, 0.835, 0.439); // #f5d570
        vec3 col = mix(dark, gold, smoothstep(0.15, 0.5, f));
        col = mix(col, bright, smoothstep(0.42, 0.62, f));

        // teal fringe (≤15% blend)
        vec3 teal = vec3(0.078, 0.722, 0.651);   // #14b8a6
        float fringe = smoothstep(0.3, 0.5, r.y) * (1.0 - smoothstep(0.5, 0.72, r.y));
        col = mix(col, teal, fringe * uTealBlend);

        // density alpha + vignette (ground the edges)
        float a = smoothstep(0.15, 0.55, f) * uOpacity;
        vec2 vd = (uv - 0.5) * vec2(uAspect, 1.0);
        a *= 1.0 - smoothstep(0.62, 0.95, length(vd));

        // quiet zone — dim behind the copy block (no hard edge)
        vec2 qd = (uv - uQuietCenter) / uQuietSize;
        float qmask = 1.0 - smoothstep(0.5, 1.0, length(qd));
        col *= 1.0 - uQuietStrength * qmask;
        a *= 1.0 - uQuietStrength * 0.85 * qmask;

        // scaled under the column rim-light luminance budget
        gl_FragColor = vec4(col * a * 0.75, a);
      }
    `,
  });

  const geo = new THREE.PlaneGeometry(220, 90);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(0, 2.5, -40);
  mesh.rotation.x = 0.04; // face the camera's downward gaze
  return { mesh, uniforms };
}

function createScene(host: HTMLDivElement, isMobile: boolean) {
  const width = host.clientWidth || window.innerWidth;
  const height = host.clientHeight || window.innerHeight;

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.5 : 2));
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const fog = new THREE.FogExp2(0x0b0a07, 0.018);
  scene.fog = fog;

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 200);
  camera.position.set(0, 5, 18);
  camera.lookAt(0, 2, 0);

  // ─── Materials ───
  const goldMat = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    metalness: 0.85,
    roughness: 0.18,
    emissive: 0x3a2c08,
    emissiveIntensity: 0.35,
    envMapIntensity: 1.5,
  });
  const darkGoldMat = new THREE.MeshStandardMaterial({
    color: 0x8a6410,
    metalness: 0.9,
    roughness: 0.25,
    emissive: 0x2a1f06,
    emissiveIntensity: 0.3,
    envMapIntensity: 1.2,
  });
  const brightGoldMat = new THREE.MeshStandardMaterial({
    color: 0xf5d570,
    metalness: 0.8,
    roughness: 0.15,
    emissive: 0x554010,
    emissiveIntensity: 0.4,
    envMapIntensity: 1.8,
  });

  // ─── Columns — grid of varying heights (mature skyline) ───
  const grid = new THREE.Group();
  const columns: THREE.Mesh[] = [];
  const gridX = isMobile ? 5 : 9;
  const gridZ = isMobile ? 4 : 6;
  const spacingX = isMobile ? 2.8 : 2.4;
  const spacingZ = isMobile ? 3.4 : 2.8;

  for (let ix = 0; ix < gridX; ix++) {
    for (let iz = 0; iz < gridZ; iz++) {
      const x = (ix - (gridX - 1) / 2) * spacingX + (Math.random() - 0.5) * 0.6;
      const z = (iz - (gridZ - 1) / 2) * spacingZ - 3 + (Math.random() - 0.5) * 0.5;

      // Height varies — taller in center, shorter at edges. Back rows (low iz)
      // shrink further so the grid reads as a misty skyline fading into fog.
      const distFromCenter = Math.sqrt(
        Math.pow(ix - (gridX - 1) / 2, 2) + Math.pow(iz - (gridZ - 1) / 2, 2)
      );
      const backAmount = (gridZ - 1 - iz) / (gridZ - 1); // 1 = farthest from camera
      const baseHeight = 1.5 + Math.random() * 2.5;
      const centerBoost = Math.max(0, 3.5 - distFromCenter * 0.6);
      const h = (baseHeight + centerBoost) * (1 - backAmount * 0.28);

      const w = 0.8 + Math.random() * 0.7;
      const d = 0.8 + Math.random() * 0.7;

      const geo = new THREE.BoxGeometry(w, h, d);
      geo.translate(0, h / 2, 0);

      const matChoice = Math.random();
      const mat = matChoice < 0.5 ? goldMat : matChoice < 0.8 ? darkGoldMat : brightGoldMat;
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, 0, z);
      mesh.rotation.y = Math.random() * 0.3 - 0.15;
      grid.add(mesh);
      columns.push(mesh);
    }
  }
  scene.add(grid);

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

  // ─── Ground glow — soft gold wash under the grid (anchors the glow) ───
  const glowGeo = new THREE.PlaneGeometry(46, 30);
  const glowMat = new THREE.MeshBasicMaterial({
    map: makeGroundGlowTexture(),
    transparent: true,
    opacity: 0.4,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  glow.rotation.x = -Math.PI / 2;
  glow.position.y = 0.06;
  scene.add(glow);

  // ─── Nebula field (Rev 2) — deepest layer, renders behind the skyline ───
  const { mesh: nebula, uniforms: nebulaUniforms } = buildNebula(isMobile, width, height);
  scene.add(nebula);

  // ─── Gold dust particles (additive Points, shader drift + twinkle) ───
  const COUNT = isMobile ? 120 : 320;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(COUNT * 3);
  const pSeed = new Float32Array(COUNT);
  const pSize = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    pPos[i * 3] = (Math.random() - 0.5) * 30;
    pPos[i * 3 + 1] = Math.random() * 14;
    pPos[i * 3 + 2] = (Math.random() - 0.5) * 20;
    pSeed[i] = Math.random() * Math.PI * 2;
    pSize[i] = 0.5 + Math.random() * 1.1;
  }
  pGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
  pGeo.setAttribute("aSeed", new THREE.BufferAttribute(pSeed, 1));
  pGeo.setAttribute("aSize", new THREE.BufferAttribute(pSize, 1));

  const particleUniforms = {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(0xf5d570) },
    uOpacity: { value: isMobile ? 0.5 : 0.7 },
  };
  const particleMat = new THREE.ShaderMaterial({
    uniforms: particleUniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: `
      attribute float aSeed;
      attribute float aSize;
      uniform float uTime;
      varying float vAlpha;
      void main() {
        vec3 p = position;
        // Upward drift, wrapping at the top
        p.y = mod(p.y + uTime * 0.35 + aSeed * 0.1, 14.0);
        p.x += sin(uTime * 0.25 + aSeed) * 0.3;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = aSize * (150.0 / -mv.z);
        vAlpha = 0.2 + 0.6 * abs(sin(uTime * 0.6 + aSeed * 2.0));
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uOpacity;
      varying float vAlpha;
      void main() {
        vec2 c = gl_PointCoord - 0.5;
        float d = length(c);
        float alpha = smoothstep(0.5, 0.05, d) * vAlpha * uOpacity;
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
  });
  const particles = new THREE.Points(pGeo, particleMat);
  scene.add(particles);

  // ─── Particle stream B (Rev 2) — lateral flow along the nebula current ───
  // Sparse, low-opacity cloud drifting sideways so motion is visible at a
  // glance; depth-tested behind the columns but in front of the nebula quad.
  const SCOUNT = isMobile ? 60 : 140;
  const sGeo = new THREE.BufferGeometry();
  const sPos = new Float32Array(SCOUNT * 3);
  const sSeed = new Float32Array(SCOUNT);
  const sSize = new Float32Array(SCOUNT);
  for (let i = 0; i < SCOUNT; i++) {
    sPos[i * 3] = (Math.random() - 0.5) * 30;
    sPos[i * 3 + 1] = 3 + Math.random() * 13;
    sPos[i * 3 + 2] = -38 + Math.random() * 18;
    sSeed[i] = Math.random() * Math.PI * 2;
    sSize[i] = 0.4 + Math.random() * 0.9;
  }
  sGeo.setAttribute("position", new THREE.BufferAttribute(sPos, 3));
  sGeo.setAttribute("aSeed", new THREE.BufferAttribute(sSeed, 1));
  sGeo.setAttribute("aSize", new THREE.BufferAttribute(sSize, 1));

  const streamUniforms = {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(0xf5d570) },
    uOpacity: { value: isMobile ? 0.22 : 0.3 },
    uResolution: { value: new THREE.Vector2(width, height) },
    uQuietCenter: { value: new THREE.Vector2(isMobile ? 0.5 : 0.3, isMobile ? 0.34 : 0.5) },
    uQuietSize: { value: new THREE.Vector2(isMobile ? 0.9 : 0.62, isMobile ? 0.6 : 0.62) },
    uQuietStrength: { value: isMobile ? 0.45 : 0.5 },
  };
  const streamMat = new THREE.ShaderMaterial({
    uniforms: streamUniforms,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexShader: `
      attribute float aSeed;
      attribute float aSize;
      uniform float uTime;
      varying float vAlpha;
      void main() {
        vec3 p = position;
        // lateral drift along the nebula current, wrap-around
        p.x = mod(p.x + uTime * 0.15 + aSeed * 0.25, 30.0) - 15.0;
        p.y += sin(uTime * 0.2 + aSeed * 2.0) * 0.4;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = aSize * (90.0 / -mv.z);
        vAlpha = 0.3 + 0.35 * sin(uTime * 0.5 + aSeed * 3.0);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform vec2 uResolution;
      uniform vec2 uQuietCenter;
      uniform vec2 uQuietSize;
      uniform float uQuietStrength;
      varying float vAlpha;
      void main() {
        vec2 c = gl_PointCoord - 0.5;
        float d = length(c);
        float alpha = smoothstep(0.5, 0.05, d) * vAlpha * uOpacity;
        vec2 uv = gl_FragCoord.xy / uResolution;
        vec2 qd = (uv - uQuietCenter) / uQuietSize;
        float qmask = 1.0 - smoothstep(0.5, 1.0, length(qd));
        alpha *= 1.0 - uQuietStrength * qmask;
        gl_FragColor = vec4(uColor, alpha);
      }
    `,
  });
  const stream = new THREE.Points(sGeo, streamMat);
  scene.add(stream);

  // ─── Lighting ───
  const keyLight = new THREE.DirectionalLight(0xf5d570, 2.5);
  keyLight.position.set(8, 15, 5);
  scene.add(keyLight);

  const fillLight = new THREE.DirectionalLight(0xd4af37, 0.8);
  fillLight.position.set(-6, 8, 3);
  scene.add(fillLight);

  const rimLight = new THREE.DirectionalLight(0x14b8a6, 0.6);
  rimLight.position.set(0, 6, -10);
  scene.add(rimLight);

  const ambient = new THREE.AmbientLight(0x1a1508, 0.4);
  scene.add(ambient);

  const pointGlow = new THREE.PointLight(0xd4af37, 3, 25, 1.5);
  pointGlow.position.set(0, 4, 2);
  scene.add(pointGlow);

  // Slow teal rim glow orbiting behind the grid (subtle depth accent)
  const orbitGlow = new THREE.PointLight(0x14b8a6, 0.2, 30, 1.5);
  scene.add(orbitGlow);

  // ─── Environment map (simple gradient for reflections) ───
  const envSize = 128;
  const envData = new Uint8Array(envSize * envSize * 4);
  for (let y = 0; y < envSize; y++) {
    for (let x = 0; x < envSize; x++) {
      const i = (y * envSize + x) * 4;
      const t = y / envSize;
      envData[i] = Math.floor(10 + t * 180 * Math.sin(t * Math.PI));
      envData[i + 1] = Math.floor(9 + t * 130 * Math.sin(t * Math.PI));
      envData[i + 2] = Math.floor(6 + t * 30 * Math.sin(t * Math.PI));
      envData[i + 3] = 255;
    }
  }
  const envTexture = new THREE.DataTexture(envData, envSize, envSize, THREE.RGBAFormat);
  envTexture.mapping = THREE.EquirectangularReflectionMapping;
  envTexture.needsUpdate = true;
  scene.environment = envTexture;

  return {
    renderer,
    scene,
    camera,
    fog,
    columns,
    grid,
    particles,
    particleUniforms,
    nebula,
    nebulaUniforms,
    stream,
    streamUniforms,
    pointGlow,
    orbitGlow,
    glowMat,
    envTexture,
  };
}

export function HeroField({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

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
        const isMobile = window.innerWidth < 768;
        sceneData = createScene(host, isMobile);
        const { renderer, scene, camera, fog, columns, grid, particleUniforms, nebulaUniforms, streamUniforms, pointGlow, orbitGlow } = sceneData;

        // Mobile profile: camera sits higher & wider so the grid is a backdrop
        // band, not a wall (plan §4.5).
        const camStartY = isMobile ? 5 : 4.2;
        const camStartZ = isMobile ? 24 : 22;
        const camRestY = isMobile ? 6 : 5;
        const camRestZ = isMobile ? 20 : 18;

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
          nebulaUniforms.uResolution.value.set(w, h);
          nebulaUniforms.uAspect.value = w / h;
          streamUniforms.uResolution.value.set(w, h);
        };
        window.addEventListener("resize", onResize);

        // Pause the loop when the hero is off-screen (battery + focus)
        let heroVisible = true;
        const io = new IntersectionObserver(
          (entries) => {
            heroVisible = entries[0].isIntersecting;
            if (!heroVisible) stop();
            else if (!disposed && !document.documentElement.classList.contains("light") && !reduceMotion()) start();
          },
          { threshold: 0.02 }
        );
        io.observe(host);

        // Composed render: pure function of a simulation time `simT` (seconds
        // from mount). Passive layers (autonomous drift, nebula, streams) run on
        // the clock; pointer parallax + scroll dolly are secondary additions.
        const renderFrame = (simT: number) => {
          if (disposed || !renderer) return;

          // Entrance camera dolly (expo-out, ~2s)
          const intro = clamp01(simT / 2.0);
          const e = EASE_OUT_EXPO(intro);
          // Passive-drift amplitude ramps 0→full over 1s after the intro
          const driftRamp = clamp01((simT - 2.0) / 1.0);

          // Scroll hand-off: camera dollies forward + up, fog thickens
          const sp = clamp01(scrollYProgress.get());

          // Mouse parallax — smoothed orbit, reduced amplitude (±0.8/±0.5)
          target.x += (mouse.x - target.x) * 0.04;
          target.y += (mouse.y - target.y) * 0.04;

          // Autonomous drift — non-harmonic clock loops (26s/34s/48s), never
          // repeats, zero input required (plan §4.1 / §4.3)
          const driftX = Math.sin(simT * (Math.PI * 2) / 26) * 0.6;
          const driftY = Math.cos(simT * (Math.PI * 2) / 34) * 0.35;
          const driftZ = Math.sin(simT * (Math.PI * 2) / 48) * 0.4;

          const restX = target.x * 0.8 + driftX * driftRamp;
          const restY = camRestY + target.y * 0.5 + driftY * driftRamp;
          const restZ = camRestZ + driftZ * driftRamp;

          // Gentle ambient camera bob (scales in with intro)
          const bobY = Math.sin(simT * 0.15) * 0.15 * e;
          const bobZ = Math.sin(simT * 0.11) * 0.3 * e;

          camera.position.x = restX;
          camera.position.y = lerp(camStartY, restY, e) + bobY + sp * 1.4;
          camera.position.z = lerp(camStartZ, restZ, e) + bobZ - sp * 4;
          camera.lookAt(0, 2 - sp * 0.5, 0);

          // Breathing grid rotation (very slow collective sway)
          grid.rotation.y = Math.sin(simT * 0.15) * 0.02;

          // Per-column sway
          for (let i = 0; i < columns.length; i++) {
            columns[i].rotation.z = Math.sin(simT * 0.3 + i * 0.5) * 0.008;
          }

          // Pulsing point glow (starts once the intro is underway)
          pointGlow.intensity = e * (2.5 + Math.sin(simT * 0.8) * 0.8);

          // Teal rim glow drifting behind the grid
          orbitGlow.position.set(Math.cos(simT * 0.3) * 8, 3.5, Math.sin(simT * 0.3) * 8 - 6);
          orbitGlow.intensity = 0.15 + Math.sin(simT * 0.45) * 0.1;

          // Particles drift + twinkle + stream B lateral flow
          particleUniforms.uTime.value = simT;
          streamUniforms.uTime.value = simT;

          // Nebula field morphs on the clock; cross-fades in over the first
          // second so the entrance never fights it
          nebulaUniforms.uTime.value = simT;
          nebulaUniforms.uOpacity.value = clamp01(simT / 1.0);

          // Fog thickens as the hero scrolls away
          fog.density = 0.018 + sp * 0.012;

          renderer.render(scene, camera);
        };

        let startT = -1;
        const frame = (time: number) => {
          if (disposed) return;
          const tSec = time * 0.001;
          if (startT < 0) startT = tSec;
          renderFrame(tSec - startT);
          raf = requestAnimationFrame(frame);
        };

        const start = () => {
          if (running || disposed || !heroVisible) return;
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
              renderFrame(12); // single static resting frame, nebula frozen mid-flow
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
          io.disconnect();
          window.removeEventListener("mousemove", onMove);
          window.removeEventListener("resize", onResize);
          renderer.dispose();
          scene.traverse((child) => {
            if (child instanceof THREE.Mesh || child instanceof THREE.Points) {
              child.geometry.dispose();
              const m = child.material as THREE.Material | THREE.Material[];
              if (Array.isArray(m)) m.forEach((mm) => mm.dispose());
              else m.dispose();
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
  }, [scrollYProgress]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{ transition: "opacity 0.3s ease" }}
    />
  );
}
