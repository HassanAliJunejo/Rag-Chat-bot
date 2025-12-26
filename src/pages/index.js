import React, { useState } from 'react';
import Layout from '@theme/Layout';
import Navbar from '../components/Navbar';
import EnhancedHero from '../components/EnhancedHero';
import ChatbotModal from '../components/ChatbotModal';

function LandingPage() {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <Layout
      title={`Physical AI & Humanoid Robotics`}
      description="Module 1: The Robotic Nervous System (ROS 2)">
      <Navbar />
      <main style={{ paddingTop: '80px' }}>
        <EnhancedHero onChatToggle={toggleChatbot} />
        <ChatbotModal isOpen={isChatbotOpen} onClose={toggleChatbot} />
      </main>
    </Layout>
  );
}

export default LandingPage;