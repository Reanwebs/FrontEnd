import AgoraRTC from "agora-rtc-sdk-ng";
import { APP_ID } from "../../../utils/config/config";
import { useEffect, useRef ,useState} from "react";

const LiveContainer = ()=>{

const localTracks = useRef([])
const localScreenTracks = useRef(null)
const [streaming,setStreaming] = useState(false)
const [screenSharing,setScreenSharing] = useState(false)
const rtcClient = useRef(null)
const localStream = useRef(null)


const rtcId = Math.floor(Math.random()*232)
const config = {
    appId:APP_ID,
    token:null,
    uid:rtcId,
    channel:'live'
}

useEffect(()=>{
 init()
},[])
const init =async  ()=>{
     rtcClient.current = AgoraRTC.createClient({mode:'live',codec:'vp8'})
    await rtcClient.current.join(config.appId,config.channel,config.token,config.uid)
    startStream()

}

const startStream = async()=>{
    if(!streaming){
       setStreaming(true)
       document.getElementById('stream-button').innerText = 'stop streaming'
       toggleVideoShare()
    }else{
        setStreaming(false)
        document.getElementById('stream-button').innerText = 'start streaming'
    }


}
const toggleVideoShare =async ()=>{
    rtcClient.current.setClientRole('host')
    const tracks = await AgoraRTC.createMicrophoneAndCameraTracks()
    console.log(tracks);

}
    return(
        <h1>
           <button id='stream-button'onClick={()=>{
            startStream()
           }}>
            start Stream
           </button>
           <video ref={localStream}></video>
        </h1>
    )
}

export default LiveContainer