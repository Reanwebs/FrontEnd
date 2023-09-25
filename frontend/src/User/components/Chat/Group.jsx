import React, { useState , useEffect} from 'react';
import { useSelector } from 'react-redux';
import "./Chat.css"
import { useGetGroupMutation, useCreateGroupChatMutation,useGetGroupChatMutation,} from '../../slices/api_slices/chatApiSlice';
const Group = () => {
  const userInfo = useSelector(state => state.auth.userInfo)
  const userName = userInfo.userName;
  const [groups, setGroups] = useState([])
  const [selectedGroup, setSelectedGroup] = useState(null); 
  const [message, setMessage] = useState(''); 
  const [chatHistory, setChatHistory] = useState([]); 
  const [socket, setSocket] = useState(null); 
  const [getGroup] = useGetGroupMutation();
  const [createGroupChat] = useCreateGroupChatMutation();
  const [getGroupChat] = useGetGroupChatMutation();
  
  useEffect(()=>{
    getGroupHandler()
  },[])

  const getGroupReq={
    UserID :userName,
  }
  const getGroupHandler = async ()=>{
    try{
     const groupRes = await getGroup(getGroupReq)
     console.log(groupRes)
     setGroups(groupRes.data)
    }catch(error){
      console.log(error)
    }
  }

  const createChatReq={
    UserID  :userName,
    GroupID :selectedGroup
  }
  
  const createGroupChatHandler = async ()=>{
    try{
      const res = await createGroupChat(createChatReq)
      console.log(res)
    }catch(error){
      console.log(error)
    }
  } 

  const getGroupChatHandler = async()=>{
    try{
     const res = await getGroupChat(createChatReq)
      console.log(res)
    }catch(error){
      console.log(error)
    }
  }

  const handleGroupClick = (Group) => {
    createGroupChatHandler()
    getGroupChatHandler()
    setSelectedGroup(Group.GroupID);
    connectWebSocket(Group.GroupID);
  };

  const handleSendMessage = () => {
    if (message.trim() === '') {
      return; 
    }
    setChatHistory((prevHistory) => [
      ...prevHistory,
      { Group: selectedGroup, text: message },
    ]);
    const messageObject = {
      text: message,
      sender: userName, 
      recipient: selectedGroup, 
    };
    socket.send(JSON.stringify(messageObject));
    setMessage('');
  };

  const connectWebSocket = (groupName) => {
    const ws = new WebSocket(`ws://localhost:5053/ws/group?groupName=${groupName}&userName=${userName}`);
    ws.onopen = () => {
      setSocket(ws); 
      console.log(`WebSocket connection established for group: ${groupName}`);
    };
    ws.onclose = () => {
      console.log(`WebSocket connection closed for group: ${groupName}`);
    };
    ws.onerror = (error) => {
      console.error(`WebSocket error for group: ${groupName}`, error);
    };
    ws.onmessage = (event) => {
      console.log(`Received message for group: ${groupName}`, event.data);
    };
  };

  return (
    <div className="chat-container">
      <div className="users-list">
        <ul>
          {groups !== null && groups.map((Group, index) => (
            <li
              key={index}
              onClick={() => handleGroupClick(Group)}
              className={selectedGroup && selectedGroup.id === Group.GroupID ? 'active' : ''}
            >
              {Group.GroupID}
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
