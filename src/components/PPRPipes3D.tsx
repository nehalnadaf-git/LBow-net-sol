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
  const frameRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Respect prefers-reduced-motion — skip all WebGL animation for
    // users with vestibular disorders. The hero still renders (no blank space)
    // but the 3D pipes are not shown.
    if (prefersReducedMotion()) return;

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

    // 1. Renderer Setup (High-performance WebGL settings)
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: "high-performance" // requests high-performance GPU on dual-GPU systems/mobiles
    });
    renderer.setClearColor(0x000000, 0); // Transparent background clear color
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // cap at 2 for performance on mobile
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap; // PCFSoftShadowMap deprecated in r169+
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

    // 3. Materials Setup (High-quality physical plastic & silver metal)
    const solidGreenPlasticMat = new THREE.MeshPhysicalMaterial({
      color: 0x1fb542, // Vibrant grass green matching the image standard
      roughness: 0.22, // Satin/matte plastic texture
      metalness: 0.01,
      clearcoat: 0.28, // soft outer glossy lacquer look
      clearcoatRoughness: 0.18,
    });

    // PPR Blue material — matches standard blue PPR pipe colour (royal/deep blue)
    const solidBluePlasticMat = new THREE.MeshPhysicalMaterial({
      color: 0x1565C0, // Deep royal blue — authentic PPR pipe blue
      roughness: 0.20,
      metalness: 0.01,
      clearcoat: 0.32,
      clearcoatRoughness: 0.16,
    });


    // Material A: Silver plus gold champagne alloy mixture (for fittings hex collars)
    const metalMat = new THREE.MeshPhysicalMaterial({
      color: 0xe2d6b5, // Silver plus gold alloy mix (champagne metallic)
      roughness: 0.26, // diffuse scattering to reveal shape without mirroring black skybox
      metalness: 0.82, // strong metal reflectivity
      clearcoat: 0.4, // polished outer layer
      clearcoatRoughness: 0.15,
    });

    // Material B: Full realistic golden metal color (for threaded cylinders & ridges)
    const goldMetalMat = new THREE.MeshPhysicalMaterial({
      color: 0xe5b83b, // Deep rich realistic gold/brass metal color
      roughness: 0.24, // diffuse roughness to prevent black reflection pools
      metalness: 0.85, // strong metallic luster
      clearcoat: 0.35, // polished outer layer
      clearcoatRoughness: 0.15,
    });

    // Material C: Polished chrome/silver steel for threads and inserts (mirror finish)
    const shinySilverMetalMat = new THREE.MeshPhysicalMaterial({
      color: 0xf5f5f5, // Bright mirror silver
      roughness: 0.01, // Near zero roughness for mirror reflection
      metalness: 1.0,  // 100% metallic mirror surface
      clearcoat: 1.0,  // Fully polished clearcoat
      clearcoatRoughness: 0.0,
    });

    // Helper to create a metal transition fitting (highly realistic hex collar, 3D threads & grip flutes)
    const createBrassFitting = (isMale: boolean, pipeRadius: number, plasticMat = solidGreenPlasticMat) => {
      const group = new THREE.Group();
      const rSleeve = pipeRadius + 0.13;
      const rHex = pipeRadius + 0.05;
      const rThread = pipeRadius - 0.09;

      // 1. Plastic socket sleeve main body
      const plasticSleeve = new THREE.Mesh(
        trackGeometry(new THREE.CylinderGeometry(rSleeve, rSleeve, 0.7, 24)),
        plasticMat
      );
      plasticSleeve.position.y = 0.65;
      
      // 2. Plastic sleeve taper to pipe
      const plasticTaper = new THREE.Mesh(
        trackGeometry(new THREE.CylinderGeometry(rSleeve, pipeRadius, 0.3, 24)),
        plasticMat
      );
      plasticTaper.position.y = 0.15;
      group.add(plasticSleeve, plasticTaper);

      // 3. Molded vertical flutes (wrench-grip ridges) around the plastic sleeve base
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

      // 4. Metal insert Hex Nut collar
      const brassHex = new THREE.Mesh(
        trackGeometry(new THREE.CylinderGeometry(rHex, rHex, 0.35, 6)),
        metalMat
      );
      brassHex.position.y = 1.175;
      group.add(brassHex);

      if (isMale) {
        // Male thread body (full realistic gold metal)
        const threadBody = new THREE.Mesh(
          trackGeometry(new THREE.CylinderGeometry(rThread, rThread, 0.5, 24)),
          goldMetalMat
        );
        threadBody.position.y = 1.6;
        group.add(threadBody);

        // Male thread ridges (real 3D spiral-threads using toruses in full realistic gold)
        for (let i = 0; i < 4; i++) {
          const ridge = new THREE.Mesh(
            trackGeometry(new THREE.TorusGeometry(rThread, 0.025, 8, 16)),
            goldMetalMat
          );
          ridge.rotation.x = Math.PI / 2;
          ridge.position.y = 1.4 + i * 0.12;
          group.add(ridge);
        }
      } else {
        // Female collar (silver-gold mix)
        const femaleCollar = new THREE.Mesh(
          trackGeometry(new THREE.CylinderGeometry(rHex - 0.02, rHex - 0.02, 0.4, 24)),
          metalMat
        );
        femaleCollar.position.y = 1.4;
        group.add(femaleCollar);

        // Dark inner hole lined with gold metal threads on the sides
        const innerHole = new THREE.Mesh(
          trackGeometry(new THREE.CylinderGeometry(rThread, rThread, 0.41, 24)),
          trackMaterial(new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 }))
        );
        innerHole.position.y = 1.41;
        group.add(innerHole);
      }

      group.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      return group;
    };

    // Helper to create plastic coupling with realistic mold seam and entry collars
    const createCoupling = (pipeRadius: number, plasticMat = solidGreenPlasticMat) => {
      const group = new THREE.Group();
      const rSleeve = pipeRadius + 0.13;
      const rRim = rSleeve + 0.03;

      // Main coupling socket
      const main = new THREE.Mesh(
        trackGeometry(new THREE.CylinderGeometry(rSleeve, rSleeve, 0.6, 24)), 
        plasticMat
      );
      main.position.y = 0;

      // Mold-seam central ridge
      const band = new THREE.Mesh(
        trackGeometry(new THREE.CylinderGeometry(rSleeve + 0.05, rSleeve + 0.05, 0.15, 24)), 
        plasticMat
      );
      band.position.y = 0;

      // Entry rims (reinforcements at socket edges)
      const topRim = new THREE.Mesh(
        trackGeometry(new THREE.CylinderGeometry(rRim, rRim, 0.1, 24)), 
        plasticMat
      );
      topRim.position.y = 0.35;
      const bottomRim = new THREE.Mesh(
        trackGeometry(new THREE.CylinderGeometry(rRim, rRim, 0.1, 24)), 
        plasticMat
      );
      bottomRim.position.y = -0.35;

      // Tapers to meet the pipe surface smoothly
      const topTaper = new THREE.Mesh(
        trackGeometry(new THREE.CylinderGeometry(pipeRadius, rRim, 0.2, 24)), 
        plasticMat
      );
      topTaper.position.y = 0.5;
      const bottomTaper = new THREE.Mesh(
        trackGeometry(new THREE.CylinderGeometry(rRim, pipeRadius, 0.2, 24)), 
        plasticMat
      );
      bottomTaper.position.y = -0.5;

      group.add(main, band, topRim, bottomRim, topTaper, bottomTaper);
      
      group.traverse(child => {
        if (child instanceof THREE.Mesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
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
        // Mobile (< 768px): move pipes UP into transparent upper portion of gradient
        // The dark gradient covers the bottom 55% (where text is) — pipes must be in the clear top half
        baseX = 0.2;
        baseY = 0.4;
        targetMainScale = 0.46;

        elbowBaseX = -0.7;
        elbowBaseY = 2.5;
        targetElbowScale = 0.68;

        elbow2BaseX = -1.3;
        elbow2BaseY = 4.0;
        targetElbow2Scale = 0.68;
      }

      scrollGroup.position.set(baseX, baseY, 0);
      scrollGroup.scale.set(targetMainScale, targetMainScale, targetMainScale);

      elbowFittingParent.position.set(elbowBaseX, elbowBaseY, 1.3);
      elbowFittingParent.scale.set(targetElbowScale, targetElbowScale, targetElbowScale);

      elbowFitting2Parent.position.set(elbow2BaseX, elbow2BaseY, 1.1);
      elbowFitting2Parent.scale.set(targetElbow2Scale, targetElbow2Scale, targetElbow2Scale);
    };

    let targetElbowScale = 0.68;
    let targetElbow2Scale = 0.68;
    updateLayoutPosition();

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

    // Create scroll-linked timeline.
    // ──────────────────────────────────────────────────────────────────────────
    // KEY FIX: trigger = heroSection (not document.body)
    //   - Ties the pipe exit ONLY to the hero scrolling away.
    //   - On mobile, document.body is very long → the pipes used to fade over
    //     the entire page length, so they were still visible in later sections.
    //   - With heroSection trigger: pipes fully exit exactly when the hero
    //     scrolls offscreen — perfect on every screen size.
    //
    // Mobile scroll values are tuned separately:
    //   - Main pipe y: -=2.8 (mobile) vs -=4.5 (desktop) — mobile baseY is 0.4,
    //     camera at z=11, so shorter travel is enough to exit the viewport.
    //   - Elbow y offsets reduced proportionally.
    // ──────────────────────────────────────────────────────────────────────────
    const isMobileDevice = window.matchMedia('(max-width: 767px)').matches;
    const heroEl = container.closest('section') as HTMLElement | null;

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: heroEl || document.body,
        start: 'top top',
        end: 'bottom top',          // hero fully exited = animation complete
        scrub: isMobileDevice ? true : 0.45,
        invalidateOnRefresh: true,  // recalc on resize / orientation change
      }
    });

    // Rotate main group as we scroll
    scrollTl.to(scrollGroup.rotation, {
      y: isMobileDevice ? 0.5 : 0.75,
      x: isMobileDevice ? -0.1 : -0.2,
      ease: 'none'
    }, 0);

    // Slide out and pull into background
    scrollTl.to(scrollGroup.position, {
      y: isMobileDevice ? '-=2.8' : '-=4.5',
      z: isMobileDevice ? -1.5 : -3,
      ease: 'none'
    }, 0);

    // Carry away the floating elbow fittings as we scroll
    scrollTl.to(elbowFittingParent.position, {
      y: isMobileDevice ? '-=2.0' : '-=3.0',
      x: isMobileDevice ? '-=0.8' : '-=1.2',
      z: isMobileDevice ? '+=0.5' : '+=0.8',
      ease: 'none'
    }, 0);
    scrollTl.to(elbowFittingParent.rotation, {
      z: '+=1.2',
      x: '+=0.8',
      ease: 'none'
    }, 0);

    scrollTl.to(elbowFitting2Parent.position, {
      y: isMobileDevice ? '-=1.8' : '-=2.5',
      x: isMobileDevice ? '-=0.7' : '-=1.0',
      z: isMobileDevice ? '+=0.6' : '+=1.0',
      ease: 'none'
    }, 0);
    scrollTl.to(elbowFitting2Parent.rotation, {
      z: '-=1.2',
      y: `+=${Math.PI * 0.5}`,
      ease: 'none'
    }, 0);

    // ----------------------------------------------------
    // PIPE 1: Straight PPR Pipe (Blue — matches blue PPR pipe product)
    // ----------------------------------------------------
    const pipe1 = new THREE.Group();
    
    // Main tube body (Fat radius: 0.55, length: 6.5)
    const body1 = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.55, 0.55, 6.5, 32)), 
      solidBluePlasticMat
    );
    pipe1.add(body1);

    // Middle branch: Molded "Male Tee" adapter (connects to branch lines)
    const teeGroup = new THREE.Group();
    
    const teeMain = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.68, 0.68, 1.4, 32)),
      solidBluePlasticMat
    );
    const teeBranch = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.68, 0.68, 0.6, 32)),
      solidBluePlasticMat
    );
    teeBranch.rotation.z = -Math.PI / 2;
    teeBranch.position.set(0.4, 0, 0); // pointing outwards (right)
    
    const teeTaper = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.55, 0.68, 0.2, 32)),
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
      trackGeometry(new THREE.CylinderGeometry(0.46, 0.46, 0.4, 24)),
      goldMetalMat
    );
    teeThread.rotation.z = -Math.PI / 2;
    teeThread.position.set(1.4, 0, 0);

    teeGroup.add(teeMain, teeBranch, teeTaper, teeHex, teeThread);

    // 3D threads around the Tee branch (full realistic gold)
    for (let i = 0; i < 3; i++) {
      const ridge = new THREE.Mesh(
        trackGeometry(new THREE.TorusGeometry(0.46, 0.025, 8, 16)),
        goldMetalMat
      );
      ridge.rotation.y = Math.PI / 2;
      ridge.position.set(1.25 + i * 0.1, 0, 0);
      teeGroup.add(ridge);
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
      trackGeometry(new THREE.CylinderGeometry(0.46, 0.46, 6.5, 32)), 
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
    // Axis: x = -0.55, goes from y = 0 to y = 0.9 (length 0.9)
    const vertSocket = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.55, 0.55, 0.9, 32)),
      solidBluePlasticMat
    );
    vertSocket.position.set(-0.55, 0.45, 0);
    elbowFitting.add(vertSocket);

    // Dark inner hole at the top of the vertical socket
    const vertHole = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.42, 0.42, 0.91, 32)),
      trackMaterial(new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 }))
    );
    vertHole.position.set(-0.55, 0.46, 0);
    elbowFitting.add(vertHole);

    // Rounded lip torus at the top edge of the vertical socket for realistic molded finish
    const vertLip = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(0.485, 0.065, 16, 32)),
      solidBluePlasticMat
    );
    vertLip.rotation.x = Math.PI / 2;
    vertLip.position.set(-0.55, 0.9, 0);
    elbowFitting.add(vertLip);

    // 2. Corner bend (molded 90° elbow)
    // Torus centered at (0, 0, 0) curving from (-0.55, 0) to (0, -0.55)
    const cornerElbow = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(0.55, 0.55, 32, 32, Math.PI / 2)),
      solidBluePlasticMat
    );
    cornerElbow.rotation.z = Math.PI; // Rotates to start at 9 o'clock and curve to 6 o'clock
    elbowFitting.add(cornerElbow);

    // 3. Horizontal molded fluted sleeve (pointing right)
    // Axis: y = -0.55, extends from x = 0 to x = 0.7 (length 0.7)
    // In the image, the fluted collar is wider than the vertical socket.
    const horizSocket = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.64, 0.64, 0.7, 32)),
      solidBluePlasticMat
    );
    horizSocket.rotation.z = -Math.PI / 2;
    horizSocket.position.set(0.35, -0.55, 0);
    elbowFitting.add(horizSocket);

    // Rounded shoulder torus at the horizontal socket end
    const horizShoulder = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(0.575, 0.065, 16, 32)),
      solidBluePlasticMat
    );
    horizShoulder.rotation.y = Math.PI / 2;
    horizShoulder.position.set(0.7, -0.55, 0);
    elbowFitting.add(horizShoulder);

    // 12 Semi-circular flutes (grip ridges) on horizontal sleeve (matching the image)
    const fluteGeom = trackGeometry(new THREE.CylinderGeometry(0.045, 0.045, 0.7, 12));
    for (let i = 0; i < 12; i++) {
      const angle = (i / 12) * Math.PI * 2;
      const flute = new THREE.Mesh(fluteGeom, solidBluePlasticMat);
      flute.rotation.z = -Math.PI / 2; // parallel to X axis
      flute.rotation.x = angle;
      flute.position.set(
        0.35,
        -0.55 + Math.cos(angle) * 0.63,
        Math.sin(angle) * 0.63
      );
      elbowFitting.add(flute);
    }

    // 4. Threaded metal insert (silver-plated chrome matching the image)
    // Silver hex collar (wrench flats)
    const metalHex = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.48, 0.48, 0.22, 6)),
      shinySilverMetalMat
    );
    metalHex.rotation.z = -Math.PI / 2;
    metalHex.position.set(0.81, -0.55, 0);
    elbowFitting.add(metalHex);

    // Silver threaded body cylinder
    const metalThreadBody = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.39, 0.39, 0.45, 24)),
      shinySilverMetalMat
    );
    metalThreadBody.rotation.z = -Math.PI / 2;
    metalThreadBody.position.set(1.125, -0.55, 0);
    elbowFitting.add(metalThreadBody);

    // 5 spiral thread ridges (toruses) in silver metal
    for (let i = 0; i < 5; i++) {
      const threadRidge = new THREE.Mesh(
        trackGeometry(new THREE.TorusGeometry(0.39, 0.026, 12, 24)),
        shinySilverMetalMat
      );
      threadRidge.rotation.y = Math.PI / 2;
      threadRidge.position.set(0.96 + i * 0.08, -0.55, 0);
      elbowFitting.add(threadRidge);
    }

    // Dark bore hole inside the threaded metal insert
    const metalBoreHole = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.28, 0.28, 0.47, 24)),
      trackMaterial(new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 }))
    );
    metalBoreHole.rotation.z = -Math.PI / 2;
    metalBoreHole.position.set(1.14, -0.55, 0);
    elbowFitting.add(metalBoreHole);

    // 5. Mold parting line seam for elbow fitting 1 (blue)
    const seamColorMat = solidBluePlasticMat;

    // Seam on vertical socket (outer side)
    const vertSeamOuter = new THREE.Mesh(
      trackGeometry(new THREE.BoxGeometry(0.015, 0.9, 0.015)),
      seamColorMat
    );
    vertSeamOuter.position.set(-1.105, 0.45, 0);
    elbowFitting.add(vertSeamOuter);

    // Seam on vertical socket (inner side)
    const vertSeamInner = new THREE.Mesh(
      trackGeometry(new THREE.BoxGeometry(0.015, 0.9, 0.015)),
      seamColorMat
    );
    vertSeamInner.position.set(0.005, 0.45, 0);
    elbowFitting.add(vertSeamInner);

    // Seam on corner elbow (outer curve)
    const cornerSeamOuter = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(1.105, 0.012, 8, 32, Math.PI / 2)),
      seamColorMat
    );
    cornerSeamOuter.rotation.z = Math.PI;
    elbowFitting.add(cornerSeamOuter);

    // Seam on corner elbow (inner curve)
    const cornerSeamInner = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(0.005, 0.012, 8, 32, Math.PI / 2)),
      seamColorMat
    );
    cornerSeamInner.rotation.z = Math.PI;
    elbowFitting.add(cornerSeamInner);

    // Seam on horizontal socket (outer bottom side)
    const horizSeamOuter = new THREE.Mesh(
      trackGeometry(new THREE.BoxGeometry(0.7, 0.015, 0.015)),
      seamColorMat
    );
    horizSeamOuter.position.set(0.35, -1.195, 0);
    elbowFitting.add(horizSeamOuter);

    // Seam on horizontal socket (inner top side)
    const horizSeamInner = new THREE.Mesh(
      trackGeometry(new THREE.BoxGeometry(0.7, 0.015, 0.015)),
      seamColorMat
    );
    horizSeamInner.position.set(0.35, 0.095, 0);
    elbowFitting.add(horizSeamInner);

    // Note: elbowFitting position and scale are responsively updated in updateLayoutPosition()

    // ----------------------------------------------------
    // FITTING 2: Floating Green 90° All-Plastic Elbow (standard green)
    // ----------------------------------------------------

    // 1. Vertical socket part (pointing up)
    // Axis: x = -0.55, goes from y = 0 to y = 0.9 (length 0.9)
    const vertSocket2 = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.55, 0.55, 0.9, 32)),
      solidGreenPlasticMat
    );
    vertSocket2.position.set(-0.55, 0.45, 0);
    elbowFitting2.add(vertSocket2);

    // Dark inner hole at the top of the vertical socket
    const vertHole2 = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.42, 0.42, 0.91, 32)),
      trackMaterial(new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 }))
    );
    vertHole2.position.set(-0.55, 0.46, 0);
    elbowFitting2.add(vertHole2);

    // Rounded lip torus at the top edge of the vertical socket
    const vertLip2 = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(0.485, 0.065, 16, 32)),
      solidGreenPlasticMat
    );
    vertLip2.rotation.x = Math.PI / 2;
    vertLip2.position.set(-0.55, 0.9, 0);
    elbowFitting2.add(vertLip2);

    // 2. Corner bend (molded 90° elbow)
    const cornerElbow2 = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(0.55, 0.55, 32, 32, Math.PI / 2)),
      solidGreenPlasticMat
    );
    cornerElbow2.rotation.z = Math.PI; // Rotates to start at 9 o'clock and curve to 6 o'clock
    elbowFitting2.add(cornerElbow2);

    // 3. Horizontal socket part (pointing right)
    // Axis: y = -0.55, extends from x = 0 to x = 0.9 (length 0.9)
    const horizSocket2 = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.55, 0.55, 0.9, 32)),
      solidGreenPlasticMat
    );
    horizSocket2.rotation.z = -Math.PI / 2;
    horizSocket2.position.set(0.45, -0.55, 0);
    elbowFitting2.add(horizSocket2);

    // Dark inner hole at the end of the horizontal socket
    const horizHole2 = new THREE.Mesh(
      trackGeometry(new THREE.CylinderGeometry(0.42, 0.42, 0.91, 32)),
      trackMaterial(new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.9 }))
    );
    horizHole2.rotation.z = -Math.PI / 2;
    horizHole2.position.set(0.46, -0.55, 0);
    elbowFitting2.add(horizHole2);

    // Rounded lip torus at the end of the horizontal socket
    const horizLip2 = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(0.485, 0.065, 16, 32)),
      solidGreenPlasticMat
    );
    horizLip2.rotation.y = Math.PI / 2;
    horizLip2.position.set(0.9, -0.55, 0);
    elbowFitting2.add(horizLip2);

    // 4. Mold parting line seam (thin raised parting lines at z = 0 plane)
    const seamColorMat2 = solidGreenPlasticMat; // Green elbow — all seams are green
    // Seam on vertical socket (outer side)
    const vertSeamOuter2 = new THREE.Mesh(
      trackGeometry(new THREE.BoxGeometry(0.015, 0.9, 0.015)),
      seamColorMat2
    );
    vertSeamOuter2.position.set(-1.105, 0.45, 0);
    elbowFitting2.add(vertSeamOuter2);

    // Seam on vertical socket (inner side)
    const vertSeamInner2 = new THREE.Mesh(
      trackGeometry(new THREE.BoxGeometry(0.015, 0.9, 0.015)),
      seamColorMat2
    );
    vertSeamInner2.position.set(0.005, 0.45, 0);
    elbowFitting2.add(vertSeamInner2);

    // Seam on corner elbow (outer curve)
    const cornerSeamOuter2 = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(1.105, 0.012, 8, 32, Math.PI / 2)),
      seamColorMat2
    );
    cornerSeamOuter2.rotation.z = Math.PI;
    elbowFitting2.add(cornerSeamOuter2);

    // Seam on corner elbow (inner curve)
    const cornerSeamInner2 = new THREE.Mesh(
      trackGeometry(new THREE.TorusGeometry(0.005, 0.012, 8, 32, Math.PI / 2)),
      seamColorMat2
    );
    cornerSeamInner2.rotation.z = Math.PI;
    elbowFitting2.add(cornerSeamInner2);

    // Seam on horizontal socket (outer bottom side)
    const horizSeamOuter2 = new THREE.Mesh(
      trackGeometry(new THREE.BoxGeometry(0.9, 0.015, 0.015)),
      seamColorMat2
    );
    horizSeamOuter2.position.set(0.45, -1.105, 0);
    elbowFitting2.add(horizSeamOuter2);

    // Seam on horizontal socket (inner top side)
    const horizSeamInner2 = new THREE.Mesh(
      trackGeometry(new THREE.BoxGeometry(0.9, 0.015, 0.015)),
      seamColorMat2
    );
    horizSeamInner2.position.set(0.45, 0.005, 0);
    elbowFitting2.add(horizSeamInner2);

    // Note: elbowFitting position and scale are responsively updated in updateLayoutPosition()



    // Enable shadows on all meshes recursively
    mainGroup.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.castShadow = true;
        object.receiveShadow = true;
      }
    });

    // Shadow receiver plane behind the pipes (for soft, beautiful contact shadows)
    const shadowPlane = new THREE.Mesh(
      trackGeometry(new THREE.PlaneGeometry(30, 30)),
      new THREE.ShadowMaterial({ opacity: 0.045 })
    );
    shadowPlane.position.set(0, 0, -2);
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // 6. Lighting Setup (Soft studio setup)
    scene.add(new THREE.AmbientLight(0xffffff, 1.4));

    // Warm Key Light (casts soft shadows, optimized for mobile)
    // Shadow map size: 1024 desktop / 512 mobile — sufficient quality, better GPU perf
    const shadowSize = window.innerWidth > 768 ? 1024 : 512;
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2.5);
    dirLight1.position.set(-5, 8, 6);
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

    // ── Visibility guard — disable mouse tracking when hero is off-screen ──
    // IntersectionObserver fires when the hero section leaves the viewport.
    // threshold: 0 → fires as soon as ANY part exits (entering next section).
    // This stops costly mouse interpolation when the 3D canvas isn't visible.
    let isHeroVisible = true;
    const heroSection = container.closest('section') as HTMLElement | null;

    let visibilityObserver: IntersectionObserver | null = null;
    if (heroSection) {
      visibilityObserver = new IntersectionObserver(
        ([entry]) => {
          isHeroVisible = entry.isIntersecting;
          // When hero exits viewport, snap mouse targets to zero so the
          // next time it re-enters the pipes start from a neutral position.
          if (!isHeroVisible) {
            mouseX = 0;
            mouseY = 0;
          }
        },
        {
          // 0.0 = fires the moment the hero starts leaving the viewport
          // We use this so mouse tracking stops as soon as any scroll away begins
          threshold: 0.0,
        }
      );
      visibilityObserver.observe(heroSection);
    }

    const onMouseMove = (event: MouseEvent) => {
      if (!isHeroVisible) return;  // Hero is off-screen — ignore all mouse input
      mouseX = (event.clientX / window.innerWidth) - 0.5;
      mouseY = (event.clientY / window.innerHeight) - 0.5;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!isHeroVisible) return;  // Hero is off-screen — ignore all touch input
      if (event.touches.length > 0) {
        mouseX = (event.touches[0].clientX / window.innerWidth) - 0.5;
        mouseY = (event.touches[0].clientY / window.innerHeight) - 0.5;
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchstart', onTouchMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });

    // 8. Animation Loop — use performance.now() instead of deprecated THREE.Clock
    const startMs = performance.now();
    const animate = () => {
      const elapsed = (performance.now() - startMs) / 1000; // seconds, same API as clock.getElapsedTime()

      // Subtle vertical floating animation
      mainGroup.position.y = Math.sin(elapsed * 0.8) * 0.05;

      // Slow idle rotation oscillations
      mainGroup.rotation.x = Math.sin(elapsed * 0.15) * 0.04;
      mainGroup.rotation.y = Math.cos(elapsed * 0.2) * 0.04;

      // Mouse/Touch Parallax movement (smooth interpolation)
      // When hero is off-screen, decay targetX/Y back to zero smoothly
      // so the pipes return to neutral without a jarring snap.
      if (isHeroVisible) {
        targetX += (mouseX - targetX) * 0.04;
        targetY += (mouseY - targetY) * 0.04;
      } else {
        // Gentle decay to zero — pipes settle back to idle rotation
        targetX *= 0.92;
        targetY *= 0.92;
      }

      mainGroup.rotation.y += targetX * 0.4;
      mainGroup.rotation.x += targetY * 0.4;

      // Individual subtle slow drift & rotation for the two floating fittings
      elbowFitting.rotation.y = Math.sin(elapsed * 0.5) * 0.15;
      elbowFitting.rotation.x = Math.cos(elapsed * 0.4) * 0.1;
      elbowFitting.position.y = Math.sin(elapsed * 0.7) * 0.08;

      elbowFitting2.rotation.y = Math.cos(elapsed * 0.6) * 0.15;
      elbowFitting2.rotation.x = Math.sin(elapsed * 0.5) * 0.1;
      elbowFitting2.position.y = Math.cos(elapsed * 0.6) * 0.08;

      // Render
      renderer.render(scene, camera);

      frameRef.current = requestAnimationFrame(animate);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      updateLayoutPosition();
    };
    window.addEventListener('resize', handleResize);

    // 10. Cleanup (Comprehensive WebGL disposal to prevent memory leaks)
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchstart', onTouchMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameRef.current);
      // Disconnect visibility observer
      if (visibilityObserver) visibilityObserver.disconnect();
      renderer.dispose();
      
      // Dispose all tracked WebGL resources (geometries + materials)
      geometriesToDispose.forEach(geom => geom.dispose());
      materialsToDispose.forEach(mat => mat.dispose());

      // Kill GSAP timelines and ScrollTriggers
      introTl.kill();
      scrollTl.scrollTrigger?.kill();
      scrollTl.kill();

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

