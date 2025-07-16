import React, { useState } from "react";
import { sendMessage } from "../api";

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = async () => {
    if (!input) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const response = await sendMessage(input);
    const botMsg = { sender: "bot", text: response };
    setMessages((prev) => [...prev, botMsg]);
    setInput("");
  };

  return (
    <div>
      <h2>Chatbot</h2>
      <div style={{ border: "1px solid gray", height: "300px", overflowY: "scroll" }}>
        {messages.map((msg, idx) => (
          <div key={idx}><strong>{msg.sender}:</strong> {msg.text}</div>
        ))}
      </div>
      <input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type a message" />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default Chatbot;
