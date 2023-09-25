import { useState,useEffect, useRef } from "react";
// import AgoraRTM from "agora-rtm-sdk";
// import { APP_ID } from "../../../utils/config/config";
// import { useSelector } from 'react-redux';
import { useGetLiveStreamsDataMutation } from "../../slices/api_slices/usersConferenceApi";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStreamState } from "../../slices/reducers/user_reducers/streamReducer";
import { CLOUDINARY_FETCH_URL } from "../../../utils/config/config";
import { Card,CardFooter,CardHeader,Button,Image } from "@nextui-org/react";
import './RoomContainer.css'


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
        console.log(res,"response from streams");
        setRooms(res)
        
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(()=>{
      getStreamsDataHandler()
    },[])


    const RoomCards = ()=>{
      return(
        <Card isFooterBlurred className="w-full h-[300px] col-span-12 sm:col-span-7 ">
        <Image
          removeWrapper
          alt="Relaxing app background"
          className="z-0 w-full h-full object-cover"
          src="../../../../streambgimage.jpg"
        />
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <Image
              alt="Breathing app icon"
              className="rounded-full w-10 h-11 bg-black"
              src="../../../../streambgimage.jpg"
            />
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">Ajith v</p>
              <p className="text-tiny text-white/60">Some description</p>
            </div>
          </div>
          <Button radius="full" color="" size="sm">Join</Button>
        </CardFooter>
      </Card>
      )
    }

    return (
        <>
       <section className="h-screen">
      <div className="m-4">
        <div className="card_header">
         <h1 className="card_title">now streaming </h1>
        </div>
        
       <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
          <RoomCards/>  
          </div>
       </div>
       </section>
        </>
       
    )

}

export default RoomContainer
