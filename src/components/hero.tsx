"use client";

export function Hero() {
  return (
    <section className="bg-black py-48 relative overflow-hidden">
      {/* Animated Propeller Background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Large Central Propeller */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="animate-spin opacity-5" style={{ animationDuration: '20s' }}>
            <svg width="400" height="400" viewBox="0 0 400 400" className="text-white">
              <g strokeWidth="1" stroke="currentColor" fill="none">
                <line x1="200" y1="200" x2="200" y2="50" />
                <line x1="200" y1="200" x2="350" y2="200" />
                <line x1="200" y1="200" x2="200" y2="350" />
                <line x1="200" y1="200" x2="50" y2="200" />
                <ellipse cx="200" cy="75" rx="8" ry="25" />
                <ellipse cx="325" cy="200" rx="25" ry="8" />
                <ellipse cx="200" cy="325" rx="8" ry="25" />
                <ellipse cx="75" cy="200" rx="25" ry="8" />
                <circle cx="200" cy="200" r="6" fill="currentColor" />
              </g>
            </svg>
          </div>
        </div>

        {/* Small Propellers */}
        <div className="absolute top-20 left-20">
          <div className="animate-spin opacity-3" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
            <svg width="60" height="60" viewBox="0 0 60 60" className="text-white">
              <g strokeWidth="0.5" stroke="currentColor" fill="none">
                <line x1="30" y1="30" x2="30" y2="10" />
                <line x1="30" y1="30" x2="50" y2="30" />
                <line x1="30" y1="30" x2="30" y2="50" />
                <line x1="30" y1="30" x2="10" y2="30" />
                <ellipse cx="30" cy="18" rx="2" ry="8" />
                <ellipse cx="42" cy="30" rx="8" ry="2" />
                <ellipse cx="30" cy="42" rx="2" ry="8" />
                <ellipse cx="18" cy="30" rx="8" ry="2" />
                <circle cx="30" cy="30" r="2" fill="currentColor" />
              </g>
            </svg>
          </div>
        </div>

        <div className="absolute bottom-32 right-32">
          <div className="animate-spin opacity-4" style={{ animationDuration: '20s' }}>
            <svg width="80" height="80" viewBox="0 0 80 80" className="text-white">
              <g strokeWidth="0.5" stroke="currentColor" fill="none">
                <line x1="40" y1="40" x2="40" y2="15" />
                <line x1="40" y1="40" x2="65" y2="40" />
                <line x1="40" y1="40" x2="40" y2="65" />
                <line x1="40" y1="40" x2="15" y2="40" />
                <ellipse cx="40" cy="25" rx="3" ry="10" />
                <ellipse cx="55" cy="40" rx="10" ry="3" />
                <ellipse cx="40" cy="55" rx="3" ry="10" />
                <ellipse cx="25" cy="40" rx="10" ry="3" />
                <circle cx="40" cy="40" r="3" fill="currentColor" />
              </g>
            </svg>
          </div>
        </div>

        <div className="absolute top-40 right-20">
          <div className="animate-spin opacity-3" style={{ animationDuration: '15s', animationDirection: 'reverse' }}>
            <svg width="50" height="50" viewBox="0 0 50 50" className="text-white">
              <g strokeWidth="0.5" stroke="currentColor" fill="none">
                <line x1="25" y1="25" x2="25" y2="8" />
                <line x1="25" y1="25" x2="42" y2="25" />
                <line x1="25" y1="25" x2="25" y2="42" />
                <line x1="25" y1="25" x2="8" y2="25" />
                <ellipse cx="25" cy="15" rx="2" ry="7" />
                <ellipse cx="35" cy="25" rx="7" ry="2" />
                <ellipse cx="25" cy="35" rx="2" ry="7" />
                <ellipse cx="15" cy="25" rx="7" ry="2" />
                <circle cx="25" cy="25" r="2" fill="currentColor" />
              </g>
            </svg>
          </div>
        </div>

        <div className="absolute bottom-20 left-32">
          <div className="animate-spin opacity-3" style={{ animationDuration: '20s' }}>
            <svg width="70" height="70" viewBox="0 0 70 70" className="text-white">
              <g strokeWidth="0.5" stroke="currentColor" fill="none">
                <line x1="35" y1="35" x2="35" y2="12" />
                <line x1="35" y1="35" x2="58" y2="35" />
                <line x1="35" y1="35" x2="35" y2="58" />
                <line x1="35" y1="35" x2="12" y2="35" />
                <ellipse cx="35" cy="22" rx="3" ry="10" />
                <ellipse cx="48" cy="35" rx="10" ry="3" />
                <ellipse cx="35" cy="48" rx="3" ry="10" />
                <ellipse cx="22" cy="35" rx="10" ry="3" />
                <circle cx="35" cy="35" r="3" fill="currentColor" />
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 text-center relative z-10">
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-8">
          DroneForge
        </h1>
        <p className="text-xl md:text-2xl text-white max-w-4xl mx-auto">
          Scale-ready, NDAA-compliant, superior-quality components for unmanned systems
        </p>
      </div>

    </section>
  );
}