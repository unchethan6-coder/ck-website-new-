"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useScroll } from "framer-motion";

/**
 * HeroField — full-viewport cinematic aurora scene (Rev 4).
 *
 * Composition (back → front), every layer clock-driven with zero input:
 * 1. Deep domain-warped fbm nebula — dark atmosphere, not a wall (kept subtle).
 * 2. Aurora-silk ribbons — thin flowing sheets, layered traveling waves.
 * 3. FLOW-FIELD STREAM — ~12k gold motes weaving on non-repeating Lissajous
 *    paths, wrapping in a bounded volume: the unmistakable "major movement."
 * 4. Teal accent stream (≤15%) + sparse far sparkle dust.
 *
 * Motion: all layers animate on the render-loop clock; pointer parallax +
 * scroll dolly are secondary layers summed on top.
 *
 * Contrast (§5): the screen-space "quiet zone" dims the nebula, ribbons and
 * streams behind the copy block; DOM scrim/plate/cards ground reading surfaces.
 *
 * Behaviour:
 * - Dark-only: the locked additive gold-on-black scene always renders.
 * - `prefers-reduced-motion` → one static composed frame, no loops, no intro.
 * - WebGL unavailable → no-op (CSS aurora fallback).
 * - Paused when the hero is off-screen (IntersectionObserver).
 * - Disposed on unmount.
 */

const EASE_OUT_EXPO = (p: number) => (p >= 1 ? 1 : 1 - Math.pow(2, -10 * p));
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Shared quiet-zone geometry for the layout breakpoint. */
function quietZone(isMobile: boolean) {
  return {
    center: new THREE.Vector2(isMobile ? 0.5 : 0.3, isMobile ? 0.34 : 0.5),
    size: new THREE.Vector2(isMobile ? 0.9 : 0.62, isMobile ? 0.6 : 0.62),
    strength: isMobile ? 0.45 : 0.5,
  };
}

/* ── Scene palette ────────────────────────────────────────────────────
 * CK Capital is dark-only: a single locked additive gold-on-black config.
 * No theme switching — the scene always renders this palette.
 */
interface Palette {
  nebula: [string, string, string];
  ribbon: [string, string];
  teal: string;
  stream: [string, string];
  dust: string;
  mode: "additive" | "normal";
  quietDimToBlack: boolean;
  nebulaAlpha: [number, number];
  ribbonAlphaScale: number;
  streamOpacity: number;
  streamSizeScale: number;
  streamCountScale: number;
  tealOpacity: number;
  tealOpacityMobile: number;
  dustOpacity: number;
  quietStrength: number;
}

const SCENE_PALETTE: Palette = {
  nebula: ["#8a6410", "#d4af37", "#f5d570"],
  ribbon: ["#d4af37", "#f5d570"],
  teal: "#14b8a6",
  stream: ["#f5d570", "#d4af37"],
  dust: "#d4af37",
  mode: "additive",
  quietDimToBlack: true,
  nebulaAlpha: [0.13, 0.75],
  ribbonAlphaScale: 1.0,
  streamOpacity: 0.5,
  streamSizeScale: 1.0,
  streamCountScale: 1.0,
  tealOpacity: 0.3,
  tealOpacityMobile: 0.2,
  dustOpacity: 0.4,
  quietStrength: 0.5,
};

/**
 * buildNebula — fullscreen domain-warped fbm aurora base. Kept as a subtle
 * dark atmosphere (low alpha floor) so the flowing streams read against it.
 */
