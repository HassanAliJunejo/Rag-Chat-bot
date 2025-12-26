import React, { useState } from 'react';
import clsx from 'clsx';
import Layout from '@theme/Layout';
import ChatbotPanel from './ChatbotPanel';
import styles from '../css/robotics-layout.module.css';

function RoboticsLayout({children, ...props}) {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <Layout {...props}>
      <div className={styles.roboticsLayout}>
        {/* Left humanoid robot */}
        <div className={styles.robotLeft}>
          <div className={styles.robotContainer}>
            <img
              src="/img/realistic-humanoid-robot-left.svg"
              alt="Realistic Humanoid Robot Left"
              className={styles.robotSvg}
            />
          </div>
        </div>

        {/* Center content area */}
        <div className={styles.centerArea}>
          {/* Header with title and subtitle */}
          <header className={styles.header}>
            <h1 className={styles.title}>Physical AI & Humanoid Robotics</h1>
            <p className={styles.subtitle}>ROS 2 • Intelligent Agents • Humanoid Systems</p>
          </header>

          {/* Main content area */}
          <main className={styles.mainContent}>
            {children}
          </main>
        </div>

        {/* Right humanoid robot */}
        <div className={styles.robotRight}>
          <div className={styles.robotContainer}>
            <img
              src="/img/realistic-humanoid-robot-right.svg"
              alt="Realistic Humanoid Robot Right"
              className={styles.robotSvg}
            />
          </div>
        </div>

        {/* Chatbot button at top right */}
        <button
          className={clsx(styles.chatbotButton, isChatbotOpen ? styles.chatbotButtonOpen : '')}
          onClick={toggleChatbot}
          aria-label="Open chatbot"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24px" height="24px">
            <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.903 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.403-3.718 3.413-3.979z" />
          </svg>
        </button>

        {/* Chatbot panel */}
        <ChatbotPanel isOpen={isChatbotOpen} onClose={toggleChatbot} />

        {/* Background circuit patterns */}
        <div className={styles.backgroundPattern}>
          <svg className={styles.circuitPattern} viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <path d="M10,10 Q30,5 50,10 T90,10" stroke="var(--ifm-color-primary)" fill="none" strokeWidth="0.2" opacity="0.2"/>
            <path d="M10,30 Q30,25 50,30 T90,30" stroke="var(--ifm-color-primary)" fill="none" strokeWidth="0.2" opacity="0.2"/>
            <path d="M10,50 Q30,45 50,50 T90,50" stroke="var(--ifm-color-primary)" fill="none" strokeWidth="0.2" opacity="0.2"/>
            <path d="M10,70 Q30,65 50,70 T90,70" stroke="var(--ifm-color-primary)" fill="none" strokeWidth="0.2" opacity="0.2"/>
            <path d="M10,90 Q30,85 50,90 T90,90" stroke="var(--ifm-color-primary)" fill="none" strokeWidth="0.2" opacity="0.2"/>
          </svg>
        </div>
      </div>
    </Layout>
  );
}

export default RoboticsLayout;