import "./Group.css"
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import Groups from "../../components/Group/Groups";
import Create from "../../components/Group/Create";
import Trending from "../../components/Group/Trending";

const Group =()=>{
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('communities'); 
  
    const handleTabClick = (tab) => {
      setActiveTab(tab);
    };

    return (
        <>
        <div className="h-screen">
         <div className="type-container justify-center ">
          <div className={`flex-item ${activeTab === 'communities' ? 'active' : ''} mx-12`}
                  onClick={() => {
                    handleTabClick('communities');
                  }}>
              <p>Communities</p>
          </div >

          <div className={`flex-item ${activeTab === 'create' ? 'active' : ''} mx-12`}
                  onClick={() => {
                    handleTabClick('create');
                  }}>
              <p>Create</p>
          </div>
            
         </div>
         <div className={`conference-body ${activeTab === 'communities' ? 'active' : ''}`}>
                {activeTab === 'communities' && <Groups/>}
              </div>
        
              <div className={`conference-body ${activeTab === 'create' ? 'active' : ''}`}>
                {activeTab === 'create' && <Create/>}
              </div>
        </div>
         
        </> 
    );
   
}

export default Group;