"use client";
import React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Stars, Billboard, Html } from "@react-three/drei";
import { cn } from "@/lib/utils";

// Shared rotation speed for all skill orbs (radians per second)
// Increase this value to speed up rotation globally.
const ORB_ROT_SPEED = 1.2;
// Global time origin so all SkillOrb canvases share the same phase
const GLOBAL_TIME_ORIGIN =
  typeof performance !== "undefined" ? performance.now() : 0;

// WebGL detection and context management
function checkWebGLSupport(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    return !!gl;
  } catch (e) {
    return false;
  }
}

let webglContextCount = 0;
const MAX_WEBGL_CONTEXTS = 6; // Conservative limit for mobile devices

function canCreateWebGLContext(): boolean {
  return checkWebGLSupport() && webglContextCount < MAX_WEBGL_CONTEXTS;
}

function incrementWebGLContextCount() {
  webglContextCount++;
}

function decrementWebGLContextCount() {
  webglContextCount = Math.max(0, webglContextCount - 1);
}

export type ParticleFieldProps = {
  className?: string;
  density?: number; // number of particles per 10,000px^2 of viewport; defaults to 0.6
  color?: string; // CSS color for points
};

function PointsCloud({
  count = 800,
  color = "#67e8f9",
}: {
  count?: number;
  color?: string;
}) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // random in a sphere
      const r = Math.cbrt(Math.random()) * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.02;
    ref.current.rotation.x += delta * 0.005;
  });

  return (
    <points ref={ref} frustumCulled>
      <bufferGeometry>
        <bufferAttribute attach={"attributes-position"} args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color={color}
        transparent
        opacity={0.75}
        sizeAttenuation
      />
    </points>
  );
}

export function ParticleField({
  className,
  density = 0.6,
  color = "#67e8f9",
}: ParticleFieldProps) {
  const [count, setCount] = useState(800);

  useEffect(() => {
    const calc = () => {
      const area = window.innerWidth * window.innerHeight; // px^2
      // normalize per 10,000 px^2 so it scales across screens
      const c = Math.min(
        2000,
        Math.max(400, Math.floor((area / 10000) * density))
      );
      setCount(c);
    };
    calc();
    window.addEventListener("resize", calc);
    return () => window.removeEventListener("resize", calc);
  }, [density]);

  return (
    <div
      className={cn("pointer-events-none absolute inset-0", className)}
      aria-hidden
    >
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 10], fov: 65 }}
        gl={{ antialias: true, alpha: true }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0); // fully transparent
        }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <pointLight position={[5, 5, 5]} intensity={1.2} color={"#22d3ee"} />
        <PointsCloud count={count} color={color} />
      </Canvas>
    </div>
  );
}

export function HoloAvatar({ className }: { className?: string }) {
  const [mounted, setMounted] = React.useState(false);
  const [canUseWebGL, setCanUseWebGL] = React.useState(false);
  const [webglError, setWebglError] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const hasSupport = canCreateWebGLContext();
    setCanUseWebGL(hasSupport);

    if (hasSupport) {
      incrementWebGLContextCount();
      return () => {
        decrementWebGLContextCount();
      };
    }
  }, []);

  if (!mounted) {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl",
          className
        )}
      >
        <div className="text-cyan-300/50 text-sm">Loading...</div>
      </div>
    );
  }

  if (!canUseWebGL || webglError) {
    return (
      <div
        className={cn(
          "relative flex items-center justify-center bg-gradient-to-br from-cyan-500/10 to-purple-500/10 rounded-3xl",
          className
        )}
      >
        <div className="text-cyan-300 text-center p-8">
          <div className="text-6xl mb-2">⚡</div>
          <div className="text-sm">3D View</div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 5], fov: 55 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0); // transparent
        }}
        onError={() => setWebglError(true)}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[6, 4, 6]} intensity={1} color={"#60a5fa"} />
        <group>
          <TorusCore />
          <Stars
            radius={20}
            depth={40}
            count={2000}
            factor={2}
            saturation={0}
            fade
            speed={0.2}
          />
        </group>
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.8}
        />
      </Canvas>
    </div>
  );
}

function TorusCore() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    // Keep hero torus in sync visually (slower than orbs but consistent ratio)
    ref.current.rotation.x += delta * (ORB_ROT_SPEED * 0.5);
    ref.current.rotation.y += delta * (ORB_ROT_SPEED * 0.7);
  });
  return (
    <mesh ref={ref} position={[0, 0, 0]}>
      <torusKnotGeometry args={[1.1, 0.28, 180, 32]} />
      <meshStandardMaterial
        color={"#22d3ee"}
        emissive={"#22d3ee"}
        emissiveIntensity={1.25}
        metalness={0.4}
        roughness={0.2}
        wireframe
      />
    </mesh>
  );
}

