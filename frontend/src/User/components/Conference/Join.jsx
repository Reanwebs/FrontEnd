import React, { useState } from 'react';
import "./Conference.css";
import { useSelector} from 'react-redux';
import { useNavigate } from "react-router-dom";

import { useJoinPrivateConferenceMutation } from '../../slices/api_slices/usersConferenceApi';


const Join = () => {
  const [conferenceId, setConferenceId] = useState('');
  const [joinConference] = useJoinPrivateConferenceMutation()
  
  const navigate = useNavigate()

 




  const handleInputChange = (e) => {
    setConferenceId(e.target.value);
  };

  const handleJoinConference = async() => {
   try {
    const res = await joinConference({conferenceID:conferenceId}).unwrap();
    console.log(res);
    console.log('Joining conference with ID:', conferenceId);
    console.log(res);
    navigate(`/media-container/${conferenceId}`)
    
   } catch (error) {
    console.log(error);
    
   }
    

  };

  return (
    <div className='flex flex-col items-center m-4'>
    <div className="m-4">
      <p>Enter the Conference ID to join:</p>
      <input
        type="text"
        placeholder="Conference ID"
        value={conferenceId}
        onChange={handleInputChange}
      />
    </div>
    <div className='m-4'>
       <button className="bg-sky-500 hover:bg-sky-700 w-" onClick={handleJoinConference}>
           join conference
   </button>
    </div>
    </div>

  );
}

export default Join;
