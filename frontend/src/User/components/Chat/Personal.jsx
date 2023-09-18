import React, { useState,useEffect } from 'react';
import "./Chat.css"
import { useGetChatMutation,useCreateChatMutation } from '../../slices/api_slices/chatApiSlice';
const Personal = () => {
  const socket = new WebSocket('ws://localhost:5053/ws');
  const [selectedUser, setSelectedUser] = useState(null); 
  const [message, setMessage] = useState(''); 
  const [chatHistory, setChatHistory] = useState([]); 
  const [getChat] = useGetChatMutation()
  const [createChat] = useCreateChatMutation()
  const [users, setUser] = useState([])

  useEffect(()=>{
    getChatHandler()
  },[])

  const getReq ={
    UserID :"sender",
  }

  const getChatHandler = async ()=>{
     try {
      const chatRes = await getChat(getReq)
      console.log(chatRes,"pppppppppppp");
      setUser(chatRes.data)
     } catch (error) {
      console.log(error);
     }
  }

  const createChatHandler = async ()=>{
    try{
      const res = await createChat(chatreq)
      console.log(res);
    } catch (error){
      console.log(error);
    }
  }

  const chatreq ={
    UserID : "sender",
    RecipientID : "recipient"
  }
  
   

  const handleUserClick = (user) => {

    createChatHandler(chatreq)
    setSelectedUser(user);
    
  };

  const handleSendMessage = () => {
    if (message.trim() === '') {
      return; 
    }
    
    const messageObject = {
      text: message,
      sender: 'sender', 
      recipient: 'recipient', 
    };

    socket.send(JSON.stringify(messageObject));

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
          {users.map((user,index) => (
            <li
              key={index}
              onClick={() => handleUserClick(user)}
              className={selectedUser && selectedUser.id === user.id ? 'active' : ''}
            >
              {user.RecipientID}
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
