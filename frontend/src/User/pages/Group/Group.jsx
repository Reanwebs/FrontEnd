import "./Group.css"
import CommunityHead from "../../components/Group/CommunityHead";
import CommunityFeed from "../../components/Group/CommunityFeed";
import ActiveCommunity from "../../components/Group/ActiveCommunity";
import RecentFeed from "../../components/Group/RecentConferences";
const Group =()=>{
  const groups = [
    {
      name: "Group 1",
      thumbnail: "CommunityThumbnail.png",
      members: 50,
      joinLink: "/join/group1",
      chatLink: "/chat/group1",
      coins: 100,
      rank: 1,
    },
    {
      name: "Group 2",
      thumbnail: "CommunityThumbnail.png",
      members: 30,
      joinLink: "/join/group2",
      chatLink: "/chat/group2",
      coins: 75,
      rank: 2,
    },
    {
      name: "Group 3",
      thumbnail: "CommunityThumbnail.png",
      members: 70,
      joinLink: "/join/group3",
      chatLink: "/chat/group3",
      coins: 50,
      rank: 3,
    },
    {
      name: "Group 2",
      thumbnail: "CommunityThumbnail.png",
      members: 30,
      joinLink: "/join/group2",
      chatLink: "/chat/group2",
      coins: 75,
      rank: 2,
    },
    {
      name: "Group 3",
      thumbnail: "CommunityThumbnail.png",
      members: 70,
      joinLink: "/join/group3",
      chatLink: "/chat/group3",
      coins: 50,
      rank: 3,
    },
    {
      name: "Group 2",
      thumbnail: "CommunityThumbnail.png",
      members: 30,
      joinLink: "/join/group2",
      chatLink: "/chat/group2",
      coins: 75,
      rank: 2,
    },
    {
      name: "Group 3",
      thumbnail: "CommunityThumbnail.png",
      members: 70,
      joinLink: "/join/group3",
      chatLink: "/chat/group3",
      coins: 50,
      rank: 3,
    },
    {
      name: "Group 2",
      thumbnail: "CommunityThumbnail.png",
      members: 30,
      joinLink: "/join/group2",
      chatLink: "/chat/group2",
      coins: 75,
      rank: 2,
    },
    {
      name: "Group 3",
      thumbnail: "CommunityThumbnail.png",
      members: 70,
      joinLink: "/join/group3",
      chatLink: "/chat/group3",
      coins: 50,
      rank: 3,
    },
    {
      name: "Group 2",
      thumbnail: "CommunityThumbnail.png",
      members: 30,
      joinLink: "/join/group2",
      chatLink: "/chat/group2",
      coins: 75,
      rank: 2,
    },
    {
      name: "Group 3",
      thumbnail: "CommunityThumbnail.png",
      members: 70,
      joinLink: "/join/group3",
      chatLink: "/chat/group3",
      coins: 50,
      rank: 3,
    },
    {
      name: "Group 2",
      thumbnail: "CommunityThumbnail.png",
      members: 30,
      joinLink: "/join/group2",
      chatLink: "/chat/group2",
      coins: 75,
      rank: 2,
    },
    {
      name: "Group 3",
      thumbnail: "CommunityThumbnail.png",
      members: 70,
      joinLink: "/join/group3",
      chatLink: "/chat/group3",
      coins: 50,
      rank: 3,
    },
    {
      name: "Group 2",
      thumbnail: "CommunityThumbnail.png",
      members: 30,
      joinLink: "/join/group2",
      chatLink: "/chat/group2",
      coins: 75,
      rank: 2,
    },
    {
      name: "Group 3",
      thumbnail: "CommunityThumbnail.png",
      members: 70,
      joinLink: "/join/group3",
      chatLink: "/chat/group3",
      coins: 50,
      rank: 3,
    },
    {
      name: "Group 2",
      thumbnail: "CommunityThumbnail.png",
      members: 30,
      joinLink: "/join/group2",
      chatLink: "/chat/group2",
      coins: 75,
      rank: 2,
    },
    {
      name: "Group 4",
      thumbnail: "CommunityThumbnail.png",
      members: 70,
      joinLink: "/join/group3",
      chatLink: "/chat/group3",
      coins: 50,
      rank: 4,
    },
  ];

    return (
      <>
        <CommunityHead/>
        <CommunityFeed groups={groups}/>
        <ActiveCommunity/>
        <RecentFeed/>
      </>
    );
   
}

export default Group;