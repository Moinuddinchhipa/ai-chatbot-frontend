import React, { useState, useEffect } from 'react';
import './ChatApp.css'; // Importing the CSS file for styling

function App() {
  const [message, setMessage] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [user, setUser] = useState('User'); // Default name 'User'

  // 🔁 Load history on page load
  useEffect(() => {
    const savedUser = localStorage.getItem('chatUser');
    if (savedUser) {
      setUser(savedUser);
    } else {
      setUser('User');
      localStorage.setItem('chatUser', 'User');
    }

    // Fetch chat history
    fetch('http://localhost:8000/history')
      .then(res => res.json())
      .then(data => setChatLog(data))
      .catch(err => console.error('Failed to fetch chat history:', err));
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newChat = { sender: 'user', text: message };
    setChatLog([...chatLog, newChat]);
    setMessage('');

    try {
      const res = await fetch('http://localhost:8000/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, user }),
      });

      const data = await res.json();
      const botReply = { sender: 'bot', text: data.reply };
      setChatLog((prev) => [...prev, botReply]);
    } catch (error) {
      console.error('Error talking to chatbot:', error);
    }
  };

  return (
    <div className="chat-container">
      <h2>Welcome to the AI Chatbot</h2>
      <div className="chat-box">
        {chatLog.map((msg, i) => (
          <div
            key={i}
            className={`chat-message ${msg.sender}`}
          >
            <div className="chat-sender"><strong>{msg.sender === 'user' ? user : 'Bot'}</strong></div>
            <div className="chat-text">{msg.text}</div>
          </div>
        ))}
      </div>

      <div className="chat-input-area">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="chat-input"
          onKeyPress={(e) => { if (e.key === 'Enter') sendMessage(); }}
          placeholder="Type your message..."
        />
        <div className="button-group">
          <button className="send-button" onClick={sendMessage}>
            Send
          </button>
          <button
            className="clear-button"
            onClick={async () => {
              await fetch('http://localhost:8000/clear', { method: 'DELETE' });
              setChatLog([]);
            }}
          >
            Clear Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
