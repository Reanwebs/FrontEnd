import React, { useState } from 'react';
// import "./Chat.css"

const Group = () => {
  const [selectedGroup, setSelectedGroup] = useState(null); 
  const [message, setMessage] = useState(''); 
  const [chatHistory, setChatHistory] = useState([]); 

  const Groups = [
    { id: 1, name: 'Group 1' },
    { id: 2, name: 'Group 2' },
    { id: 3, name: 'Group 3' },
  ];

  const handleGroupClick = (Group) => {
    setSelectedGroup(Group);
    
  };


  const handleSendMessage = () => {
    if (message.trim() === '') {
      return; 
    }


    setChatHistory((prevHistory) => [
      ...prevHistory,
      { Group: selectedGroup, text: message },
    ]);

  
    setMessage('');
  };

  return (
    <div className="chat-container">
      <div className="users-list">
        <ul>
          {Groups.map((Group) => (
            <li
              key={Group.id}
              onClick={() => handleGroupClick(Group)}
              className={selectedGroup && selectedGroup.id === Group.id ? 'active' : ''}
            >
              {Group.name}
            </li>
          ))}
        </ul>
      </div>

    
      <div className="chat-box">
        {selectedGroup ? (
          <div>
            <h2>Chat with {selectedGroup.name}</h2>
            <div className="message-history">
              {chatHistory.map((message, index) => (
                <div key={index} className="message">
                  <strong>{message.Group.name}:</strong> {message.text}
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
          <div className="no-Group-selected">
            <p>Select a Group to start a chat.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Group;
