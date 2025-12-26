import React, { useState } from 'react';
import Hero from './components/Hero';
import ChatbotPanel from './components/ChatbotPanel';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="App">
      <Hero onChatToggle={() => setIsChatOpen(!isChatOpen)} />
      <ChatbotPanel isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}

export default App;