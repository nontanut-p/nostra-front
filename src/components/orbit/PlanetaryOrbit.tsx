import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Stars, Trail, OrbitControls, Float, Text } from '@react-three/drei'
import * as THREE from 'three'

// Zodiac symbols - 12 ราศี
const ZODIAC_SYMBOLS = [
  { symbol: '♈', name: 'Aries', angle: 0 },
  { symbol: '♉', name: 'Taurus', angle: Math.PI / 6 },
  { symbol: '♊', name: 'Gemini', angle: Math.PI / 3 },
  { symbol: '♋', name: 'Cancer', angle: Math.PI / 2 },
  { symbol: '♌', name: 'Leo', angle: (2 * Math.PI) / 3 },
  { symbol: '♍', name: 'Virgo', angle: (5 * Math.PI) / 6 },
  { symbol: '♎', name: 'Libra', angle: Math.PI },
  { symbol: '♏', name: 'Scorpio', angle: (7 * Math.PI) / 6 },
  { symbol: '♐', name: 'Sagittarius', angle: (4 * Math.PI) / 3 },
  { symbol: '♑', name: 'Capricorn', angle: (3 * Math.PI) / 2 },
  { symbol: '♒', name: 'Aquarius', angle: (5 * Math.PI) / 3 },
  { symbol: '♓', name: 'Pisces', angle: (11 * Math.PI) / 6 },
]

interface OrbitConfig {
  radius: number
  speed: number
  size: number
  color: string
  tilt: number
  phase: number
  hasRing?: boolean
  name: string
  description?: string
  isGasGiant?: boolean
  hasAtmosphere?: boolean
  ringColor?: string
}

const PLANETS: OrbitConfig[] = [
  {
    radius: 1.7,
    speed: 0.55,
    size: 0.12,
    color: '#B5B5B5',
    tilt: 0.15,
    phase: 0.0,
    name: 'Mercury',
    description: 'ดาวพุธ - เล็กที่สุด ใกล้ดวงอาทิตย์ที่สุด',
    hasAtmosphere: false,
  },
  {
    radius: 2.2,
    speed: 0.45,
    size: 0.18,
    color: '#E6C87A',
    tilt: -0.25,
    phase: 1.4,
    name: 'Venus',
    description: 'ดาวศุกร์ - สว่างที่สุด มีบรรยากาศหนาแน่น',
    hasAtmosphere: true,
  },
  {
    radius: 2.8,
    speed: 0.38,
    size: 0.19,
    color: '#4A90E2',
    tilt: 0.32,
    phase: 3.0,
    name: 'Earth',
    description: 'โลก - ดาวเคราะห์ที่อยู่อาศัยได้',
    hasAtmosphere: true,
  },
  {
    radius: 3.5,
    speed: 0.32,
    size: 0.14,
    color: '#E25D5D',
    tilt: -0.12,
    phase: 5.0,
    name: 'Mars',
    description: 'ดาวอังคาร - ดาวเคราะห์สีแดง',
    hasAtmosphere: false,
  },
  {
    radius: 4.8,
    speed: 0.22,
    size: 0.42,
    color: '#D4A373',
    tilt: 0.05,
    phase: 2.2,
    name: 'Jupiter',
    description: 'ดาวพฤหัสบดี - ดาวเคราะห์แก๊สยักษ์',
    isGasGiant: true,
    hasAtmosphere: true,
  },
  {
    radius: 6.2,
    speed: 0.18,
    size: 0.38,
    color: '#F4D03F',
    tilt: 0.27,
    phase: 4.1,
    name: 'Saturn',
    description: 'ดาวเสาร์ - มีวงแหวนที่สวยงาม',
    hasRing: true,
    isGasGiant: true,
    hasAtmosphere: true,
    ringColor: '#F4D03F',
  },
]

/** Crystal Sphere with ethereal aura at the center - ดวงแก้วตรงกลาง */
function CrystalSphere() {
  const sphereRef = useRef<THREE.Mesh>(null)
  const auraRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (sphereRef.current) {
      sphereRef.current.rotation.y = t * 0.1
      sphereRef.current.rotation.z = t * 0.05
    }
    if (auraRef.current) {
      const scale = 1 + Math.sin(t * 1.5) * 0.08
      auraRef.current.scale.setScalar(scale)
      auraRef.current.rotation.y = -t * 0.15
    }
  })

  return (
    <group>
      <mesh ref={sphereRef}>
        <sphereGeometry args={[0.7, 64, 64]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0.05}
          transmission={0.95}
          thickness={0.5}
          ior={2.4}
          clearcoat={1}
          clearcoatRoughness={0.1}
          emissive="#D4AF37"
          emissiveIntensity={0.15}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[0.35, 48, 48]} />
        <meshBasicMaterial
          color="#FFE9A8"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {[1.0, 1.3, 1.7].map((radius, i) => (
        <mesh key={radius} ref={i === 1 ? auraRef : undefined}>
          <sphereGeometry args={[radius, 48, 48]} />
          <meshBasicMaterial
            color={i === 0 ? '#FFD873' : i === 1 ? '#E8B870' : '#D4AF37'}
            transparent
            opacity={0.2 - i * 0.05}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}

      <group>
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i / 12) * Math.PI * 2
          const distance = 1.1 + Math.random() * 0.3
          return (
            <mesh key={i} position={[Math.cos(angle) * distance, Math.sin(angle) * distance * 0.3, Math.sin(angle) * distance]}>
              <sphereGeometry args={[0.02 + Math.random() * 0.03, 8, 8]} />
              <meshBasicMaterial
                color="#FFD700"
                transparent
                opacity={0.6}
                blending={THREE.AdditiveBlending}
              />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

/** 12 House Divisions - 12 บ้านในหลังโหรา */
function HouseDivisions() {
  const divisions = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      angle: (i / 12) * Math.PI * 2,
      label: `บ้าน ${i + 1}`,
    }))
  }, [])

  return (
    <group>
      {divisions.map((div) => (
        <group key={div.id}>
          <mesh rotation={[0, div.angle, 0]} position={[0, 0, 0]}>
            <boxGeometry args={[0.02, 6, 0.02]} />
            <meshBasicMaterial
              color="#D4AF37"
              transparent
              opacity={0.3}
              blending={THREE.AdditiveBlending}
              depthWrite={false}
            />
          </mesh>

          <Text
            position={[
              Math.cos(div.angle + Math.PI / 12) * 5.8,
              0,
              Math.sin(div.angle + Math.PI / 12) * 5.8
            ]}
            fontSize={0.25}
            color="#D4AF37"
            anchorX="center"
            anchorY="middle"
            fillOpacity={0.7}
          >
            {div.label}
          </Text>
        </group>
      ))}

      {[2, 3.5, 5].map((radius, index) => (
        <mesh key={radius} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius, 0.008, 16, 96]} />
          <meshBasicMaterial
            color="#D4AF37"
            transparent
            opacity={0.15 - index * 0.03}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      ))}
    </group>
  )
}

