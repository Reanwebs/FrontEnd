import Header from "../../components/Navbar/Navbar";
import { Navigate,useNavigate } from "react-router-dom";
import {useSelector} from "react-redux"


const Landing = ()=>{
    const userInfo  = useSelector((state) => state.auth.userInfo);
    return (
        <>
        {userInfo 
          ? <Navigate to={'/home'}/>
          : <Header/>
        }       
        </>
    )
}


export default Landing;