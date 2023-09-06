import React from "react";
import "./Group.css";

const groups = [
  {
    id: 1,
    name: "Rean",
    avatar: "group1.jpg",
    members: 1000,
    watchHours: 5000,
    coins: 10000,
    joinType: "Anyone",
    category: "Entertainment",
  },
  {
    id: 2,
    name: "Tech Innovators",
    avatar: "group2.jpg",
    members: 422,
    watchHours: 2100,
    coins: 8000,
    joinType: "Users with Coins",
    category: "Programming",
  },
  {
    id: 2,
    name: "Wellness and Health",
    avatar: "public1.jpg",
    members: 235,
    watchHours: 2040,
    coins: 6500,
    joinType: "Users with Coins",
    category: "Health",
  },
  {
    id: 2,
    name: "Think Tank",
    avatar: "public2.jpg",
    members: 458,
    watchHours: 1800,
    coins: 5200,
    joinType: "Anyone",
    category: "Education",
  },
  {
    id: 2,
    name: "Forum",
    avatar: "public3.jpg",
    members: 345,
    watchHours: 1200,
    coins: 2000,
    joinType: "Request",
    category: "Sports",
  },
  {
    id: 2,
    name: "Pioneers",
    avatar: "broadcast1.jpg",
    members: 340,
    watchHours: 1200,
    coins: 1810,
    joinType: "Users with Coins",
    category: "Music",
  },
  {
    id: 2,
    name: "Symposium",
    avatar: "broadcast2.jpg",
    members: 200,
    watchHours: 950,
    coins: 800,
    joinType: "Request",
    category: "Music",
  },
];

const Trending = () => {
  return (
    <div className="trending-groups-container">
      <table className="group-table">
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Members</th>
            <th>Watch Hours</th>
            <th>Available Coins</th>
            <th>Join Type</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.id}>
              <td>
                <img
                  src={group.avatar}
                  alt={group.name}
                  className="topgroup-avatar"
                />
              </td>
              <td>{group.name}</td>
              <td>{group.members}</td>
              <td>{group.watchHours}</td>
              <td>{group.coins}</td>
              <td>{group.joinType}</td>
              <td>{group.category}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Trending;
