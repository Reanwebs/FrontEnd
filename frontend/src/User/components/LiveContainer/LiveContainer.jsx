import AgoraRTC from "agora-rtc-sdk-ng";
import { APP_ID } from "../../../utils/config/config";
import { useEffect, useRef ,useState} from "react";
import { useSelector } from "react-redux";
import {  useParams } from 'react-router-dom';
import AgoraRTM from "agora-rtm-sdk";
import './LiveContainer.css'
import { toast } from "react-toastify";

const LiveContainer = ()=>{


const userInfo  = useSelector((state) => state.auth.userInfo); 
const localScreenTracks = useRef(null)
const [streaming,setStreaming] = useState(false)
const [screenSharing,setScreenSharing] = useState(false)
const rtmClient = useRef(null)
const rtcClient = useRef(null)
const localScreenShare = useRef(null)

const { id } = useParams();
const channel = useRef(null);
const [message,setMessage] = useState('')
const [messages,setMessages]=useState([])
const [participant,setParticipants] = useState([])
const localChannel = useRef(null)
const [showControls,setShowControls] = useState(false)
// const [status,setStatus] = useState(false)



// const uid = String(Math.floor(Math.random() * 10000));

const token = null
// const rtcId = Math.floor(Math.random()*232)


useEffect(()=>{
    init()
},[])

useEffect(()=>{
 stream()
},[])




//RTM config for messaging 

async function init(){
    try {
        rtmClient.current = await AgoraRTM.createInstance(APP_ID)
       await rtmClient.current.login({uid:userInfo.userName,token})

       channel.current = rtmClient.current.createChannel(id)
       await channel.current.join()


       await getChanneldetails()

       localChannel.current=rtmClient.current.createChannel('lobby')
       await localChannel.current.join()


       localChannel.current.on('MemberJoined',async (memberId)=>{
           
          const participants = await channel.current.getMembers()
        //   console.log(participants,"paticipantssss");
          if(participants[0] === userInfo.userName){
            const lobbyMembers = await localChannel.current.getMembers()
            // console.log("lobbymemebrrssss:",lobbyMembers,);
            for(let i=0;i<lobbyMembers.length; i++){
                rtmClient.current.sendMessageToPeer({text:JSON.stringify({'room':id,'type':'room_added','members':participants.length})},lobbyMembers[i])
            }
          }
          
       })

       channel.current.on('MemberJoined',async (memberId)=>{
         await  handleMemeberJoined(memberId,"joined")
       })

       channel.current.on('MemberLeft',async (memberId)=>{
         await handleMemeberJoined(memberId,"left")
       })

       channel.current.on('ChannelMessage',(msg,memberId)=>{
          const data = JSON.parse(msg.text)
        //   console.log(data,memberId,"message from channel");
          sendMessageHandler(data,memberId)
        })
        
    } catch (error) {
        console.log(error);
    }
}

async function getChanneldetails(){
    try {
        let attributes = await rtmClient.current.getChannelAttributesByKeys(id,['room_name','host_id'])
        console.log("attributes",attributes);
        console.log("id in attributes:",id);  
        const host_id = attributes.host_id.value;
        if(host_id === userInfo.userName){
             setShowControls(true)
         }
            
      } catch (error) {
          await rtmClient.current.setChannelAttributes(id,{'room_name':id,'host_id':userInfo.userName})
          getChanneldetails()
        
      }
}

async function handleMemeberJoined(memberId,state){
    toast.success(`${memberId} ${state} stream`)
    const member = await channel.current.getMembers()
    setParticipants(member)
}

function sendMessageHandler(data,user){
    // console.log(data,user,"oooooooooooooooo");
    setMessages((prevMessages) => [
        ...prevMessages,
        { message: data.message,time:data.time, user: user }
      ]);
}

async function handleSendMessage(e){
  e.preventDefault()
  const time = new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})
  channel.current.sendMessage({text:JSON.stringify({'message':message,'time':time})})
  sendMessageHandler({message:message,time:time},userInfo.userName)
  setMessage('')
}

const hangup = async  ()=>{
    try {
      await channel.current.leave();
      await rtmClient.current.logout()
      window.location.assign('/home');
    } catch (error) {
        console.log(error);
    }
}

//RTC config for video streaming
const rtcUid = Math.floor(Math.random() * 10000);
const config ={
    appId:APP_ID,
    token:null,
    uid:rtcUid,
    channel:id
}



async function stream(){
    try {
        rtcClient.current = AgoraRTC.createClient({mode:'live',codec:'vp8'})
       
        await rtcClient.current.join(config.appId,config.channel,config.token,config.uid)

        rtcClient.current.on('user-published',handleUserPublished)

        rtcClient.current.on('user-unpublished',handleUserUnPublished)

        
    } catch (error) {
        console.log(error);
        
    }
}

async function toggleStream(){
    try {
        if(!streaming){
            setStreaming(true)
            toggleVideoShare(true)
        }else{
           setStreaming(false)
           for(let i = 0 ; i < localScreenTracks.current.length; i++){
            // console.log(localTracks[i],"local tracksss");
            localScreenTracks.current[i].stop()
            localScreenTracks.current[i].close()
           }
           await rtcClient.current.unpublish([localScreenTracks.current[0],localScreenTracks.current[1]])
        }
        
    } catch (error) {
        console.log(error);
    }
}

