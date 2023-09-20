import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import "./Chat.css"
import { useGetChatMutation,useCreateChatMutation,useGetChatHistoryMutation} from '../../slices/api_slices/chatApiSlice';
const Personal = () => {
  const userInfo = useSelector(state => state.auth.userInfo)
  const socket = new WebSocket('ws://localhost:5053/ws');
  const [selectedUser, setSelectedUser] = useState(null); 
  const [message, setMessage] = useState(''); 
  const [chatHistory, setChatHistory] = useState([]); 
  const [getChat] = useGetChatMutation()
  const [createChat] = useCreateChatMutation()
  const [getChatHistory] = useGetChatHistoryMutation()
  const [users, setUser] = useState([])

  useEffect(()=>{
    getChatHandler()
  },[])

  useEffect(()=>{
    socket.addEventListener('message', handleReceivedMessage);
  },[chatHistory])

  const getReq ={
    UserID :userInfo.userName,
  }

  const getChatHandler = async ()=>{
     try {
      const chatRes = await getChat(getReq)
      console.log(chatRes);
      setUser(chatRes.data)
     } catch (error) {
      console.log(error);
     }
  }

  const createChatHandler = async (chatreq) => { 
    try {
      const res = await createChat(chatreq); 
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const getChatHistoryHandler = async (chatreq)=>{
    try{
      const res = await getChatHistory(chatreq)
      console.log(res);
    }catch (error){
      console.log(error)
    }
  }
   

  const handleUserClick = (user) => {
    const chatreq={
      UserID:"",
      ReciepentID: user.RecipientID
    }
    console.log(user,"userrrr",chatreq)
    createChatHandler(chatreq)
    getChatHistoryHandler(chatreq)
    setSelectedUser(user.RecipientID);
    
  };

  const handleReceivedMessage = (event) => {
    if (event.data.startsWith('{')) {
      const receivedMessage = JSON.parse(event.data);
      console.log(receivedMessage);
      setChatHistory((prevHistory) => [
        ...prevHistory,
        {
          user: receivedMessage.sender,
          text: receivedMessage.text,
        },
      ]);
    } else {
      console.log("Received plain text message:", event.data);
    }
  };

  const handleSendMessage = () => {
    if (message.trim() === '') {
      return; 
    }
    
    const messageObject = {
      text: message,
      sender: userInfo.userName, 
      recipient: selectedUser, 
    };

    socket.send(JSON.stringify(messageObject));
    
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { user: selectedUser, text: message},
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
            <h2>Chat with {selectedUser}</h2>
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
