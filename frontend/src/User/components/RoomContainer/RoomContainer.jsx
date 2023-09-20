import { useState,useEffect, useRef } from "react";
import AgoraRTM from "agora-rtm-sdk";
import { APP_ID } from "../../../utils/config/config";
import { useSelector } from 'react-redux';
import HomeSkeleton from "../ShimmerForHome/HomeSkeleton";



const RoomContainer = ()=>{

    const userInfo  = useSelector((state) => state.auth.userInfo); 
    const [rooms,setRooms] = useState([])
    const rtmClient = useRef(null)
    const localChannel = useRef(null)

    const uid = String(Math.floor(Math.random() * 10000));
    const token = null


    useEffect(()=>{
       init()
      //  console.log(rooms,"roomssssssssss");
    },[])

    async function init(){
        try {
          rtmClient.current = await AgoraRTM.createInstance(APP_ID)
          await rtmClient.current.login({uid,token})

          localChannel.current=rtmClient.current.createChannel('lobby')
          await localChannel.current.join()

          // const attributes = await rtmClient.current.getChannelAttributesByKeys(rooms.room,['room_name'])
          // console.log(attributes,"attributesssss");

          rtmClient.current.on('MessageFromPeer',async(message,peerId)=>{
            try {
                const msgData = JSON.parse(message.text)
                console.log("messageData :",msgData);
                console.log("peerId :",peerId);
                setRooms(msgData);

                const count = await rtmClient.current.getChannelMemberCount([msgData.room])
                // console.log("count of members!!!!!!!!!!!!!!!!",count);
                // setRooms(count) 
                
            } catch (error) {
                console.log(error);
            }
           

          })

         
            
        } catch (error) {
           console.log(error); 
        }
    }

    return (
        <>
       <section className="h-screen">
        <HomeSkeleton id={rooms.room} members={rooms.members}/>
       </section>
        </>
       
    )

}

export default RoomContainer
