import React, { useState } from "react";
import "./Group.css";

const Create = () => {
  const [groupName, setGroupName] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [joinType, setJoinType] = useState("anyone"); // Default join type
  const [inviteUsers, setInviteUsers] = useState(false);
  const [addUsers, setAddUsers] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here, e.g., send data to the server
    console.log({
      groupName,
      category,
      description,
      joinType,
      inviteUsers,
      addUsers,
    });
  };

  return (
    <div className="create-group-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="groupName">Group Name:</label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Interests:</label>
          <input
            type="text"
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label>Join Type:</label>
          <select
            value={joinType}
            onChange={(e) => setJoinType(e.target.value)}
          >
            <option value="anyone">Anyone</option>
            <option value="userwithcoins">Users with Coins</option>
            <option value="request">Request to Join</option>
          </select>
        </div>
        
        <div className="form-group">
          <button type="submit">Create Group</button>
        </div>
      </form>
    </div>
  );
};

export default Create;
