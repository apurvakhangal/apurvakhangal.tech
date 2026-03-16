interface NeuralCoreProps {
  scrollProgress: number;
  mousePosition: { x: number; y: number };
}

export function NeuralCore({ scrollProgress, mousePosition }: NeuralCoreProps) {
  // Neural core visibility and camera effect
  const coreOpacity = Math.max(0, Math.min(1, (scrollProgress - 0.15) / 0.15));
  const coreScale = 0.8 + coreOpacity * 0.2;
  
  // Camera zoom as user scrolls
  const cameraZoom = 30 - scrollProgress * 60;

  return (
    <div
      className="fixed inset-0 pointer-events-none flex items-center justify-center"
      style={{ 
        opacity: coreOpacity,
        zIndex: 1
      }}
    >
      <div
        className="relative w-64 h-64 md:w-96 md:h-96"
        style={{
          transform: `scale(${coreScale}) translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
          transition: 'transform 0.3s ease-out'
        }}
      >
        {/* Outer glow ring */}
        <div
          className="absolute inset-0 rounded-full border border-cyan-500/30"
          style={{
            boxShadow: '0 0 40px rgba(0, 212, 255, 0.3)',
            animation: 'pulse 3s ease-in-out infinite'
          }}
        />

        {/* Inner neural structure - will be enhanced by 3D in NeuralScene */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(0, 212, 255, 0.1) 0%, transparent 70%)',
            boxShadow: 'inset 0 0 60px rgba(0, 212, 255, 0.2)'
          }}
        />

        {/* Floating particles */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyan-400 rounded-full"
            style={{
              left: '50%',
              top: '50%',
              transform: `rotate(${(i / 12) * 360}deg) translateY(-130px)`,
              animation: `float 4s ease-in-out ${i * 0.3}s infinite`,
              boxShadow: '0 0 10px rgba(0, 212, 255, 0.8)'
            }}
          />
        ))}
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 40px rgba(0, 212, 255, 0.3); }
          50% { box-shadow: 0 0 60px rgba(0, 212, 255, 0.6); }
        }
        
        @keyframes float {
          0%, 100% { opacity: 0.3; transform: rotate(0deg) translateY(-130px); }
          50% { opacity: 1; transform: rotate(180deg) translateY(-130px); }
        }
      `}</style>
    </div>
  );
}
