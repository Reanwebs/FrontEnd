import React, { useState , useEffect} from 'react';
import { useSelector } from 'react-redux';
import "./Chat.css"
import { useGetGroupMutation, useCreateGroupChatMutation,useGetGroupChatMutation,} from '../../slices/api_slices/chatApiSlice';
const Group = () => {
  const userInfo = useSelector(state => state.auth.userInfo)
  const userName = userInfo.userName;
  const socket = new WebSocket(`ws://localhost:5053/ws/group?userName=${userName}`);
  const [groups, setGroups] = useState([])
  const [selectedGroup, setSelectedGroup] = useState(null); 
  const [message, setMessage] = useState(''); 
  const [chatHistory, setChatHistory] = useState([]); 
  const [getGroup] = useGetGroupMutation();
  const [createGroupChat] = useCreateGroupChatMutation();
  const [getGroupChat] = useGetGroupChatMutation();
  
  useEffect(()=>{
    getGroupHandler()
  },[])


  const getGroupReq={
    UserID :userInfo.userName,
  }
  const getGroupHandler = async ()=>{
    try{
     const groupRes = await getGroup(getGroupReq)
     setGroups(groupRes.data)
    }catch(error){
      console.log(error)
    }
  }
  
  const createGroupChatHandler = async (createChatReq)=>{
    try{
      const res = await createGroupChat(createChatReq)
      console.log(res)
    }catch(error){
      console.log(error)
    }
  } 
  
  const getGroupChatHandler = async(getChatReq)=>{
    try{
     const res = await getGroupChat(getChatReq)
      console.log(res)
    }catch(error){
      console.log(error)
    }
  }

  const handleGroupClick = (Group) => {
    createGroupChatHandler()
    getGroupChatHandler()
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
          {groups !== null && groups.map((Group) => (
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
