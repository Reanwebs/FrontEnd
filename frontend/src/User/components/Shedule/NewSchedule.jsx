import React, { useState } from 'react';
import "./NewSchedule.css"
import {Input} from "@nextui-org/react";
import {Switch, cn} from "@nextui-org/react";
import Options from '../Options/Options';
import {timeData,timeZoneData,duration} from '../Options/data'
import { useScheduleConferenceMutation } from '../../slices/api_slices/usersConferenceApi';
import {toast} from 'react-toastify'

const NewSchedule = () => {

  const [sheduleConference] = useScheduleConferenceMutation()

  const [meetingData, setMeetingData] = useState({
    type: '',
    title: '',
    description: '',
    interest: '',
    recording: false,
    chat: false,
    broadcast: false,
    participantlimit: 0,
    date: '',
    time:'',
    duration:'',
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMeetingData({ ...meetingData, [name]: value });
  };

  const handleChatInput = (e)=>{
    setMeetingData({
      ...meetingData,
      chat:!meetingData.chat
    })
  }

   const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const data ={
        title :meetingData.title,
        description:meetingData.description,
        interest:meetingData.interest,
        recording:meetingData.recording,
        chat :meetingData.chat,
        participantlimit:meetingData.participantlimit,
        time: meetingData.date + " " + meetingData.time,
        duration:meetingData.duration.replace("minutes", "").trim()
      }
      if(meetingData.participantlimit < 2){
        throw new Error('participant limit must be greater that 1')
      }
      const res = await sheduleConference(data).unwrap()
      toast.success('conference scheduled successfully');
      setMeetingData({
        type: '',
        title: '',
        description: '',
        interest: '',
        recording: false,
        chat: false,
        broadcast: false,
        participantlimit: 0,
        date: '',
        time:'',
        duration:'',
      })
    } catch (error) {
      toast.error(error?.data?.message || error?.message)
      console.log(error);
      
    }
  }
  return (
    <div className="schedule-meeting">
      <form onSubmit={handleSubmit}>
        <label>
          <Options label={"type"} placeholder={"Select a type"} data={[{type:"public"},{type:"group"},{type:"private"},{type:"broadcast"}]} handlechange={handleInputChange}/>
        </label>

        <label>
          <Input name='title' isRequired type="string" label="Title" placeholder="Enter an Exciting Conference Title" 
            value={meetingData.title}
            onChange={handleInputChange} 
          />
        </label>

        <label>
         <Input name='description' isRequired type="string" label="Discription" placeholder="Describe your conference" 
            value={meetingData.description}
            onChange={handleInputChange} 
          />
        </label>

        <label>
        <Options label={"interest"} placeholder={"Select a interest"} data={[{type:"education"},{type:"programming"},{type:"entertainment"}]} handlechange={handleInputChange}/>
        </label>

        <label>
          <Switch
              onChange={handleChatInput}
              isSelected={meetingData.chat}
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

        <div className='flex'>
        <label className='m-2 mb-3'>
          <Input size='md' type="number" name='participantlimit' label="Participant Limit" placeholder="Enter the number of participants" 
            value={meetingData.limit}
            onChange={handleInputChange} 
          />
        </label>
         
        <label className='m-2 mb-3'>
          <Input size='md' type="date" name='date' label="Date" placeholder="Enter when your conference happens" 
            value={meetingData.date}
            onChange={handleInputChange}
          />
        </label>
        </div>

        <label className='time-dropdown-label'>
          <Options label={"time"} placeholder={"Select a time"} data={timeData} handlechange={handleInputChange}/>
          {/* <Options label={"am_pm"} placeholder={"Select the zone"} data={[{type:'am'},{type:'pm'}]} handlechange={handleInputChange}/> */}
          {/* <Options label={"timeZone"} placeholder={"Select the time zone"} data={timeZoneData} handlechange={handleInputChange}/> */}
          <Options label={"duration"} placeholder={"Select the duration"} data={duration} handlechange={handleInputChange}/>
        </label>
       

        <button className="schedule-submit-button" type="submit">Schedule</button>
      </form>
    </div>
  );

};

export default NewSchedule;
