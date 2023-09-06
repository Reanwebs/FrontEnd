import React, { useState } from 'react';
import "./Conference.css";

const Join = () => {
  const [conferenceId, setConferenceId] = useState('');

  const handleInputChange = (e) => {
    setConferenceId(e.target.value);
  };

  const handleJoinConference = () => {
    // logic to join the conference
    console.log('Joining conference with ID:', conferenceId);
  };

  return (
    <div className="join-div">
      <p>Enter the Conference ID to join:</p>
      <input
        type="text"
        placeholder="Conference ID"
        value={conferenceId}
        onChange={handleInputChange}
      />
      <button className='join-button' onClick={handleJoinConference}>Join Conference</button>
    </div>
  );
}

export default Join;
