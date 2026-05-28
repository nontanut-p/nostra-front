import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Trail, OrbitControls, Float } from '@react-three/drei'
import * as THREE from 'three'

interface OrbitConfig {
  radius: number
  speed: number
  size: number
  color: string
  tilt: number // radians, orbital plane inclination
  phase: number
  hasRing?: boolean
}

const PLANETS: OrbitConfig[] = [
  { radius: 1.7, speed: 0.55, size: 0.14, color: '#9b8cff', tilt: 0.15, phase: 0.0 },
  { radius: 2.5, speed: 0.4, size: 0.2, color: '#5BD8C8', tilt: -0.25, phase: 1.4 },
  { radius: 3.4, speed: 0.3, size: 0.26, color: '#D87B9E', tilt: 0.32, phase: 3.0 },
  { radius: 4.3, speed: 0.22, size: 0.32, color: '#D4AF37', tilt: -0.12, phase: 5.0, hasRing: true },
  { radius: 5.2, speed: 0.16, size: 0.22, color: '#7aa2ff', tilt: 0.4, phase: 2.2 },
]

/** A glowing central sun with layered additive halos (fakes bloom cheaply). */
function CoreSun() {
  const ref = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.15
  })
  return (
    <group>
      <mesh ref={ref}>
        <sphereGeometry args={[0.55, 48, 48]} />
        <meshStandardMaterial
          color="#FFE9A8"
          emissive="#D4AF37"
          emissiveIntensity={2.4}
          roughness={0.3}
        />
      </mesh>
      {/* additive glow halos */}
      {[0.8, 1.15, 1.6].map((r, i) => (
        <mesh key={r}>
          <sphereGeometry args={[r, 32, 32]} />
          <meshBasicMaterial
            color="#FFD873"
            transparent
            opacity={0.16 - i * 0.045}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
      <pointLight color="#FFE9A8" intensity={3} distance={20} decay={1.4} />
    </group>
  )
}

/** A static neon orbital trail ring (the path) in an inclined plane. */
function OrbitRing({ radius, tilt, color }: { radius: number; tilt: number; color: string }) {
  return (
    <mesh rotation={[Math.PI / 2 + tilt, 0, 0]}>
      <torusGeometry args={[radius, 0.006, 16, 160]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

/** A planet orbiting the core, leaving a neon comet Trail. */
function Planet({ config }: { config: OrbitConfig }) {
  const pivot = useRef<THREE.Group>(null)
  const planetRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime * config.speed + config.phase
    if (pivot.current) {
      pivot.current.position.set(
        Math.cos(t) * config.radius,
        Math.sin(t) * config.radius * Math.sin(config.tilt),
        Math.sin(t) * config.radius * Math.cos(config.tilt),
      )
    }
    if (planetRef.current) planetRef.current.rotation.y += 0.02
  })

  return (
    <group ref={pivot}>
      <Trail
        width={config.size * 7}
        length={6}
        color={new THREE.Color(config.color)}
        attenuation={(w) => w * w}
      >
        <mesh ref={planetRef}>
          <sphereGeometry args={[config.size, 32, 32]} />
          <meshStandardMaterial
            color={config.color}
            emissive={config.color}
            emissiveIntensity={0.6}
            roughness={0.4}
            metalness={0.3}
          />
        </mesh>
      </Trail>

      {config.hasRing && (
        <mesh rotation={[Math.PI / 2.2, 0.3, 0]}>
          <ringGeometry args={[config.size * 1.4, config.size * 2.1, 48]} />
          <meshBasicMaterial
            color="#F0D67E"
            side={THREE.DoubleSide}
            transparent
            opacity={0.55}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}
    </group>
  )
}

/** Slow auto-rotation of the whole system for a living, drifting feel. */
function SystemSpin({ children }: { children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null)
  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.04
  })
  return <group ref={group}>{children}</group>
}

function Scene() {
  const rings = useMemo(() => PLANETS, [])
  return (
    <>
      <ambientLight intensity={0.25} />
      <Stars radius={60} depth={40} count={1800} factor={3.2} saturation={0} fade speed={0.6} />

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
        <CoreSun />
      </Float>

      <SystemSpin>
        {rings.map((c) => (
          <OrbitRing key={`ring-${c.radius}`} radius={c.radius} tilt={c.tilt} color={c.color} />
        ))}
        {rings.map((c) => (
          <Planet key={`planet-${c.radius}`} config={c} />
        ))}
      </SystemSpin>

      <OrbitControls
        enablePan={false}
        enableZoom={false}
        autoRotate
        autoRotateSpeed={0.35}
        minPolarAngle={Math.PI / 3}
        maxPolarAngle={Math.PI / 1.7}
      />
    </>
  )
}

export default function PlanetaryOrbit() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 3.2, 9], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      className="!absolute inset-0"
    >
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  )
}
