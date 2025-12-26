import React from 'react';
import { motion } from 'framer-motion';

const Hero = ({ onChatToggle }) => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0B1220]"> {/* Dark background from index.html */}
      {/* Animated gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(138, 43, 226, 0.1) 0%, rgba(0, 240, 255, 0.05) 40%, transparent 70%)',
          zIndex: -2,
          animation: 'gradientShift 15s ease infinite alternate'
        }}
      />
      <style jsx>{`
        @keyframes gradientShift {
          0% { background: radial-gradient(circle at center, rgba(138, 43, 226, 0.1) 0%, rgba(0, 240, 255, 0.05) 40%, transparent 70%); }
          100% { background: radial-gradient(circle at center, rgba(0, 119, 255, 0.1) 0%, rgba(0, 240, 255, 0.1) 40%, transparent 70%); }
        }
      `}</style>

      {/* Animated background grid */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `
            linear-gradient(rgba(56, 189, 248, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56, 189, 248, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'gridMove 20s linear infinite',
          zIndex: -1
        }}
      />
      <style jsx>{`
        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
      `}</style>

      {/* Center glow effect */}
      <motion.div
        className="absolute top-1/2 left-1/2 w-96 h-96 rounded-full blur-3xl opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, rgba(138, 43, 226, 0.05) 40%, transparent 70%)',
          zIndex: -1,
        }}
        animate={{
          scale: [0.8, 1.2, 0.8],
          opacity: [0.4, 0.8, 0.4]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />

      {/* Floating particles container */}
      <div className="absolute inset-0 z-0" id="particles">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 15 + 2}px`,
              height: `${Math.random() * 15 + 2}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: i % 3 === 0 ? '#00F0FF' : i % 3 === 1 ? '#8A2BE2' : '#0077FF',
              opacity: Math.random() * 0.4 + 0.1,
            }}
            animate={{
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
              opacity: [Math.random() * 0.4 + 0.1, Math.random() * 0.4 + 0.3, Math.random() * 0.4 + 0.1],
            }}
            transition={{
              duration: Math.random() * 25 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Geometric shapes container */}
      <div className="absolute inset-0 z-0" id="shapes">
        {[...Array(15)].map((_, i) => {
          const isCircle = Math.random() > 0.5;
          const size = Math.random() * 60 + 20;
          return (
            <motion.div
              key={i}
              className={`absolute ${isCircle ? 'rounded-full' : ''}`}
              style={{
                width: `${size}px`,
                height: `${size}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: isCircle
                  ? `radial-gradient(circle, #00F0FF, transparent 70%)`
                  : `linear-gradient(45deg, #8A2BE2, transparent 70%)`,
                opacity: 0.1,
              }}
              animate={{
                x: (Math.random() - 0.5) * 100,
                y: (Math.random() - 0.5) * 100,
                rotate: 360,
              }}
              transition={{
                duration: Math.random() * 40 + 20,
                repeat: Infinity,
                repeatType: "loop",
                delay: Math.random() * 10,
              }}
            />
          );
        })}
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        {/* Centered content */}
        <div className="flex flex-col items-center text-center">
          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 leading-tight font-['Orbitron']"
            style={{
              background: 'linear-gradient(to right, #00F0FF, #0077FF)', /* Cyan to blue gradient from index.html */
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Physical AI &<br />
            Humanoid Robotics
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-[#CBD5E1] mb-8 font-['Inter']"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Module 1: The Robotic Nervous System (ROS 2)
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-3 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <motion.span
              className="px-4 py-2 border border-[#00F0FF] text-[#00F0FF] rounded-full text-sm font-medium backdrop-blur-sm bg-[#0F172A]/70 font-['Inter']"
              whileHover={{ scale: 1.05, borderColor: "#00F0FF", color: "#00F0FF" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              ROS 2
            </motion.span>
            <motion.span
              className="px-4 py-2 border border-[#00F0FF] text-[#00F0FF] rounded-full text-sm font-medium backdrop-blur-sm bg-[#0F172A]/70 font-['Inter']"
              whileHover={{ scale: 1.05, borderColor: "#00F0FF", color: "#00F0FF" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17, delay: 0.1 }}
            >
              Humanoid
            </motion.span>
            <motion.span
              className="px-4 py-2 border border-[#00F0FF] text-[#00F0FF] rounded-full text-sm font-medium backdrop-blur-sm bg-[#0F172A]/70 font-['Inter']"
              whileHover={{ scale: 1.05, borderColor: "#00F0FF", color: "#00F0FF" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17, delay: 0.2 }}
            >
              AI
            </motion.span>
            <motion.span
              className="px-4 py-2 border border-[#00F0FF] text-[#00F0FF] rounded-full text-sm font-medium backdrop-blur-sm bg-[#0F172A]/70 font-['Inter']"
              whileHover={{ scale: 1.05, borderColor: "#00F0FF", color: "#00F0FF" }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 17, delay: 0.3 }}
            >
              Intelligent Agents
            </motion.span>
          </motion.div>

          <motion.button
            className="bg-gradient-to-r from-[#00F0FF] to-[#0077FF] text-[#0B1220] font-bold py-4 px-8 rounded-full shadow-[0_0_25px_rgba(0,240,255,0.5)] transition-all duration-300 transform hover:scale-105 relative overflow-hidden group font-['Inter']"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 35px rgba(0,240,255,0.7)" }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#0077FF] to-[#00F0FF] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <span className="relative z-10">Start Learning ROS 2</span>
            <div className="absolute inset-0 bg-gradient-to-r from-[#00F0FF] to-[#0077FF] opacity-0 group-hover:opacity-20 transition-opacity duration-300 animate-pulse"></div>
          </motion.button>
        </div>
      </div>

      {/* Floating Chat Icon - Glassmorphic and Cyber-Tech */}
      <motion.div
        className="fixed bottom-8 right-8 z-[9999]"
        onClick={onChatToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: 1,
          y: 0,
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut"
        }}
      >
        <button
          className="w-16 h-16 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#0077FF] flex items-center justify-center shadow-[0_0_25px_rgba(0,240,255,0.5)] hover:shadow-[0_0_35px_rgba(0,240,255,0.7)] transition-all duration-300 transform hover:scale-110 backdrop-blur-md border border-[#00F0FF]/50 cursor-pointer"
          style={{ pointerEvents: 'auto' }}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#0B1220]"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12C2 13.54 2.36 15.01 3.02 16.32L2 22L7.68 20.98C8.99 21.64 10.46 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM9 17L7 15L8.41 13.59L10.83 16.01L15.41 11.41L17 13L12 18L9 17Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </motion.div>
    </div>
  );
};

export default Hero;