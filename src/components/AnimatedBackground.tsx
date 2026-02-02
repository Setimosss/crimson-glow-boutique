const AnimatedBackground = () => {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-background" aria-hidden="true">
      {/* Main Animated Gradient */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-[200%] h-[200%] top-[-50%] left-[-50%]"
          style={{
            background: `
              radial-gradient(ellipse 800px 800px at 20% 30%, hsl(0 40% 12% / 0.8) 0%, transparent 50%),
              radial-gradient(ellipse 600px 600px at 80% 20%, hsl(0 35% 10% / 0.6) 0%, transparent 45%),
              radial-gradient(ellipse 900px 900px at 50% 80%, hsl(0 45% 8% / 0.7) 0%, transparent 50%),
              radial-gradient(ellipse 500px 500px at 10% 70%, hsl(0 30% 6% / 0.5) 0%, transparent 40%),
              radial-gradient(ellipse 700px 700px at 90% 60%, hsl(0 38% 9% / 0.6) 0%, transparent 45%)
            `,
            animation: 'gradientFlow 30s ease-in-out infinite'
          }}
        />
      </div>

      {/* Secondary Layer */}
      <div className="absolute inset-0">
        <div 
          className="absolute w-[150%] h-[150%] top-[-25%] left-[-25%]"
          style={{
            background: `
              radial-gradient(ellipse 500px 500px at 60% 40%, hsl(0 50% 10% / 0.4) 0%, transparent 50%),
              radial-gradient(ellipse 400px 400px at 30% 50%, hsl(0 45% 8% / 0.3) 0%, transparent 45%)
            `,
            animation: 'gradientFlowReverse 25s ease-in-out infinite'
          }}
        />
      </div>

      {/* Floating Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(circle, hsl(0 50% 15%) 0%, transparent 70%)',
            top: '10%',
            left: '5%',
            animation: 'floatOrb1 35s ease-in-out infinite',
            filter: 'blur(60px)'
          }}
        />
        <div 
          className="absolute w-[500px] h-[500px] rounded-full opacity-25"
          style={{
            background: 'radial-gradient(circle, hsl(0 45% 12%) 0%, transparent 70%)',
            bottom: '10%',
            right: '5%',
            animation: 'floatOrb2 28s ease-in-out infinite',
            filter: 'blur(50px)'
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(0 55% 14%) 0%, transparent 70%)',
            top: '40%',
            left: '40%',
            animation: 'floatOrb3 40s ease-in-out infinite',
            filter: 'blur(40px)'
          }}
        />
        <div 
          className="absolute w-[350px] h-[350px] rounded-full opacity-15"
          style={{
            background: 'radial-gradient(circle, hsl(0 40% 10%) 0%, transparent 70%)',
            top: '60%',
            right: '20%',
            animation: 'floatOrb4 32s ease-in-out infinite',
            filter: 'blur(45px)'
          }}
        />
      </div>

      {/* Mesh Gradient Overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            linear-gradient(135deg, hsl(0 40% 5% / 0.8) 0%, transparent 50%),
            linear-gradient(225deg, hsl(0 35% 8% / 0.6) 0%, transparent 50%),
            linear-gradient(315deg, hsl(0 45% 6% / 0.7) 0%, transparent 50%)
          `
        }}
      />

      {/* Subtle Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(0 60% 40%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(0 60% 40%) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px'
        }}
      />

      {/* Noise Texture */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
        }}
      />

      <style>{`
        @keyframes gradientFlow {
          0%, 100% { 
            transform: translate(0, 0) rotate(0deg) scale(1); 
          }
          20% { 
            transform: translate(3%, 2%) rotate(1deg) scale(1.02); 
          }
          40% { 
            transform: translate(-2%, 4%) rotate(-0.5deg) scale(1.01); 
          }
          60% { 
            transform: translate(2%, -2%) rotate(0.5deg) scale(1.03); 
          }
          80% { 
            transform: translate(-1%, 1%) rotate(-0.5deg) scale(1.01); 
          }
        }
        
        @keyframes gradientFlowReverse {
          0%, 100% { 
            transform: translate(0, 0) rotate(0deg); 
          }
          25% { 
            transform: translate(-4%, 3%) rotate(-1deg); 
          }
          50% { 
            transform: translate(3%, -2%) rotate(0.5deg); 
          }
          75% { 
            transform: translate(-2%, -3%) rotate(-0.5deg); 
          }
        }
        
        @keyframes floatOrb1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(60px, 40px) scale(1.1); }
          50% { transform: translate(-40px, 80px) scale(0.95); }
          75% { transform: translate(50px, -30px) scale(1.05); }
        }
        
        @keyframes floatOrb2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-50px, -60px) scale(1.15); }
          66% { transform: translate(70px, 40px) scale(0.9); }
        }
        
        @keyframes floatOrb3 {
          0%, 100% { transform: translate(-50%, -50%) scale(1); }
          33% { transform: translate(-45%, -55%) scale(1.2); }
          66% { transform: translate(-55%, -45%) scale(0.9); }
        }
        
        @keyframes floatOrb4 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-40px, 50px) scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
