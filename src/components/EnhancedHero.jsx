import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const EnhancedHero = ({ onChatToggle }) => {
  useEffect(() => {
    // Create floating particles
    const particlesContainer = document.getElementById('particles');
    const particleCount = 50;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');

      // Random properties
      const size = Math.random() * 15 + 2;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const animationDuration = Math.random() * 25 + 10;
      const animationDelay = Math.random() * 5;
      const opacity = Math.random() * 0.4 + 0.1;

      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.top = `${posY}%`;
      particle.style.animationDuration = `${animationDuration}s`;
      particle.style.animationDelay = `${animationDelay}s`;
      particle.style.opacity = opacity;

      particlesContainer.appendChild(particle);
    }

    // Create geometric shapes
    const shapesContainer = document.getElementById('shapes');
    const shapeCount = 15;

    for (let i = 0; i < shapeCount; i++) {
      const shape = document.createElement('div');

      // Randomly choose between circle and square
      const isCircle = Math.random() > 0.5;
      shape.classList.add('shape', isCircle ? 'circle' : 'square');

      // Random properties
      const size = Math.random() * 60 + 20;
      const posX = Math.random() * 100;
      const posY = Math.random() * 100;
      const animationDuration = Math.random() * 40 + 20;
      const animationDelay = Math.random() * 10;

      // Random destination for animation
      const endX = (Math.random() - 0.5) * 100;
      const endY = (Math.random() - 0.5) * 100;

      shape.style.width = `${size}px`;
      shape.style.height = `${size}px`;
      shape.style.left = `${posX}%`;
      shape.style.top = `${posY}%`;
      shape.style.animationDuration = `${animationDuration}s`;
      shape.style.animationDelay = `${animationDelay}s`;
      shape.style.setProperty('--endX', `${endX}vw`);
      shape.style.setProperty('--endY', `${endY}vh`);

      shapesContainer.appendChild(shape);
    }
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#0B1220]">
      {/* Animated gradient background */}
      <div
        className="fixed inset-0 bg-gradient-shift"
        style={{
          zIndex: -2,
        }}
      />

      {/* Animated background grid */}
      <div
        className="fixed inset-0 opacity-30"
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
      <div
        className="absolute top-1/2 left-1/2 w-[600px] h-[600px] rounded-full blur-[40px] opacity-40"
        style={{
          background: 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, rgba(138, 43, 226, 0.05) 40%, transparent 70%)',
          zIndex: -1,
          transform: 'translate(-50%, -50%)',
          animation: 'glowPulse 8s infinite alternate'
        }}
      />
      <style jsx>{`
        @keyframes glowPulse {
          0% { opacity: 0.4; transform: translate(-50%, -50%) scale(0.8); }
          100% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.2); }
        }
      `}</style>

      {/* Floating Particles */}
      <div className="fixed inset-0 z-0" id="particles"></div>

      {/* Geometric Shapes */}
      <div className="fixed inset-0 z-0" id="shapes"></div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center text-center py-20 min-h-[90vh] px-4" style={{ maxWidth: '100%', margin: '0 auto' }}>
        <div className="max-w-2xl w-full">
          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight font-['Orbitron']"
            style={{
              background: 'linear-gradient(90deg, #00F0FF, #0077FF)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Physical AI & Humanoid Robotics
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
            className="flex flex-wrap justify-center gap-4 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="px-4 py-2 bg-[rgba(15,23,42,0.7)] border border-[rgba(56,189,248,0.2)] text-[#00F0FF] rounded-full text-sm font-medium backdrop-blur-sm font-['Inter']">
              ROS 2
            </span>
            <span className="px-4 py-2 bg-[rgba(15,23,42,0.7)] border border-[rgba(56,189,248,0.2)] text-[#00F0FF] rounded-full text-sm font-medium backdrop-blur-sm font-['Inter']">
              Humanoid
            </span>
            <span className="px-4 py-2 bg-[rgba(15,23,42,0.7)] border border-[rgba(56,189,248,0.2)] text-[#00F0FF] rounded-full text-sm font-medium backdrop-blur-sm font-['Inter']">
              AI
            </span>
            <span className="px-4 py-2 bg-[rgba(15,23,42,0.7)] border border-[rgba(56,189,248,0.2)] text-[#00F0FF] rounded-full text-sm font-medium backdrop-blur-sm font-['Inter']">
              Intelligent Agents
            </span>
          </motion.div>

          <motion.button
            className="bg-gradient-to-r from-[#00F0FF] to-[#0077FF] text-[#0B1220] font-bold py-4 px-10 rounded-full text-lg shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all duration-300 transform hover:translate-y-[-5px] relative overflow-hidden group font-['Inter'] mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            whileHover={{ scale: 1.05, boxShadow: "0 10px 30px rgba(0,240,255,0.7)" }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute -top-50 -left-50 w-[200%] h-[200%] bg-white/10 transform rotate-30 transition-all duration-500 group-hover:transform-rotate-30 group-hover:translate-x-[20%] group-hover:translate-y-[20%]"></div>
            <span className="relative z-10">Start Learning ROS 2</span>
          </motion.button>
        </div>

        {/* Robot Illustration */}
        <div className="mt-16 flex justify-center">
          <motion.div 
            className="w-[300px] h-[300px] md:w-[400px] md:h-[400px] bg-[rgba(15,23,42,0.7)] border border-[rgba(56,189,248,0.2)] rounded-2xl backdrop-blur-md relative overflow-hidden"
            animate={{ y: [0, -10, 0] }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-radial-[rgba(0,240,255,0.1)_0%,transparent_70%] animate-[rotate_10s_linear_infinite]"></div>
            <style jsx>{`
              @keyframes rotate {
                0% { transform: rotate(0deg); }
                100% { transform: rotate(360deg); }
              }
            `}</style>
            
            <div className="w-[200px] h-[300px] md:w-[250px] md:h-[375px] mx-auto flex flex-col items-center pt-8 relative">
              {/* Robot Head */}
              <div className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] bg-[#0B1220] rounded-full mb-5 flex items-center justify-center">
                <div className="flex">
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-[#00F0FF] rounded-full mx-1 animate-pulse"></div>
                  <div className="w-5 h-5 md:w-6 md:h-6 bg-[#00F0FF] rounded-full mx-1 animate-pulse"></div>
                </div>
                <style jsx>{`
                  @keyframes pulse {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0.5; }
                  }
                  .animate-pulse {
                    animation: pulse 2s infinite;
                  }
                `}</style>
              </div>
              
              {/* Robot Body */}
              <div className="w-[120px] h-[120px] md:w-[150px] md:h-[150px] bg-[#0B1220] rounded-xl relative">
                {/* Robot Arms */}
                <div className="absolute w-4 h-20 md:w-5 md:h-24 bg-[#00F0FF] top-5 -left-5 md:-left-6 rounded transform -rotate-12"></div>
                <div className="absolute w-4 h-20 md:w-5 md:h-24 bg-[#00F0FF] top-5 -right-5 md:-right-6 rounded transform rotate-12"></div>
                
                {/* Robot Legs */}
                <div className="absolute w-4 h-20 md:w-5 md:h-24 bg-[#00F0FF] bottom-[-80px] md:bottom-[-100px] left-[30px] md:left-[40px]"></div>
                <div className="absolute w-4 h-20 md:w-5 md:h-24 bg-[#00F0FF] bottom-[-80px] md:bottom-[-100px] right-[30px] md:right-[40px]"></div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20 px-4 relative z-10">
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold mb-16 text-center font-['Orbitron']"
          style={{
            background: 'linear-gradient(90deg, #00F0FF, #0077FF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Learning Modules
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Module Card 1 */}
          <motion.div
            className="bg-[rgba(15,23,42,0.7)] border border-[rgba(56,189,248,0.2)] rounded-2xl p-8 backdrop-blur-md transition-all duration-300 relative overflow-hidden"
            whileHover={{ y: -10, boxShadow: "0 20px 30px rgba(0, 0, 0, 0.3)", borderColor: "#00F0FF" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-15 h-15 bg-gradient-to-r from-[#00F0FF] to-[#0077FF] rounded-xl flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 text-[#0B1220]">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#00F0FF] font-['Inter']">ROS 2 Fundamentals</h3>
            <p className="text-[#CBD5E1] leading-relaxed font-['Inter']">
              Learn the core concepts of ROS 2, including nodes, topics, services, and actions. Understand the architecture and communication patterns.
            </p>
          </motion.div>

          {/* Module Card 2 */}
          <motion.div
            className="bg-[rgba(15,23,42,0.7)] border border-[rgba(56,189,248,0.2)] rounded-2xl p-8 backdrop-blur-md transition-all duration-300 relative overflow-hidden"
            whileHover={{ y: -10, boxShadow: "0 20px 30px rgba(0, 0, 0, 0.3)", borderColor: "#00F0FF" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="w-15 h-15 bg-gradient-to-r from-[#00F0FF] to-[#0077FF] rounded-xl flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 text-[#0B1220]">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#00F0FF] font-['Inter']">Robot Communication</h3>
            <p className="text-[#CBD5E1] leading-relaxed font-['Inter']">
              Master the communication systems in ROS 2, including message passing, services, and action libraries. Build distributed robotic systems.
            </p>
          </motion.div>

          {/* Module Card 3 */}
          <motion.div
            className="bg-[rgba(15,23,42,0.7)] border border-[rgba(56,189,248,0.2)] rounded-2xl p-8 backdrop-blur-md transition-all duration-300 relative overflow-hidden"
            whileHover={{ y: -10, boxShadow: "0 20px 30px rgba(0, 0, 0, 0.3)", borderColor: "#00F0FF" }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-15 h-15 bg-gradient-to-r from-[#00F0FF] to-[#0077FF] rounded-xl flex items-center justify-center mb-5">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 text-[#0B1220]">
                <path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"/>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-3 text-[#00F0FF] font-['Inter']">Sensors & Actuators</h3>
            <p className="text-[#CBD5E1] leading-relaxed font-['Inter']">
              Explore how to interface with various sensors and actuators in ROS 2. Learn to process sensor data and control robotic movements.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Chatbot Button */}
      <motion.button
        className="fixed bottom-8 right-8 w-16 h-16 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#0077FF] flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all duration-300 transform hover:scale-110 hover:rotate-10 z-[1000] border border-[rgba(56,189,248,0.2)] backdrop-blur-md"
        onClick={onChatToggle}
        whileHover={{ scale: 1.1, boxShadow: "0 0 30px rgba(0,240,255,0.7)" }}
        whileTap={{ scale: 0.95 }}
        animate={{ rotate: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
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
            d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z"
            fill="currentColor"
          />
        </svg>
        <div className="absolute -top-10 right-0 bg-[#0F172A] text-[#F0F9FF] px-4 py-2 rounded-2xl text-sm border border-[rgba(56,189,248,0.2)] opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
          Ask the ROS 2 AI Tutor
        </div>
      </motion.button>
    </div>
  );
};

export default EnhancedHero;