export function SkillOrb({
  label,
  accent = "#22d3ee",
  logos,
  size = 1,
}: {
  label: string;
  accent?: string;
  logos?: string[];
  size?: number; // uniform scale factor for orb + logos
}) {
  const [mounted, setMounted] = React.useState(false);
  const [canUseWebGL, setCanUseWebGL] = React.useState(false);
  const [webglError, setWebglError] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    const hasSupport = canCreateWebGLContext();
    setCanUseWebGL(hasSupport);

    if (hasSupport) {
      incrementWebGLContextCount();
      return () => {
        decrementWebGLContextCount();
      };
    }
  }, []);

  const computedAccent = useMemo(() => {
    // If explicit accent provided, honor it
    if (accent) return accent;
    const key = (logos?.[0] || label || "").toLowerCase();
    // Map common tech logos to brand colors
    if (key.includes("react")) return "#61dafb";
    if (key.includes("next")) return "#9ca3af"; // Next.js brand is black/white; use gray for dark bg
    if (key.includes("typescript") || key.includes("ts")) return "#3178c6";
    if (key.includes("javascript") || key === "js") return "#f7df1e";
    if (key.includes("node")) return "#3c873a";
    if (key.includes("python")) return "#3776ab";
    if (key.includes("mongo")) return "#10b981";
    if (key.includes("sql")) return "#2563eb";
    if (key.includes("java")) return "#ea2d2e";
    if (key.includes("genai") || key.includes("ai")) return "#a855f7";
    return "#22d3ee";
  }, [accent, logos, label]);

  if (!mounted) {
    return (
      <div className="group relative aspect-square w-full rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm transition hover:bg-white/10">
        <div className="flex h-full items-center justify-center">
          <div
            className="h-16 w-16 rounded-full animate-pulse"
            style={{ backgroundColor: `${computedAccent}20` }}
          />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-2 text-center text-xs font-medium text-cyan-100 drop-shadow-lg">
          {label}
        </div>
      </div>
    );
  }

  if (!canUseWebGL || webglError) {
    // Fallback UI when WebGL is not available or errored
    return (
      <div className="group relative aspect-square w-full rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm transition hover:bg-white/10">
        <div className="flex h-full flex-col items-center justify-center gap-2">
          {logos && logos.length > 0 ? (
            <div className="flex flex-wrap gap-1 justify-center items-center p-2">
              {logos.map((logo, idx) => (
                <img
                  key={idx}
                  src={logo}
                  alt=""
                  className="w-8 h-8 object-contain"
                  style={{ filter: `drop-shadow(0 0 4px ${computedAccent})` }}
                />
              ))}
            </div>
          ) : (
            <div
              className="h-16 w-16 rounded-full flex items-center justify-center text-2xl font-bold"
              style={{
                backgroundColor: `${computedAccent}20`,
                color: computedAccent,
                border: `2px solid ${computedAccent}40`,
              }}
            >
              {label.slice(0, 2).toUpperCase()}
            </div>
          )}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-2 text-center text-xs font-medium text-cyan-100 drop-shadow-lg">
          {label}
        </div>
      </div>
    );
  }

  return (
    <div className="group relative aspect-square w-full rounded-xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm transition hover:bg-white/10">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 3.2], fov: 40 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
          failIfMajorPerformanceCaveat: false,
        }}
        onCreated={({ gl }) => {
          gl.setClearColor(0x000000, 0); // transparent
        }}
        onError={() => setWebglError(true)}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.6} />
        <pointLight
          position={[3, 3, 3]}
          intensity={1.2}
          color={computedAccent}
        />
        <React.Suspense fallback={null}>
          <OrbMesh accent={computedAccent} logos={logos} size={size} />
        </React.Suspense>
        {/* Controls removed for identical camera across orbs */}
      </Canvas>
      <div className="pointer-events-none absolute inset-x-0 bottom-2 text-center text-xs font-medium text-cyan-100 drop-shadow-lg">
        {label}
      </div>
    </div>
  );
}

