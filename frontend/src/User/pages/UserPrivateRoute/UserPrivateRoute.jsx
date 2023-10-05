import { useEffect,useState } from "react";
import HomeNavbar from "../../components/HomeNavbar/HomeNavbar";
import { useSelector } from 'react-redux';
import { useLogoutMutation,useValidateUserStatusMutation } from "../../slices/api_slices/usersApiSlice";
import { useGetWalletMutation } from "../../slices/api_slices/userMonetizationApiSlice";
import {toast} from "react-toastify"
import { useNavigate ,Navigate, Outlet} from "react-router-dom";
import {removeCredentials,setToken } from "../../slices/reducers/user_reducers/authSlice";
import {  useDispatch } from 'react-redux';
import { Cookies } from "react-cookie";
import Footer from "../../components/Footer/Footer";



const UserPrivateRoute  = ()=>{
    const cookie = new Cookies()
    const authCookie = cookie.get("user-auth")
    const userInfo  = useSelector((state) => state.auth.userInfo); 
    const [logOut,{isLoading}] = useLogoutMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [vaidateUser] = useValidateUserStatusMutation()
    const [getWallet] = useGetWalletMutation()
    const [status,setStatus] = useState(false)
    const [coins,setCoins] = useState('')


    useEffect(()=>{
        vaidateUserStatus();
        getWalletHandler()

    },[status])

    const vaidateUserStatus = async ()=>{
        console.log("ok i was called !!!!!!!!out side auth!!!! cookie");
        try {
            if(!authCookie ){
               console.log("ok i was called in side auth cookie");
               dispatch(removeCredentials());
               setStatus(!status)
               navigate('/')
            }else{
                dispatch(setToken(authCookie))
            }
            if(userInfo){
                const res = await vaidateUser({email:userInfo.email}).unwrap();
                if(res.isBlocked){
                    dispatch(removeCredentials());
                    setStatus(!status)
                    toast.error('you have been blocked by admin');
                    navigate('/')
                }
            }
        } catch (err) {
            toast.error(err.message)
        }
       
    }

    const logoutHandler =async ()=>{
        try {
              const res = await logOut()
            dispatch(removeCredentials())
             toast.success(res.data.message)
              navigate('/')           
            } catch (err) {
                toast.error(err.message)
            }
        }

        const getWalletHandler =async ()=>{
            try {
                const res = await getWallet().unwrap()
                console.log(res,"user wallet data");
                setCoins(res.Coins)
            } catch (error) {
                console.log(error);
            }
        }

    return (
       userInfo && authCookie
       ?(
        <>  
        <HomeNavbar userInfo={userInfo} logoutHandler={logoutHandler} isLoading={isLoading} coins={coins} />
        <Outlet />
        <Footer/>
       
        </>
       )
       :(
          <Navigate to='/' replace />
       )
       
    )

}

export default UserPrivateRoute;