import React, { useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import GasPricePanel from './components/GasPricePanel';
import MessageSubmission from './pages/MessageSubmission';
import AdminPanel from './pages/AdminPanel';
import './App.css';

interface Message {
  text: string;
  timestamp: number;
}

// Par ceci :
// const API_URL = process.env.NODE_ENV === 'development' 
//   ? 'http://localhost:8000'  // En développement local
//   : window.location.hostname === '176.132.102.216'
//     ? 'http://176.132.102.216:8000'  // Accès réseau local
//     : `http://${window.location.hostname}:8000`;  // Accès externe (IP publique)

const API_URL = `http://${window.location.hostname}:8000`;


const App: React.FC = () => {
  const [messages, setMessages] = React.useState<Message[]>([]);
  const [usedCodes, setUsedCodes] = React.useState<Set<string>>(() => {
    // Load used codes from localStorage on initial render
    const savedCodes = localStorage.getItem('usedCodes');
    return new Set(savedCodes ? JSON.parse(savedCodes) : []);
  });

  // Fetch messages on component mount
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(`${API_URL}/messages`, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setMessages(data.messages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();
    // Set up polling every 5 seconds
    const interval = setInterval(fetchMessages, 5000);
    return () => clearInterval(interval);
  }, []);

  const generateUniqueCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 8; i++) {
      code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
  };

  const handleGenerateCode = async () => {
    const newCode = generateUniqueCode();
    try {
      const response = await fetch(`${API_URL}/add-code`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: newCode }),
      });

      if (!response.ok) {
        throw new Error('Failed to add code to backend');
      }

      const updatedCodes = new Set([...Array.from(usedCodes), newCode]);
      setUsedCodes(updatedCodes);
      localStorage.setItem('usedCodes', JSON.stringify(Array.from(updatedCodes)));
      return newCode;
    } catch (error) {
      console.error('Error adding code to backend:', error);
      return null;
    }
  };

  const handleMessageSubmit = async (message: { text: string }) => {
    try {
      const newMessage: Message = {
        text: message.text,
        timestamp: Date.now()
      };
      
      const response = await fetch(`${API_URL}/messages`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMessage),
      });

      if (!response.ok) {
        throw new Error('Failed to submit message');
      }

      const savedMessage = await response.json();
      setMessages(prev => {
        const updated = [...prev, savedMessage];
        return updated.slice(-5);
      });
    } catch (error) {
      console.error('Error submitting message:', error);
    }
  };

  const validateCode = useCallback(async (code: string) => {
    try {
      const response = await fetch(`${API_URL}/validate-code`, {
        method: 'POST',
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code }),
      });

      const data = await response.json();
      
      if (data.is_valid) {
        const updatedCodes = new Set([...Array.from(usedCodes), code]);
        setUsedCodes(updatedCodes);
        localStorage.setItem('usedCodes', JSON.stringify(Array.from(updatedCodes)));
      }
      
      return data.is_valid;
    } catch (error) {
      console.error('Error validating code:', error);
      return false;
    }
  }, [usedCodes]);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<GasPricePanel messages={messages} />} />
          <Route path="/admin" element={<AdminPanel onGenerateCode={handleGenerateCode} />} />
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
