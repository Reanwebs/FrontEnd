import Header from "../../components/Navbar/Navbar";
import { Navigate,useNavigate } from "react-router-dom";
import {useSelector} from "react-redux"
import Body from "../../components/Body/Body"




const Landing = ()=>{
    const userInfo  = useSelector((state) => state.auth.userInfo);
    return (
        <>
        {userInfo 
          ? <Navigate to={'/home'}/>
          : 
          <>
          <Header/>
          <Body/>
        </>
        }       
        </>
    )
}


export default Landing;