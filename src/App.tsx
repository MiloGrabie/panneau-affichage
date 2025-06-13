import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GasPricePanel from './components/GasPricePanel';
import MessageSubmission from './pages/MessageSubmission';
import AdminPanel from './pages/AdminPanel';
import './App.css';

interface Message {
  author: string;
  text: string;
  timestamp: number;
}

const App: React.FC = () => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [usedCodes] = React.useState<Set<string>>(new Set());

  const handleMessageSubmit = async (message: { author: string; text: string }) => {
    // TODO: Implement API call to save message
    const newMessage: Message = {
      ...message,
      timestamp: Date.now()
    };
    
    setMessages(prev => {
      const updated = [...prev, newMessage];
      // Keep only the last 5 messages
      return updated.slice(-5);
    });
  };

  const validateCode = (code: string) => {
    if (usedCodes.has(code)) {
      return false;
    }
    usedCodes.add(code);
    return true;
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<GasPricePanel messages={messages} />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route 
            path="/submit/:code" 
            element={
              <MessageSubmission 
                onSubmit={handleMessageSubmit}
                validateCode={validateCode}
              />
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
