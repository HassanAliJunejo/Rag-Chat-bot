import React, { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import styles from '../css/chatbot-panel-glassmorphic.module.css';

function ChatbotPanel({ isOpen, onClose }) {
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
    if (isOpen) {
      checkConnectionStatus();
    }
  }, [isOpen]);

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

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={clsx(styles.chatbotPanel, "container")}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.chatHeader}>
          <div className={styles.headerInfo}>
            <h3>Robotics Assistant</h3>
            <div className={clsx(styles.connectionStatus, styles[connectionStatus])}>
              <span className={styles.statusIndicator}></span>
              <span className={styles.statusText}>
                {connectionStatus === 'online' ? 'Online' :
                 connectionStatus === 'checking' ? 'Checking...' : 'Offline'}
              </span>
            </div>
          </div>
          <div className={styles.headerActions}>
            <button className={styles.clearButton} onClick={handleClearChat} title="Clear chat">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20px" height="20px">
                <path d="M9 3v1H4v2h1v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1V4h-5V3H9zm3 12a1 1 0 0 1-1-1v-4a1 1 0 1 1 2 0v4a1 1 0 0 1-1 1zm-1 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z" />
              </svg>
            </button>
            <button className={styles.closeButton} onClick={onClose}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="20px" height="20px">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
              </svg>
            </button>
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
  );
}

export default ChatbotPanel;