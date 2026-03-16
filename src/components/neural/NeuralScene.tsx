import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { NeuralUniverse } from './NeuralUniverse';

interface NeuralSceneProps {
  scrollProgress: number;
  mousePosition: { x: number; y: number };
}

export function NeuralScene({ scrollProgress, mousePosition }: NeuralSceneProps) {
  // Hardcoded background color matching user's requested solid image
  const backgroundColor = '#111625';
  const fogColor = '#111625';

  return (
    <div className="fixed inset-0" style={{ zIndex: 0 }}>
      <Canvas
        camera={{ position: [0, 0, 30], fov: 60, near: 0.1, far: 1000 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={[backgroundColor]} />
        <fogExp2 attach="fog" args={[fogColor, 0.012]} />
        <Suspense fallback={null}>
          <NeuralUniverse scrollProgress={scrollProgress} mousePosition={mousePosition} />
        </Suspense>
      </Canvas>
    </div>
  );
}
