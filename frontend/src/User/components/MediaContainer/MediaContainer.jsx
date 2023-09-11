import { useState,useRef,useEffect } from "react"
import './MediaContainer.css'
import { useSelector ,useDispatch} from 'react-redux';
import { setJoinId } from "../../slices/reducers/user_reducers/mediaReducer";
import io from 'socket.io-client'

const socket = io(
  '/webRTCPeers',
  {
      path:'/webrtc'
  }
)
const MediaContainer = ()=>{
  const userInfo = useSelector((state)=>state.auth.userInfo)
  

  const localVideoRef = useRef()
    const remoteVideoRef = useRef()
    const pc = useRef(new RTCPeerConnection(null))
    const textref = useRef()
    const [id,setId] = useState('')
    const dispatch = useDispatch()
   


  useEffect(()=>{
    
    createOffer()
    getUserMedia()
    setId(userInfo.userName)
        socket.on('connection-success', (success) => {
          console.log('Connected to server',success); // Log when the client is connected
      });

      dispatch(setJoinId(userInfo.userName))

      socket.on('disconnect', () => {
          console.log('Disconnected from server'); // Log when the client is disconnected
      });

      socket.on('sdp',(data)=>{
          pc.current.setRemoteDescription(new RTCSessionDescription(data.sdp))
          textref.current.value = JSON.stringify(data.sdp)
      })

      socket.on('candidate',(candidate)=>{
          // candidates.current = [...candidates.current,candidate]
          pc.current.addIceCandidate(new RTCIceCandidate(candidate))
      });

  
  
  return () => {
      socket.disconnect(); 
  };
    
  },[])

  const getUserMedia = async ()=>{
    try {

        let  constraints = {
            audio:false,
            video:true
        }
        // const _pc = new RTCPeerConnection(null)
        pc.onicecandidate = (e)=>{
            if(e.candidate) console.log(JSON.stringify(e.candidate));
            sendToPeer('candidate',e.candidate)
        }

        pc.oniceconnectionstatechange = (e)=>{
            console.log(e);
        }

        pc.ontrack = (e)=>{
            console.log(e);
            remoteVideoRef.current.srcObject = e.streams[0]
        }
        // pc.current = _pc
      const stream = await navigator.mediaDevices.getUserMedia(constraints)


      localVideoRef.current.srcObject = stream
      stream.getTracks().forEach(track=>{
        console.log(track,"trackk");
         pc.addTrack(track,stream)
        
      })

    } catch (error) {
        console.log(error);
    }
  }

  const sendToPeer = (eventType,payload)=>{
    socket.emit(eventType,payload)
}


const processSDP = (sdp)=>{
    pc.current.setLocalDescription(sdp)
    sendToPeer('sdp',{sdp})
}

  const createOffer =  ()=>{
    pc.current.createOffer({
        offerToReceiveAudio:1,
        offerToReceiveVideo:1

    }).then(async(sdp)=>{
         //sending offer to the connecting peer
         console.log(sdp,"iiiiiiiiiii");
        processSDP(sdp)
    }).catch((error)=>{
        console.log(error);
    })

  }

  const createAnswer = ()=>{
    pc.current.createAnswer({
        offerToReceiveAudio:1,
        offerToReceiveVideo:1

    }).then((sdp)=>{
        //sending answer to connecting peer
        processSDP(sdp)
    }).catch((error)=>{
        console.log(error);
    })
  }
      
    return(
      <>
        <div className="media-container">
            <video ref={remoteVideoRef} className="remote-video"  autoPlay></video>
            <video ref={localVideoRef} className="local-video" autoPlay muted></video>
        </div>
        <div>
          <input value={id}></input>
        </div>
        </>
        
    )
}

 export default MediaContainer;