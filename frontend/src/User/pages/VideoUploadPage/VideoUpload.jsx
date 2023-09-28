import { Input,Textarea,Select,SelectItem,Image,Button } from "@nextui-org/react"
import { useState,useEffect } from "react"
import { useSelector } from "react-redux";
import { useUserGetInterestsMutation } from "../../slices/api_slices/usersApiSlice";
import { useUploadVideoMutation } from "../../slices/api_slices/videoStreamApiSlice";
import { toast } from "react-toastify";
import axios from "axios";
import {CLOUDINARY_UPLOAD_URL } from "../../../utils/config/config";
import { useNavigate } from "react-router-dom";


const VideoUploadPage = ()=>{
    const userInfo  = useSelector((state) => state.auth.userInfo); 
    const [interest,setInterest] = useState([])
    const [isLoading,setLoading] = useState(false)


    const [videoData,setVideoData] = useState({
        title:'',
        description:'',
        interest:'',
        userName:userInfo.userName,
        avatarId:userInfo.avatarId ? userInfo.avatarId : '',
        thumbnailId:'',
        videoFile:[]
    })

    const [selectedVideo,setSelectedVideo] = useState(null)
    const [thumbnail,selectedThumbnail] = useState(null)
    const [videoFile,setVideoFile] = useState(null)
    const [getInterest] = useUserGetInterestsMutation()
    const [uploadVideo] = useUploadVideoMutation()
    const navigate = useNavigate()


    useEffect(()=>{
        getInterestHandler()
      },[])

      const getInterestHandler = async ()=>{
        try {
          const res = await getInterest().unwrap();
          setInterest(res.Interests)
        } catch (error) {
          toast.error(error.data.message || error.message)
          
        }
      }

      function uploadVideoHandler(e){
        try {
            console.log(e.target.files);
            const file = e.target.files[0];
            console.log(file);
            setVideoData({
                ...videoData,
                videoFile:file
            })
            const url = URL.createObjectURL(file);
            setSelectedVideo(url)
            setVideoFile(e.target.files[0])
            console.log(videoData);
        } catch (error) {
            console.log(error);
        }
      }

      async function uploadDataHandler(){
        try {
            setLoading(true)
            validate()
            const formData = new FormData();
            formData.append("file",thumbnail);
            formData.append("upload_preset","reanconnect");
            const cloudRes = await axios.post(CLOUDINARY_UPLOAD_URL,formData)
            const data = new FormData()
            console.log(videoFile,"video fileee");
            data.append("video",videoFile)
            data.append("title",videoData.title)
            data.append("description",videoData.description)
            data.append("userName",videoData.userName)
            data.append("avatarId",videoData.avatarId)
            data.append("thumbnailId",cloudRes.data['public_id'])
            data.append("interest",videoData.interest)
            const res = await uploadVideo(data).unwrap()
            console.log(res);
            toast.success("video uploaded successfully")
            navigate('/profile')
            setLoading(false)
        } catch (error) {
            console.log(error);
            setLoading(false)
            toast.error(error?.data?.message || error?.message)
        }
    }

    function validate(){
        if(!videoData.title || !videoData.description || !videoData.interest ) throw new Error("please enter all fileds")
        if(!thumbnail) throw new Error("please select a thumbnail")
        if(!selectedVideo) throw new Error("please select a video file")
    }
    return (
        <div className="flex flex-col items-center m-12 h-screen">
            <div className="m-2 ">
                <h1 className="font-semibold text-2xl ">Upload Video</h1>
            </div>
             <div className="m-2 ">
                <label>Title:</label>
                    <Input
                        placeholder='enter a title for your stream'
                        type="text"
                        name="title"
                        classNames="w-full"
                        isRequired
                        value={videoData.title}
                        onChange={(e)=>{
                            setVideoData({
                                ...videoData,
                                title:e.target.value
                            })
                        }}
                    />
             </div>
             <div className="m-2 ">
                <label>Description:</label>
                <Textarea
                    placeholder='enter a description for your stream'
                    name="description"
                    isRequired
                    value={videoData.description}
                    onChange={(e)=>{
                        setVideoData({
                            ...videoData,
                            description:e.target.value
                        })
                    }}
                />
             </div>
             <div className="m-2 ">
                <label>Interest:</label>
                <Select
                    isRequired
                    label='interests'
                    placeholder='select an interest'
                    classNames="w-full"
                    onChange={(e)=>{
                        setVideoData({
                            ...videoData,
                            interest:e.target.value
                        })
                    }}
                    name='interest'
                    >
                        {interest.map((value) => (
                        <SelectItem key={value.interest}  value={value.interest} className="w-fit">
                            {value.interest}
                        </SelectItem>
                        ))}
                    </Select>
              </div>
              <div className="m-2">
              <label className="cursor-pointer">
                 select a thumbnail :
                 </label>  
                    <Input
                    type="file"
                    accept=".jpg, .jpeg, .png, .webp"
                    classNames="w-full"
                    placeholder="select a thumbnail"
                    name="thumbnail"
                    onChange={(e) => selectedThumbnail(e.target.files[0])}
                    />
                    <div className="m-2">
                     <Image
                            width={200}
                            alt="thumbnail"
                            name={'thumbnail'} src={
                                thumbnail
                                ? URL.createObjectURL(thumbnail)
                                : undefined 
                            }
                            />
                    </div>
               
              </div>
              <div className="m-2">
              <label className="cursor-pointer ">
                 select a video :
                 </label>  
                    <Input
                    type="file"
                    accept=".mp4"
                    classNames="w-full"
                    placeholder="select a thumbnail"
                    name="thumbnail"
                    onChange={(e) => 
                      uploadVideoHandler(e)
                    }
                    />
                    {selectedVideo && 
                    <div className="m-2">
                    <video
                    className="VideoInput_video"
                    width={300}
                    height={200}
                    controls
                    src={selectedVideo}
                    />
                    </div>
                    }
              </div>
              <div className="m-2">
              <Button 
                className="m-2"
                onClick={()=>{
                    navigate('/profile')
                }}
                >
                    cancel
                </Button>
                <Button 
                color="primary"
                isLoading={isLoading}
                onClick={uploadDataHandler}
                >
                    submit
                </Button>

              </div>
           </div>
    )
}

export default VideoUploadPage