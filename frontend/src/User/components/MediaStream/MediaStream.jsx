import { useRef ,useEffect,useState} from "react"
import io from 'socket.io-client'

const socket = io(
    '/webRTCPeers',
    {
        path:'/webrtc'
    }
)

const MediaStream = ()=>{
    const localVideoRef = useRef()
    const remoteVideoRef = useRef()
    const pc = useRef(new RTCPeerConnection(null))
    const textref = useRef()
    // const candidates = useRef([])
    const [offerVisible,setOfferVisible] = useState(true)
    const [answerVisible,setAnswerVisible] = useState(false)
    const [status,setStatus] = useState('make a call')


    useEffect(()=>{
        
        socket.on('connection-success', (success) => {
            console.log('Connected to server'); // Log when the client is connected
        });
    
        socket.on('disconnect', () => {
            console.log('Disconnected from server'); // Log when the client is disconnected
        });

        socket.on('sdp',(data)=>{
            pc.current.setRemoteDescription(new RTCSessionDescription(data.sdp))
            textref.current.value = JSON.stringify(data.sdp)
            if(data.sdp.type === 'offer'){
                setOfferVisible(false)
                setAnswerVisible(true)
                setStatus('incomming call....')
            }else{
                setStatus('call established')
            }
        })

        socket.on('candidate',(candidate)=>{
            // candidates.current = [...candidates.current,candidate]
            pc.current.addIceCandidate(new RTCIceCandidate(candidate))
        })

        getUserMedia()
    },[])
     
    const sendToPeer = (eventType,payload)=>{
        socket.emit(eventType,payload)
    }


    const processSDP = (sdp)=>{
        pc.current.setLocalDescription(sdp)
        sendToPeer('sdp',{sdp})
    }

    const getUserMedia = async ()=>{
        try {

            let  constraints = {
                audio:false,
                video:true
            }
            const _pc = new RTCPeerConnection(null)
            _pc.onicecandidate = (e)=>{
                if(e.candidate) console.log(JSON.stringify(e.candidate));
                sendToPeer('candidate',e.candidate)
            }
    
            _pc.oniceconnectionstatechange = (e)=>{
                console.log(e);
            }
    
            _pc.ontrack = (e)=>{
                console.log(e);
                remoteVideoRef.current.srcObject = e.streams[0]
            }
            pc.current = _pc
          const stream = await navigator.mediaDevices.getUserMedia(constraints)

  
          localVideoRef.current.srcObject = stream
          stream.getTracks().forEach(track=>{
            console.log(track,"trackk");
             _pc.addTrack(track,stream)
            
          })
    
        } catch (error) {
            console.log(error);
        }
      }

      const createOffer = ()=>{
        pc.current.createOffer({
            offerToReceiveAudio:1,
            offerToReceiveVideo:1

        }).then((sdp)=>{
             //sending offer to the connecting peer
            processSDP(sdp)
            setOfferVisible(false);
            setStatus('calling')
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

            setAnswerVisible(false);
            setStatus('call established')
            
        }).catch((error)=>{
            console.log(error);
        })

      }

//    const setRemoteDescription = ()=>{
//      const sdp = JSON.parse(textref.current.value);
//      console.log("setting remote description..........",sdp);
//      pc.current.setRemoteDescription(new RTCSessionDescription(sdp))
//    }

//    const addCandidate = ()=>{
//     //  const candidate =JSON.parse(textref.current.value);
//     //  console.log("adding candidate ..........",candidate);
//         candidates.current.forEach(candidate=>{
//             console.log(candidate);
//             pc.current.addIceCandidate(new RTCIceCandidate(candidate))
//         })
     
//    }

const showHideButtons = ()=>{
    if(offerVisible){
        return(
            <div>
                <button onClick={createOffer}>Call</button>
            </div>
        )
    }else{
        return(
            <div>
                <button onClick={createAnswer}>Answer</button>
            </div>
        )
    }
}

   
    return (
        <div style={{margin:10}}>
            <video 
            style={{
                width:240,height:240,
                margin:5,backgroundColor:'black'
            }}
            ref={localVideoRef} autoPlay>

            </video>
            <video 
            style={{
                width:240,height:240,
                margin:5,backgroundColor:'black'
            }}
            ref={remoteVideoRef} autoPlay>

            </video>
           <br/>
           {showHideButtons()}
           <div>{status}</div>
           <div>
            <textarea hidden ref={textref}></textarea>
           </div>
        </div>
    )

}

export default MediaStream