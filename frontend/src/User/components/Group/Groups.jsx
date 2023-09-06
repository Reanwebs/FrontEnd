import React, { useState } from 'react';
import './Group.css';

const Groups = () => {
  const [selectedGroup, setSelectedGroup] = useState(null); // Track selected group

  // Sample data for joined groups and conferences (replace with your actual data)
  const joinedGroups = [
    { id: 1, name: 'Group A' },
    { id: 2, name: 'Group B' },
    { id: 3, name: 'Group C' },
  ];

  const conferences = [
    { id: 1, title: 'Conference 1', status: 'Ongoing' },
    { id: 2, title: 'Conference 2', status: 'Completed' },
    { id: 3, title: 'Conference 3', status: 'Ongoing' },
  ];

  // Function to handle clicking on a group
  const handleGroupClick = (group) => {
    setSelectedGroup(group);
  };

  return (
    <div className="groups-container">
      <div className="groups-list">
        <h2>Joined Groups</h2>
        <ul>
          {joinedGroups.map((group) => (
            <li key={group.id} onClick={() => handleGroupClick(group)}>
              {group.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="conferences-list">
        <h2>Conferences</h2>
        <ul>
          {conferences.map((conference) => (
            <li key={conference.id}>
              <span className={`conference-${conference.status.toLowerCase()}`}>
                {conference.title} ({conference.status})
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Groups;