function buildNebula(isMobile: boolean, width: number, height: number, palette: Palette) {
  const octaves = isMobile ? 3 : 5;
  const qz = quietZone(isMobile);
  const uniforms = {
    uTime: { value: 0 },
    uResolution: { value: new THREE.Vector2(width, height) },
    uAspect: { value: width / height },
    uQuietCenter: { value: qz.center },
    uQuietSize: { value: qz.size },
    uQuietStrength: { value: qz.strength * palette.quietStrength },
    uTealBlend: { value: 0.12 },
    uOpacity: { value: 0 },
    uDark: { value: new THREE.Color(palette.nebula[0]) },
    uGold: { value: new THREE.Color(palette.nebula[1]) },
    uBright: { value: new THREE.Color(palette.nebula[2]) },
    uTeal: { value: new THREE.Color(palette.teal) },
    uDimToBlack: { value: palette.quietDimToBlack ? 1 : 0 },
    uPremultiplied: { value: palette.mode === "additive" ? 1 : 0 },
    uAlphaFloor: { value: palette.nebulaAlpha[0] },
    uAlphaScale: { value: palette.nebulaAlpha[1] - palette.nebulaAlpha[0] },
  };

  const mat = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: palette.mode === "additive" ? THREE.AdditiveBlending : THREE.NormalBlending,
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
      uniform vec3 uDark;
      uniform vec3 uGold;
      uniform vec3 uBright;
      uniform vec3 uTeal;
      uniform float uDimToBlack;
      uniform float uPremultiplied;
      uniform float uAlphaFloor;
      uniform float uAlphaScale;
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
        vec2 p = (uv - 0.5) * vec2(uAspect, 1.0) * 3.0;
        p += uTime * 0.06;
        p = mat2(cos(uTime * 0.02), sin(uTime * 0.02), -sin(uTime * 0.02), cos(uTime * 0.02)) * p;

        vec2 q = vec2(fbm(p + uTime * 0.07), fbm(p - uTime * 0.09));
        vec2 r = vec2(
          fbm(p + 2.0 * q + vec2(1.7, 9.2) + uTime * 0.05),
          fbm(p + 2.0 * q + vec2(8.3, 2.8) - uTime * 0.06)
        );
        float f = fbm(p + 2.6 * r);

        vec3 col = mix(uDark, uGold, smoothstep(0.15, 0.5, f));
        col = mix(col, uBright, smoothstep(0.42, 0.62, f));

        float fringe = smoothstep(0.3, 0.5, r.y) * (1.0 - smoothstep(0.5, 0.72, r.y));
        col = mix(col, uTeal, fringe * uTealBlend);

        // atmosphere — low floor so streams read against it (dark) or a
        // soft warm wash on cream (light)
        float a = (uAlphaFloor + uAlphaScale * smoothstep(0.2, 0.64, f)) * uOpacity;
        vec2 vd = (uv - 0.5) * vec2(uAspect, 1.0);
        a *= 1.0 - smoothstep(0.62, 0.95, length(vd));

        // Quiet zone — dark: dim toward black; light: alpha→0 reveals cream
        vec2 qd = (uv - uQuietCenter) / uQuietSize;
        float qmask = 1.0 - smoothstep(0.5, 1.0, length(qd));
        col *= 1.0 - uQuietStrength * qmask * uDimToBlack;
        a *= 1.0 - uQuietStrength * mix(0.8, 1.0, 1.0 - uDimToBlack) * qmask;

        // premultiplied (additive) output for dark; straight alpha for light
        gl_FragColor = vec4(mix(col, col * a, uPremultiplied), a);
      }
    `,
  });

  const geo = new THREE.PlaneGeometry(220, 90);
  const mesh = new THREE.Mesh(geo, mat);
  mesh.position.set(0, 2.5, -40);
  mesh.rotation.x = 0.04;
  return { mesh, uniforms };
}

interface RibbonSpec {
  z: number;
  y: number;
  rotY: number;
  width: number;
  height: number;
  freq: [number, number, number];
  speed: [number, number, number];
  amp: [number, number, number];
  phase: [number, number];
  base: number;
  breathe: number;
  teal: number;
}

/** Thin silk sheets — bright filaments with dark negative space around them. */
const RIBBON_SPECS: RibbonSpec[] = [
  { z: -4,    y: 4.0, rotY: -0.42, width: 42, height: 7, freq: [1.1, 0.45, 0.16], speed: [1.9, 1.3, 0.8], amp: [0.6, 0.95, 1.5], phase: [0.0, 1.3], base: 0.30, breathe: 0.5, teal: 0.0 },
  { z: -6.5,  y: 2.0, rotY:  0.34, width: 40, height: 6, freq: [0.9, 0.6, 0.2],  speed: [1.5, 1.1, 0.7], amp: [0.65, 0.8, 1.6], phase: [2.1, 0.4], base: 0.26, breathe: 0.4, teal: 0.1 },
  { z: -9,    y: 4.6, rotY: -0.2,  width: 44, height: 7, freq: [1.3, 0.35, 0.18], speed: [2.1, 1.2, 0.75], amp: [0.55, 1.0, 1.4], phase: [4.2, 2.8], base: 0.32, breathe: 0.55, teal: 0.0 },
  { z: -11.5, y: 1.6, rotY:  0.26, width: 40, height: 6, freq: [0.75, 0.5, 0.22], speed: [1.4, 1.0, 0.6], amp: [0.7, 0.85, 1.7], phase: [1.6, 5.0], base: 0.24, breathe: 0.35, teal: 0.12 },
  { z: -14,   y: 3.2, rotY: -0.1,  width: 46, height: 8, freq: [1.0, 0.55, 0.14], speed: [1.8, 1.25, 0.8], amp: [0.6, 0.9, 1.55], phase: [3.3, 0.9], base: 0.30, breathe: 0.6, teal: 0.0 },
];

function buildRibbons(isMobile: boolean, width: number, height: number, palette: Palette) {
  const qz = quietZone(isMobile);
  const specs = isMobile ? RIBBON_SPECS.slice(0, 3) : RIBBON_SPECS;
  const group = new THREE.Group();
  const materials: THREE.ShaderMaterial[] = [];

  specs.forEach((s) => {
    const uniforms = {
      uTime: { value: 0 },
      uPhase: { value: new THREE.Vector2(s.phase[0], s.phase[1]) },
      uFreq: { value: new THREE.Vector3(s.freq[0], s.freq[1], s.freq[2]) },
      uSpeed: { value: new THREE.Vector3(s.speed[0], s.speed[1], s.speed[2]) },
      uAmp: { value: new THREE.Vector3(s.amp[0], s.amp[1], s.amp[2]) },
      uBaseOpacity: { value: s.base },
      uBreathe: { value: s.breathe },
      uTeal: { value: s.teal },
      uResolution: { value: new THREE.Vector2(width, height) },
      uQuietCenter: { value: qz.center },
      uQuietSize: { value: qz.size },
      uQuietStrength: { value: qz.strength * palette.quietStrength },
      uGold: { value: new THREE.Color(palette.ribbon[0]) },
      uBright: { value: new THREE.Color(palette.ribbon[1]) },
      uTealColor: { value: new THREE.Color(palette.teal) },
      uAlphaScale: { value: palette.ribbonAlphaScale },
      uPremultiplied: { value: palette.mode === "additive" ? 1 : 0 },
    };

    const mat = new THREE.ShaderMaterial({
      uniforms,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: palette.mode === "additive" ? THREE.AdditiveBlending : THREE.NormalBlending,
      vertexShader: `
        uniform float uTime;
        uniform vec2 uPhase;
        uniform vec3 uFreq;
        uniform vec3 uSpeed;
        uniform vec3 uAmp;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 p = position;
          float x = p.x;
          float w = sin(x * uFreq.x + uTime * uSpeed.x + uPhase.x) * uAmp.x
                  + sin(x * uFreq.y - uTime * uSpeed.y + uPhase.y) * uAmp.y
                  + sin(x * uFreq.z + uTime * uSpeed.z * 0.6 + uPhase.x * 1.7) * uAmp.z;
          p.y += w;
          p.z += sin(x * 1.2 + uTime * 0.7 + uPhase.y) * 0.3;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
        }
      `,
      fragmentShader: `
        precision highp float;
        uniform float uTime;
        uniform float uBaseOpacity;
        uniform float uBreathe;
        uniform float uTeal;
        uniform float uAlphaScale;
        uniform vec3 uGold;
        uniform vec3 uBright;
        uniform vec3 uTealColor;
        uniform float uPremultiplied;
        uniform vec2 uResolution;
        uniform vec2 uQuietCenter;
        uniform vec2 uQuietSize;
        uniform float uQuietStrength;
        varying vec2 vUv;
        void main() {
          float edge = smoothstep(0.0, 0.14, vUv.y) * (1.0 - smoothstep(0.86, 1.0, vUv.y));
          float xedge = smoothstep(0.0, 0.05, vUv.x) * (1.0 - smoothstep(0.95, 1.0, vUv.x));
          float breathe = 0.8 + 0.2 * sin(uTime * uBreathe);
          float a = edge * xedge * uBaseOpacity * uAlphaScale * breathe;

          vec3 col = mix(uGold, uBright, smoothstep(0.3, 0.7, vUv.y));
          col = mix(col, uTealColor, uTeal);

          vec2 uv = gl_FragCoord.xy / uResolution;
          vec2 qd = (uv - uQuietCenter) / uQuietSize;
          float qmask = 1.0 - smoothstep(0.5, 1.0, length(qd));
          a *= 1.0 - uQuietStrength * qmask;

          // premultiplied (additive) output for dark; straight alpha for light
          gl_FragColor = vec4(mix(col, col * a, uPremultiplied), a);
        }
      `,
    });
    materials.push(mat);

    const geo = new THREE.PlaneGeometry(s.width, s.height, 128, 1);
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.set(0, s.y, s.z);
    mesh.rotation.y = s.rotY;
    mesh.rotation.x = -0.1;
    group.add(mesh);
  });

  return { group, materials };
}

/**
 * buildFlowField — the signature stream. Thousands of gold motes weaving on
 * non-repeating Lissajous paths inside a bounded volume, wrapping at the
 * edges. Constant, unmistakable streaming motion (zero input required).
 */
function buildFlowField(isMobile: boolean, width: number, height: number, palette: Palette) {
  const qz = quietZone(isMobile);
  const COUNT = Math.round((isMobile ? 4200 : 12000) * palette.streamCountScale);
  const geo = new THREE.BufferGeometry();
  const pos = new Float32Array(COUNT * 3);
  const seed = new Float32Array(COUNT);
  const size = new Float32Array(COUNT);
  for (let i = 0; i < COUNT; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 44;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
    pos[i * 3 + 2] = (Math.random() - 0.5) * 36 - 2; // bias toward the camera
    seed[i] = Math.random();
    size[i] = (isMobile ? 1.2 : 1.6) * palette.streamSizeScale + Math.random() * 2.4 * palette.streamSizeScale;
  }
  geo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  geo.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
  geo.setAttribute("aSize", new THREE.BufferAttribute(size, 1));

  const uniforms = {
    uTime: { value: 0 },
    uColorA: { value: new THREE.Color(palette.stream[0]) },
    uColorB: { value: new THREE.Color(palette.stream[1]) },
    uOpacity: { value: isMobile ? palette.streamOpacity * 0.8 : palette.streamOpacity },
    uPremultiplied: { value: palette.mode === "additive" ? 1 : 0 },
    uResolution: { value: new THREE.Vector2(width, height) },
    uQuietCenter: { value: qz.center },
    uQuietSize: { value: qz.size },
    uQuietStrength: { value: qz.strength * palette.quietStrength },
  };
  const mat = new THREE.ShaderMaterial({
    uniforms,
    transparent: true,
    depthWrite: false,
    blending: palette.mode === "additive" ? THREE.AdditiveBlending : THREE.NormalBlending,
    vertexShader: `
      attribute float aSeed;
      attribute float aSize;
      uniform float uTime;
      varying float vAlpha;
      varying float vMix;
      void main() {
        vec3 p = position;
        float s = aSeed;
        float t = uTime;
        // winding Lissajous streams (1.618 ratio = non-repeating), seeded speed
        float ang = t * (0.22 + 0.5 * fract(s * 3.1)) + s * 6.2831;
        float r = (1.5 + 5.5 * fract(s * 7.7)) * (0.6 + 0.4 * sin(t * 0.2 + s * 5.0));
        p.x += cos(ang) * r;
        p.z += sin(ang * 1.618) * r * 0.7;
        p.y += mod(t * (0.5 + 0.9 * fract(s * 11.7)) + s * 4.0, 16.0) - 8.0;
        p.x += sin(t * 0.4 + s * 9.0) * 1.5;
        p.z += cos(t * 0.3 + s * 13.0) * 1.5;
        p.x = mod(p.x + 24.0, 48.0) - 24.0;
        p.z = mod(p.z + 22.0, 44.0) - 22.0;

        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = aSize * (200.0 / -mv.z);
        vAlpha = 0.3 + 0.6 * abs(sin(t * (0.5 + 0.5 * fract(s)) + s * 4.0));
        vMix = fract(s * 2.0);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      precision highp float;
      uniform vec3 uColorA;
      uniform vec3 uColorB;
      uniform float uOpacity;
      uniform float uPremultiplied;
      uniform vec2 uResolution;
      uniform vec2 uQuietCenter;
      uniform vec2 uQuietSize;
      uniform float uQuietStrength;
      varying float vAlpha;
      varying float vMix;
      void main() {
        vec2 c = gl_PointCoord - 0.5;
        float d = length(c);
        float glow = smoothstep(0.5, 0.05, d);
        vec3 col = mix(uColorB, uColorA, vMix);
        float alpha = glow * vAlpha * uOpacity;

        vec2 uv = gl_FragCoord.xy / uResolution;
        vec2 qd = (uv - uQuietCenter) / uQuietSize;
        float qmask = 1.0 - smoothstep(0.5, 1.0, length(qd));
        alpha *= 1.0 - uQuietStrength * qmask;

        gl_FragColor = vec4(mix(col, col * alpha, uPremultiplied), alpha);
      }
    `,
  });
  const points = new THREE.Points(geo, mat);
  return { points, uniforms };
}

function createScene(host: HTMLDivElement, isMobile: boolean, palette: Palette) {
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
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(55, width / height, 0.1, 200);
  camera.position.set(0, 3, 14);
  camera.lookAt(0, 1.6, 0);

  // ─── Deep nebula base (farthest) ───
  const { mesh: nebula, uniforms: nebulaUniforms } = buildNebula(isMobile, width, height, palette);
  scene.add(nebula);

  // ─── Aurora-silk ribbons (flowing sheets) ───
  const { group: ribbons, materials: ribbonMaterials } = buildRibbons(isMobile, width, height, palette);
  scene.add(ribbons);

  // ─── Flow-field stream — the signature motion layer ───
  const { points: stream, uniforms: streamUniforms } = buildFlowField(isMobile, width, height, palette);
  scene.add(stream);

  // ─── Teal accent stream (≤15% blend) — sparse lateral flow ───
  const TCOUNT = isMobile ? 80 : 220;
  const tGeo = new THREE.BufferGeometry();
  const tPos = new Float32Array(TCOUNT * 3);
  const tSeed = new Float32Array(TCOUNT);
  const tSize = new Float32Array(TCOUNT);
  for (let i = 0; i < TCOUNT; i++) {
    tPos[i * 3] = (Math.random() - 0.5) * 32;
    tPos[i * 3 + 1] = 3 + Math.random() * 13;
    tPos[i * 3 + 2] = -36 + Math.random() * 18;
    tSeed[i] = Math.random() * Math.PI * 2;
    tSize[i] = 0.4 + Math.random() * 0.9;
  }
  tGeo.setAttribute("position", new THREE.BufferAttribute(tPos, 3));
  tGeo.setAttribute("aSeed", new THREE.BufferAttribute(tSeed, 1));
  tGeo.setAttribute("aSize", new THREE.BufferAttribute(tSize, 1));

  const qz = quietZone(isMobile);
  const tealUniforms = {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(palette.teal) },
    uOpacity: { value: isMobile ? palette.tealOpacityMobile : palette.tealOpacity },
    uPremultiplied: { value: palette.mode === "additive" ? 1 : 0 },
    uResolution: { value: new THREE.Vector2(width, height) },
    uQuietCenter: { value: qz.center },
    uQuietSize: { value: qz.size },
    uQuietStrength: { value: qz.strength * palette.quietStrength },
  };
  const tealMat = new THREE.ShaderMaterial({
    uniforms: tealUniforms,
    transparent: true,
    depthWrite: false,
    blending: palette.mode === "additive" ? THREE.AdditiveBlending : THREE.NormalBlending,
    vertexShader: `
      attribute float aSeed;
      attribute float aSize;
      uniform float uTime;
      varying float vAlpha;
      void main() {
        vec3 p = position;
        p.x = mod(p.x + uTime * 0.18 + aSeed * 0.25, 32.0) - 16.0;
        p.y += sin(uTime * 0.25 + aSeed * 2.0) * 0.5;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = aSize * (95.0 / -mv.z);
        vAlpha = 0.3 + 0.35 * sin(uTime * 0.6 + aSeed * 3.0);
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform vec3 uColor;
      uniform float uOpacity;
      uniform float uPremultiplied;
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
        gl_FragColor = vec4(mix(uColor, uColor * alpha, uPremultiplied), alpha);
      }
    `,
  });
  const tealStream = new THREE.Points(tGeo, tealMat);
  scene.add(tealStream);

  // ─── Sparse far sparkle dust (background twinkle) ───
  const DCOUNT = isMobile ? 80 : 200;
  const dGeo = new THREE.BufferGeometry();
  const dPos = new Float32Array(DCOUNT * 3);
  const dSeed = new Float32Array(DCOUNT);
  const dSize = new Float32Array(DCOUNT);
  for (let i = 0; i < DCOUNT; i++) {
    dPos[i * 3] = (Math.random() - 0.5) * 60;
    dPos[i * 3 + 1] = (Math.random() - 0.5) * 30;
    dPos[i * 3 + 2] = (Math.random() - 0.5) * 60 - 20;
    dSeed[i] = Math.random() * Math.PI * 2;
    dSize[i] = 0.3 + Math.random() * 0.6;
  }
  dGeo.setAttribute("position", new THREE.BufferAttribute(dPos, 3));
  dGeo.setAttribute("aSeed", new THREE.BufferAttribute(dSeed, 1));
  dGeo.setAttribute("aSize", new THREE.BufferAttribute(dSize, 1));
  const dustUniforms = { uTime: { value: 0 }, uOpacity: { value: palette.dustOpacity }, uColor: { value: new THREE.Color(palette.dust) }, uPremultiplied: { value: palette.mode === "additive" ? 1 : 0 } };
  const dustMat = new THREE.ShaderMaterial({
    uniforms: dustUniforms,
    transparent: true,
    depthWrite: false,
    blending: palette.mode === "additive" ? THREE.AdditiveBlending : THREE.NormalBlending,
    vertexShader: `
      attribute float aSeed;
      attribute float aSize;
      uniform float uTime;
      varying float vAlpha;
      void main() {
        vec3 p = position;
        p.x += sin(uTime * 0.12 + aSeed) * 0.8;
        p.y += cos(uTime * 0.1 + aSeed * 2.0) * 0.6;
        vec4 mv = modelViewMatrix * vec4(p, 1.0);
        gl_PointSize = aSize * (120.0 / -mv.z);
        vAlpha = 0.3 + 0.5 * abs(sin(uTime * 0.4 + aSeed * 3.0));
        gl_Position = projectionMatrix * mv;
      }
    `,
    fragmentShader: `
      uniform float uOpacity;
      uniform vec3 uColor;
      uniform float uPremultiplied;
      varying float vAlpha;
      void main() {
        vec2 c = gl_PointCoord - 0.5;
        float d = length(c);
        float alpha = smoothstep(0.5, 0.05, d) * vAlpha * uOpacity;
        gl_FragColor = vec4(mix(uColor, uColor * alpha, uPremultiplied), alpha);
      }
    `,
  });
  const dust = new THREE.Points(dGeo, dustMat);
  scene.add(dust);

  return {
    renderer,
    scene,
    camera,
    nebulaUniforms,
    ribbonMaterials,
    streamUniforms,
    tealUniforms,
    dustUniforms,
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

    const reduceMotion = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const build = () => {
      try {
        const isMobile = window.innerWidth < 768;
        sceneData = createScene(host, isMobile, SCENE_PALETTE);
        const { renderer, scene, camera, nebulaUniforms, ribbonMaterials, streamUniforms, tealUniforms, dustUniforms } = sceneData;

        const camStartY = 4.6;
        const camStartZ = isMobile ? 22 : 19;
        const camRestY = 3.2;
        const camRestZ = isMobile ? 17 : 14;

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
          tealUniforms.uResolution.value.set(w, h);
          for (const m of ribbonMaterials) {
            m.uniforms.uResolution.value.set(w, h);
          }
        };
        window.addEventListener("resize", onResize);

        let heroVisible = true;
        const io = new IntersectionObserver(
          (entries) => {
            heroVisible = entries[0].isIntersecting;
            if (!heroVisible) stop();
            else if (!disposed && !reduceMotion()) start();
          },
          { threshold: 0.02 }
        );
        io.observe(host);

        // Composed render — pure function of simulation time `simT`. All layers
        // are clock-driven; pointer parallax + scroll dolly are secondary.
        const renderFrame = (simT: number) => {
          if (disposed || !renderer) return;

          const intro = clamp01(simT / 2.0);
          const e = EASE_OUT_EXPO(intro);
          const driftRamp = clamp01((simT - 2.0) / 1.0);
          const sp = clamp01(scrollYProgress.get());

          target.x += (mouse.x - target.x) * 0.04;
          target.y += (mouse.y - target.y) * 0.04;

          // Autonomous drift — non-harmonic clock loops (26s/34s/48s)
          const driftX = Math.sin(simT * (Math.PI * 2) / 26) * 0.7;
          const driftY = Math.cos(simT * (Math.PI * 2) / 34) * 0.45;
          const driftZ = Math.sin(simT * (Math.PI * 2) / 48) * 0.5;

          const restX = target.x * 0.6 + driftX * driftRamp;
          const restY = camRestY + target.y * 0.4 + driftY * driftRamp;
          const restZ = camRestZ + driftZ * driftRamp;

          const bobY = Math.sin(simT * 0.15) * 0.12 * e;
          const bobZ = Math.sin(simT * 0.11) * 0.25 * e;

          camera.position.x = restX;
          camera.position.y = lerp(camStartY, restY, e) + bobY + sp * 1.1;
          camera.position.z = lerp(camStartZ, restZ, e) + bobZ - sp * 4;
          camera.lookAt(0, 1.6 - sp * 0.5, 0);

          // Everything flows on the clock
          for (const m of ribbonMaterials) m.uniforms.uTime.value = simT;
          nebulaUniforms.uTime.value = simT;
          nebulaUniforms.uOpacity.value = clamp01(simT / 1.0);
          streamUniforms.uTime.value = simT;
          tealUniforms.uTime.value = simT;
          dustUniforms.uTime.value = simT;

          renderer.render(scene, camera);
        };

        // Simulation clock accumulates *clamped* frame deltas. rAF pauses while
        // the tab is hidden (alt-tab), so the browser's next timestamp can be
        // seconds later — an unclamped `simT` would leap the nebula/drift/dust
        // uniforms one giant step and render as a fast wave sweep on return.
        // MAX_STEP caps that spike so the scene can never jump.
        let simT = 0;
        let lastT = -1;
        const MAX_STEP = 0.05; // seconds — clamps the tab-return spike
        const frame = (time: number) => {
          if (disposed) return;
          const tSec = time * 0.001;
          if (lastT < 0) {
            lastT = tSec;
          } else {
            simT += Math.min(tSec - lastT, MAX_STEP);
            lastT = tSec;
          }
          renderFrame(simT);
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

        // CK Capital is dark-only — the scene always runs (or renders a
        // static composed frame under reduced motion).
        if (reduceMotion()) {
          renderFrame(12); // single static composed frame, streams frozen mid-flow
        } else {
          start();
        }

        return () => {
          disposed = true;
          stop();
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
