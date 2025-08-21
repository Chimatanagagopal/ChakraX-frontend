import React, { useState } from 'react';
import axios from 'axios';
import '../style.css'; // Make sure this includes chatbot styles

const RideAssistantChatbot = () => {
  const [messages, setMessages] = useState([
    { text: "Hi! How can I help you with your ride today?", sender: "bot" }
  ]);
  const [userInput, setUserInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const sendMessage = async () => {
    if (!userInput.trim()) return;

    const newMessages = [...messages, { text: userInput, sender: "user" }];
    setMessages(newMessages);
    setUserInput('');
    setLoading(true);

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo',
          messages: [
            { role: 'system', content: 'You are a helpful ride-booking assistant for the ChakraX app.' },
            ...newMessages.map(m => ({
              role: m.sender === 'user' ? 'user' : 'assistant',
              content: m.text
            }))
          ]
        },
        {
          headers: {
            Authorization: `Bearer YOUR_OPENAI_API_KEY`,
            'Content-Type': 'application/json',
          }
        }
      );

      const reply = response.data.choices[0].message.content;
      setMessages([...newMessages, { text: reply, sender: "bot" }]);
    } catch (err) {
      setMessages([...newMessages, { text: "Sorry, there was an error. Try again.", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="chatbot-container">
      <div className="chat-header">
        <span>Ride Assistant</span>
        <button className="close-btn" onClick={() => setIsOpen(false)}>✖</button>
      </div>
      <div className="chat-window">
        {messages.map((msg, i) => (
          <div key={i} className={`chat-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {loading && <div className="chat-message bot">Typing...</div>}
      </div>
      <div className="chat-input-area">
        <input
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Ask something..."
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default RideAssistantChatbot;
