import { useState,useEffect, useRef } from "react";
// import AgoraRTM from "agora-rtm-sdk";
// import { APP_ID } from "../../../utils/config/config";
// import { useSelector } from 'react-redux';
import { useGetLiveStreamsDataMutation } from "../../slices/api_slices/usersConferenceApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStreamState } from "../../slices/reducers/user_reducers/streamReducer";
import { CLOUDINARY_FETCH_URL } from "../../../utils/config/config";


const RoomContainer = ()=>{

    // const userInfo  = useSelector((state) => state.auth.userInfo); 
   
    // const rtmClient = useRef(null)
    // const localChannel = useRef(null)

    // const uid = String(Math.floor(Math.random() * 10000));
    // const token = null

   


    // const RoomsCard = ()=>{
    //     return (
    //       rooms.map((room)=>

    //       )
    //     )
    // }
    // useEffect(()=>{
    //    init()
    //   //  console.log(rooms,"roomssssssssss");
    // },[])

    // async function init(){
    //     try {
    //       rtmClient.current = await AgoraRTM.createInstance(APP_ID)
    //       await rtmClient.current.login({uid,token})

    //       localChannel.current=rtmClient.current.createChannel('lobby')
    //       await localChannel.current.join()

    //       // const attributes = await rtmClient.current.getChannelAttributesByKeys(rooms.room,['room_name'])
    //       // console.log(attributes,"attributesssss");

    //       rtmClient.current.on('MessageFromPeer',async(message,peerId)=>{
    //         try {
    //             const msgData = JSON.parse(message.text)
    //             console.log("messageData :",msgData);
    //             console.log("peerId :",peerId);
    //             setRooms(msgData);

    //             const count = await rtmClient.current.getChannelMemberCount([msgData.room])
    //             console.log("count of members!!!!!!!!!!!!!!!!",count);
    //             // setRooms(count) 
                
    //         } catch (error) {
    //             console.log(error);
    //         }
           

    //       })

         
            
    //     } catch (error) {
    //        console.log(error); 
    //     }
    // }


    const [rooms,setRooms] = useState([])
    const navigate = useNavigate()
    const dispatch = useDispatch()
  
    async function joinStreamHandler(id){
      try {
        dispatch(setStreamState({status:true}))
        navigate(`/live/${id}`)
      } catch (error) {
        console.log(error);
      }
    }

    const [getStreamsData] = useGetLiveStreamsDataMutation()

    async function getStreamsDataHandler(){
      try {
        const res = await getStreamsData().unwrap()
        console.log(res);
        setRooms(res)
        
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(()=>{
      getStreamsDataHandler()
    },[])

    return (
        <>
       <section className="h-screen">
          
       </section>
        </>
       
    )

}

export default RoomContainer
