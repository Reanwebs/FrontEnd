import { useSelector } from "react-redux";
import {Avatar} from "@nextui-org/react";
import CameraIcon from "../../components/CameraIcon/CameraIcon";
import { Button } from "@nextui-org/react";


const Profile = ()=>{

     const userInfo  = useSelector((state) => state.auth.userInfo); 
     console.log(userInfo);
    return (
     <section className="h-screen ml-12 pl-5 pr-5 justify-center ">
        <div className="bg-gray-800 m-12">
        <div className="max-w-md mx-auto  rounded-xl shadow-md overflow-hidden md:max-w-max mt-12 ">
            <div className="md:flex justify-center items-center">
                <div className="md:shrink-0 relative mt-3">
                 <Avatar src="" className="w-20 h-20 text-large"/>
                 <div className="absolute bottom-0 right-0 ">
                 <CameraIcon className="animate-pulse w-6 h-6 text-default-500" fill="bg-white" size={30} />  
                 </div>     
                </div>
            </div>
            <div className="pt-8 flex items-center ">
                <p className="m-1">User Name:</p>
                <p className="text-lg font-semibold">{userInfo?.userName}</p>
                <Button color="primary" variant="flat" className="m-2">change</Button>
            </div>
            <div className="flex items-center">
                <p className="m-1">Email:</p>
                <p className="text-lg font-semibold">{userInfo?.email}</p>
                <Button color="primary" variant="flat" className="m-2">change</Button>
            </div>
            {userInfo.phoneNumber &&
            <div className="flex items-center">
                <p className="m-1">Phone Number:</p>
                <p className="text-lg font-semibold">{userInfo?.phoneNumber}</p>
                <Button color="primary" variant="flat" className="m-2">change</Button>
            </div>
            }
        </div>
    </div>
    </section>
    )
}

export default Profile