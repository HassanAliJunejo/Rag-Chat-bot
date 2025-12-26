import React from 'react';

const HighTechHero = () => {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#020617] text-white">
      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 bg-[length:40px_40px] opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(34, 211, 238, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
          `
        }}
      />

      {/* Glowing circles */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-[#22d3ee] opacity-10 blur-3xl" />
      <div className="absolute top-3/4 right-1/4 w-48 h-48 rounded-full bg-[#3b82f6] opacity-10 blur-3xl" />
      <div className="absolute top-1/3 right-1/3 w-32 h-32 rounded-full bg-[#8b5cf6] opacity-10 blur-3xl" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          {/* Left side - Text content */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-orbitron">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#22d3ee] to-[#3b82f6]">
                Physical AI & Humanoid Robotics
              </span>
            </h1>

            <h2 className="text-xl md:text-2xl text-gray-300 mb-8 font-inter">
              Module 1: The Robotic Nervous System (ROS 2)
            </h2>

            {/* Tags */}
            <div className="flex flex-wrap gap-3 mb-8">
              <span className="px-4 py-2 border border-[#22d3ee] text-[#22d3ee] rounded-full text-sm font-inter">
                ROS 2
              </span>
              <span className="px-4 py-2 border border-[#22d3ee] text-[#22d3ee] rounded-full text-sm font-inter">
                Humanoid
              </span>
              <span className="px-4 py-2 border border-[#22d3ee] text-[#22d3ee] rounded-full text-sm font-inter">
                AI
              </span>
              <span className="px-4 py-2 border border-[#22d3ee] text-[#22d3ee] rounded-full text-sm font-inter">
                Intelligent Agents
              </span>
            </div>

            {/* CTA Button */}
            <button className="w-full md:w-auto px-8 py-4 bg-transparent border-2 border-[#22d3ee] text-[#22d3ee] rounded-lg text-lg font-semibold hover:bg-[#22d3ee] hover:text-[#020617] transition-all duration-300 shadow-[0_0_20px_4px_rgba(34,211,238,0.5)] hover:shadow-[0_0_30px_8px_rgba(34,211,238,0.7)] transform hover:scale-105 font-inter">
              Start Learning ROS 2
            </button>
          </div>

          {/* Right side - Illustration */}
          <div className="flex justify-center items-center">
            <div className="relative w-full max-w-lg">
              {/* Robot illustration using SVG */}
              <div className="w-64 h-64 mx-auto">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  {/* Robot head */}
                  <circle cx="100" cy="50" r="25" fill="none" stroke="#22d3ee" strokeWidth="2" className="animate-pulse" />

                  {/* Eyes */}
                  <circle cx="90" cy="45" r="3" fill="#22d3ee" className="animate-pulse" />
                  <circle cx="110" cy="45" r="3" fill="#22d3ee" className="animate-pulse" />

                  {/* Antenna */}
                  <line x1="100" y1="25" x2="100" y2="15" stroke="#22d3ee" strokeWidth="2" />
                  <circle cx="100" cy="12" r="3" fill="#22d3ee" className="animate-ping" />

                  {/* Robot body */}
                  <rect x="75" y="75" width="50" height="60" rx="5" fill="none" stroke="#22d3ee" strokeWidth="2" />

                  {/* Chest display */}
                  <rect x="85" y="90" width="30" height="15" rx="2" fill="black" stroke="#22d3ee" strokeWidth="1" />
                  <text x="100" y="100" textAnchor="middle" fill="#22d3ee" fontSize="8" fontFamily="Inter">AI CORE</text>

                  {/* Decorative elements */}
                  <circle cx="90" cy="115" r="1.5" fill="#22d3ee" />
                  <circle cx="100" cy="115" r="1.5" fill="#22d3ee" />
                  <circle cx="110" cy="115" r="1.5" fill="#22d3ee" />

                  {/* Arms */}
                  <line x1="75" y1="85" x2="45" y2="95" stroke="#22d3ee" strokeWidth="3" strokeDasharray="5,3" />
                  <line x1="125" y1="85" x2="155" y2="95" stroke="#22d3ee" strokeWidth="3" strokeDasharray="5,3" />

                  {/* Legs */}
                  <line x1="90" y1="135" x2="90" y2="165" stroke="#22d3ee" strokeWidth="3" />
                  <line x1="110" y1="135" x2="110" y2="165" stroke="#22d3ee" strokeWidth="3" />

                  {/* Glowing base effect */}
                  <ellipse cx="100" cy="170" rx="30" ry="5" fill="url(#glow)" opacity="0.5" />

                  {/* Gradient for glow */}
                  <defs>
                    <radialGradient id="glow" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
                      <stop offset="0%" stopColor="#22d3ee" stopOpacity="1" />
                      <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating chat bubble */}
      <div className="fixed bottom-8 right-8 z-50">
        <button className="w-14 h-14 rounded-full bg-[#22d3ee] flex items-center justify-center shadow-[0_0_20px_4px_rgba(34,211,238,0.5)] animate-pulse">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#020617]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default HighTechHero;