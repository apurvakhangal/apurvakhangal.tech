import { useRef, useMemo, useCallback } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Module-level constant — never reallocated during animation
const ATTRACTION_POINT = new THREE.Vector3(8, 0, 5);
const ATTRACTION_RADIUS = 12;

interface Props {
  scrollProgress: number;
  mousePosition: { x: number; y: number };
}

// Simple pseudo-random based on seed
function seededRandom(seed: number) {
  const x = Math.sin(seed * 127.1 + seed * 311.7) * 43758.5453;
  return x - Math.floor(x);
}

// Generate neuron positions using organic distribution
function generateNeuronPositions(count: number, spread: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const theta = seededRandom(i * 3) * Math.PI * 2;
    const phi = Math.acos(2 * seededRandom(i * 3 + 1) - 1);
    const r = spread * Math.pow(seededRandom(i * 3 + 2), 0.4);
    
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi) - spread * 0.3;
  }
  return positions;
}

// Generate parallax layer particles at specific depth
function generateParallaxLayer(count: number, depth: number, spread: number) {
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (seededRandom(i * 5) - 0.5) * spread * 2;
    positions[i * 3 + 1] = (seededRandom(i * 7) - 0.5) * spread * 2;
    positions[i * 3 + 2] = depth + (seededRandom(i * 11) - 0.5) * 5;
  }
  return positions;
}

// Camera path through the neural space
function getCameraPosition(t: number): [number, number, number] {
  const z = 30 - t * 80;
  const x = Math.sin(t * Math.PI * 2) * 8;
  const y = Math.cos(t * Math.PI * 1.5) * 5 + t * 3;
  return [x, y, z];
}

function getCameraLookAt(t: number): [number, number, number] {
  const z = 20 - t * 80;
  const x = Math.sin(t * Math.PI * 2 + 0.5) * 4;
  const y = Math.cos(t * Math.PI * 1.5 + 0.3) * 2;
  return [x, y, z];
}

