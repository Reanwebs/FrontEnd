import AgoraRTC from "agora-rtc-sdk-ng";
import { APP_ID } from "../../../utils/config/config";
import { useEffect, useRef ,useState} from "react";
import { useSelector } from "react-redux";
import {  useParams } from 'react-router-dom';
import AgoraRTM from "agora-rtm-sdk";
import './LiveContainer.css'
import { toast } from "react-toastify";

const LiveContainer = ()=>{
const [user,setUser] = useState('')

const userInfo  = useSelector((state) => state.auth.userInfo); 
const [localTracks,setLocalTracks] = useState([])
const remoteTracks = useRef({})
const localScreenTracks = useRef(null)
const [streaming,setStreaming] = useState(false)
const [screenSharing,setScreenSharing] = useState(false)
const rtmClient = useRef(null)
const rtcClient = useRef(null)

const localStream = useRef(null)
const { id } = useParams();
// const rtmClient = useRef(null)
const channel = useRef(null);
const [message,setMessage] = useState('')
const [messages,setMessages]=useState([])
const [participant,setParticipants] = useState([])
const localChannel = useRef(null)



const uid = String(Math.floor(Math.random() * 10000));

const token = null
const rtcId = Math.floor(Math.random()*232)


useEffect(()=>{
 init()
 stream()
},[])


//RTM config for messaging 

async function init(){
    try {
        rtmClient.current = await AgoraRTM.createInstance(APP_ID)
       await rtmClient.current.login({uid:userInfo.userName,token})

       channel.current = rtmClient.current.createChannel(id)
       await channel.current.join()


       try {
        let attributes = await rtmClient.current.getChannelAttributesByKeys(id,['room_name'])
        console.log("attributes",attributes);
        console.log("id in attributes:",id);        
      } catch (error) {
         console.log("id in attributes:",id);        

          console.error("error in setting attributes:",error)
          await rtmClient.current.setChannelAttributes(id,{'room_name':id})
      }

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
           for(let i = 0 ; i < localTracks.length; i++){
            // console.log(localTracks[i],"local tracksss");
            localTracks[i].stop()
            localTracks[i].close()
           }
           await rtcClient.current.unpublish([localTracks[0],localTracks[1]])
        }
        
    } catch (error) {
        console.log(error);
    }
}

async function toggleVideoShare(){
    try {
       rtcClient.current.setClientRole('host')
       const track = await AgoraRTC.createMicrophoneAndCameraTracks()
       setLocalTracks(track)
       document.getElementById('video-stream').innerHTML=''

       let player = `<div class="video-container" id="user-container-${rtcUid}">
                        <div class="video-player" id="user-${rtcUid}">
                           
                        </div>
                    </div>`
       document.getElementById('video-stream').insertAdjacentHTML('beforeend',player)
       track[1].play(`user-${rtcUid}`)
       await rtcClient.current.publish([track[0],track[1]])
        
    } catch (error) {

        console.log(error);
        
    }
}

async function handleUserPublished(user,mediaType){
    try {
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



    return(
        <section className="h-screen">
            <div className="flex flex-row ">
            <div className="basis-1/4 h-screen bg-zinc-950">
                <p>{participant.length}</p>
            {participant.map((user,idx)=>
                   
                   <div key={idx}>
                       <span>{user}</span>
                      
                      
                   </div>)}
            </div>
            <div className="basis-1/2 h-screen bg-slate-600">
                <div id="video-stream">
                      
                </div>

                <button onClick={hangup}>
                    hangup
                </button>
                <button className="bg-red"
                onClick={()=>{
                    toggleStream()
                }}
                >
                    {streaming ? "stop streaming" :"start streaming"}
                </button>
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