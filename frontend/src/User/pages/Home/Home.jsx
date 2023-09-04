import HomeNavbar from "../../components/HomeNavbar/HomeNavbar";
import { useSelector } from 'react-redux';
import { useLogoutMutation } from "../../slices/api_slices/usersApiSlice";
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";
import {removeCredentials } from "../../slices/reducers/user_reducers/authSlice";
import {  useDispatch } from 'react-redux';
import SideBar from "../../components/SideBar/SideBar";
import "./Home.css"
import Video from "../../components/Video/Video"
import HomeSkeleton from "../../components/ShimmerForHome/HomeSkeleton";


const Home = ()=>{
    const userInfo  = useSelector((state) => state.auth.userInfo); 
    const [logOut,{isLoading}] = useLogoutMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutHandler =async ()=>{
    try {
          const res = await logOut()
        dispatch(removeCredentials())
         toast.success(res.data.message)
          navigate('/')           
        } catch (err) {
            toast.err(err.message)
        }
}


    return (
        <>
        <div className="broadcast-section">
        <h1 className="sub-title">Broadcast</h1>
        <div className="video-container">
            <div className="video-frame">
            <img src="/outriders.jpg" alt="" />
            <video src=""></video>
            </div>
            <div className="video-frame">
            <img src="/broadcast1.jpg" alt="" />
            </div>
            <div className="video-frame">
            <img src="/broadcast2.jpg" alt="" />
            </div>
        </div>
        </div>

        <div className="public-section">
        <h1 className="sub-title">Public Conferences</h1>
        <div className="video-container">
            <div className="video-frame">
            <img src="/public1.jpg" alt="" />
            </div>
            <div className="video-frame">
            <img src="/public2.jpg" alt="" />
            </div>
            <div className="video-frame">
            <img src="/public3.jpg" alt="" />
            </div>
        </div>
        </div>

        <div className="group-section">
        <h1 className="sub-title">Group Conferences</h1>
        <div className="video-container">
            <div className="video-frame">
            <img src="/group1.jpg" alt="" />
            </div>
            <div className="video-frame">
            <img src="/group2.jpg" alt="" />
            </div>
            <div className="video-frame">
            <img src="/group3.jpg" alt="" />
            </div>
        </div>
        </div>


        </>
       
    )

}

export default Home;