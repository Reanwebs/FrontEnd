import React, { useState, useEffect, } from 'react';
import { useSelector } from 'react-redux';
import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSmile } from '@fortawesome/free-solid-svg-icons';
const Public = () => {
  const userInfo = useSelector(state => state.auth.userInfo)
  const userName = userInfo.userName;
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const socket = new WebSocket(`ws://localhost:5053/ws/public`);

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

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const insertEmoji = (emoji) => {
    console.log(emoji,"emoji")
    setMessage(message + emoji.native);
  };

  return (
    <div className="public-chat-container">
      <div className='public-chat-head'>
        <div className="emoji-picker-container-public">
          {showEmojiPicker && <Picker data={data} onEmojiSelect={insertEmoji} />}
        </div>
        <p>Let's Chat to the world</p>
      </div>
      <div className="public-chat-box" onClick={() =>setShowEmojiPicker(false)}>
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
        <button className="add-icon-button"onClick={() =>setShowEmojiPicker(!showEmojiPicker)}><FontAwesomeIcon icon={faSmile} /></button>
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onClick={() =>setShowEmojiPicker(false)}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Public;