export function NeuralUniverse({ scrollProgress, mousePosition }: Props) {
  const particlesRef = useRef<THREE.Points>(null);
  const parallaxLayersRef = useRef<THREE.Points[]>([]);
  const connectionsRef = useRef<THREE.LineSegments>(null);
  const glowParticlesRef = useRef<THREE.Points>(null);

  // Default color values used to be mapped here, now hardcoded.
  const colors = {
    primary: [0.0, 0.85, 1.0] as [number, number, number],
    glow: [0.0, 0.6, 0.8] as [number, number, number]
  };

  const PARTICLE_COUNT = 4000;
  const NEURON_COUNT = 60;
  const CONNECTION_COUNT = 120;
  const PARALLAX_LAYERS = 3; // Multiple depth layers for parallax effect
  const LAYER_PARTICLES = 800;

  const particlePositions = useMemo(() => generateNeuronPositions(PARTICLE_COUNT, 50), []);
  const neuronPositions = useMemo(() => generateNeuronPositions(NEURON_COUNT, 30), []);

  // Generate parallax layers at different depths
  const parallaxLayersPositions = useMemo(() => {
    const layers: Float32Array[] = [];
    // Layer 1 - foreground
    layers.push(generateParallaxLayer(LAYER_PARTICLES, -20, 40));
    // Layer 2 - mid
    layers.push(generateParallaxLayer(LAYER_PARTICLES, -50, 60));
    // Layer 3 - background
    layers.push(generateParallaxLayer(LAYER_PARTICLES, -80, 80));
    return layers;
  }, []);

  const particleSizes = useMemo(() => {
    const sizes = new Float32Array(PARTICLE_COUNT);
    // Attraction point for image (right side, center)
    const attractionPoint = { x: 8, y: 0, z: 5 };
    
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = particlePositions[i * 3];
      const y = particlePositions[i * 3 + 1];
      const z = particlePositions[i * 3 + 2];
      
      // Calculate distance to image area
      const dx = attractionPoint.x - x;
      const dy = attractionPoint.y - y;
      const dz = attractionPoint.z - z;
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
      
      // Base size with variation
      let size = 0.02 + seededRandom(i * 7) * 0.08;
      
      // Enlarge particles near the image for silhouette effect
      const attractionRadius = 12;
      if (distance < attractionRadius) {
        const proximityFactor = 1 - distance / attractionRadius;
        size += proximityFactor * 0.12; // Add up to 0.12 to size near image
      }
      
      sizes[i] = Math.min(size, 0.25); // Cap maximum size
    }
    return sizes;
  }, [particlePositions]);

  const connectionPositions = useMemo(() => {
    const pos = new Float32Array(CONNECTION_COUNT * 6);
    for (let i = 0; i < CONNECTION_COUNT; i++) {
      const a = Math.floor(seededRandom(i * 13) * NEURON_COUNT);
      const b = Math.floor(seededRandom(i * 17 + 3) * NEURON_COUNT);
      pos[i * 6] = neuronPositions[a * 3];
      pos[i * 6 + 1] = neuronPositions[a * 3 + 1];
      pos[i * 6 + 2] = neuronPositions[a * 3 + 2];
      pos[i * 6 + 3] = neuronPositions[b * 3];
      pos[i * 6 + 4] = neuronPositions[b * 3 + 1];
      pos[i * 6 + 5] = neuronPositions[b * 3 + 2];
    }
    return pos;
  }, [neuronPositions]);

  const targetCamPos = useRef(new THREE.Vector3(0, 0, 30));
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0));
  const currentCamPos = useRef(new THREE.Vector3(0, 0, 30));
  const currentLookAt = useRef(new THREE.Vector3(0, 0, 0));

  const updateCamera = useCallback((camera: THREE.Camera, delta: number) => {
    const [tx, ty, tz] = getCameraPosition(scrollProgress);
    const [lx, ly, lz] = getCameraLookAt(scrollProgress);

    // Add mouse parallax
    const mx = mousePosition.x * 2;
    const my = mousePosition.y * 1.5;

    targetCamPos.current.set(tx + mx, ty + my, tz);
    targetLookAt.current.set(lx + mx * 0.3, ly + my * 0.3, lz);

    const lerpFactor = 1 - Math.pow(0.05, delta);
    currentCamPos.current.lerp(targetCamPos.current, lerpFactor);
    currentLookAt.current.lerp(targetLookAt.current, lerpFactor);

    camera.position.copy(currentCamPos.current);
    (camera as THREE.PerspectiveCamera).lookAt(currentLookAt.current);
  }, [scrollProgress, mousePosition]);

  useFrame(({ clock, camera }, delta) => {
    const t = clock.getElapsedTime();

    updateCamera(camera, delta);

    // Animate main particles — gentle drift with attraction toward hero image
    if (particlesRef.current) {
      const geo = particlesRef.current.geometry;
      const pos = geo.attributes.position as THREE.BufferAttribute;

      for (let i = 0; i < PARTICLE_COUNT; i++) {
        let x = particlePositions[i * 3];
        let y = particlePositions[i * 3 + 1];
        let z = particlePositions[i * 3 + 2];

        const drift = seededRandom(i) * 0.5 + 0.3;

        x += Math.sin(t * drift + i) * 0.15;
        y += Math.cos(t * drift * 0.7 + i * 0.5) * 0.15;
        z += Math.sin(t * drift * 0.5 + i * 0.3) * 0.1;

        const dx = ATTRACTION_POINT.x - x;
        const dy = ATTRACTION_POINT.y - y;
        const dz = ATTRACTION_POINT.z - z;
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (distance < ATTRACTION_RADIUS) {
          const attractionStrength = (1 - distance / ATTRACTION_RADIUS) * 0.08;
          x += (dx / distance) * attractionStrength;
          y += (dy / distance) * attractionStrength;
          z += (dz / distance) * attractionStrength;
        }

        pos.setXYZ(i, x, y, z);
      }
      pos.needsUpdate = true;

      const mat = particlesRef.current.material as THREE.PointsMaterial;
      mat.color.setRGB(colors.primary[0], colors.primary[1], colors.primary[2]);
    }

    // Animate parallax layers - different speeds for depth effect
    parallaxLayersRef.current.forEach((layer, layerIdx) => {
      if (layer && layer.geometry) {
        const geo = layer.geometry;
        const pos = geo.attributes.position as THREE.BufferAttribute;
        const basePos = parallaxLayersPositions[layerIdx];
        
        // Each layer moves at different speed (parallax effect)
        const depthFactor = 1 - layerIdx * 0.3;
        const xOffset = mousePosition.x * 5 * depthFactor;
        const yOffset = mousePosition.y * 3 * depthFactor;
        
        for (let i = 0; i < LAYER_PARTICLES; i++) {
          const baseX = basePos[i * 3];
          const baseY = basePos[i * 3 + 1];
          const baseZ = basePos[i * 3 + 2] + scrollProgress * 40;
          
          pos.setXYZ(
            i,
            baseX + xOffset,
            baseY + yOffset,
            baseZ
          );
        }
        pos.needsUpdate = true;

        const mat = layer.material as THREE.PointsMaterial;
        mat.color.setRGB(...colors.primary);
      }
    });

    // Glow neurons - enhanced pulsing with neural silhouette effect
    if (glowParticlesRef.current) {
      const mat = glowParticlesRef.current.material as THREE.PointsMaterial;
      const basePulse = 0.6 + Math.sin(t * 0.8) * 0.4;
      
      // Enhance glow around image area (right side, center)
      const silhouetteFactor = 1 + Math.sin(t * 1.2) * 0.5;
      mat.opacity = Math.min(basePulse * 0.5 + 0.15, 1) * silhouetteFactor;
      mat.color.setRGB(...colors.primary);
    }

    // Connection lines - enhanced intensity with neural focus
    if (connectionsRef.current) {
      const mat = connectionsRef.current.material as THREE.LineBasicMaterial;
      const basePulse = 0.03 + Math.sin(t * 0.5) * 0.02;
      
      // Boost connection opacity for neural silhouette effect
      const silhouetteBoost = 1 + Math.sin(t * 0.8) * 0.4;
      mat.opacity = (basePulse + 0.02) * silhouetteBoost;
      mat.color.setRGB(...colors.primary);
    }
  });

  return (
    <>
      {/* Background particles - main cloud */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={new Float32Array(particlePositions)}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={PARTICLE_COUNT}
            array={particleSizes}
            itemSize={1}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.08}
          transparent
          opacity={0.6}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Parallax layers for depth effect */}
      {Array.from({ length: PARALLAX_LAYERS }).map((_, layerIdx) => (
        <points
          key={`parallax-layer-${layerIdx}`}
          ref={(el) => {
            if (el && !parallaxLayersRef.current.includes(el)) {
              parallaxLayersRef.current[layerIdx] = el;
            }
          }}
        >
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={LAYER_PARTICLES}
              array={new Float32Array(parallaxLayersPositions[layerIdx])}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.05 + layerIdx * 0.02}
            transparent
            opacity={0.3 - layerIdx * 0.1}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      ))}

      {/* Neuron cores */}
      <points ref={glowParticlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={NEURON_COUNT}
            array={new Float32Array(neuronPositions)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.5}
          transparent
          opacity={0.5}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Neural connections */}
      <lineSegments ref={connectionsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={CONNECTION_COUNT * 2}
            array={new Float32Array(connectionPositions)}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          transparent
          opacity={0.05}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          color="#ffffff"
        />
      </lineSegments>

      {/* Ambient light for atmosphere */}
      <ambientLight intensity={0.02} />
      <pointLight position={[0, 0, 20]} intensity={0.3} color={new THREE.Color(...colors.primary)} distance={60} />
    </>
  );
}
