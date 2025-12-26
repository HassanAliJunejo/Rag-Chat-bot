import React, { useState, useRef, useEffect } from 'react';
import Head from '@docusaurus/Head';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Navbar from '../components/Navbar';
import clsx from 'clsx';

import styles from '../css/chatbot.module.css';

function ChatbotPage() {
  const { siteConfig } = useDocusaurusContext();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! I'm your Physical AI & Humanoid Robotics assistant. How can I help you with ROS 2, humanoid robotics, or AI agents today?",
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
        text: "Hello! I'm your Physical AI & Humanoid Robotics assistant. How can I help you with ROS 2, humanoid robotics, or AI agents today?",
        isBot: true,
        timestamp: new Date()
      }
    ]);
  };

  const handleCopyMessage = (text) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Layout
      title={`Chatbot | ${siteConfig.title}`}
      description="Premium Physical AI & Humanoid Robotics Assistant">
      <Head>
        <meta name="keywords" content="ROS 2, Humanoid Robotics, AI Agents, Physical AI, Robotics Education, Premium UI" />
      </Head>
      <Navbar />
      <main style={{ paddingTop: '80px' }}>
        <div className={clsx(styles.container)}>
          {/* Hero Section (Left 40%) */}
          <div className={styles.heroSection}>
            <div className={styles.heroContent}>
              <h1 className={styles.heroTitle}>
                <span className={styles.gradientText}>Physical AI & Humanoid Robotics</span>
              </h1>
              <div className={styles.robotIcon}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M21 9.5V12c0 1.657-1.343 3-3 3h-.5c-.276 0-.5.224-.5.5s.224.5.5.5H18c2.757 0 5-2.243 5-5V9.5c0-.828-.672-1.5-1.5-1.5H20c-.276 0-.5.224-.5.5s.224.5.5.5h1.5zM3 9.5V12c0 2.757 2.243 5 5 5h.5c.276 0 .5-.224.5-.5s-.224-.5-.5-.5H8c-1.657 0-3-1.343-3-3V9.5c0-.828-.672-1.5-1.5-1.5H2c-.276 0-.5.224-.5.5s.224.5.5.5h1.5zM12 4c2.76 0 5 2.24 5 5v1c0 .553-.447 1-1 1H8c-.553 0-1-.447-1-1V9c0-2.76 2.24-5 5-5zm-1 7v1h2v-1H11zm8.5 2.5c.828 0 1.5.672 1.5 1.5v.5c0 .276.224.5.5.5s.5-.224.5-.5v-.5c0-1.657-1.343-3-3-3h-1.5c-.276 0-.5.224-.5.5s.224.5.5.5H20.5zM2 11.5v-.5c0-1.657 1.343-3 3-3h1.5c.276 0 .5.224.5.5s.224.5-.5.5H5c-.553 0-1 .447-1 1v1c0 .276-.224.5-.5.5s-.5-.224-.5-.5z" />
                </svg>
              </div>
              <div className={styles.tagsContainer}>
                <span className={styles.tag}>ROS 2</span>
                <span className={styles.tag}>Humanoid Robotics</span>
                <span className={styles.tag}>AI Agents</span>
                <span className={styles.tag}>Physical AI</span>
              </div>
              <button className={styles.ctaButton}>
                Get Started
              </button>
            </div>
          </div>

          {/* Chatbot Panel (Right 60%) */}
          <div className={styles.chatbotPanel}>
            <div className={styles.chatHeader}>
              <h3>Robotics Assistant</h3>
              <div className={clsx(styles.statusIndicator, styles[connectionStatus])}>
                <span className={styles.statusDot}></span>
                <span>
                  {connectionStatus === 'online' ? 'Online' :
                   connectionStatus === 'checking' ? 'Checking...' : 'Offline'}
                </span>
              </div>
            </div>

            <div className={styles.messagesContainer}>
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={clsx(
                    styles.message,
                    message.isBot ? styles.botMessage : styles.userMessage,
                    styles.messageAnimation
                  )}
                >
                  {message.isBot && (
                    <div className={styles.botAvatar}>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20px" height="20px">
                        <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V7C1.9 7 1 7.9 1 9V11C1 11.77 1.25 12.48 1.67 13.06L5.05 17.75C5.5 18.38 6.22 18.8 7 18.8H17C17.78 18.8 18.5 18.38 18.95 17.75L22.33 13.06C22.75 12.48 23 11.77 23 11V9C23 7.9 22.1 7 21 7V9ZM12 18.5C10.62 18.5 9.5 17.38 9.5 16S10.62 13.5 12 13.5 14.5 14.62 14.5 16 13.38 18.5 12 18.5Z" />
                      </svg>
                    </div>
                  )}
                  <div className={styles.messageContent}>
                    {message.text}
                    <div className={styles.messageActions}>
                      <button
                        className={styles.copyButton}
                        onClick={() => handleCopyMessage(message.text)}
                        title="Copy message"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="14px" height="14px">
                          <path d="M19 21H8V7h11v14zm-10-2h9V8H9v11zm-4-2h2V5h7V3H5v14z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className={styles.timestamp}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className={clsx(styles.message, styles.botMessage, styles.typingMessage)}>
                  <div className={styles.botAvatar}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20px" height="20px">
                      <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.89 1 3 1.89 3 3V7C1.9 7 1 7.9 1 9V11C1 11.77 1.25 12.48 1.67 13.06L5.05 17.75C5.5 18.38 6.22 18.8 7 18.8H17C17.78 18.8 18.5 18.38 18.95 17.75L22.33 13.06C22.75 12.48 23 11.77 23 11V9C23 7.9 22.1 7 21 7V9ZM12 18.5C10.62 18.5 9.5 17.38 9.5 16S10.62 13.5 12 13.5 14.5 14.62 14.5 16 13.38 18.5 12 18.5Z" />
                    </svg>
                  </div>
                  <div className={styles.typingIndicator}>
                    <span className={styles.typingText}>AI is typing...</span>
                    <div className={styles.typingDots}>
                      <div className={clsx(styles.typingDot, styles.dot1)}></div>
                      <div className={clsx(styles.typingDot, styles.dot2)}></div>
                      <div className={clsx(styles.typingDot, styles.dot3)}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSendMessage} className={styles.inputForm}>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about ROS 2, humanoid robotics, AI agents..."
                className={styles.messageInput}
                disabled={isLoading}
              />
              <button
                type="submit"
                className={styles.sendButton}
                disabled={isLoading || !inputValue.trim()}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20px" height="20px">
                  <path d="M3.478 2.405a.75.75 0 0 0-.926.94l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.405Z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </main>
    </Layout>
  );
}

export default ChatbotPage;