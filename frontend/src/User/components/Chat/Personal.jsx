import React, { useState,useEffect } from 'react';
import "./Chat.css"
import { useCreateChatMutation } from '../../slices/api_slices/chatApiSlice';
const Personal = () => {
  const [selectedUser, setSelectedUser] = useState(null); 
  const [message, setMessage] = useState(''); 
  const [chatHistory, setChatHistory] = useState([]); 

  const users = [
    { id: 1, name: 'User 1' },
    { id: 2, name: 'User 2' },
    { id: 3, name: 'User 3' },
  ];

  const [createChat] = useCreateChatMutation()

  useEffect(()=>{
    createChatHandler()
  },[])

  const createChatHandler = async ()=>{
     try {
      const res = await createChat()
      console.log(res);
     } catch (error) {
      console.log(error);
     }
  }
   

  const handleUserClick = (user) => {
    setSelectedUser(user);
    
  };


  const handleSendMessage = () => {
    if (message.trim() === '') {
      return; 
    }


    setChatHistory((prevHistory) => [
      ...prevHistory,
      { user: selectedUser, text: message },
    ]);

  
    setMessage('');
  };

  return (
    <div className="chat-container">
      <div className="users-list">
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => handleUserClick(user)}
              className={selectedUser && selectedUser.id === user.id ? 'active' : ''}
            >
              {user.name}
            </li>
          ))}
        </ul>
      </div>

    
      <div className="chat-box">
        {selectedUser ? (
          <div>
            <h2>Chat with {selectedUser.name}</h2>
            <div className="message-history">
              {chatHistory.map((message, index) => (
                <div key={index} className="message">
                  <strong>{message.user.name}:</strong> {message.text}
                </div>
              ))}
            </div>
            <div className="message-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <button onClick={handleSendMessage}>Send</button>
            </div>
            
          </div>
        ) : (
          <div className="no-user-selected">
            <p>Select a user to start a chat.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Personal;
