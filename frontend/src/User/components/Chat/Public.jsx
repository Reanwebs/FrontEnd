import React, { useState } from 'react';

const Public = () => {
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = () => {
    if (message.trim() === '') {
      return; 
    }

   
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { text: message },
    ]);

    setMessage('');
  };

  return (
    <div className="public-chat-container">
      <div className="public-message-history">
        {chatHistory.map((message, index) => (
          <div key={index} className="message">
            {message.text}
          </div>
        ))}
      </div>
      <div className="public-message-input">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Public;
