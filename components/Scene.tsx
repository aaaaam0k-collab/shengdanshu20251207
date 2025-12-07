import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Sparkles, Float, Environment } from '@react-three/drei';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { Foliage } from './Foliage';
import { Ornaments } from './Ornaments';
import { PearlChains } from './PearlChains';
import { Star } from './Star';
import { TreeState } from '../types';
import { COLORS } from '../constants';

interface SceneProps {
  state: TreeState;
}

export const Scene: React.FC<SceneProps> = ({ state }) => {
  const progress = state === TreeState.FORMED ? 1 : 0; // Keeping legacy progress for compatibility if needed

  return (
    <Canvas
      camera={{ position: [0, 4, 30], fov: 45 }}
      dpr={[1, 2]} 
      shadows
      gl={{ antialias: false }} 
    >
      <color attach="background" args={[COLORS.SPACE_DARK]} />
      
      <Suspense fallback={null}>
        {/* Real Environment for reflections */}
        <Environment preset="city" /> 

        {/* Backdrop */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <Float speed={1} rotationIntensity={0.2} floatIntensity={0.5}>
           <Sparkles count={300} scale={30} size={3} speed={0.4} opacity={0.3} color={COLORS.ICE_BLUE} />
        </Float>

        {/* Lighting - Physical setup for shiny pearls/ornaments */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 10, 5]} 
          intensity={2} 
          castShadow 
          shadow-bias={-0.0001} 
          color={COLORS.PALE_GOLD}
        />
        <pointLight position={[-10, 5, -10]} intensity={20} color={COLORS.ICE_BLUE} />
        <pointLight position={[0, -5, 5]} intensity={10} color="white" />

        <group position={[0, -4, 0]}>
            <Foliage state={state} progress={progress} />
            <Ornaments state={state} progress={progress} />
            <PearlChains state={state} progress={progress} />
            <Star state={state} progress={progress} />
        </group>

        {/* Postprocessing - subtle bloom only on very bright reflections */}
        <EffectComposer enableNormalPass={false}>
            <Bloom 
                luminanceThreshold={0.9} // Very high threshold so tree doesn't glow
                mipmapBlur 
                intensity={0.5} // Subtle glow on highlights
                radius={0.4}
            />
            <Vignette eskil={false} offset={0.1} darkness={0.5} />
        </EffectComposer>
      </Suspense>

      <OrbitControls 
        enablePan={false} 
        minPolarAngle={Math.PI / 4} 
        maxPolarAngle={Math.PI / 1.5}
        minDistance={10}
        maxDistance={60}
        autoRotate={state === TreeState.FORMED}
        autoRotateSpeed={0.3}
      />
    </Canvas>
  );
};