async function toggleVideoShare(){
    try {
       rtcClient.current.setClientRole('host')
       const track = await AgoraRTC.createMicrophoneAndCameraTracks()
       localScreenTracks.current = track;
       console.log("local screen tracks",localScreenTracks,)
       document.getElementById('video-stream').innerHTML=''

       let player = `<div class="video-container" id="user-container-${rtcUid}">
                        <div class="video-player" id="user-${rtcUid}">
                           
                        </div>
                    </div>`
       document.getElementById('video-stream').insertAdjacentHTML('beforeend',player)
       localScreenTracks.current[1].play(`user-${rtcUid}`)
       await rtcClient.current.publish([localScreenTracks.current[0],localScreenTracks.current[1]])
        
    } catch (error) {

        console.log(error);
        
    }
}

async function handleUserPublished(user,mediaType){
    try {
        console.log("media type in user published",mediaType,);
        await rtcClient.current.subscribe(user,mediaType)
        if(mediaType === 'video'){
            let player = document.getElementById(`user-container-${user.uid}`)
            if(player !== null){
                player.remove()
            }
         player = `<div class="video-container" id="user-container-${user.uid}">
                        <div class="video-player" id="user-${user.uid}">
                           
                        </div>
                    </div>`
         document.getElementById('video-stream').insertAdjacentHTML('beforeend',player)
         user.videoTrack.play(`user-${user.uid}`)
        }
        if(mediaType === 'audio'){
            user.audioTrack.play()
        }
    } catch (error) {
        console.log(error);
    }
}

async function handleUserUnPublished(){
    document.getElementById('video-stream').innerHTML=''

}

async function toggleCamera() {
    try {
        if (localScreenTracks.current[1].muted) {
            localScreenTracks.current[1].setMuted(false);
        } else {
            localScreenTracks.current[1].setMuted(true);
        }
    } catch (error) {
        console.log(error);
    }
}

async function toggleMike() {
    try {
        if (localScreenTracks.current[0].muted) {
            localScreenTracks.current[0].setMuted(false);
        } else {
            localScreenTracks.current[0].setMuted(true);
        }
    } catch (error) {
        console.log(error);
    }
}


async function toggleScreenShare(){
    try {
        if(screenSharing){
            console.log(screenSharing,"screen sharing");
            setScreenSharing(false)
            await rtcClient.current.unpublish([localScreenShare.current])
            toggleVideoShare()
           
        }else{
            setScreenSharing(true)
            const tracks = await AgoraRTC.createScreenVideoTrack()
            localScreenShare.current = tracks
            document.getElementById('video-stream').innerHTML=''

            let player = document.getElementById(`user-container-${rtcUid}`)
            if(player !== null){
                player.remove()
            }

             player = `<div class="video-container" id="user-container-${rtcUid}">
                        <div class="video-player" id="user-${rtcUid}">
                           
                        </div>
                    </div>`
       document.getElementById('video-stream').insertAdjacentHTML('beforeend',player)
       await rtcClient.current.unpublish([localScreenTracks.current[0],localScreenTracks.current[1]])
       localScreenShare.current.play(`user-${rtcUid}`)
       await rtcClient.current.publish([localScreenShare.current])
        }
        
    } catch (error) {
        console.log(error);
    }
}



    return(
        <section className="h-screen">
            <div className="flex flex-row ">
            <div className="basis-1/4 h-screen bg-zinc-950">
                {showControls && 
                <>
                <p>{participant.length}</p>
            {participant.map((user,idx)=>
                   
                   <div key={idx}>
                       <span>{user}</span>
                      
                      
                   </div>)}
             </>
            }
            </div>
            <div className="basis-1/2 h-screen bg-slate-600">
                <div id="video-stream">
                      
                </div>
             {showControls &&
             <>
                <button onClick={hangup} className="m-2">
                    hangup
                </button>
                <button className="m-2"
                onClick={()=>{
                    toggleStream()
                }}
                >
                    {streaming ? "stop streaming" :"start streaming"}
                </button>
                <button onClick={toggleCamera} className="m-2">
                    toggleCamera
                </button>
                <button onClick={toggleMike} className="m-2">
                    toggleMike
                </button>
                <button onClick={toggleScreenShare} className="m-2">
                   {screenSharing ? 'stop screenShare' : 'start screenShare'} 
                </button>
                </>
                }
                live part
            </div>
            <div className="basis-1/4 h-screen bg-zinc-950  overflow-auto">
                {messages.map((msg,idx)=>
                   
                    <div key={idx}>
                        <span>{msg.time}</span>
                        <span>{msg.user}</span>
                        <span>{msg.message}</span>
                       
                    </div>)}
                <form className="fixed bottom-0">
                    <input className="w-96 h-10"
                    required
                    value={message}
                    onChange={(e)=>{
                        setMessage(e.target.value)
                    }}
                    >
                    </input>
                    <button className="send_message_button" onClick={handleSendMessage}>Send</button>
                </form>
             </div>
            </div>
        </section>
    )
}

export default LiveContainer