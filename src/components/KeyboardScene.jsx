import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function KeyboardScene({ heroRef }) {
  const mountRef = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const W = container.offsetWidth;
    const H = container.offsetHeight;

    // ── Renderer ──────────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.setSize(W, H);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // ── Scene & Camera ────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, W / H, 0.1, 100);
    camera.position.set(0, 0.6, 6.5);
    camera.lookAt(0, 0, 0);

    // ── Lights ────────────────────────────────────────────────────────
    // Soft ambient
    const ambient = new THREE.AmbientLight(0xffffff, 0.35);
    scene.add(ambient);

    // Key green light — matches site's --green colour
    const keyLight = new THREE.DirectionalLight(0x00ff88, 1.8);
    keyLight.position.set(4, 5, 6);
    keyLight.castShadow = true;
    scene.add(keyLight);

    // Fill (cool white from below-left)
    const fillLight = new THREE.DirectionalLight(0xddeeff, 0.5);
    fillLight.position.set(-5, -2, -4);
    scene.add(fillLight);

    // Rim (green glow from behind)
    const rimLight = new THREE.PointLight(0x00ff88, 1.2, 18);
    rimLight.position.set(-2, 1.5, -3);
    scene.add(rimLight);

    // Top accent
    const topLight = new THREE.SpotLight(0xffffff, 0.6, 20, Math.PI * 0.25, 0.5);
    topLight.position.set(0, 8, 2);
    scene.add(topLight);

    // ── Group — this is what GSAP animates ───────────────────────────
    const group = new THREE.Group();
    // Start right side of screen
    group.position.set(2.6, 0, 0);
    group.rotation.set(0.18, -0.35, 0.04);
    scene.add(group);

    // ── Load GLB ──────────────────────────────────────────────────────
    let loaded = false;
    const loader = new GLTFLoader();

    loader.load(
      "/keyboard.glb",
      (gltf) => {
        const model = gltf.scene;

        // Auto-scale so it looks good regardless of original size
        const box = new THREE.Box3().setFromObject(model);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 3.2 / maxDim;
        model.scale.setScalar(scale);

        // Center at group origin
        const center = box.getCenter(new THREE.Vector3());
        model.position.set(
          -center.x * scale,
          -center.y * scale,
          -center.z * scale
        );

        // Subtle green tint on all meshes + enable shadow casting
        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            // Don't override material — just ensure it picks up lighting
          }
        });

        group.add(model);
        loaded = true;

        // Fade-in on load
        group.scale.setScalar(0.0);
        gsap.to(group.scale, {
          x: 1, y: 1, z: 1,
          duration: 1.2,
          ease: "elastic.out(1, 0.6)",
          delay: 0.3,
        });
      },
      undefined,
      (err) => console.warn("KeyboardScene: failed to load GLB", err)
    );

    // ── ScrollTrigger ─────────────────────────────────────────────────
    const trigger =
      heroRef?.current ??
      document.getElementById("home") ??
      document.body;

    // Timeline drives both position and rotation together
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger,
        start: "top top",
        end: "bottom top",
        scrub: 2.0,
      },
    });

    // x: 2.6 → -2.8  (right to left)
    tl.to(group.position, { x: -2.8, ease: "none" }, 0);

    // Rotate around Y fully (like flipping it to show back), slight X tilt
    tl.to(
      group.rotation,
      { y: Math.PI * 1.8, x: 0.38, ease: "none" },
      0
    );

    // ── Idle float (RAF — Y axis only, not touched by GSAP) ───────────
    const clock = new THREE.Clock();
    let animId;

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const t = clock.getElapsedTime();
      // Gentle floating
      group.position.y = Math.sin(t * 0.55) * 0.12;
      // Very subtle roll
      group.rotation.z = Math.sin(t * 0.38) * 0.025;

      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ────────────────────────────────────────────────────────
    const onResize = () => {
      if (!container) return;
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // ── Cleanup ───────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      tl.scrollTrigger?.kill();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        inset: 0,
        zIndex: 3,
        pointerEvents: "none",
      }}
    />
  );
}