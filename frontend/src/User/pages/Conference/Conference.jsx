import "./Conference.css"
import { useNavigate } from "react-router-dom";
import Join from "../../components/Conference/Join";
import Private from "../../components/Conference/Private"
import Group from "../../components/Conference/Group"
import Public from "../../components/Conference/Public"
import Broadcast from "../../components/Conference/Broadcast";
import React, { useState } from 'react';

const Conference =()=>{
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('join'); 
  
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };
        return (
            <>
              <div className="type-container flex justify-center">

              <div
                  className={`flex-item ${activeTab === 'join' ? 'active' : ''} ml-4` }
                  onClick={() => {
                    handleTabClick('join');
                  }}
                >
                  <p>Join A Conference</p>
                </div>

                <div
                  className={`flex-item ${activeTab === 'private' ? 'active' : ''} ml-4`}
                  onClick={() => {
                    handleTabClick('private');
                  }}
                >
                  <p>Start Private Conference</p>
                </div>
                {/* <div
                  className={`flex-item ${activeTab === 'group' ? 'active' : ''}`}
                  onClick={() => {
                    handleTabClick('group');
                  }}
                >
                  <p>Start Group Conference</p>
                </div>
                <div
                  className={`flex-item ${activeTab === 'public' ? 'active' : ''}`}
                  onClick={() => {
                    handleTabClick('public');
                  }}
                >
                  <p>Start Public Conference</p>
                </div> */}

                
              </div>
              <div className={`conference-body ${activeTab === 'join' ? 'active' : ''}`}>
                {activeTab === 'join' && <Join/>}
              </div>
        
              <div className={`conference-body ${activeTab === 'private' ? 'active' : ''}`}>
                {activeTab === 'private' && <Private/>}
              </div>
        
              {/* <div className={`conference-body ${activeTab === 'group' ? 'active' : ''}`}>
                {activeTab === 'group' &&   <Group/>}
              </div>
        
              <div className={`conference-body ${activeTab === 'public' ? 'active' : ''}`}>
                {activeTab === 'public' && <Public/>}
              </div>

              <div className={`conference-body ${activeTab === 'broadcast' ? 'active' : ''}`}>
                {activeTab === 'broadcast' && <Broadcast/>}
              </div> */}
            </>
        );
   
}

export default Conference;