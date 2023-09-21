import React, { useState,useEffect,useRef } from 'react';
import { useSelector } from 'react-redux';
import "./Chat.css"
import { useGetChatMutation,useCreateChatMutation,useGetChatHistoryMutation} from '../../slices/api_slices/chatApiSlice';
import { color } from 'framer-motion';
const Personal = () => {
  const userInfo = useSelector(state => state.auth.userInfo)
  const userName = userInfo.userName;
  const socket = new WebSocket(`ws://localhost:5053/ws?userName=${userName}`);
  const [selectedUser, setSelectedUser] = useState(null); 
  const [message, setMessage] = useState(''); 
  const [chatHistory, setChatHistory] = useState([]); 
  const [getChat] = useGetChatMutation()
  const [createChat] = useCreateChatMutation()
  const [getChatHistory] = useGetChatHistoryMutation()
  const [users, setUser] = useState([])
  const messageHistoryRef = useRef(null);


  useEffect(()=>{
    getChatHandler()
  },[])

  useEffect(()=>{
    socket.addEventListener('message', handleReceivedMessage);
  },[chatHistory])

  const getReq ={
    UserID :userInfo.userName,
  }
  const scrollToBottom = () => {
    if (messageHistoryRef.current) {
      messageHistoryRef.current.scrollTop = messageHistoryRef.current.scrollHeight;
    }
  };
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
      console.log(chatreq,"chat history req")
      const res = await getChatHistory(chatreq)
      const mappedMessages = res.data.messages.map((message) => ({
        user: message.UserID,
        text: message.Text,
      }));
      setChatHistory([]);
      setChatHistory((prevHistory) => [...prevHistory, ...mappedMessages]);
      scrollToBottom();
      console.log(res,"history");
    }catch (error){
      console.log(error)
    }
  }
  

  const handleUserClick = (user) => {
    const chatreq={
      UserID:userInfo.userName,
      RecipientID: user.RecipientID
    }
    setChatHistory([]);
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
      scrollToBottom();
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
      { user: userInfo.userName, text: message},
    ]);

    scrollToBottom();
    setMessage('');
  };

  const [isUserListOpen, setIsUserListOpen] = useState(false);
  const toggleUserList = () => {
    setIsUserListOpen(!isUserListOpen);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="chat-container">
      <div className="users-list">
          <div className='users-list-head'>
          <button className="toggle-button" onClick={toggleUserList}>User List</button>
          </div>
   
          <ul className={isUserListOpen ? 'open' : ''}>
            {users.map((user, index) => (
              <li
                key={index}
                onClick={() => handleUserClick(user)}
                className={selectedUser === user.RecipientID ? 'active' : ''}
              >
                <div className="userlist-container">
                  <div className="user-avatar">
                    <img src={userInfo?.avatarId && `https://res.cloudinary.com/dcv6mx1nk/image/upload/v1693938021/${userInfo.avatarId}`} alt={`avatar`} />
                  </div>
                  <div className="user-info">
                    <span className="user-name">{user.RecipientID}</span>
                    <span className="last-seen">{user.lastSeen}</span>
                    {user.unseenMessages > 0 && (
                      <span className="unseen-messages">{user.unseenMessages} New</span>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>


    
      <div className="chat-box">
        {selectedUser ? (
        
          <div className='selected-chat-box'>
            
            <div className='chat-box-head'>
            <div className="user-avatar">
                    <img src={userInfo?.avatarId && `https://res.cloudinary.com/dcv6mx1nk/image/upload/v1693938021/${userInfo.avatarId}`} alt={`avatar`} />
            </div>
            <div>
            {selectedUser}
            <h6 style={{ color: 'grey' }}>click here for user info</h6>
            </div>
              
            </div>

            <div className="message-history" ref={messageHistoryRef}>
            {chatHistory.map((message, index) => (
              
              <div
                key={index}
                className={`message-bubble ${message.user === userInfo.userName ? 'sent-bubble' : 'received-bubble'}`}
              >
                {message.text}
              </div>
              
            ))}
            </div>
            <div className="message-input">
              <button className="attach-file-button"onClick={handleSendMessage}>+</button>
              <input className='message-input-field'
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <button className="message-send-button"onClick={handleSendMessage}>Send</button>
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