/** Zodiac Symbols Ring - วงสัญลักษณ์ราศี */
function ZodiacRing() {
  const groupRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.02
    }
  })

  return (
    <group ref={groupRef}>
      {ZODIAC_SYMBOLS.map((zodiac) => {
        const radius = 6.2
        const x = Math.cos(zodiac.angle) * radius
        const z = Math.sin(zodiac.angle) * radius

        return (
          <group key={zodiac.name} position={[x, 0, z]}>
            <Text
              fontSize={0.5}
              color="#FFD700"
              anchorX="center"
              anchorY="middle"
              fillOpacity={0.9}
            >
              {zodiac.symbol}
            </Text>

            <mesh position={[0, -0.2, 0]}>
              <sphereGeometry args={[0.4, 16, 16]} />
              <meshBasicMaterial
                color="#FFD700"
                transparent
                opacity={0.15}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>
          </group>
        )
      })}

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[6.2, 0.01, 16, 96]} />
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.25}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
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
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.02
      planetRef.current.rotation.x += 0.01
    }
  })

  const getPlanetMaterial = () => {
    const baseProps = {
      color: config.color,
      emissive: config.color,
      emissiveIntensity: 0.4,
      roughness: 0.6,
      metalness: 0.2,
    }

    if (config.isGasGiant) {
      return {
        ...baseProps,
        roughness: 0.8,
        metalness: 0.1,
        emissiveIntensity: 0.3,
      }
    }

    if (config.hasAtmosphere) {
      return {
        ...baseProps,
        roughness: 0.4,
        metalness: 0.3,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.9,
      }
    }

    return baseProps
  }

  return (
    <group ref={pivot}>
      <Trail
        width={config.size * 6}
        length={5}
        color={new THREE.Color(config.color)}
        attenuation={(w) => w * w}
      >
        <mesh ref={planetRef}>
          <sphereGeometry args={[config.size, 32, 32]} />
          <meshStandardMaterial {...getPlanetMaterial()} />
        </mesh>
      </Trail>

      <Text
        position={[0, config.size + 0.3, 0]}
        fontSize={0.15}
        color="#D4AF37"
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.8}
      >
        {config.name}
      </Text>

      {config.hasAtmosphere && !config.isGasGiant && (
        <mesh>
          <sphereGeometry args={[config.size * 1.15, 32, 32]} />
          <meshBasicMaterial
            color={config.color}
            transparent
            opacity={0.15}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            side={THREE.BackSide}
          />
        </mesh>
      )}

      {config.hasRing && (
        <mesh rotation={[Math.PI / 2.2, 0.3, 0]}>
          <ringGeometry args={[config.size * 1.4, config.size * 2.2, 64]} />
          <meshBasicMaterial
            color={config.ringColor || '#F0D67E'}
            side={THREE.DoubleSide}
            transparent
            opacity={0.6}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      )}

      {config.isGasGiant && (
        <>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[config.size * 0.7, 0.02, 16, 100]} />
            <meshBasicMaterial
              color={config.color}
              transparent
              opacity={0.3}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, Math.PI / 4]}>
            <torusGeometry args={[config.size * 0.85, 0.02, 16, 100]} />
            <meshBasicMaterial
              color={config.color}
              transparent
              opacity={0.25}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </>
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
      <ambientLight intensity={0.15} />
      <pointLight color="#FFE9A8" intensity={2.5} distance={25} decay={1.2} position={[0, 0, 0]} />
      <pointLight color="#D4AF37" intensity={0.8} distance={15} decay={1.5} position={[5, 3, 5]} />

      <Stars
        radius={80}
        depth={50}
        count={2500}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />

      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.25}>
        <CrystalSphere />
      </Float>

      <HouseDivisions />

      <ZodiacRing />

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
        enableZoom={true}
        minDistance={5}
        maxDistance={20}
        autoRotate
        autoRotateSpeed={0.35}
        minPolarAngle={Math.PI / 3.5}
        maxPolarAngle={Math.PI / 1.5}
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
