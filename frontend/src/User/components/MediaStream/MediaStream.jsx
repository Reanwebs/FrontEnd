import { useRef ,useEffect} from "react"

const MediaStream = ()=>{
    const localVideoRef = useRef()
    const remoteVideoRef = useRef()

    useEffect(()=>{
        //   getUserMedia()
        const _pc = new RTCPeerConnection(null)
        _pc.onicecandidate = (e)=>{
            if(e.candidate) console.log(JSON.stringify(e.candidate));
        }

        _pc.oniceconnectionstatechange = (e)=>{
            console.log(e);
        }

        _pc.ontrack = (e)=>{
            console.log(e);
        }

    },[])

    const getUserMedia = async ()=>{
        try {
            let  constraints = {
                audio:false,
                video:true
            }
          const stream = await navigator.mediaDevices.getUserMedia(constraints)
  
          localVideoRef.current.srcObject = stream
    
        } catch (error) {
            console.log(error);
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
           <button onClick={()=>{}} >Create offer</button>
           <button onClick={()=>{}}>Create answer</button>
          <br/>
          <button onClick={()=>{}}>Set Remote Description</button>
           <button onClick={()=>{}}>Add candidates</button>

        </div>
    )

}

export default MediaStream