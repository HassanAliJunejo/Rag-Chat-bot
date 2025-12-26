import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const ChatbotModal = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      text: "Hello! I'm your ROS 2 Assistant. Ask me anything about humanoid robotics!",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateBotResponse = (userMessage) => {
    const lowerMsg = userMessage.toLowerCase();
    
    if (lowerMsg.includes('ros') || lowerMsg.includes('ros2')) {
      return "ROS 2 (Robot Operating System 2) is a flexible framework for writing robot applications. It's a collection of software libraries and tools that help you build robot applications with features like hardware abstraction, device drivers, libraries, visualizers, message-passing, and package management.";
    } else if (lowerMsg.includes('humanoid') || lowerMsg.includes('robot')) {
      return "Humanoid robots are robots with a human-like body structure, typically having a head, torso, two arms, and two legs. They are designed to operate in human environments and interact with humans using familiar communication channels.";
    } else if (lowerMsg.includes('learn') || lowerMsg.includes('start')) {
      return "To start learning ROS 2, I recommend beginning with the official ROS 2 tutorials. You can start with the beginner-level tutorials that cover the basic concepts like nodes, topics, services, and actions. Then move on to more advanced topics like URDF for robot modeling and navigation.";
    } else {
      return "That's a great question! I can help you with ROS 2, humanoid robotics, AI integration, and more. What specifically would you like to know?";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = {
      text: input,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse = {
        text: generateBotResponse(input),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[1001] flex justify-end items-end md:items-end"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="w-full max-w-md h-[70vh] md:w-[400px] md:h-[600px] bg-[#0A1128]/80 backdrop-blur-xl rounded-t-2xl md:rounded-2xl shadow-2xl border border-[#00D9FF]/30 mx-4 mb-20 md:mb-4 flex flex-col"
          initial={{ y: '100%', scale: 1 }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#00D9FF]/20 to-[#0099FF]/20 p-4 rounded-t-2xl border-b border-[#00D9FF]/30 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageCircle className="text-[#00D9FF] w-6 h-6" />
              <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#00D9FF] to-[#0099FF]">
                ROS 2 Assistant
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-gray-300 hover:text-white transition-colors p-1 rounded-full hover:bg-white/10"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-2xl p-4 ${
                    message.sender === 'user'
                      ? 'bg-gradient-to-r from-[#00D9FF]/30 to-[#0099FF]/30 text-white rounded-br-none'
                      : 'bg-white/10 text-gray-100 rounded-bl-none'
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.sender === 'bot' && (
                      <div className="bg-[#00D9FF]/20 p-1.5 rounded-full mt-0.5">
                        <MessageCircle className="w-4 h-4 text-[#00D9FF]" />
                      </div>
                    )}
                    <div>
                      <p>{message.text}</p>
                      <p className={`text-xs mt-1 ${message.sender === 'user' ? 'text-gray-300' : 'text-gray-400'}`}>
                        {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    {message.sender === 'user' && (
                      <div className="bg-[#0099FF]/20 p-1.5 rounded-full mt-0.5">
                        <div className="w-4 h-4 rounded-full bg-gradient-to-r from-[#00D9FF] to-[#0099FF]"></div>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="bg-white/10 text-gray-100 rounded-2xl rounded-bl-none p-4 max-w-[80%]">
                  <div className="flex items-center">
                    <div className="bg-[#00D9FF]/20 p-1.5 rounded-full mr-2">
                      <MessageCircle className="w-4 h-4 text-[#00D9FF]" />
                    </div>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-[#00D9FF] rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-[#00D9FF] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-[#00D9FF] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-[#00D9FF]/30 bg-[#0A1128]/50">
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about ROS 2, humanoids, AI..."
                className="flex-1 bg-white/10 border border-[#00D9FF]/30 rounded-full py-3 px-4 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00D9FF]/50"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className={`p-3 rounded-full ${
                  input.trim() && !isTyping
                    ? 'bg-gradient-to-r from-[#00D9FF] to-[#0099FF] hover:from-[#0099FF] hover:to-[#00D9FF] text-white'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                } transition-all duration-300`}
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatbotModal;