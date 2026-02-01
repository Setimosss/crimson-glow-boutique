const AnimatedBackground = () => {
  return (
    <div className="animated-bg" aria-hidden="true">
      {/* Floating orbs for extra depth */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(0 50% 15%) 0%, transparent 70%)',
            top: '10%',
            left: '10%',
            animation: 'floatOrb1 30s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, hsl(0 45% 12%) 0%, transparent 70%)',
            bottom: '20%',
            right: '15%',
            animation: 'floatOrb2 25s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute w-[300px] h-[300px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, hsl(0 40% 10%) 0%, transparent 70%)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            animation: 'floatOrb3 35s ease-in-out infinite'
          }}
        />
      </div>
      
      <style>{`
        @keyframes floatOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(50px, 30px) scale(1.1); }
          50% { transform: translate(-30px, 60px) scale(0.95); }
          75% { transform: translate(40px, -20px) scale(1.05); }
        }
        @keyframes floatOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-40px, -50px) scale(1.15); }
          66% { transform: translate(60px, 30px) scale(0.9); }
        }
        @keyframes floatOrb3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          50% { transform: translate(-50%, -50%) scale(1.3); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
