import { useSelector } from 'react-redux';
import { useLogoutMutation } from "../../slices/api_slices/usersApiSlice";
import {toast} from "react-toastify"
import { useNavigate } from "react-router-dom";
import {removeCredentials } from "../../slices/reducers/user_reducers/authSlice";
import {  useDispatch } from 'react-redux';

import RoomContainer from "../../components/RoomContainer/RoomContainer";


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
        <div className='h-screen'>
        <RoomContainer/>
        </div>
       
    )

}

export default Home;