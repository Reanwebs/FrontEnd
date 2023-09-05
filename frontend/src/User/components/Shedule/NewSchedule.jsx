import React, { useState } from 'react';
import "./NewSchedule.css"
import {Input} from "@nextui-org/react";
import {Switch, cn} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button} from "@nextui-org/react";

const NewSchedule = () => {
  const iconClasses = "text-xl text-default-500 pointer-events-none flex-shrink-0";
  const [meetingData, setMeetingData] = useState({
    userID: '',
    type: '',
    title: '',
    description: '',
    interest: '',
    recording: false,
    chat: false,
    broadcast: false,
    participantlimit: 0,
    date: '',
    time_seconds: 0,
    time_nanos: 0,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === 'checkbox' ? checked : value;
    setMeetingData({ ...meetingData, [name]: inputValue });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the submission of the meeting data here
    console.log(meetingData);
  };

  return (
    <div className="schedule-meeting">
      <form onSubmit={handleSubmit}>
        <label>
        <Dropdown>
      <DropdownTrigger>
        <Button 
          variant="bordered" 
        >
          Choose Type
        </Button>
      </DropdownTrigger>
      <DropdownMenu variant="faded" aria-label="Dropdown menu with description" className="custom-dropdown-menu">
      <DropdownSection title="Conferences" showDivider className="custom-dropdown-sectiom">  
        <DropdownItem
            key="private"
            description="Partcipation through link"
          >
            Private
          </DropdownItem>
          <DropdownItem
            key="group"
            description="Limited with your group"
          >
            Group
          </DropdownItem>
          <DropdownItem
            key="public"
            description="Expose to the world"
          >
            Public
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Exclusive" className="custom-dropdown-sectiom">  
          <DropdownItem
            key="broadcast"
            description="Unitrepted broadcast"
          >
            Broadcast
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
        </label>

        <label>
          <Input isRequired type="string" label="Title" placeholder="Enter an Exciting Conference Title" 
            value={meetingData.title}
            onChange={handleInputChange} 
          />
        </label>

        <label>
         <Input isRequired type="string" label="Discription" placeholder="Describe your conference" 
            value={meetingData.description}
            onChange={handleInputChange} 
          />
        </label>

        <label>
            
        <Dropdown>
         <DropdownTrigger>
         <Button 
          variant="bordered" 
         >
          Choose Interest
         </Button>
         </DropdownTrigger>
         <DropdownMenu variant="faded" aria-label="Dropdown menu with description" className="custom-dropdown-menu">
         <DropdownSection title="" showDivider className="custom-dropdown-sectiom">  
         <DropdownItem
            key="interest1"
          >
            Education
          </DropdownItem>
          <DropdownItem
            key="interest2"
          >
            Programming
          </DropdownItem>
          <DropdownItem
            key="interest3"
          >
            Entertainment
          </DropdownItem>
          </DropdownSection>
          </DropdownMenu>
        </Dropdown>
        </label>

        <label>
        <Switch
      classNames={{
        base: cn(
          "inline-flex flex-row-reverse w-full max-w-ml bg-content1 hover:bg-content2 items-center",
          "justify-between cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
          "data-[selected=true]:border-transparent",
        ),
        wrapper: "p-0 h-4 overflow-visible",
        thumb: cn("w-6 h-6 border-2 shadow-lg",
          "group-data-[hover=true]:border-transparent",    
          "group-data-[selected=true]:ml-6",
          "group-data-[pressed=true]:w-7",
          "group-data-[selected]:group-data-[pressed]:ml-4",
        ),
      }}
    >
      <div className="flex flex-col gap-1">
        <p className="text-medium">Enable chat</p>
        <p className="text-tiny text-default-400">
         enhance your conference with chats
        </p>
      </div>
    </Switch>
        </label>


        <label>
        <Input
          type="number"
          label="Participant Limit"
          placeholder="0"
          value={meetingData.limit}
            onChange={handleInputChange} 
        />
        </label>

        <label>
          Date
          <input
            type="date"
            name="date"
            value={meetingData.date}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Time (Seconds)
          <input
            type="number"
            name="time_seconds"
            value={meetingData.time_seconds}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Time (Nanos)
          <input
            type="number"
            name="time_nanos"
            value={meetingData.time_nanos}
            onChange={handleInputChange}
          />
        </label>

        <button type="submit">Schedule</button>
      </form>
    </div>
  );

};

export default NewSchedule;
