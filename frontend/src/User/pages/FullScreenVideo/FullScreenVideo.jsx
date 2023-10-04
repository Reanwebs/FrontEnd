import { useGetVideoDetailsByIdMutation,useToggleStarMutation } from "../../slices/api_slices/videoStreamApiSlice"
import {useEffect,useState} from 'react';
import { GetObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"
import {BUCKET_NAME } from "../../../utils/config/config";
import { RingLoader } from 'react-spinners';
import { CLOUDINARY_FETCH_URL } from "../../../utils/config/config";
import {  useParams } from 'react-router-dom';
import { Avatar } from "@nextui-org/react";
import { useSelector } from "react-redux";
import Report from "./ReportMenu";
import s3 from "../../../utils/s3SetUp/bucket";


const FullScreenVideo = ()=>{

    const [videos,setVideos] = useState({})
    const [urlVideos,setUrlVideos] = useState({})
    const [loading,setLoading] = useState(false)
    const { id } = useParams();
    const userInfo = useSelector((state)=> state.auth.userInfo)
    const userName = userInfo.userName
    const [isStarred,setIsStarred] = useState(false)
    const [showReport,setShowReport] = useState(false)

    const [getVideoDetails] = useGetVideoDetailsByIdMutation();
   
    const [toggleStar] = useToggleStarMutation()
    
    useEffect(()=>{
        async function getVideosHandler(){
         try {
           const res = await getVideoDetails({id,userName}).unwrap()
           setLoading(true)
          
           setVideos({
            ...res,
            url:''
           })
           setUrlVideos({
            ...res,
            url:''
           })

         } catch (error) {
           console.log(error);
         }
        }
        getVideosHandler()
        
      },[])

      useEffect(()=>{
        init()
      },[urlVideos])

    
        async function init(){
          try {
          if(videos.S3Path){
            const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key:videos.S3Path});
            const url = await getSignedUrl(s3, command, { expiresIn: 15 * 60 });
               
                setVideos({
                  ...videos,
                  url
                })
                if(videos.isStarred){
                  setIsStarred(videos.isStarred)
                }
                setLoading(false)
          }
          
          } catch (error) {
            console.log(error);
          }
        }

        async function toggleStarHandler(){
          try {
            const data = {
              starred:videos.isStarred ? videos.isStarred : true,
              userName:userInfo.userName,
              videoId:videos.VideoId.toString()
            }
             await toggleStar(data).unwrap()
            setIsStarred(!isStarred)
          } catch (error) {
            console.log(error);
          }
        }
    
      




    return(
      loading ? <div className="w-full flex justify-center h-full">
      <div className="py-52">
        <RingLoader color="#1bacbf"/>
      </div>
    </div>:
        <section className="h-screen w-full">
          {console.log(videos,"videos in full screen")}
          <div className="m-4 bg-gray-950 flex flex-col">
            <div className="flex bg-gray-950">
            <div className="w-4/5 h-[650px]">
            <video
              className="z-0 w-full h-full object-cover "
              muted
              loop
              controls
              >

          <source src={videos.url} type="video/mp4" />
                Your browser does not support the video tag.
          
        </video>
        <div className='flex mt-4 justify-end '>
              <div className='flex m-2'
              style={{cursor:'pointer'}}
              onClick={toggleStarHandler}
              >
                  <p>
                    {videos.starred}
                  </p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill={isStarred ? "white" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke={ "white"} className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
              </div>
              <div className='flex m-2'>
                  <p>
                    {videos.views}
                  </p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" fill='black' />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" fill='black'/>
                  </svg>
              </div>
              <div className='flex m-2 relative' style={{cursor:'pointer'}} onClick={()=> setShowReport(!showReport)}>
            
                  {showReport &&  <Report id={id} setShowReport={setShowReport}/>}
                   
               
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3v1.5M3 21v-6m0 0l2.77-.693a9 9 0 016.208.682l.108.054a9 9 0 006.086.71l3.114-.732a48.524 48.524 0 01-.005-10.499l-3.11.732a9 9 0 01-6.085-.711l-.108-.054a9 9 0 00-6.208-.682L3 4.5M3 15V4.5" />
              </svg>
               
              </div>
            </div>
            </div>
            <div className="w-1/5 " >
              <div className="items-center flex flex-col ">
                    <div className="">
                      <h1 className="font-semibold">YOU MIGHT ALSO LIKE</h1>
                    </div>
              </div>
            </div>
            </div>
            <div className="flex" >
            <div className="w-3/5 h-[200px] ">
           <div className="flex gap-5 mt-6 ml-4">
            <Avatar isBordered radius="full" size="md" src={`${CLOUDINARY_FETCH_URL}/${videos.avatarId}`} />
            <div className="flex flex-col gap-1 items-start justify-center">
              <h4 className="text-small font-semibold leading-none text-default-600">{videos.userName}</h4>
            </div>
           </div>
           <div className="flex gap-5 mt-6 ml-4">
           <div className="flex flex-col gap-1 items-start justify-center">
           <h4 className="text-small font-semibold leading-none text-default-600">{videos.title}</h4>
           <h4 className="text-small font-semibold leading-none text-default-600">{videos.description}</h4>
           </div>
           </div>
           </div>
           
            </div>
          </div>
        </section>
    )
}

export default FullScreenVideo