import { useBlockVideoMutation } from "../../slices/apiSlice/adminApiSlice"
import { useGetVideoDetailsByIdMutation } from "../../../User/slices/api_slices/videoStreamApiSlice"
import {  useParams } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {S3Client, GetObjectCommand} from "@aws-sdk/client-s3";
import {getSignedUrl} from "@aws-sdk/s3-request-presigner"
import { AWS_SECRET_KEY,AWS_ACCESS_KEY,BUCKET_NAME } from "../../../utils/config/config";
import { RingLoader } from 'react-spinners';
import { CLOUDINARY_FETCH_URL } from "../../../utils/config/config";
import { Avatar, Button } from "@nextui-org/react";



const ViewVideo = ()=>{

    const { id } = useParams();
    const [videos,setVideos] = useState({})
    const [urlVideos,setUrlVideos] = useState({})
    const [loading,setLoading] = useState(false)
    const [userName] = useState('admin')
    const [blockVideo] = useBlockVideoMutation()
    const [getVideoDetails] = useGetVideoDetailsByIdMutation()

    useEffect(()=>{

        async function getVideoDetailsHandler(){
            try {
            const res = await getVideoDetails({id,userName}).unwrap();
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
        getVideoDetailsHandler()

    },[])

    useEffect(()=>{
        init()
      },[urlVideos])

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
        if(videos.S3Path){
          const command = new GetObjectCommand({ Bucket: bucketName, Key:videos.S3Path});
          const url = await getSignedUrl(s3, command, { expiresIn: 15 * 60 });
             
              setVideos({
                ...videos,
                url
              })
              setLoading(false)
        }
        
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
            <div className="m-4 bg-gray-950 flex flex-col  ">
              <div className="flex bg-gray-950 justify-center">
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
          
              </div>
              </div>
              <div className="flex justify-center" >
              <div className="w-3/5 h-[200px] ">
             <div className="flex gap-5 mt-6 ml-4 w-full">
              <Avatar isBordered radius="full" size="md" src={`${CLOUDINARY_FETCH_URL}/${videos.avatarId}`} />
              <div className="flex flex-col gap-1 items-start justify-center">
                <h4 className="text-small font-semibold leading-none text-default-600">wfq{videos.userName}</h4>
              </div>
              
             </div>
             <div className="flex gap-5 mt-6 ml-4 justify-between">
             <div className="flex flex-col gap-1 items-start justify-center">
             <h4 className="text-small font-semibold leading-none text-default-600">dwsef{videos.title}</h4>
             <h4 className="text-small font-semibold leading-none text-default-600">wqfdq{videos.description}</h4>
             </div>
             <div className="flex justify-items-end">
                <Button color="danger" variant="bordered">
                    Block
                </Button>
             </div>
             </div>
             
             </div>
             
              </div>
            </div>
          </section>
    )
}

export default ViewVideo;