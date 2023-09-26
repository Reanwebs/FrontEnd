import {useRef,useEffect} from 'react';
import {S3Client, GetObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"
import { AWS_SECRET_KEY,AWS_ACCESS_KEY,BUCKET_NAME } from '../../../utils/config/config';
import { useGetUserVideosMutation } from '../../slices/api_slices/videoStreamApiSlice';
import { useSelector } from 'react-redux';





function RecordedVideos() {

 const [getUserVideos] =  useGetUserVideosMutation()
 const userInfo  = useSelector((state) => state.auth.userInfo); 


 useEffect(()=>{
   async function getVideosHandler(){
    try {
      const res = await getUserVideos(userInfo.userName).unwrap()
      console.log(res);
    } catch (error) {
      console.log(error);
    }
   }
   getVideosHandler()
 },[])

  useEffect(()=>{
   init()
  },[])

  async function init(){
    try {
     const s3 = new S3Client({
      credentials: {
        accessKeyId: AWS_ACCESS_KEY,
        secretAccessKey:AWS_SECRET_KEY,
      },
      region: 'ap-south-1', // Set your AWS region
    });
  
    const bucketName = BUCKET_NAME;
    const videoKey = 'reanweb/45b36291-f835-451e-834c-9fa763b7c243.mp4';
    const command = new GetObjectCommand({Bucket: bucketName, Key: videoKey });
  
    const url = await getSignedUrl(s3, command, { expiresIn: 15 * 60 }); 
    console.log(url,"url is here");
    const videoPlayer = document.getElementById('videoPlayer');
    videoPlayer.src = url;
    } catch (error) {
      console.log(error);
    }
  }
  // Replace the dummy data below with your actual video data.




  return (
    <div className="h-fit">
      <div className="grid gap-4 grid-cols-4">
        {/* {recordedVideosData.map((video, index) => ( */}
          <div className="max-w-[400px]">
            <div className="video-container" >
              <video controls width={400} height={225} id='videoPlayer'>
                {/* <source src={video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag. */}
              </video>
            </div>
            {/* <div className="description">
              <p>{video.description}</p>
            </div> */}
          </div>
        {/* ))} */}
      </div>
    </div>
  );
}

export default RecordedVideos;
