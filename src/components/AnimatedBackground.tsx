const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0" aria-hidden="true">
      {/* Main Animated Gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(294deg, #1a0505, #2f0a0a, #480707, #3a0909, #1a0505)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 20s ease infinite'
        }}
      />

      {/* Floating Ambient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(0 50% 12% / 0.4) 0%, transparent 60%)',
            top: '-10%',
            left: '-10%',
            animation: 'floatSlow 30s ease-in-out infinite',
            filter: 'blur(80px)'
          }}
        />
        <div 
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(0 45% 10% / 0.3) 0%, transparent 60%)',
            bottom: '-5%',
            right: '-5%',
            animation: 'floatSlowReverse 25s ease-in-out infinite',
            filter: 'blur(60px)'
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, hsl(0 55% 14% / 0.25) 0%, transparent 60%)',
            top: '40%',
            left: '30%',
            animation: 'pulse 15s ease-in-out infinite',
            filter: 'blur(70px)'
          }}
        />
      </div>

      {/* Subtle Vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, hsl(0 20% 2% / 0.4) 100%)'
        }}
      />

      {/* Very Subtle Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />

      <style>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes floatSlow {
          0%, 100% { 
            transform: translate(0, 0) scale(1); 
          }
          33% { 
            transform: translate(30px, 20px) scale(1.05); 
          }
          66% { 
            transform: translate(-20px, 30px) scale(0.98); 
          }
        }
        
        @keyframes floatSlowReverse {
          0%, 100% { 
            transform: translate(0, 0) scale(1); 
          }
          50% { 
            transform: translate(-40px, -30px) scale(1.08); 
          }
        }
        
        @keyframes pulse {
          0%, 100% { 
            opacity: 0.25;
            transform: translate(-50%, -50%) scale(1); 
          }
          50% { 
            opacity: 0.4;
            transform: translate(-50%, -50%) scale(1.15); 
          }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
