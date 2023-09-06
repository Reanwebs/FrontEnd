import React, { useState } from 'react';
import "./NewSchedule.css"
import {Input} from "@nextui-org/react";
import {Switch, cn} from "@nextui-org/react";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownSection, DropdownItem, Button} from "@nextui-org/react";

const NewSchedule = () => {
  const [selectedTime, setSelectedTime] = React.useState(new Set(["time"]));

  const selectedValueTime = React.useMemo(
    () => Array.from(selectedTime).join(", ").replaceAll("_", " "),
    [selectedTime]
  );

  const [selectedAmPm, setSelectedAmPm] = React.useState(new Set(["am/pm"]));

  const selectedValueAmPm = React.useMemo(
    () => Array.from(selectedAmPm).join(", ").replaceAll("_", " "),
    [selectedAmPm]
  );

  const [selectedTimeZone, setSelectedTimeZone] = React.useState(new Set(["time zone"]));

  const selectedValueTimeZone = React.useMemo(
    () => Array.from(selectedTimeZone).join(", ").replaceAll("_", " "),
    [selectedTimeZone]
  );

  const [selectedDuration, setSelectedDuration] = React.useState(new Set(["duration"]));

  const selectedValueDuration = React.useMemo(
    () => Array.from(selectedDuration).join(", ").replaceAll("_", " "),
    [selectedDuration]
  );

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
                Enhance your conference with chats
                </p>
              </div>
          </Switch>
        </label>


        <label>
          <Input type="number" label="Participant Limit" placeholder="Enter the number of participants" 
            value={meetingData.limit}
            onChange={handleInputChange} 
          />
        </label>

        <label>
          <Input type="date" label="Date" placeholder="Enter when your conference happens" 
            value={meetingData.date}
            onChange={handleInputChange}
          />
        </label>

        <label className='time-dropdown-label'>
            <Dropdown className='time-dropdown'>
            <DropdownTrigger>
            <Button 
              variant="bordered" 
              className="capitalize"
            >
              {selectedValueTime}
            </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Single selection example"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedTime}
              onSelectionChange={setSelectedTime}
              >
            <DropdownItem key="1:00">1:00</DropdownItem>
            <DropdownItem key="1:30">1:30</DropdownItem>
            <DropdownItem key="2:00">2:00</DropdownItem>
            <DropdownItem key="2:30">2:30</DropdownItem>
            <DropdownItem key="3:00">3:00</DropdownItem>
            <DropdownItem key="3:30">3:30</DropdownItem>
            <DropdownItem key="4:00">4:00</DropdownItem>
            <DropdownItem key="4:30">4:30</DropdownItem>
            <DropdownItem key="5:00">5:00</DropdownItem>
            <DropdownItem key="5:30">5:30</DropdownItem>
            <DropdownItem key="6:00">6:00</DropdownItem>
            <DropdownItem key="6:30">6:30</DropdownItem>
            <DropdownItem key="7:00">7:00</DropdownItem>
            <DropdownItem key="7:30">7:30</DropdownItem>
            <DropdownItem key="8:00">8:00</DropdownItem>
            <DropdownItem key="8:30">8:30</DropdownItem>
            <DropdownItem key="9:00">9:00</DropdownItem>
            <DropdownItem key="9:30">9:30</DropdownItem>
            <DropdownItem key="10:00">10:00</DropdownItem>
            <DropdownItem key="10:30">10:30</DropdownItem>
            <DropdownItem key="11:00">11:00</DropdownItem>
            <DropdownItem key="11:30">11:30</DropdownItem>
            <DropdownItem key="12:00">12:00</DropdownItem>
            <DropdownItem key="12:30">12:30</DropdownItem>
            </DropdownMenu>
            </Dropdown> 
             
            <Dropdown className='ampm-dropdown'>
            <DropdownTrigger>
            <Button 
              variant="bordered" 
              className="capitalize"
            >
              {selectedValueAmPm}
            </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Single selection example"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedAmPm}
              onSelectionChange={setSelectedAmPm}
              >
            <DropdownItem key="AM">AM</DropdownItem>
            <DropdownItem key="PM">PM</DropdownItem>
            </DropdownMenu>
            </Dropdown> 

            <Dropdown className='time-zone-dropdown'>
            <DropdownTrigger>
            <Button 
              variant="bordered" 
              className="capitalize"
            >
              {selectedValueTimeZone}
            </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Single selection example"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedTimeZone}
              onSelectionChange={setSelectedTimeZone}
              >
            <DropdownItem key="UTC">Coordinated Universal Time (UTC)</DropdownItem>
            <DropdownItem key="EST">Eastern Standard Time (EST)</DropdownItem>
            <DropdownItem key="CST">Central Standard Time (CST)</DropdownItem>
            <DropdownItem key="PST">Pacific Standard Time (PST)</DropdownItem>
            <DropdownItem key="GMT">Greenwich Mean Time (GMT)</DropdownItem>
            <DropdownItem key="BST">British Summer Time (BST)</DropdownItem>
            <DropdownItem key="CET">Central European Time (CET)</DropdownItem>
            <DropdownItem key="EET">Eastern European Time (EET)</DropdownItem>
            <DropdownItem key="IST">Indian Standard Time (IST)</DropdownItem>
            <DropdownItem key="AEST">Australian Eastern Standard Time (AEST)</DropdownItem>
            <DropdownItem key="JST">Japan Standard Time (JST)</DropdownItem>
            <DropdownItem key="NST">Newfoundland Standard Time (NST)</DropdownItem>
            <DropdownItem key="HST">Hawaii-Aleutian Standard Time (HST)</DropdownItem>
            </DropdownMenu>
            </Dropdown> 


            <Dropdown className='duration-dropdown'>
            <DropdownTrigger>
            <Button 
              variant="bordered" 
              className="capitalize"
            >
              {selectedValueDuration}
            </Button>
            </DropdownTrigger>
            <DropdownMenu 
              aria-label="Single selection example"
              variant="flat"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={selectedDuration}
              onSelectionChange={setSelectedDuration}
              >
            <DropdownItem key="10:00">10 Minitues</DropdownItem>
            <DropdownItem key="20:00">20 Minitues</DropdownItem>
            <DropdownItem key="30:00">30 Minitues</DropdownItem>
            <DropdownItem key="40:00">40 Minitues</DropdownItem>
            <DropdownItem key="50:00">50 Minitues</DropdownItem>
            <DropdownItem key="60:00">60 Minitues</DropdownItem>
            </DropdownMenu>
            </Dropdown> 
        </label>


        <button className="schedule-submit-button" type="submit">Schedule</button>
      </form>
    </div>
  );

};

export default NewSchedule;
