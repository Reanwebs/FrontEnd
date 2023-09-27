import {useRef,useEffect,useState} from 'react';
import {S3Client, GetObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"
import { AWS_SECRET_KEY,AWS_ACCESS_KEY,BUCKET_NAME } from '../../../utils/config/config';
import { useGetUserVideosMutation ,useManageVideoMutation} from '../../slices/api_slices/videoStreamApiSlice';
import { useSelector } from 'react-redux';
import { RingLoader } from 'react-spinners';
import { Card,Button } from '@nextui-org/react';
import { CLOUDINARY_FETCH_URL } from '../../../utils/config/config';





function RecordedVideos() {

  const [videos,setVideos] = useState([])
  const [getUserVideos] =  useGetUserVideosMutation()
  const [manageVideo,{isLoading:manageLoading}] = useManageVideoMutation()
  const userInfo  = useSelector((state) => state.auth.userInfo); 
  const [urlVideos,setUrlVideos] = useState([])
  const [loading ,setLoading] = useState(true)
  const [status,setStatus] = useState(false)


 useEffect(()=>{
   async function getVideosHandler(){
    try {
      const res = await getUserVideos(userInfo.userName).unwrap()
      console.log(res.videos);
      const videosWithUrl = res.videos.map((video) => ({
        ...video,
        url: '', // Initialize the 'url' field
      }));
      setVideos(videosWithUrl)
      console.log(videosWithUrl,"with url");
      setLoading(true);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
   }
   getVideosHandler()
 },[status])

  useEffect(()=>{
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
      const videosWithSignedUrls = await Promise.all(
        videos.map(async (video) => {
          const command = new GetObjectCommand({ Bucket: bucketName, Key: video.S3Path });
          const url = await getSignedUrl(s3, command, { expiresIn: 15 * 60 });
          return {
            ...video,
            url,
          };
        })
      );
      setUrlVideos(videosWithSignedUrls);
      setLoading(false); 
      
      } catch (error) {
        console.log(error);
      }
    }

   init()
  },[videos]) 

 
  async function manageVideoHandler(id){
    try {

      const res = await manageVideo({videoId:id})
      console.log(res);
      setStatus(!status)
      
    } catch (error) {
      console.log(error);
    }
  }




  return (
    <div className="h-fit">
      {loading ? <div className="w-full flex justify-center h-full">
    <div className="py-52">
      <RingLoader color="#1bacbf"/>
    </div>
  </div> :
      <div className="grid gap-4 grid-cols-4">
        {urlVideos.map((video, index) => (
          <div key={index}>
           <Card isFooterBlurred className="w-[350px] h-[300px] col-span-12 sm:col-span-7 mt-4 ml-2">
          <div className="max-w-[400px] ">
            <div className="video-container">
              <video poster={`${CLOUDINARY_FETCH_URL}/${video.thumbnailId}`} controls width={400} height={225} autoPlay muted id='videoPlayer'>
                <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
              <div className='flex justify-between'>
                <p className=' text-white/60 ml-4'>Title:{video.title}</p>
                <Button className='mr-4'
                 isLoading={manageLoading}
                onClick={()=>{
                  manageVideoHandler(video.VideoId.toString())
                }}
                >
                  {video?.archived ? "UnArchive" : "Archive"}
                </Button>
              </div> 
          </div>
          </Card>
          </div>
         ))}
      </div>
}
    </div>
  );
}

export default RecordedVideos;