function LogoBillboard({
  src,
  position,
  accent,
}: {
  src: string;
  position: [number, number, number];
  accent: string;
}) {
  // Resolve asset path to support deployments under a basePath (e.g., GitHub Pages)
  const resolvedSrc = React.useMemo(() => {
    const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
    if (!src) return src;
    if (src.startsWith("http://") || src.startsWith("https://")) return src;
    return `${base}${src.startsWith("/") ? src : "/" + src}`;
  }, [src]);

  const [texture, setTexture] = React.useState<THREE.Texture | null>(null);
  const [failed, setFailed] = React.useState(false);

  React.useEffect(() => {
    let mounted = true;
    let loadTimeout: NodeJS.Timeout;

    const loader = new THREE.TextureLoader();
    // allow same-origin loads and potential CDN with CORS
    // @ts-ignore - setCrossOrigin exists at runtime
    if (typeof loader.setCrossOrigin === "function") {
      // anonymous helps avoid tainting if served with CORS headers
      (loader as any).setCrossOrigin("anonymous");
    }

    // Set a timeout for texture loading (mobile networks can be slow)
    loadTimeout = setTimeout(() => {
      if (mounted && !texture) {
        setFailed(true);
      }
    }, 3000); // 3 second timeout

    loader.load(
      resolvedSrc,
      (tex) => {
        clearTimeout(loadTimeout);
        if (mounted) {
          tex.minFilter = THREE.LinearFilter; // Better for mobile performance
          tex.magFilter = THREE.LinearFilter;
          tex.generateMipmaps = false; // Save memory on mobile
          setTexture(tex);
        }
      },
      undefined,
      (error) => {
        clearTimeout(loadTimeout);
        if (mounted) setFailed(true);
      }
    );

    return () => {
      mounted = false;
      clearTimeout(loadTimeout);
      if (texture) {
        texture.dispose();
      }
    };
  }, [resolvedSrc]);

  return (
    <Billboard position={position}>
      {texture && !failed ? (
        <mesh>
          <planeGeometry args={[0.4, 0.4]} />
          <meshBasicMaterial
            map={texture}
            transparent
            toneMapped={false}
            depthTest={false}
          />
        </mesh>
      ) : failed ? (
        <Html center style={{ pointerEvents: "none" }}>
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: accent,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              fontWeight: 600,
              color: "#021016",
              boxShadow: "0 0 8px rgba(255,255,255,0.25)",
            }}
          >
            N/A
          </div>
        </Html>
      ) : (
        // While the texture is loading, show a tiny HTML img fallback.
        <Html center style={{ pointerEvents: "none" }}>
          <div
            style={{
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "transparent",
            }}
          >
            <img
              src={resolvedSrc}
              alt="logo"
              style={{
                width: 48,
                height: 48,
                objectFit: "contain",
                display: "block",
                filter: "drop-shadow(0 0 4px rgba(255,255,255,0.4))",
              }}
            />
          </div>
        </Html>
      )}
    </Billboard>
  );
}

function OrbMesh({
  accent,
  logos,
  size = 1,
}: {
  accent: string;
  logos?: string[];
  size?: number;
}) {
  const group = useRef<THREE.Group>(null);
  const orbitRef = useRef<THREE.Group>(null);
  useFrame(() => {
    const t = (performance.now() - GLOBAL_TIME_ORIGIN) / 1000; // seconds
    const angle = t * ORB_ROT_SPEED;
    if (group.current) group.current.rotation.y = angle;
    if (orbitRef.current) orbitRef.current.rotation.y = angle; // orbit rotation
  });
  return (
    <group ref={group} scale={size}>
      <mesh>
        <icosahedronGeometry args={[0.9, 1]} />
        <meshStandardMaterial
          color={accent}
          emissive={accent}
          emissiveIntensity={0.5}
          metalness={0.2}
          roughness={0.25}
          wireframe
        />
      </mesh>
      {logos && logos.length > 0 ? (
        <group ref={orbitRef}>
          {logos.map((src, i) => {
            const angle = (i / logos.length) * Math.PI * 2;
            // If only one logo, keep it near front slightly above center and stop vertical wave.
            const single = logos.length === 1;
            const radius = single ? 1.15 : 1.45;
            const yWave = single ? 0.1 : Math.sin(angle * 2) * 0.25;
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            return (
              <LogoBillboard
                key={src + i}
                src={src}
                position={[x, yWave, z]}
                accent={accent}
              />
            );
          })}
        </group>
      ) : (
        <mesh position={[1.6, 0, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial
            color={accent}
            emissive={accent}
            emissiveIntensity={2}
          />
        </mesh>
      )}
    </group>
  );
}
