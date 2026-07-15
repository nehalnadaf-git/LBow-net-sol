'use client'

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { prefersReducedMotion } from '../hooks/useScrollReveal';

// ─────────────────────────────────────────────────────────────────────────────
// PPRPipes3D — 3D hero decoration
//
// Animation philosophy (rebuilt from scratch):
//   • No ScrollTrigger, no GSAP timelines, no intro sequences
//   • Simple sin/cos idle float + rotation — works identically on every device
//   • Subtle mouse parallax on desktop only (pointer:fine devices)
//   • Visibility gate via IntersectionObserver — zero GPU cost when off-screen
//   • CSS opacity fade-in on mount — lightweight, no GSAP dependency
//   • Performance tier: mobile gets fewer segments, no shadows, no clearcoat
// ─────────────────────────────────────────────────────────────────────────────

const PPRPipes3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    if (prefersReducedMotion()) return;

    // ── Device tier ───────────────────────────────────────────────────────
    const isMobile   = window.innerWidth < 768;
    // pointer:coarse = phone/tablet.  pointer:fine = mouse/trackpad.
    // Do NOT use navigator.maxTouchPoints — Safari on macOS returns 5 for trackpad.
    const isTouch    = window.matchMedia('(pointer: coarse)').matches;

    // Geometry detail level
    const SEG        = isMobile ? 16 : 32;
    const TORUS_SEG  = isMobile ? 16 : 32;
    const DETAIL_SEG = isMobile ? 8  : 16;
    const SKIP_DETAIL = isMobile;
    const DPR_CAP    = isMobile ? 1.5 : 2;

    // ── WebGL resource tracking (for clean disposal on unmount) ───────────
    const geoPool: THREE.BufferGeometry[] = [];
    const matPool: THREE.Material[]       = [];
    const geo = <T extends THREE.BufferGeometry>(g: T): T => { geoPool.push(g); return g; };
    const mat = <T extends THREE.Material>(m: T): T        => { matPool.push(m); return m; };

    // ── Renderer ──────────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: isMobile ? 'default' : 'high-performance',
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, DPR_CAP));
    if (!isMobile) {
      renderer.toneMapping        = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      renderer.shadowMap.enabled  = true;
      renderer.shadowMap.type     = THREE.PCFShadowMap;
    }

    // Fade canvas in via CSS — zero animation overhead
    renderer.domElement.style.opacity    = '0';
    renderer.domElement.style.transition = 'opacity 0.7s ease';
    container.appendChild(renderer.domElement);
    // Push to next frame so the transition fires
    requestAnimationFrame(() => { renderer.domElement.style.opacity = '1'; });

    // ── Scene & Camera ────────────────────────────────────────────────────
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 11);

    // ── Materials — tiered by device ──────────────────────────────────────
    // Desktop: MeshPhysicalMaterial + clearcoat (premium sheen)
    // Mobile:  MeshStandardMaterial (no extra render pass, ~2× faster)
    const greenMat = mat(isMobile
      ? new THREE.MeshStandardMaterial({ color: 0x1fb542, roughness: 0.22, metalness: 0.01 })
      : new THREE.MeshPhysicalMaterial({ color: 0x1fb542, roughness: 0.22, metalness: 0.01, clearcoat: 0.28, clearcoatRoughness: 0.18 }));

    const blueMat = mat(isMobile
      ? new THREE.MeshStandardMaterial({ color: 0x1565C0, roughness: 0.20, metalness: 0.01 })
      : new THREE.MeshPhysicalMaterial({ color: 0x1565C0, roughness: 0.20, metalness: 0.01, clearcoat: 0.32, clearcoatRoughness: 0.16 }));

    const metalMat = mat(isMobile
      ? new THREE.MeshStandardMaterial({ color: 0xe2d6b5, roughness: 0.26, metalness: 0.82 })
      : new THREE.MeshPhysicalMaterial({ color: 0xe2d6b5, roughness: 0.26, metalness: 0.82, clearcoat: 0.4,  clearcoatRoughness: 0.15 }));

    const goldMat = mat(isMobile
      ? new THREE.MeshStandardMaterial({ color: 0xe5b83b, roughness: 0.24, metalness: 0.85 })
      : new THREE.MeshPhysicalMaterial({ color: 0xe5b83b, roughness: 0.24, metalness: 0.85, clearcoat: 0.35, clearcoatRoughness: 0.15 }));

    const silverMat = mat(isMobile
      ? new THREE.MeshStandardMaterial({ color: 0xf5f5f5, roughness: 0.05, metalness: 1.0 })
      : new THREE.MeshPhysicalMaterial({ color: 0xf5f5f5, roughness: 0.01, metalness: 1.0,  clearcoat: 1.0,  clearcoatRoughness: 0.0 }));

    // Single shared dark-bore material
    const darkMat = mat(new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 }));

    // ── Geometry helpers ──────────────────────────────────────────────────

    const addShadows = (group: THREE.Group) => {
      if (isMobile) return;
      group.traverse(c => { if (c instanceof THREE.Mesh) { c.castShadow = true; c.receiveShadow = true; } });
    };

    const createBrassFitting = (isMale: boolean, r: number, plastic = greenMat) => {
      const g       = new THREE.Group();
      const rSleeve = r + 0.13;
      const rHex    = r + 0.05;
      const rThread = r - 0.09;

      // Plastic sleeve body + taper
      const sleeve = new THREE.Mesh(geo(new THREE.CylinderGeometry(rSleeve, rSleeve, 0.7, SEG)), plastic);
      sleeve.position.y = 0.65;
      const taper  = new THREE.Mesh(geo(new THREE.CylinderGeometry(rSleeve, r, 0.3, SEG)), plastic);
      taper.position.y = 0.15;
      g.add(sleeve, taper);

      // Wrench-grip flutes — desktop only
      if (!SKIP_DETAIL) {
        const ridgeGeo = geo(new THREE.BoxGeometry(0.04, 0.5, 0.04));
        for (let i = 0; i < 8; i++) {
          const a = (i / 8) * Math.PI * 2;
          const ridge = new THREE.Mesh(ridgeGeo, plastic);
          ridge.position.set(Math.cos(a) * (rSleeve + 0.02), 0.6, Math.sin(a) * (rSleeve + 0.02));
          ridge.rotation.y = -a;
          g.add(ridge);
        }
      }

      // Hex collar
      const hex = new THREE.Mesh(geo(new THREE.CylinderGeometry(rHex, rHex, 0.35, 6)), metalMat);
      hex.position.y = 1.175;
      g.add(hex);

      if (isMale) {
        const thread = new THREE.Mesh(geo(new THREE.CylinderGeometry(rThread, rThread, 0.5, SEG)), goldMat);
        thread.position.y = 1.6;
        g.add(thread);
        if (!SKIP_DETAIL) {
          for (let i = 0; i < 4; i++) {
            const tr = new THREE.Mesh(geo(new THREE.TorusGeometry(rThread, 0.025, 8, DETAIL_SEG)), goldMat);
            tr.rotation.x = Math.PI / 2;
            tr.position.y = 1.4 + i * 0.12;
            g.add(tr);
          }
        }
      } else {
        const collar = new THREE.Mesh(geo(new THREE.CylinderGeometry(rHex - 0.02, rHex - 0.02, 0.4, SEG)), metalMat);
        collar.position.y = 1.4;
        const bore = new THREE.Mesh(geo(new THREE.CylinderGeometry(rThread, rThread, 0.41, SEG)), darkMat);
        bore.position.y = 1.41;
        g.add(collar, bore);
      }
      addShadows(g);
      return g;
    };

    const createCoupling = (r: number, plastic = greenMat) => {
      const g       = new THREE.Group();
      const rSleeve = r + 0.13;
      const rRim    = rSleeve + 0.03;

      const mkMesh = (geom: THREE.BufferGeometry, posY: number) => {
        const m = new THREE.Mesh(geo(geom), plastic);
        m.position.y = posY;
        return m;
      };

      g.add(
        mkMesh(new THREE.CylinderGeometry(rSleeve,        rSleeve,        0.6,  SEG),  0),
        mkMesh(new THREE.CylinderGeometry(rSleeve + 0.05, rSleeve + 0.05, 0.15, SEG),  0),
        mkMesh(new THREE.CylinderGeometry(rRim,           rRim,           0.1,  SEG),  0.35),
        mkMesh(new THREE.CylinderGeometry(rRim,           rRim,           0.1,  SEG), -0.35),
        mkMesh(new THREE.CylinderGeometry(r,              rRim,           0.2,  SEG),  0.5),
        mkMesh(new THREE.CylinderGeometry(rRim,           r,              0.2,  SEG), -0.5),
      );
      addShadows(g);
      return g;
    };

    // ── Scene graph ───────────────────────────────────────────────────────
    // rootGroup  holds all objects and is what we position per-breakpoint
    const rootGroup          = new THREE.Group();
    const mainGroup          = new THREE.Group();
    const elbowParent1       = new THREE.Group();
    const elbowParent2       = new THREE.Group();
    const elbowFitting       = new THREE.Group();  // blue elbow with silver insert
    const elbowFitting2      = new THREE.Group();  // green all-plastic elbow

    elbowFitting.rotation.set(0.35, -0.45, 0.2);
    elbowFitting2.rotation.set(-0.25, 0.35 + Math.PI, -0.15);
    elbowParent1.add(elbowFitting);
    elbowParent2.add(elbowFitting2);
    mainGroup.add(elbowParent1, elbowParent2);
    rootGroup.add(mainGroup);
    scene.add(rootGroup);

    // ── Breakpoint layout ─────────────────────────────────────────────────
    let baseX = 0, baseY = 0, mainScale = 1;
    let eb1X = 0, eb1Y = 0, eb1Scale = 0.68;
    let eb2X = 0, eb2Y = 0, eb2Scale = 0.68;

    const applyLayout = () => {
      const w = window.innerWidth;
      if (w > 1400) {
        baseX = 2.5;  baseY = -0.1; mainScale = 0.68;
        eb1X  = 1.8;  eb1Y  = -2.4; eb1Scale  = 0.70;
        eb2X  = 3.2;  eb2Y  = -1.0; eb2Scale  = 0.70;
      } else if (w > 1200) {
        baseX = 2.1;  baseY = -0.1; mainScale = 0.62;
        eb1X  = 1.8;  eb1Y  = -2.2; eb1Scale  = 0.65;
        eb2X  = 3.0;  eb2Y  = -0.9; eb2Scale  = 0.65;
      } else if (w > 768) {
        baseX = 1.5;  baseY = -0.1; mainScale = 0.54;
        eb1X  = 2.2;  eb1Y  = -2.0; eb1Scale  = 0.58;
        eb2X  = 3.2;  eb2Y  = -0.9; eb2Scale  = 0.58;
      } else {
        baseX = 0.2;  baseY =  0.4; mainScale = 0.46;
        eb1X  = -0.5; eb1Y  =  2.0; eb1Scale  = 0.68;
        eb2X  = -1.0; eb2Y  =  3.2; eb2Scale  = 0.68;
      }
      rootGroup.position.set(baseX, baseY, 0);
      rootGroup.scale.setScalar(mainScale);
      elbowParent1.position.set(eb1X, eb1Y, 1.3);
      elbowParent1.scale.setScalar(eb1Scale);
      elbowParent2.position.set(eb2X, eb2Y, 1.1);
      elbowParent2.scale.setScalar(eb2Scale);
    };
    applyLayout();

    // ── Pipe 1: Blue straight pipe with tee ───────────────────────────────
    const pipe1 = new THREE.Group();

    const p1body = new THREE.Mesh(geo(new THREE.CylinderGeometry(0.55, 0.55, 6.5, SEG)), blueMat);
    pipe1.add(p1body);

    // Tee branch
    const tee = new THREE.Group();
    tee.position.y = -0.5;
    const teeMain   = new THREE.Mesh(geo(new THREE.CylinderGeometry(0.68, 0.68, 1.4, SEG)), blueMat);
    const teeBranch = new THREE.Mesh(geo(new THREE.CylinderGeometry(0.68, 0.68, 0.6, SEG)), blueMat);
    teeBranch.rotation.z = -Math.PI / 2; teeBranch.position.set(0.4, 0, 0);
    const teeTaper  = new THREE.Mesh(geo(new THREE.CylinderGeometry(0.55, 0.68, 0.2, SEG)), blueMat);
    teeTaper.rotation.z = -Math.PI / 2; teeTaper.position.set(0.8, 0, 0);
    const teeHex    = new THREE.Mesh(geo(new THREE.CylinderGeometry(0.58, 0.58, 0.3, 6)),    metalMat);
    teeHex.rotation.z = -Math.PI / 2;    teeHex.position.set(1.05, 0, 0);
    const teeThread = new THREE.Mesh(geo(new THREE.CylinderGeometry(0.46, 0.46, 0.4, SEG)), goldMat);
    teeThread.rotation.z = -Math.PI / 2; teeThread.position.set(1.4, 0, 0);
    tee.add(teeMain, teeBranch, teeTaper, teeHex, teeThread);
    if (!SKIP_DETAIL) {
      for (let i = 0; i < 3; i++) {
        const tr = new THREE.Mesh(geo(new THREE.TorusGeometry(0.46, 0.025, 8, DETAIL_SEG)), goldMat);
        tr.rotation.y = Math.PI / 2; tr.position.set(1.25 + i * 0.1, 0, 0);
        tee.add(tr);
      }
    }
    pipe1.add(tee);

    // End fittings
    const p1fitA = createBrassFitting(true, 0.55, blueMat); p1fitA.position.y =  2.75;
    const p1fitB = createBrassFitting(true, 0.55, blueMat); p1fitB.position.y = -2.75; p1fitB.rotation.x = Math.PI;
    pipe1.add(p1fitA, p1fitB);
    pipe1.position.set(-0.6, 0.4, 0); pipe1.rotation.z = -Math.PI / 6;
    if (!isMobile) { pipe1.traverse(c => { if (c instanceof THREE.Mesh) { c.castShadow = true; c.receiveShadow = true; } }); }
    mainGroup.add(pipe1);

    // ── Pipe 2: Green straight pipe with couplings ────────────────────────
    const pipe2 = new THREE.Group();
    const p2body = new THREE.Mesh(geo(new THREE.CylinderGeometry(0.46, 0.46, 6.5, SEG)), greenMat);
    pipe2.add(p2body);
    const cp2a = createCoupling(0.46); cp2a.position.y =  1.8;
    const cp2b = createCoupling(0.46); cp2b.position.y = -1.8;
    pipe2.add(cp2a, cp2b);
    const p2fitA = createBrassFitting(false, 0.46); p2fitA.position.y =  2.75;
    const p2fitB = createBrassFitting(false, 0.46); p2fitB.position.y = -2.75; p2fitB.rotation.x = Math.PI;
    pipe2.add(p2fitA, p2fitB);
    pipe2.position.set(0.7, -0.2, -0.8); pipe2.rotation.z = -Math.PI / 6;
    if (!isMobile) { pipe2.traverse(c => { if (c instanceof THREE.Mesh) { c.castShadow = true; c.receiveShadow = true; } }); }
    mainGroup.add(pipe2);

    // ── Floating elbow 1: Blue 90° with silver threaded insert ───────────
    // Vertical socket
    const vs1 = new THREE.Mesh(geo(new THREE.CylinderGeometry(0.55, 0.55, 0.9, SEG)), blueMat);
    vs1.position.set(-0.55, 0.45, 0);
    const vh1 = new THREE.Mesh(geo(new THREE.CylinderGeometry(0.42, 0.42, 0.91, SEG)), darkMat);
    vh1.position.set(-0.55, 0.46, 0);
    const vl1 = new THREE.Mesh(geo(new THREE.TorusGeometry(0.485, 0.065, TORUS_SEG, TORUS_SEG)), blueMat);
    vl1.rotation.x = Math.PI / 2; vl1.position.set(-0.55, 0.9, 0);
    // Corner bend
    const bend1 = new THREE.Mesh(geo(new THREE.TorusGeometry(0.55, 0.55, TORUS_SEG, TORUS_SEG, Math.PI / 2)), blueMat);
    bend1.rotation.z = Math.PI;
    // Horizontal socket with flutes
    const hs1 = new THREE.Mesh(geo(new THREE.CylinderGeometry(0.64, 0.64, 0.7, SEG)), blueMat);
    hs1.rotation.z = -Math.PI / 2; hs1.position.set(0.35, -0.55, 0);
    const hsh1 = new THREE.Mesh(geo(new THREE.TorusGeometry(0.575, 0.065, TORUS_SEG, TORUS_SEG)), blueMat);
    hsh1.rotation.y = Math.PI / 2; hsh1.position.set(0.7, -0.55, 0);
    elbowFitting.add(vs1, vh1, vl1, bend1, hs1, hsh1);
    if (!SKIP_DETAIL) {
      const fluteGeo = geo(new THREE.CylinderGeometry(0.045, 0.045, 0.7, 12));
      for (let i = 0; i < 12; i++) {
        const a = (i / 12) * Math.PI * 2;
        const fl = new THREE.Mesh(fluteGeo, blueMat);
        fl.rotation.z = -Math.PI / 2; fl.rotation.x = a;
        fl.position.set(0.35, -0.55 + Math.cos(a) * 0.63, Math.sin(a) * 0.63);
        elbowFitting.add(fl);
      }
    }
    // Silver threaded insert
    const shx1 = new THREE.Mesh(geo(new THREE.CylinderGeometry(0.48, 0.48, 0.22, 6)), silverMat);
    shx1.rotation.z = -Math.PI / 2; shx1.position.set(0.81, -0.55, 0);
    const stb1 = new THREE.Mesh(geo(new THREE.CylinderGeometry(0.39, 0.39, 0.45, SEG)), silverMat);
    stb1.rotation.z = -Math.PI / 2; stb1.position.set(1.125, -0.55, 0);
    const sbore1 = new THREE.Mesh(geo(new THREE.CylinderGeometry(0.28, 0.28, 0.47, SEG)), darkMat);
    sbore1.rotation.z = -Math.PI / 2; sbore1.position.set(1.14, -0.55, 0);
    elbowFitting.add(shx1, stb1, sbore1);
    if (!SKIP_DETAIL) {
      for (let i = 0; i < 5; i++) {
        const tr = new THREE.Mesh(geo(new THREE.TorusGeometry(0.39, 0.026, 12, DETAIL_SEG)), silverMat);
        tr.rotation.y = Math.PI / 2; tr.position.set(0.96 + i * 0.08, -0.55, 0);
        elbowFitting.add(tr);
      }
      // Mold seam lines
      const seamV1 = new THREE.Mesh(geo(new THREE.BoxGeometry(0.015, 0.9, 0.015)), blueMat);
      seamV1.position.set(-1.105, 0.45, 0);
      const seamV2 = new THREE.Mesh(geo(new THREE.BoxGeometry(0.015, 0.9, 0.015)), blueMat);
      seamV2.position.set(0.005, 0.45, 0);
      const seamCA = new THREE.Mesh(geo(new THREE.TorusGeometry(1.105, 0.012, 8, TORUS_SEG, Math.PI / 2)), blueMat);
      seamCA.rotation.z = Math.PI;
      const seamCB = new THREE.Mesh(geo(new THREE.TorusGeometry(0.005, 0.012, 8, TORUS_SEG, Math.PI / 2)), blueMat);
      seamCB.rotation.z = Math.PI;
      const seamH1 = new THREE.Mesh(geo(new THREE.BoxGeometry(0.7, 0.015, 0.015)), blueMat);
      seamH1.position.set(0.35, -1.195, 0);
      const seamH2 = new THREE.Mesh(geo(new THREE.BoxGeometry(0.7, 0.015, 0.015)), blueMat);
      seamH2.position.set(0.35, 0.095, 0);
      elbowFitting.add(seamV1, seamV2, seamCA, seamCB, seamH1, seamH2);
    }

    // ── Floating elbow 2: Green 90° all-plastic ───────────────────────────
    const vs2 = new THREE.Mesh(geo(new THREE.CylinderGeometry(0.55, 0.55, 0.9, SEG)), greenMat);
    vs2.position.set(-0.55, 0.45, 0);
    const vh2 = new THREE.Mesh(geo(new THREE.CylinderGeometry(0.42, 0.42, 0.91, SEG)), darkMat);
    vh2.position.set(-0.55, 0.46, 0);
    const vl2 = new THREE.Mesh(geo(new THREE.TorusGeometry(0.485, 0.065, TORUS_SEG, TORUS_SEG)), greenMat);
    vl2.rotation.x = Math.PI / 2; vl2.position.set(-0.55, 0.9, 0);
    const bend2 = new THREE.Mesh(geo(new THREE.TorusGeometry(0.55, 0.55, TORUS_SEG, TORUS_SEG, Math.PI / 2)), greenMat);
    bend2.rotation.z = Math.PI;
    const hs2 = new THREE.Mesh(geo(new THREE.CylinderGeometry(0.55, 0.55, 0.9, SEG)), greenMat);
    hs2.rotation.z = -Math.PI / 2; hs2.position.set(0.45, -0.55, 0);
    const hh2 = new THREE.Mesh(geo(new THREE.CylinderGeometry(0.42, 0.42, 0.91, SEG)), darkMat);
    hh2.rotation.z = -Math.PI / 2; hh2.position.set(0.46, -0.55, 0);
    const hl2 = new THREE.Mesh(geo(new THREE.TorusGeometry(0.485, 0.065, TORUS_SEG, TORUS_SEG)), greenMat);
    hl2.rotation.y = Math.PI / 2; hl2.position.set(0.9, -0.55, 0);
    elbowFitting2.add(vs2, vh2, vl2, bend2, hs2, hh2, hl2);
    if (!SKIP_DETAIL) {
      const sv1 = new THREE.Mesh(geo(new THREE.BoxGeometry(0.015, 0.9, 0.015)), greenMat); sv1.position.set(-1.105, 0.45, 0);
      const sv2 = new THREE.Mesh(geo(new THREE.BoxGeometry(0.015, 0.9, 0.015)), greenMat); sv2.position.set(0.005, 0.45, 0);
      const sc1 = new THREE.Mesh(geo(new THREE.TorusGeometry(1.105, 0.012, 8, TORUS_SEG, Math.PI / 2)), greenMat); sc1.rotation.z = Math.PI;
      const sc2 = new THREE.Mesh(geo(new THREE.TorusGeometry(0.005, 0.012, 8, TORUS_SEG, Math.PI / 2)), greenMat); sc2.rotation.z = Math.PI;
      const sh1 = new THREE.Mesh(geo(new THREE.BoxGeometry(0.9, 0.015, 0.015)), greenMat); sh1.position.set(0.45, -1.105, 0);
      const sh2 = new THREE.Mesh(geo(new THREE.BoxGeometry(0.9, 0.015, 0.015)), greenMat); sh2.position.set(0.45,  0.005, 0);
      elbowFitting2.add(sv1, sv2, sc1, sc2, sh1, sh2);
    }

    // ── Desktop shadow receiver plane ──────────────────────────────────────
    if (!isMobile) {
      const shadowPlane = new THREE.Mesh(
        geo(new THREE.PlaneGeometry(14, 14)),
        mat(new THREE.ShadowMaterial({ opacity: 0.055 }))
      );
      shadowPlane.position.set(0, 0, -2);
      shadowPlane.receiveShadow = true;
      scene.add(shadowPlane);
    }

    // ── Lights ─────────────────────────────────────────────────────────────
    // Ambient: soft base fill so nothing is pitch-black
    scene.add(new THREE.AmbientLight(0xffffff, isMobile ? 1.6 : 1.2));

    // Key: strong top-left cool light + shadow on desktop
    const key = new THREE.DirectionalLight(0xfff5e4, isMobile ? 2.2 : 2.8);
    key.position.set(-5, 8, 6);
    if (!isMobile) {
      key.castShadow = true;
      key.shadow.mapSize.width  = 1024;
      key.shadow.mapSize.height = 1024;
      key.shadow.camera.left   = -7; key.shadow.camera.right  = 7;
      key.shadow.camera.top    =  7; key.shadow.camera.bottom = -7;
      key.shadow.camera.near   = 0.5; key.shadow.camera.far   = 28;
      key.shadow.bias = -0.0004;
    }
    scene.add(key);

    // Rim: bottom-right back edge light (separates pipes from background)
    const rimLight = new THREE.DirectionalLight(0xe8f4fd, 1.8);
    rimLight.position.set(6, -4, -4);
    scene.add(rimLight);

    // Fill: soft top-right warm fill
    const fillLight = new THREE.DirectionalLight(0xffffff, 1.0);
    fillLight.position.set(5, 6, 3);
    scene.add(fillLight);

    // Accent: warm golden point light — desktop only (adds specular pop on metal)
    if (!isMobile) {
      const accent = new THREE.PointLight(0xffd080, 2.2, 18, 2);
      accent.position.set(2, 2, 5);
      scene.add(accent);
    }

    // ── Entrance animation — single lightweight GSAP tween ─────────────────
    // Rise-up from below + fade-in. No timeline, no ScrollTrigger.
    // The canvas is already fading via CSS opacity transition.
    const entranceFrom = baseY - (isMobile ? 1.2 : 2.0);
    rootGroup.position.y = entranceFrom;
    gsap.to(rootGroup.position, {
      y: baseY,
      duration: isMobile ? 0.9 : 1.1,
      ease: 'power3.out',
      delay: 0.1,
    });

    // ── Scroll parallax — zero ScrollTrigger, pure window.scrollY ──────────
    // Passive scroll listener reads native position every frame.
    // Works identically on iOS Safari, Android Chrome, macOS Safari, desktop.
    // Mobile amplitude is half of desktop to avoid over-movement on small screens.
    let scrollY = 0;
    const onScroll = () => { scrollY = window.scrollY; };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── Mouse parallax ─────────────────────────────────────────────────────
    // Main group + elbow parents tilt independently = real 3D depth perception.
    let tPX = 0, tPY = 0, cPX = 0, cPY = 0;   // main group
    let ePX = 0, ePY = 0, cEX = 0, cEY = 0;   // elbows (opposite, smaller)
    const onMouseMove = (e: MouseEvent) => {
      const nx = e.clientX / window.innerWidth  - 0.5;
      const ny = e.clientY / window.innerHeight - 0.5;
      tPX = nx * 0.12;  tPY = ny * 0.08;
      ePX = nx * -0.06; ePY = ny * -0.04; // counter-rotate for parallax depth
    };
    if (!isTouch) window.addEventListener('mousemove', onMouseMove, { passive: true });

    // ── Visibility gate — zero GPU when hero is off-screen ─────────────────
    let isVisible = true;
    const heroSection = container.closest('section') as HTMLElement | null;
    let visObs: IntersectionObserver | null = null;
    if (heroSection) {
      visObs = new IntersectionObserver(
        ([e]) => { isVisible = e.isIntersecting; },
        { threshold: 0 }
      );
      visObs.observe(heroSection);
    }

    // ── Render loop ────────────────────────────────────────────────────────
    // Shared with GSAP ticker — single rAF for the whole page.
    // All transforms are pure math — no GSAP tweens inside the loop.
    const t0 = performance.now();

    const animate = () => {
      if (!isVisible) return;
      const t = (performance.now() - t0) / 1000;

      // ── Scroll parallax ──────────────────────────────────────────────────
      // As user scrolls through the hero, pipes drift up + rotate + recede.
      const heroH    = heroSection?.offsetHeight || window.innerHeight;
      const sp       = Math.min(scrollY / heroH, 1.0);            // 0→1
      const slideAmt = isMobile ? 2.2 : 3.8;
      const zAmt     = isMobile ? 0.8 : 1.6;
      const rotAmt   = isMobile ? 0.28 : 0.45;

      // ── Idle animation (layered on top of scroll offset) ─────────────────
      // Multi-axis: float + slow twist gives organic alive feel
      const idleY  = Math.sin(t * 0.55) * 0.06;
      const idleRX = Math.sin(t * 0.18) * 0.032;
      const idleRY = Math.cos(t * 0.22) * 0.032;
      const idleRZ = Math.sin(t * 0.09) * 0.012; // very slow z twist

      // Apply combined scroll + idle to main group
      mainGroup.position.y = idleY;
      mainGroup.rotation.x = idleRX;
      mainGroup.rotation.y = idleRY;
      mainGroup.rotation.z = idleRZ;

      // Scroll offset lives on rootGroup (separate from idle on mainGroup)
      rootGroup.position.y = baseY - sp * slideAmt;
      rootGroup.position.z = -sp * zAmt;
      rootGroup.rotation.y =  sp * rotAmt;

      // ── Mouse parallax ───────────────────────────────────────────────────
      if (!isTouch) {
        cPX += (tPX - cPX) * 0.045;
        cPY += (tPY - cPY) * 0.045;
        mainGroup.rotation.y += cPX;
        mainGroup.rotation.x += cPY;

        // Independent elbow tilt for 3D depth
        cEX += (ePX - cEX) * 0.03;
        cEY += (ePY - cEY) * 0.03;
        elbowParent1.rotation.y = cEX;
        elbowParent1.rotation.x = cEY;
        elbowParent2.rotation.y = cEX * 0.7;
        elbowParent2.rotation.x = cEY * 0.7;
      }

      // ── Floating elbows — different frequencies = organic depth ──────────
      elbowFitting.rotation.y  =  Math.sin(t * 0.42) * 0.13;
      elbowFitting.rotation.x  =  Math.cos(t * 0.36) * 0.08;
      elbowFitting.position.y  =  Math.sin(t * 0.50) * 0.07;

      elbowFitting2.rotation.y =  Math.cos(t * 0.48) * 0.13;
      elbowFitting2.rotation.x =  Math.sin(t * 0.40) * 0.08;
      elbowFitting2.position.y =  Math.cos(t * 0.44) * 0.07;

      renderer.render(scene, camera);
    };

    gsap.ticker.add(animate);

    // ── Resize ─────────────────────────────────────────────────────────────
    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(applyLayout, 150);
    };
    window.addEventListener('resize', onResize, { passive: true });

    // ── Cleanup ────────────────────────────────────────────────────────────
    return () => {
      gsap.ticker.remove(animate);
      window.removeEventListener('scroll', onScroll);
      if (!isTouch) window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
      if (visObs) visObs.disconnect();
      renderer.dispose();
      geoPool.forEach(g => g.dispose());
      matPool.forEach(m => m.dispose());
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0, left: 0,
        width: '100%', height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
};

export default PPRPipes3D;
