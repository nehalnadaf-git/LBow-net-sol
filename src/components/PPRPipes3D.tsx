'use client'

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '../hooks/useScrollReveal';

gsap.registerPlugin(ScrollTrigger);

const PPRPipes3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect prefers-reduced-motion — skip all WebGL animation for
    // users with vestibular disorders. The hero still renders (no blank space)
    // but the 3D pipes are not shown.
    if (prefersReducedMotion()) return;

    // ── Device tier detection (computed once at mount) ──────────────────
    const isMobile = window.innerWidth < 768;
    const isTouchScrollDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // ── Performance-tier constants ─────────────────────────────────────
    // Mobile: fewer segments, no shadows, no clearcoat, skip micro-detail
    const SEG = isMobile ? 16 : 32;           // Cylinder radial segments
    const TORUS_SEG = isMobile ? 16 : 32;     // Torus tubular & radial segments
    const DETAIL_SEG = isMobile ? 8 : 16;     // Small details (thread ridges)
    const SKIP_DETAIL = isMobile;              // Skip invisible micro-detail meshes
    const DPR_CAP = isMobile ? 1.5 : 2;       // Pixel ratio cap

    // Track WebGL resources for proper garbage collection (memory leak prevention)
    const geometriesToDispose: THREE.BufferGeometry[] = [];
    const materialsToDispose: THREE.Material[] = [];

    const trackGeometry = <T extends THREE.BufferGeometry>(geom: T): T => {
      geometriesToDispose.push(geom);
      return geom;
    };

    const trackMaterial = <T extends THREE.Material>(mat: T): T => {
      materialsToDispose.push(mat);
      return mat;
    };

    // 1. Renderer Setup (Performance-tiered WebGL settings)
    const renderer = new THREE.WebGLRenderer({ 
      antialias: !isMobile,  // MSAA disabled on mobile — expensive, barely visible at high DPR
      alpha: true,
      powerPreference: isMobile ? 'default' : 'high-performance',
    });
    renderer.setClearColor(0x000000, 0); // Transparent background clear color
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, DPR_CAP));

    if (!isMobile) {
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.25;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFShadowMap;
    }
    // Mobile: no tone mapping, no shadows — significant GPU savings

    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 2. Scene & Camera Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      40,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 11); // pulled back slightly to show brass end fittings completely

    // 3. Materials Setup — tiered by device capability
    // Desktop: MeshPhysicalMaterial with clearcoat (premium look)
    // Mobile:  MeshStandardMaterial (no clearcoat pass, ~2× faster)

    const solidGreenPlasticMat = trackMaterial(isMobile
      ? new THREE.MeshStandardMaterial({
          color: 0x1fb542,
          roughness: 0.22,
          metalness: 0.01,
        })
      : new THREE.MeshPhysicalMaterial({
          color: 0x1fb542,
          roughness: 0.22,
          metalness: 0.01,
          clearcoat: 0.28,
          clearcoatRoughness: 0.18,
        })
    );

    const solidBluePlasticMat = trackMaterial(isMobile
      ? new THREE.MeshStandardMaterial({
          color: 0x1565C0,
          roughness: 0.20,
          metalness: 0.01,
        })
      : new THREE.MeshPhysicalMaterial({
          color: 0x1565C0,
          roughness: 0.20,
          metalness: 0.01,
          clearcoat: 0.32,
          clearcoatRoughness: 0.16,
        })
    );

    const metalMat = trackMaterial(isMobile
      ? new THREE.MeshStandardMaterial({
          color: 0xe2d6b5,
          roughness: 0.26,
          metalness: 0.82,
        })
      : new THREE.MeshPhysicalMaterial({
          color: 0xe2d6b5,
          roughness: 0.26,
          metalness: 0.82,
          clearcoat: 0.4,
          clearcoatRoughness: 0.15,
        })
    );

    const goldMetalMat = trackMaterial(isMobile
      ? new THREE.MeshStandardMaterial({
          color: 0xe5b83b,
          roughness: 0.24,
          metalness: 0.85,
        })
      : new THREE.MeshPhysicalMaterial({
          color: 0xe5b83b,
          roughness: 0.24,
          metalness: 0.85,
          clearcoat: 0.35,
          clearcoatRoughness: 0.15,
        })
    );

    const shinySilverMetalMat = trackMaterial(isMobile
      ? new THREE.MeshStandardMaterial({
          color: 0xf5f5f5,
          roughness: 0.05,
          metalness: 1.0,
        })
      : new THREE.MeshPhysicalMaterial({
          color: 0xf5f5f5,
          roughness: 0.01,
          metalness: 1.0,
          clearcoat: 1.0,
          clearcoatRoughness: 0.0,
        })
    );

    // FIX #3: Single shared dark-hole material (was duplicated 5 times)
    const darkHoleMat = trackMaterial(
      new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 })
    );

    // Helper to create a metal transition fitting (hex collar, threads & grip flutes)
    const createBrassFitting = (isMale: boolean, pipeRadius: number, plasticMat = solidGreenPlasticMat) => {
      const group = new THREE.Group();
      const rSleeve = pipeRadius + 0.13;
      const rHex = pipeRadius + 0.05;
      const rThread = pipeRadius - 0.09;

      // 1. Plastic socket sleeve main body
      const plasticSleeve = new THREE.Mesh(
        trackGeometry(new THREE.CylinderGeometry(rSleeve, rSleeve, 0.7, SEG)),
        plasticMat
      );
      plasticSleeve.position.y = 0.65;
      
      // 2. Plastic sleeve taper to pipe
      const plasticTaper = new THREE.Mesh(
        trackGeometry(new THREE.CylinderGeometry(rSleeve, pipeRadius, 0.3, SEG)),
        plasticMat
      );
      plasticTaper.position.y = 0.15;
      group.add(plasticSleeve, plasticTaper);

      // 3. Molded vertical flutes (wrench-grip ridges) — skip on mobile (invisible)
      if (!SKIP_DETAIL) {
        const ridgeGeom = trackGeometry(new THREE.BoxGeometry(0.04, 0.5, 0.04));
        for (let i = 0; i < 8; i++) {
          const angle = (i / 8) * Math.PI * 2;
          const ridgeMesh = new THREE.Mesh(ridgeGeom, plasticMat);
          ridgeMesh.position.set(
            Math.cos(angle) * (rSleeve + 0.02),
            0.6,
            Math.sin(angle) * (rSleeve + 0.02)
          );
          ridgeMesh.rotation.y = -angle;
          group.add(ridgeMesh);
        }
      }

      // 4. Metal insert Hex Nut collar
      const brassHex = new THREE.Mesh(
        trackGeometry(new THREE.CylinderGeometry(rHex, rHex, 0.35, 6)),
        metalMat
      );
      brassHex.position.y = 1.175;
      group.add(brassHex);

      if (isMale) {
        // Male thread body
        const threadBody = new THREE.Mesh(
          trackGeometry(new THREE.CylinderGeometry(rThread, rThread, 0.5, SEG)),
          goldMetalMat
        );
        threadBody.position.y = 1.6;
        group.add(threadBody);

        // Male thread ridges — skip on mobile (invisible at scale)
        if (!SKIP_DETAIL) {
          for (let i = 0; i < 4; i++) {
            const ridge = new THREE.Mesh(
              trackGeometry(new THREE.TorusGeometry(rThread, 0.025, 8, DETAIL_SEG)),
              goldMetalMat
            );
            ridge.rotation.x = Math.PI / 2;
            ridge.position.y = 1.4 + i * 0.12;
            group.add(ridge);
          }
        }
      } else {
        // Female collar
        const femaleCollar = new THREE.Mesh(
          trackGeometry(new THREE.CylinderGeometry(rHex - 0.02, rHex - 0.02, 0.4, SEG)),
          metalMat
        );
        femaleCollar.position.y = 1.4;
        group.add(femaleCollar);

        // Dark inner hole — uses shared darkHoleMat (FIX #3)
        const innerHole = new THREE.Mesh(
          trackGeometry(new THREE.CylinderGeometry(rThread, rThread, 0.41, SEG)),
          darkHoleMat
        );
        innerHole.position.y = 1.41;
        group.add(innerHole);
      }

      if (!isMobile) {
        group.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
      }

      return group;
    };

    // Helper to create plastic coupling with realistic mold seam and entry collars
    const createCoupling = (pipeRadius: number, plasticMat = solidGreenPlasticMat) => {
      const group = new THREE.Group();
      const rSleeve = pipeRadius + 0.13;
      const rRim = rSleeve + 0.03;

      // Main coupling socket
      const main = new THREE.Mesh(
        trackGeometry(new THREE.CylinderGeometry(rSleeve, rSleeve, 0.6, SEG)), 
        plasticMat
      );
      main.position.y = 0;

      // Mold-seam central ridge
      const band = new THREE.Mesh(
        trackGeometry(new THREE.CylinderGeometry(rSleeve + 0.05, rSleeve + 0.05, 0.15, SEG)), 
        plasticMat
      );
      band.position.y = 0;

      // Entry rims (reinforcements at socket edges)
      const topRim = new THREE.Mesh(
        trackGeometry(new THREE.CylinderGeometry(rRim, rRim, 0.1, SEG)), 
        plasticMat
      );
      topRim.position.y = 0.35;
      const bottomRim = new THREE.Mesh(
        trackGeometry(new THREE.CylinderGeometry(rRim, rRim, 0.1, SEG)), 
        plasticMat
      );
      bottomRim.position.y = -0.35;

      // Tapers to meet the pipe surface smoothly
      const topTaper = new THREE.Mesh(
        trackGeometry(new THREE.CylinderGeometry(pipeRadius, rRim, 0.2, SEG)), 
        plasticMat
      );
      topTaper.position.y = 0.5;
      const bottomTaper = new THREE.Mesh(
        trackGeometry(new THREE.CylinderGeometry(rRim, pipeRadius, 0.2, SEG)), 
        plasticMat
      );
      bottomTaper.position.y = -0.5;

      group.add(main, band, topRim, bottomRim, topTaper, bottomTaper);
      
      if (!isMobile) {
        group.traverse(child => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
      }
      return group;
    };

    // 5. Build Group
    const scrollGroup = new THREE.Group();
    scene.add(scrollGroup);

    const mainGroup = new THREE.Group();
    scrollGroup.add(mainGroup);

    // Parent group for elbow fitting 1 to handle GSAP layouts/animations
    const elbowFittingParent = new THREE.Group();
    mainGroup.add(elbowFittingParent);

    // Floating Green 90° Elbow with Threaded Male Insert (matches first image)
    const elbowFitting = new THREE.Group();
    elbowFitting.rotation.set(0.35, -0.45, 0.2); // Static perspective orientation
    elbowFittingParent.add(elbowFitting);

    // Parent group for elbow fitting 2 to handle GSAP layouts/animations
    const elbowFitting2Parent = new THREE.Group();
    mainGroup.add(elbowFitting2Parent);

    // Floating Green 90° All-Plastic Elbow (matches second image)
    const elbowFitting2 = new THREE.Group();
    elbowFitting2.rotation.set(-0.25, 0.35 + Math.PI, -0.15); // Oriented opposite (facing left)
    elbowFitting2Parent.add(elbowFitting2);

    let elbowBaseX = 0;
    let elbowBaseY = 0;
    let elbow2BaseX = 0;
    let elbow2BaseY = 0;

    // State variables for baseline positions/scales
    let baseX = 0;
    let baseY = 0;
    let targetMainScale = 1.0;
    let targetElbowScale = 0.68;
    let targetElbow2Scale = 0.68;

    // Dynamic layout offset and sizing based on screen size (Fully responsive)
    const updateLayoutPosition = () => {
      const width = window.innerWidth;
      if (width > 1400) {
        // Large desktop (1400px+)
        baseX = 2.5;
        baseY = -0.1;
        targetMainScale = 0.68;

        elbowBaseX = 1.8;
        elbowBaseY = -2.4;
        targetElbowScale = 0.70;

        elbow2BaseX = 3.2;
        elbow2BaseY = -1.0;
        targetElbow2Scale = 0.70;
      } else if (width > 1200) {
        // Standard desktop (1200–1400px) — original working values
        baseX = 2.1;
        baseY = -0.1;
        targetMainScale = 0.62;

        elbowBaseX = 1.8;
        elbowBaseY = -2.2;
        targetElbowScale = 0.65;

        elbow2BaseX = 3.0;
        elbow2BaseY = -0.9;
        targetElbow2Scale = 0.65;
      } else if (width > 768) {
        // Tablet / small desktop (768–1200px)
        baseX = 1.5;
        baseY = -0.1;
        targetMainScale = 0.54;

        elbowBaseX = 2.2;
        elbowBaseY = -2.0;
        targetElbowScale = 0.58;

        elbow2BaseX = 3.2;
        elbow2BaseY = -0.9;
        targetElbow2Scale = 0.58;
      } else {
        // Mobile (< 768px): FIX #9 — tightened positions for better viewport coverage
        baseX = 0.2;
        baseY = 0.4;
        targetMainScale = 0.46;

        elbowBaseX = -0.5;
        elbowBaseY = 2.0;
        targetElbowScale = 0.68;

        elbow2BaseX = -1.0;
        elbow2BaseY = 3.2;
        targetElbow2Scale = 0.68;
      }
    };

    updateLayoutPosition();

    // Apply initial layout positions (before intro animation overrides them)
    scrollGroup.position.set(baseX, baseY, 0);
    scrollGroup.scale.set(targetMainScale, targetMainScale, targetMainScale);
    elbowFittingParent.position.set(elbowBaseX, elbowBaseY, 1.3);
    elbowFittingParent.scale.set(targetElbowScale, targetElbowScale, targetElbowScale);
    elbowFitting2Parent.position.set(elbow2BaseX, elbow2BaseY, 1.1);
    elbowFitting2Parent.scale.set(targetElbow2Scale, targetElbow2Scale, targetElbow2Scale);

    // 10. GSAP Intro Reveal & Scroll Animations
    // Set initial off-screen / scaled-down values for the intro reveal
    gsap.set(scrollGroup.position, { y: baseY - 4.5, z: -3 });
    gsap.set(scrollGroup.rotation, { z: -Math.PI / 4, y: -0.4 });
    gsap.set(elbowFittingParent.scale, { x: 0, y: 0, z: 0 });
    gsap.set(elbowFitting2Parent.scale, { x: 0, y: 0, z: 0 });

    const introTl = gsap.timeline({
      defaults: { duration: 1.8, ease: 'power4.out' }
    });

    // Animate to baseline layout values
    introTl.to(scrollGroup.position, { y: baseY, z: 0, duration: 2.0 }, 0);
    introTl.to(scrollGroup.rotation, { z: 0, y: 0, duration: 2.0 }, 0);
    introTl.to(elbowFittingParent.scale, { x: targetElbowScale, y: targetElbowScale, z: targetElbowScale, ease: 'elastic.out(1.0, 0.65)', duration: 1.6 }, 0.4);
    introTl.to(elbowFitting2Parent.scale, { x: targetElbow2Scale, y: targetElbow2Scale, z: targetElbow2Scale, ease: 'elastic.out(1.0, 0.65)', duration: 1.6 }, 0.65);

    // FIX #2: Create scroll timeline AFTER intro completes to prevent
    // both timelines fighting over scrollGroup.position.y simultaneously.
    // If user scrolls during intro, fast-forward intro to end first.
    const heroEl = container.closest('section') as HTMLElement | null;
    let scrollTl: gsap.core.Timeline;

    const createScrollTimeline = () => {
      scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroEl || document.body,
          start: 'top top',
          end: 'bottom top',          // hero fully exited = animation complete
          scrub: isTouchScrollDevice ? true : 0.15,
          invalidateOnRefresh: true,  // FIX #6: recalculate on viewport change
        }
      });

      // Rotate main group as we scroll
      scrollTl.to(scrollGroup.rotation, {
        y: isMobile ? 0.5 : 0.75,
        x: isMobile ? -0.1 : -0.2,
        ease: 'none'
      }, 0);

      // Slide out and pull into background
      scrollTl.to(scrollGroup.position, {
        y: isMobile ? '-=2.8' : '-=4.5',
        z: isMobile ? -1.5 : -3,
        ease: 'none'
      }, 0);

      // Carry away the floating elbow fittings as we scroll
      scrollTl.to(elbowFittingParent.position, {
        y: isMobile ? '-=2.0' : '-=3.0',
        x: isMobile ? '-=0.8' : '-=1.2',
        z: isMobile ? '+=0.5' : '+=0.8',
        ease: 'none'
      }, 0);
      scrollTl.to(elbowFittingParent.rotation, {
        z: '+=1.2',
        x: '+=0.8',
        ease: 'none'
      }, 0);

      scrollTl.to(elbowFitting2Parent.position, {
        y: isMobile ? '-=1.8' : '-=2.5',
        x: isMobile ? '-=0.7' : '-=1.0',
        z: isMobile ? '+=0.6' : '+=1.0',
        ease: 'none'
      }, 0);
      scrollTl.to(elbowFitting2Parent.rotation, {
        z: '-=1.2',
        y: `+=${Math.PI * 0.5}`,
        ease: 'none'
      }, 0);
    };

    // Wait for intro to finish before enabling scroll-linked animation
    introTl.then(() => {
      createScrollTimeline();
    });

    // If user starts scrolling before intro ends, fast-forward intro
    const earlyScrollHandler = () => {
      if (introTl.isActive()) {
        introTl.progress(1).kill();
        createScrollTimeline();
        window.removeEventListener('scroll', earlyScrollHandler);
      }
    };
    window.addEventListener('scroll', earlyScrollHandler, { passive: true });

    // ----------------------------------------------------
    // PIPE 1: Straight PPR Pipe (Blue — matches blue PPR pipe product)
    // ----------------------------------------------------
    const pipe1 = new THREE.Group();
    
    // Main tube body (Fat radius: 0.55, length: 6.5)
    const body1 = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.55, 0.55, 6.5, SEG)), 
      solidBluePlasticMat
    );
    pipe1.add(body1);

    // Middle branch: Molded "Male Tee" adapter (connects to branch lines)
    const teeGroup = new THREE.Group();
    
    const teeMain = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.68, 0.68, 1.4, SEG)),
      solidBluePlasticMat
    );
    const teeBranch = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.68, 0.68, 0.6, SEG)),
      solidBluePlasticMat
    );
    teeBranch.rotation.z = -Math.PI / 2;
    teeBranch.position.set(0.4, 0, 0); // pointing outwards (right)
    
    const teeTaper = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.55, 0.68, 0.2, SEG)),
      solidBluePlasticMat
    );
    teeTaper.rotation.z = -Math.PI / 2;
    teeTaper.position.set(0.8, 0, 0);

    // Metal male insert on the Tee branch
    const teeHex = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.58, 0.58, 0.3, 6)),
      metalMat
    );
    teeHex.rotation.z = -Math.PI / 2;
    teeHex.position.set(1.05, 0, 0);

    const teeThread = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.46, 0.46, 0.4, SEG)),
      goldMetalMat
    );
    teeThread.rotation.z = -Math.PI / 2;
    teeThread.position.set(1.4, 0, 0);

    teeGroup.add(teeMain, teeBranch, teeTaper, teeHex, teeThread);

    // 3D threads around the Tee branch — skip on mobile (invisible)
    if (!SKIP_DETAIL) {
      for (let i = 0; i < 3; i++) {
        const ridge = new THREE.Mesh(
          trackGeometry(new THREE.TorusGeometry(0.46, 0.025, 8, DETAIL_SEG)),
          goldMetalMat
        );
        ridge.rotation.y = Math.PI / 2;
        ridge.position.set(1.25 + i * 0.1, 0, 0);
        teeGroup.add(ridge);
      }
    }
    
    teeGroup.position.y = -0.5; // positioned off-center
    pipe1.add(teeGroup);

    // Metal transition fittings at the pipe ends (blue pipe uses blue plastic in fittings)
    const fitting1a = createBrassFitting(true, 0.55, solidBluePlasticMat); // Top Male Fitting
    fitting1a.position.y = 2.75;
    const fitting1b = createBrassFitting(true, 0.55, solidBluePlasticMat); // Bottom Male Fitting
    fitting1b.position.y = -2.75;
    fitting1b.rotation.x = Math.PI;
    pipe1.add(fitting1a, fitting1b);

    pipe1.position.set(-0.6, 0.4, 0);
    pipe1.rotation.z = -Math.PI / 6; // Diagonal flow
    mainGroup.add(pipe1);

    // ----------------------------------------------------
    // PIPE 2: Straight PPR Pipe (Green — standard green PPR)
    // ----------------------------------------------------
    const pipe2 = new THREE.Group();

    // Main tube body (Fat radius: 0.46, length: 6.5)
    const body2 = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.46, 0.46, 6.5, SEG)), 
      solidGreenPlasticMat
    );
    pipe2.add(body2);

    // Coupling joint details
    const coupling2a = createCoupling(0.46);
    coupling2a.position.y = 1.8;
    const coupling2b = createCoupling(0.46);
    coupling2b.position.y = -1.8;
    pipe2.add(coupling2a, coupling2b);

    // Metal fittings at ends (Female transition fitting for design variation)
    const fitting2a = createBrassFitting(false, 0.46); // Top Female Fitting
    fitting2a.position.y = 2.75;
    const fitting2b = createBrassFitting(false, 0.46); // Bottom Female Fitting
    fitting2b.position.y = -2.75;
    fitting2b.rotation.x = Math.PI;
    pipe2.add(fitting2a, fitting2b);

    pipe2.position.set(0.7, -0.2, -0.8); // Offset behind Pipe 1
    pipe2.rotation.z = -Math.PI / 6; // Parallel flow
    mainGroup.add(pipe2);


    // ----------------------------------------------------
    // FITTING 1: Floating Blue 90° Elbow with Threaded Male Insert
    // ----------------------------------------------------

    // 1. Vertical socket part (pointing up)
    const vertSocket = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.55, 0.55, 0.9, SEG)),
      solidBluePlasticMat
    );
    vertSocket.position.set(-0.55, 0.45, 0);
    elbowFitting.add(vertSocket);

    // Dark inner hole at the top of the vertical socket — uses shared darkHoleMat
    const vertHole = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.42, 0.42, 0.91, SEG)),
      darkHoleMat
    );
    vertHole.position.set(-0.55, 0.46, 0);
    elbowFitting.add(vertHole);

    // Rounded lip torus at the top edge of the vertical socket for realistic molded finish
    const vertLip = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(0.485, 0.065, TORUS_SEG, TORUS_SEG)),
      solidBluePlasticMat
    );
    vertLip.rotation.x = Math.PI / 2;
    vertLip.position.set(-0.55, 0.9, 0);
    elbowFitting.add(vertLip);

    // 2. Corner bend (molded 90° elbow)
    const cornerElbow = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(0.55, 0.55, TORUS_SEG, TORUS_SEG, Math.PI / 2)),
      solidBluePlasticMat
    );
    cornerElbow.rotation.z = Math.PI;
    elbowFitting.add(cornerElbow);

    // 3. Horizontal molded fluted sleeve (pointing right)
    const horizSocket = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.64, 0.64, 0.7, SEG)),
      solidBluePlasticMat
    );
    horizSocket.rotation.z = -Math.PI / 2;
    horizSocket.position.set(0.35, -0.55, 0);
    elbowFitting.add(horizSocket);

    // Rounded shoulder torus at the horizontal socket end
    const horizShoulder = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(0.575, 0.065, TORUS_SEG, TORUS_SEG)),
      solidBluePlasticMat
    );
    horizShoulder.rotation.y = Math.PI / 2;
    horizShoulder.position.set(0.7, -0.55, 0);
    elbowFitting.add(horizShoulder);

    // 12 Semi-circular flutes (grip ridges) on horizontal sleeve — skip on mobile
    if (!SKIP_DETAIL) {
      const fluteGeom = trackGeometry(new THREE.CylinderGeometry(0.045, 0.045, 0.7, 12));
      for (let i = 0; i < 12; i++) {
        const angle = (i / 12) * Math.PI * 2;
        const flute = new THREE.Mesh(fluteGeom, solidBluePlasticMat);
        flute.rotation.z = -Math.PI / 2;
        flute.rotation.x = angle;
        flute.position.set(
          0.35,
          -0.55 + Math.cos(angle) * 0.63,
          Math.sin(angle) * 0.63
        );
        elbowFitting.add(flute);
      }
    }

    // 4. Threaded metal insert (silver-plated chrome matching the image)
    const metalHex = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.48, 0.48, 0.22, 6)),
      shinySilverMetalMat
    );
    metalHex.rotation.z = -Math.PI / 2;
    metalHex.position.set(0.81, -0.55, 0);
    elbowFitting.add(metalHex);

    // Silver threaded body cylinder
    const metalThreadBody = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.39, 0.39, 0.45, SEG)),
      shinySilverMetalMat
    );
    metalThreadBody.rotation.z = -Math.PI / 2;
    metalThreadBody.position.set(1.125, -0.55, 0);
    elbowFitting.add(metalThreadBody);

    // 5 spiral thread ridges (toruses) in silver metal — skip on mobile
    if (!SKIP_DETAIL) {
      for (let i = 0; i < 5; i++) {
        const threadRidge = new THREE.Mesh(
          trackGeometry(new THREE.TorusGeometry(0.39, 0.026, 12, DETAIL_SEG)),
          shinySilverMetalMat
        );
        threadRidge.rotation.y = Math.PI / 2;
        threadRidge.position.set(0.96 + i * 0.08, -0.55, 0);
        elbowFitting.add(threadRidge);
      }
    }

    // Dark bore hole inside the threaded metal insert — uses shared darkHoleMat
    const metalBoreHole = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.28, 0.28, 0.47, SEG)),
      darkHoleMat
    );
    metalBoreHole.rotation.z = -Math.PI / 2;
    metalBoreHole.position.set(1.14, -0.55, 0);
    elbowFitting.add(metalBoreHole);

    // 5. Mold parting line seams for elbow fitting 1 (blue) — skip on mobile
    if (!SKIP_DETAIL) {
      const seamColorMat = solidBluePlasticMat;

      const vertSeamOuter = new THREE.Mesh(
        trackGeometry(new THREE.BoxGeometry(0.015, 0.9, 0.015)),
        seamColorMat
      );
      vertSeamOuter.position.set(-1.105, 0.45, 0);
      elbowFitting.add(vertSeamOuter);

      const vertSeamInner = new THREE.Mesh(
        trackGeometry(new THREE.BoxGeometry(0.015, 0.9, 0.015)),
        seamColorMat
      );
      vertSeamInner.position.set(0.005, 0.45, 0);
      elbowFitting.add(vertSeamInner);

      const cornerSeamOuter = new THREE.Mesh(
        trackGeometry(new THREE.TorusGeometry(1.105, 0.012, 8, TORUS_SEG, Math.PI / 2)),
        seamColorMat
      );
      cornerSeamOuter.rotation.z = Math.PI;
      elbowFitting.add(cornerSeamOuter);

      const cornerSeamInner = new THREE.Mesh(
        trackGeometry(new THREE.TorusGeometry(0.005, 0.012, 8, TORUS_SEG, Math.PI / 2)),
        seamColorMat
      );
      cornerSeamInner.rotation.z = Math.PI;
      elbowFitting.add(cornerSeamInner);

      const horizSeamOuter = new THREE.Mesh(
        trackGeometry(new THREE.BoxGeometry(0.7, 0.015, 0.015)),
        seamColorMat
      );
      horizSeamOuter.position.set(0.35, -1.195, 0);
      elbowFitting.add(horizSeamOuter);

      const horizSeamInner = new THREE.Mesh(
        trackGeometry(new THREE.BoxGeometry(0.7, 0.015, 0.015)),
        seamColorMat
      );
      horizSeamInner.position.set(0.35, 0.095, 0);
      elbowFitting.add(horizSeamInner);
    }

    // ----------------------------------------------------
    // FITTING 2: Floating Green 90° All-Plastic Elbow (standard green)
    // ----------------------------------------------------

    // 1. Vertical socket part
    const vertSocket2 = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.55, 0.55, 0.9, SEG)),
      solidGreenPlasticMat
    );
    vertSocket2.position.set(-0.55, 0.45, 0);
    elbowFitting2.add(vertSocket2);

    // Dark inner hole — uses shared darkHoleMat
    const vertHole2 = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.42, 0.42, 0.91, SEG)),
      darkHoleMat
    );
    vertHole2.position.set(-0.55, 0.46, 0);
    elbowFitting2.add(vertHole2);

    // Rounded lip torus
    const vertLip2 = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(0.485, 0.065, TORUS_SEG, TORUS_SEG)),
      solidGreenPlasticMat
    );
    vertLip2.rotation.x = Math.PI / 2;
    vertLip2.position.set(-0.55, 0.9, 0);
    elbowFitting2.add(vertLip2);

    // 2. Corner bend
    const cornerElbow2 = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(0.55, 0.55, TORUS_SEG, TORUS_SEG, Math.PI / 2)),
      solidGreenPlasticMat
    );
    cornerElbow2.rotation.z = Math.PI;
    elbowFitting2.add(cornerElbow2);

    // 3. Horizontal socket part
    const horizSocket2 = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.55, 0.55, 0.9, SEG)),
      solidGreenPlasticMat
    );
    horizSocket2.rotation.z = -Math.PI / 2;
    horizSocket2.position.set(0.45, -0.55, 0);
    elbowFitting2.add(horizSocket2);

    // Dark inner hole — uses shared darkHoleMat
    const horizHole2 = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.42, 0.42, 0.91, SEG)),
      darkHoleMat
    );
    horizHole2.rotation.z = -Math.PI / 2;
    horizHole2.position.set(0.46, -0.55, 0);
    elbowFitting2.add(horizHole2);

    // Rounded lip torus
    const horizLip2 = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(0.485, 0.065, TORUS_SEG, TORUS_SEG)),
      solidGreenPlasticMat
    );
    horizLip2.rotation.y = Math.PI / 2;
    horizLip2.position.set(0.9, -0.55, 0);
    elbowFitting2.add(horizLip2);

    // 4. Mold parting line seams (green) — skip on mobile
    if (!SKIP_DETAIL) {
      const seamColorMat2 = solidGreenPlasticMat;

      const vertSeamOuter2 = new THREE.Mesh(
        trackGeometry(new THREE.BoxGeometry(0.015, 0.9, 0.015)),
        seamColorMat2
      );
      vertSeamOuter2.position.set(-1.105, 0.45, 0);
      elbowFitting2.add(vertSeamOuter2);

      const vertSeamInner2 = new THREE.Mesh(
        trackGeometry(new THREE.BoxGeometry(0.015, 0.9, 0.015)),
        seamColorMat2
      );
      vertSeamInner2.position.set(0.005, 0.45, 0);
      elbowFitting2.add(vertSeamInner2);

      const cornerSeamOuter2 = new THREE.Mesh(
        trackGeometry(new THREE.TorusGeometry(1.105, 0.012, 8, TORUS_SEG, Math.PI / 2)),
        seamColorMat2
      );
      cornerSeamOuter2.rotation.z = Math.PI;
      elbowFitting2.add(cornerSeamOuter2);

      const cornerSeamInner2 = new THREE.Mesh(
        trackGeometry(new THREE.TorusGeometry(0.005, 0.012, 8, TORUS_SEG, Math.PI / 2)),
        seamColorMat2
      );
      cornerSeamInner2.rotation.z = Math.PI;
      elbowFitting2.add(cornerSeamInner2);

      const horizSeamOuter2 = new THREE.Mesh(
        trackGeometry(new THREE.BoxGeometry(0.9, 0.015, 0.015)),
        seamColorMat2
      );
      horizSeamOuter2.position.set(0.45, -1.105, 0);
      elbowFitting2.add(horizSeamOuter2);

      const horizSeamInner2 = new THREE.Mesh(
        trackGeometry(new THREE.BoxGeometry(0.9, 0.015, 0.015)),
        seamColorMat2
      );
      horizSeamInner2.position.set(0.45, 0.005, 0);
      elbowFitting2.add(horizSeamInner2);
    }


    // Enable shadows on all meshes recursively — desktop only
    if (!isMobile) {
      mainGroup.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.castShadow = true;
          object.receiveShadow = true;
        }
      });
    }

    // Shadow receiver plane behind the pipes — desktop only
    if (!isMobile) {
      const shadowPlane = new THREE.Mesh(
        trackGeometry(new THREE.PlaneGeometry(14, 14)),  // FIX #11: reduced from 30×30
        trackMaterial(new THREE.ShadowMaterial({ opacity: 0.045 }))  // FIX #4: tracked material
      );
      shadowPlane.position.set(0, 0, -2);
      shadowPlane.receiveShadow = true;
      scene.add(shadowPlane);
    }

    // 6. Lighting Setup (Soft studio setup)
    scene.add(new THREE.AmbientLight(0xffffff, 1.4));

    // Warm Key Light (casts soft shadows on desktop only)
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(-5, 8, 6);
    if (!isMobile) {
      const shadowSize = window.innerWidth > 768 ? 1024 : 512;
      dirLight1.castShadow = true;
      dirLight1.shadow.mapSize.width = shadowSize;
      dirLight1.shadow.mapSize.height = shadowSize;
      dirLight1.shadow.camera.near = 0.5;
      dirLight1.shadow.camera.far = 25;
      dirLight1.shadow.camera.left = -6;
      dirLight1.shadow.camera.right = 6;
      dirLight1.shadow.camera.top = 6;
      dirLight1.shadow.camera.bottom = -6;
      dirLight1.shadow.bias = -0.0005;
    }
    scene.add(dirLight1);

    // Soft neutral rim light
    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight2.position.set(5, -5, -3);
    scene.add(dirLight2);

    // Soft fill light
    const dirLight3 = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight3.position.set(4, 5, 2);
    scene.add(dirLight3);

    // 7. Mouse & Touch Interactivity (Parallax scroll & float effect)
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    // ── Visibility guard — toggle isAnimating when hero enters/leaves viewport ──
    let isHeroVisible = true;
    let isAnimating = true;
    const heroSection = container.closest('section') as HTMLElement | null;

    let visibilityObserver: IntersectionObserver | null = null;
    if (heroSection) {
      visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          const nowVisible = entry.isIntersecting;
          isAnimating = nowVisible;
          isHeroVisible = nowVisible;
          if (!nowVisible) {
            // Reset mouse so pipes return to neutral when hero is revisited
            mouseX = 0;
            mouseY = 0;
            targetX = 0;
            targetY = 0;
          }
        },
        { threshold: 0 }
      );
      visibilityObserver.observe(heroSection);
    }

    const onMouseMove = (event: MouseEvent) => {
      if (!isHeroVisible) return;  // Hero is off-screen — ignore all mouse input
      mouseX = (event.clientX / window.innerWidth) - 0.5;
      mouseY = (event.clientY / window.innerHeight) - 0.5;
    };

    window.addEventListener('mousemove', onMouseMove);
    // Touch parallax disabled on touch devices — conflicts with scroll (see original comments)

    // 8. Render loop — driven by GSAP ticker (same RAF as Lenis + ScrollTrigger).
    const startMs = performance.now();
    const animate = () => {
      if (!isAnimating) return; // hero off-screen — skip render, save GPU

      const elapsed = (performance.now() - startMs) / 1000; // seconds

      // Subtle vertical floating animation
      mainGroup.position.y = Math.sin(elapsed * 0.8) * 0.05;

      // Slow idle rotation oscillations
      mainGroup.rotation.x = Math.sin(elapsed * 0.15) * 0.04;
      mainGroup.rotation.y = Math.cos(elapsed * 0.2) * 0.04;

      // Mouse/Touch Parallax movement (smooth interpolation)
      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      // Cap parallax influence — prevents excessive swing on 4K/ultrawide screens
      const clampedX = Math.max(-0.15, Math.min(0.15, targetX));
      const clampedY = Math.max(-0.15, Math.min(0.15, targetY));
      mainGroup.rotation.y += clampedX * 0.4;
      mainGroup.rotation.x += clampedY * 0.4;

      // Individual subtle slow drift & rotation for the two floating fittings
      elbowFitting.rotation.y = Math.sin(elapsed * 0.5) * 0.15;
      elbowFitting.rotation.x = Math.cos(elapsed * 0.4) * 0.1;
      elbowFitting.position.y = Math.sin(elapsed * 0.7) * 0.08;

      elbowFitting2.rotation.y = Math.cos(elapsed * 0.6) * 0.15;
      elbowFitting2.rotation.x = Math.sin(elapsed * 0.5) * 0.1;
      elbowFitting2.position.y = Math.cos(elapsed * 0.6) * 0.08;

      // Render — always in sync with GSAP scroll position (same frame)
      renderer.render(scene, camera);
    };

    // Register with GSAP ticker — no standalone rAF loop needed
    gsap.ticker.add(animate);

    // 9. Resize Handling — FIX #5: smooth animated reposition on orientation change
    let resizeDebounce: ReturnType<typeof setTimeout>;
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);

      clearTimeout(resizeDebounce);
      resizeDebounce = setTimeout(() => {
        updateLayoutPosition();
        // Smoothly animate to new positions (no jarring jump)
        gsap.to(scrollGroup.position, { x: baseX, y: baseY, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
        gsap.to(scrollGroup.scale, { x: targetMainScale, y: targetMainScale, z: targetMainScale, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
        gsap.to(elbowFittingParent.position, { x: elbowBaseX, y: elbowBaseY, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
        gsap.to(elbowFittingParent.scale, { x: targetElbowScale, y: targetElbowScale, z: targetElbowScale, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
        gsap.to(elbowFitting2Parent.position, { x: elbow2BaseX, y: elbow2BaseY, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
        gsap.to(elbowFitting2Parent.scale, { x: targetElbow2Scale, y: targetElbow2Scale, z: targetElbow2Scale, duration: 0.6, ease: 'power2.out', overwrite: 'auto' });
      }, 150);
    };
    window.addEventListener('resize', handleResize);

    // 10. Cleanup (Comprehensive WebGL disposal to prevent memory leaks)
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', earlyScrollHandler);
      clearTimeout(resizeDebounce);
      gsap.ticker.remove(animate); // Remove from shared GSAP ticker
      // FIX #8: removed dead cancelAnimationFrame(frameRef.current)
      // Disconnect visibility observer
      if (visibilityObserver) visibilityObserver.disconnect();
      renderer.dispose();
      
      // Dispose all tracked WebGL resources (geometries + materials)
      geometriesToDispose.forEach(geom => geom.dispose());
      materialsToDispose.forEach(mat => mat.dispose());

      // Kill GSAP timelines and ScrollTriggers
      introTl.kill();
      if (scrollTl) {
        scrollTl.scrollTrigger?.kill();
        scrollTl.kill();
      }

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none', // Allow cursor to click buttons underneath
      }}
    />
  );
};

export default PPRPipes3D;
