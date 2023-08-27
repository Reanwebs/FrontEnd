import video from "../../../assets/wave.mp4"

 const Video = ()=>{
    return(
        <video autoPlay loop muted style={{ width: "100%", height: "auto" }}>
            <source src={video} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
    )
}
export default Video;