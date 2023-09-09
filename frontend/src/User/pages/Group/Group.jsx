import "./Group.css"
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Groups from "../../components/Group/Groups";
import Create from "../../components/Group/Create";
import Trending from "../../components/Group/Trending";

const Group =()=>{
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('groups'); 
  
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };

    return (
        <>
          <div className="group-container">
          <img className="group-image"  src="group1.png" alt="group" />
          {/* <div
              className={`flex-item ${activeTab === 'groups' ? 'active' : ''}`}
              onClick={() => {
                handleTabClick('groups');
              }}
            >
              <p>Joined Groups</p>
            </div>

            <div
              className={`flex-item ${activeTab === 'create' ? 'active' : ''}`}
              onClick={() => {
                handleTabClick('create');
              }}
            >
              <p>Create A Group</p>
            </div>
            <div
              className={`flex-item ${activeTab === 'trending' ? 'active' : ''}`}
              onClick={() => {
                handleTabClick('trending');
              }}
            >
              <p>Top 10</p>
            </div>

            
          </div>
          <div className={`group-body ${activeTab === 'groups' ? 'active' : ''}`}>
            {activeTab === 'groups' && <Groups/>}
          </div>
    
          <div className={`group-body ${activeTab === 'create' ? 'active' : ''}`}>
            {activeTab === 'create' && <Create/>}
          </div>

          <div className={`group-body ${activeTab === 'trending' ? 'active' : ''}`}>
            {activeTab === 'trending' && <Trending/>}
          </div> */}
        </div>
        </>
    );
   
}

export default Group;