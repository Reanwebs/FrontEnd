import React, { useState } from 'react';
import "./SideBar.css"
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
} from '@mui/material';
import { Home,Group, Chat, VideoCallRounded,GroupsRounded,EditCalendarRounded} from '@mui/icons-material';
import {Tooltip} from "@nextui-org/react";


const ReactSidebar = () => {
  const [active, setActive] = useState('home');

  const handleClick = (item) => {
    setActive(item);
  };

  const SidebarItem = ({ icon, id }) => (
    <ListItem  onClick={() => handleClick(id)}>
      <Tooltip
      classNames={{
        base: "bg-gray-950",
      }}
      key={id}
      placement="right-end"
      content={
        <div className='text-white'>{id}</div>
      }
       
    >
      <ListItemIcon style={{ color: 'white' }}>{icon}</ListItemIcon>
      </Tooltip>
    </ListItem>
  );

  return (
    <div className='side-bar'>
      <Drawer variant="permanent" open PaperProps={{ sx: { bgcolor: 'rgba(0, 0, 0, 0.1)',width: '60px',top: 64} }}>    
        <List>
          <SidebarItem icon={<Home />} id="home" />
          <SidebarItem icon={<Group />} id="group" />
          <SidebarItem icon={<VideoCallRounded />}id="videocall" />
          <SidebarItem icon={<GroupsRounded />}  id="group" />
          <SidebarItem icon={<EditCalendarRounded/>} id="schedule" />
          <SidebarItem icon={<Chat />}  id="chat" />
        </List>
      </Drawer>
    </div>
  );
};

export default ReactSidebar;
