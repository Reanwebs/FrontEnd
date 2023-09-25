import React, { useState, useEffect, } from 'react';
import { useSelector } from 'react-redux';
const Public = () => {
  const userInfo = useSelector(state => state.auth.userInfo)
  const userName = userInfo.userName;
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const socket = new WebSocket(`ws://localhost:5053/ws/public?userName=${userName}`);

  useEffect(() => {
    socket.onmessage = (event) => {
      const receivedMessage = event.data;
      setChatHistory((prevHistory) => [
        ...prevHistory,
        { text: receivedMessage },
      ]);
    };
  }, [socket]);

  const handleSendMessage = () => {
    if (message.trim() === '') {
      return;
    }
    socket.send(message);
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { user:userInfo.userName, text: message },
    ]);
    setMessage('');
  };

  return (
    <div className="public-chat-container">
      <div className='public-chat-head'>
        <p>Let's Chat to the world</p>
      </div>
      <div className="public-chat-box">
        {chatHistory.map((message, index) => (
          <div
          key={index}
          className={`message-bubble ${message.user === userInfo.userName ? 'sent-bubble' : 'received-bubble'}`}
        >
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
