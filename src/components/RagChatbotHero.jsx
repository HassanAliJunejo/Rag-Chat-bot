import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

const RagChatbotHero = ({ onChatToggle }) => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your ROS 2 RAG Assistant. I can answer questions about humanoid robotics, ROS 2 programming, AI integration, and more. What would you like to know?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('checking'); // 'online', 'offline', 'checking'
  const messagesEndRef = useRef(null);

  // Check connection status on component mount
  useEffect(() => {
    checkConnectionStatus();
  }, []);

  const checkConnectionStatus = async () => {
    setConnectionStatus('checking');
    try {
      const response = await fetch('http://localhost:8000/health');
      if (response.ok) {
        const data = await response.json();
        setConnectionStatus(data.status === 'online' ? 'online' : 'offline');
      } else {
        setConnectionStatus('offline');
      }
    } catch (error) {
      console.error('Error checking connection status:', error);
      setConnectionStatus('offline');
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      text: inputValue,
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call the backend API
      const response = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: inputValue }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const botMessage = {
        id: Date.now() + 1,
        text: data.response,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error getting response from backend:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: `Sorry, I'm having trouble connecting to the backend. ${error.message || 'Please try again later.'}`,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 1,
        text: "Hello! I'm your ROS 2 RAG Assistant. I can answer questions about humanoid robotics, ROS 2 programming, AI integration, and more. What would you like to know?",
        isBot: true,
        timestamp: new Date()
      }
    ]);
  };

  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text);
  };

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
      <section className="relative z-10 flex flex-col items-center justify-center text-center py-12 sm:py-20 min-h-[90vh] px-4" style={{ maxWidth: '100%', margin: '0 auto' }}>
        <div className="max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl w-full">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight font-['Orbitron'] text-center"
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
            RAG Chatbot
          </motion.h1>

          <motion.p
            className="text-lg sm:text-xl md:text-2xl text-[#CBD5E1] mb-8 font-['Inter'] text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Ask me anything about ROS 2 and Humanoid Robotics
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-6 md:mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[rgba(15,23,42,0.7)] border border-[rgba(56,189,248,0.2)] text-[#00F0FF] rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm font-['Inter']">
              RAG
            </span>
            <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[rgba(15,23,42,0.7)] border border-[rgba(56,189,248,0.2)] text-[#00F0FF] rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm font-['Inter']">
              AI Assistant
            </span>
            <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[rgba(15,23,42,0.7)] border border-[rgba(56,189,248,0.2)] text-[#00F0FF] rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm font-['Inter']">
              Q&A
            </span>
            <span className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[rgba(15,23,42,0.7)] border border-[rgba(56,189,248,0.2)] text-[#00F0FF] rounded-full text-xs sm:text-sm font-medium backdrop-blur-sm font-['Inter']">
              Knowledge Base
            </span>
          </motion.div>
        </div>

        {/* Chatbot Container */}
        <div className="w-full max-w-4xl mx-4 bg-[rgba(15,23,42,0.7)] border border-[rgba(56,189,248,0.2)] rounded-2xl backdrop-blur-md shadow-[0_0_30px_rgba(0,240,255,0.2)] overflow-hidden">
          {/* Chat Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between p-3 sm:p-4 gap-2 bg-gradient-to-r from-[#0F172A] to-[#1E293B] border-b border-[rgba(56,189,248,0.2)]">
            <div className="flex items-center">
              <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#0077FF] flex items-center justify-center mr-2 sm:mr-3">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 text-[#0B1220]">
                  <path d="M20 2H4c-1.1 0-1.99.9-1.99 2L2 22l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-2 12H6v-2h12v2zm0-3H6V9h12v2zm0-3H6V6h12v2z" fill="currentColor" />
                </svg>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-[#00F0FF] font-['Inter']">ROS 2 RAG Assistant</h3>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <div className={`
                flex items-center px-2 py-1 rounded-full text-xs sm:text-sm font-medium
                ${connectionStatus === 'online' ? 'text-[#4ade80]' :
                  connectionStatus === 'checking' ? 'text-[#fbbf24]' : 'text-[#f87171]'}
              `}>
                <span className={`
                  w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full mr-1 sm:mr-2
                  ${connectionStatus === 'online' ? 'bg-[#4ade80] shadow-[0_0_8px_rgba(74,222,128,0.6)]' :
                    connectionStatus === 'checking' ? 'bg-[#fbbf24]' : 'bg-[#f87171]'}
                `}></span>
                <span className="hidden sm:inline">
                  {connectionStatus === 'online' ? 'Online' :
                   connectionStatus === 'checking' ? 'Checking...' : 'Offline'}
                </span>
                <span className="sm:hidden">
                  {connectionStatus === 'online' ? 'ON' :
                   connectionStatus === 'checking' ? 'CK' : 'OFF'}
                </span>
              </div>
              <button
                onClick={handleClearChat}
                className="p-1.5 sm:p-2 rounded-lg bg-[rgba(15,23,42,0.5)] hover:bg-[rgba(56,189,248,0.2)] border border-[rgba(56,189,248,0.2)] transition-all duration-300"
                title="Clear chat"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 sm:w-5 sm:h-5 text-[#00F0FF]">
                  <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" fill="currentColor" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="h-[300px] sm:h-[400px] overflow-y-auto p-3 sm:p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`
                  max-w-[85%] p-3 sm:p-4 rounded-2xl relative overflow-visible
                  ${message.isBot
                    ? 'self-start bg-gradient-to-r from-[#0F172A] to-[#1E293B] border border-[rgba(56,189,248,0.2)] ml-0 mr-auto'
                    : 'self-end bg-gradient-to-r from-[#00F0FF] to-[#0077FF] text-white ml-auto mr-0'}
                  flex gap-2 sm:gap-3 items-start
                `}
                style={{
                  animation: 'messageSlideIn 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                  backdropFilter: 'blur(4px)',
                }}
              >
                <div className={`
                  w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center
                  ${message.isBot
                    ? 'bg-gradient-to-r from-[#00F0FF] to-[#0077FF]'
                    : 'bg-[rgba(15,23,42,0.5)]'}
                `}>
                  {message.isBot ? (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3 h-3 sm:w-4 sm:h-4 text-[#0B1220]">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V7C1.9 7 1 7.9 1 9V11C1 11.77 1.25 12.48 1.67 13.06L5.05 17.75C5.5 18.38 6.22 18.8 7 18.8H17C17.78 18.8 18.5 18.38 18.95 17.75L22.33 13.06C22.75 12.48 23 11.77 23 11V9C23 7.9 22.1 7 21 7V9ZM12 18.5C10.62 18.5 9.5 17.38 9.5 16S10.62 13.5 12 13.5 14.5 14.62 14.5 16 13.38 18.5 12 18.5Z" fill="currentColor" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3 h-3 sm:w-4 sm:h-4 text-[#00F0FF]">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="currentColor" />
                    </svg>
                  )}
                </div>
                <div className="flex-1 relative">
                  <div className="message-content text-sm sm:text-base">{message.text}</div>
                  <div className="absolute top-[-25px] right-0 opacity-0 transition-opacity duration-200 bg-[#0F172A] text-[#F0F9FF] px-3 py-1 rounded-2xl text-xs border border-[rgba(56,189,248,0.2)] group-hover:opacity-100">
                    <button
                      onClick={() => handleCopyMessage(message.text)}
                      className="flex items-center gap-1"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3 h-3">
                        <path d="M19 21H8V7h11v14zm-10-2h9V8H9v11zm-4-2h2V5h7V3H5v14z" fill="currentColor" />
                      </svg>
                      Copy
                    </button>
                  </div>
                </div>
                <div className="text-xs text-[#94a3b8]">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="max-w-[85%] p-3 sm:p-4 rounded-2xl bg-gradient-to-r from-[#0F172A] to-[#1E293B] border border-[rgba(56,189,248,0.2)] ml-0 mr-auto flex gap-2 sm:gap-3 items-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#0077FF] flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-3 h-3 sm:w-4 sm:h-4 text-[#0B1220]">
                    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V7C1.9 7 1 7.9 1 9V11C1 11.77 1.25 12.48 1.67 13.06L5.05 17.75C5.5 18.38 6.22 18.8 7 18.8H17C17.78 18.8 18.5 18.38 18.95 17.75L22.33 13.06C22.75 12.48 23 11.77 23 11V9C23 7.9 22.1 7 21 7V9ZM12 18.5C10.62 18.5 9.5 17.38 9.5 16S10.62 13.5 12 13.5 14.5 14.62 14.5 16 13.38 18.5 12 18.5Z" fill="currentColor" />
                  </svg>
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-[#CBD5E1] text-sm">AI is typing...</span>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-[#00F0FF] rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-[#00F0FF] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-[#00F0FF] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          <div className="px-3 py-2 sm:px-4 sm:py-3 flex flex-wrap gap-1.5 sm:gap-2 border-t border-[rgba(56,189,248,0.2)] bg-[rgba(15,23,42,0.5)]">
            {['What is ROS 2?', 'How do humanoid robots work?', 'Explain inverse kinematics', 'Setup ROS 2 environment'].map((question, index) => (
              <button
                key={index}
                onClick={() => {
                  setInputValue(question);
                  document.getElementById('message-input').focus();
                }}
                className="px-2 py-1 text-xs sm:text-sm bg-[rgba(56,189,248,0.15)] text-[#7dd3fc] rounded-full border border-[rgba(56,189,248,0.3)] backdrop-filter-blur-4px hover:bg-[rgba(56,189,248,0.25)] hover:transform hover:translate-y-[-2px] hover:shadow-[0_4px_12px_rgba(56,189,248,0.2)] transition-all duration-300"
              >
                {question}
              </button>
            ))}
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-3 sm:p-4 flex flex-col sm:flex-row gap-2 sm:gap-3">
            <input
              id="message-input"
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about ROS 2, humanoid robots, sensors, navigation..."
              className="flex-1 p-3 sm:p-4 rounded-full bg-[rgba(30,41,59,0.7)] text-[#f0f9ff] font-['Inter'] border border-[rgba(56,189,248,0.3)] focus:outline-none focus:border-[#0ea5e9] focus:shadow-[0_0_0_3px_rgba(2,132,199,0.3)] focus:transform focus:translate-y-[-1px] backdrop-blur-4px shadow-[0_4px_6px_rgba(0,0,0,0.1)] text-sm sm:text-base"
              disabled={isLoading}
            />
            <button
              type="submit"
              className="w-full sm:w-14 h-12 sm:h-14 rounded-full bg-gradient-to-r from-[#00F0FF] to-[#0077FF] text-white flex items-center justify-center transition-all duration-300 hover:scale-105 hover:translate-y-[-2px] hover:shadow-[0_6px_16px_rgba(0,0,0,0.3)] active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed disabled:transform-none relative overflow-hidden"
              disabled={isLoading || !inputValue.trim()}
            >
              <div className="absolute -top-50 -left-50 w-[200%] h-[200%] bg-white/10 transform rotate-30 transition-all duration-500 hover:transform-rotate-30 hover:translate-x-[20%] hover:translate-y-[20%]"></div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 sm:w-6 sm:h-6 text-[#0B1220] z-10">
                <path d="M3.478 2.405a.75.75 0 0 0-.926.94l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.405Z" fill="currentColor" />
              </svg>
            </button>
          </form>
        </div>
      </section>

      <style jsx>{`
        @keyframes messageSlideIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        
        .particle {
          position: absolute;
          background: linear-gradient(135deg, #00F0FF, #0077FF);
          border-radius: 50%;
          animation: float linear infinite;
        }
        
        @keyframes float {
          0% {
            transform: translate(0, 0);
            opacity: 0.1;
          }
          25% {
            transform: translate(10px, 15px);
            opacity: 0.5;
          }
          50% {
            transform: translate(0, 20px);
            opacity: 0.8;
          }
          75% {
            transform: translate(-10px, 15px);
            opacity: 0.5;
          }
          100% {
            transform: translate(0, 0);
            opacity: 0.1;
          }
        }
        
        .shape {
          position: absolute;
          background: linear-gradient(135deg, rgba(0, 240, 255, 0.1), rgba(0, 119, 255, 0.1));
          border: 1px solid rgba(0, 240, 255, 0.2);
          animation: moveShape linear infinite;
        }
        
        .shape.circle {
          border-radius: 50%;
        }
        
        .shape.square {
          border-radius: 20%;
        }
        
        @keyframes moveShape {
          0% {
            transform: translate(0, 0) rotate(0deg);
          }
          100% {
            transform: translate(var(--endX), var(--endY)) rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};

export default RagChatbotHero;