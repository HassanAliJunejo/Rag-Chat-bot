import React from 'react';
import Layout from '@theme/Layout';
import Navbar from '../components/Navbar';
import RagChatbotHero from '../components/RagChatbotHero';

function RagChatbotPage() {
  return (
    <Layout
      title={`RAG Chatbot | Physical AI & Humanoid Robotics`}
      description="RAG Chatbot for ROS 2 and Humanoid Robotics - Ask me anything about ROS 2 and Humanoid Robotics">
      <Navbar />
      <main style={{ paddingTop: '80px' }}>
        <RagChatbotHero />
      </main>
    </Layout>
  );
}

export default RagChatbotPage;