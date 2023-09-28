import { useState,useEffect } from 'react'
import './StreamedVideos.css'
import { Card,Image,CardFooter,Button } from '@nextui-org/react'
import { CLOUDINARY_FETCH_URL } from '../../../utils/config/config'
import { useGetStreamedVideosMutation } from '../../slices/api_slices/videoStreamApiSlice'
import {S3Client, GetObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"
import { AWS_SECRET_KEY,AWS_ACCESS_KEY,BUCKET_NAME } from '../../../utils/config/config';
import { useSelector } from 'react-redux';
import { RingLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom'

const StreamedVideos = ()=>{

    const [streams,setStreams] = useState([1,2,3,4,5,6,7])
    const userInfo  = useSelector((state) => state.auth.userInfo); 
    const [videos,setVideos] = useState([])
    const [loading ,setLoading] = useState(true)
    const [urlVideos,setUrlVideos] = useState([])

    const [isHovered, setIsHovered] = useState(false);
    const navigate = useNavigate()
    

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };


    const [getStreams] = useGetStreamedVideosMutation()
    

    useEffect(()=>{
       getStreamsDataHandler()
    },[])

    async function getStreamsDataHandler(){
      try {
        const res = await getStreams().unwrap()
        const videosWithUrl = res.videos.map((video) => ({
          ...video,
          url: '', // Initialize the 'url' field
        }));
        setVideos(videosWithUrl)
        setLoading(true);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    }

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



    const VideoStreams = ()=>{
          return(
            loading ? <div className="w-full flex justify-center h-full">
            <div className="py-52">
              <RingLoader color="#1bacbf"/>
            </div>
          </div>
          :
        urlVideos.map((video,idx)=>
        <div key={idx} className=''
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={()=>{
          navigate(`/video/${video.VideoId}`)
        }}
        >
        <Card isFooterBlurred className="w-[350px] h-[300px] col-span-12 sm:col-span-7 mt-4 ml-2">
        <video
          className={`z-0 w-full h-full object-cover ${isHovered ? 'hovered' : ''}`}
          poster={`${CLOUDINARY_FETCH_URL}/${video.thumbnailId}`}
          autoPlay={isHovered}
          muted
          loop
  
        >
          <source src={video.url} type="video/mp4" />
                Your browser does not support the video tag.
          
        </video>
        <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
          <div className="flex flex-grow gap-2 items-center">
            <Image
              alt={video.userName}
              className="rounded-full w-10 h-11 bg-black"
              src={video.avatarId? `${CLOUDINARY_FETCH_URL}/${video.avatarId}`: undefined }
            />
            <div className="flex flex-col">
              <p className="text-tiny text-white/60">{video.userName}</p>
              <p className="text-tiny text-white/60">{video.title}</p>
              

            </div>
          </div>
        </CardFooter>
      </Card>
      </div>
        )
        
      )
    }
    return(
        <>
        <section className="h-fit">
       <div className="m-4">
         <div className="card_header">
          <h1 className="card_title">Streamed videos</h1>
         </div>
         {urlVideos.length > 0
        ? 
        <div className="flex px-8 overflow-y-auto stream_container">
        <VideoStreams/>
        </div>
        :
        <div className="flex justify-center">
           <h1 className="font-semibold text-2xl m-12">No Streamed Videos</h1>
        </div>
       }
        </div>
        </section>
         </>
    )
}

export default StreamedVideos;