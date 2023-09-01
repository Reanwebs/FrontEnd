import AdminHomeNavbar from "../../components/AdminHomeNavbar/AdminHomeNavbar";
import { useSelector } from 'react-redux';
import {useAdminLogoutMutation} from '../../slices/apiSlice/adminApiSlice'
import { useNavigate ,Navigate,Outlet} from "react-router-dom";
import { useDispatch } from "react-redux";
import {removeCredentials} from "../../slices/reducers/adminAuthSlice"
import { toast } from "react-toastify";
import { useState } from 'react';
import Sidebar from "../../components/SideBar/SideBar";
import './AdminPrivateRoute.scss';


const AdminHome = ()=>{
    const adminInfo = useSelector((state)=> state.admin.adminInfo)
    const [logout] = useAdminLogoutMutation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [collapsed, setCollapsed] = useState(false);
  const [image, setImage] = useState(false);
  const [toggled, setToggled] = useState(false);

  const handleCollapsedChange = () => {
    setCollapsed(!collapsed);
  };


  const handleToggleSidebar = (value) => {
    setToggled(value);
  };
    async function logoutHandler(){
        try {
            const res = await logout()
            console.log(res);
            dispatch(removeCredentials())
            navigate('/admin')            
        } catch (error) {
            toast.error(error?.data?.message)
        }
    }

    return (
        adminInfo ? (
            <>
            <AdminHomeNavbar adminInfo={adminInfo} logoutHandler={logoutHandler} />
            <div className={`app ${toggled ? 'toggled' : ''}`}>
           <Sidebar
             image={image}
             collapsed={collapsed}
             toggled={toggled}
             handleToggleSidebar={handleToggleSidebar}
             handleCollapsedChange={handleCollapsedChange}
     
           />
          <Outlet/>
     
         </div>
         </>

        )
       :(
        <Navigate to='/admin' replace />
       )
    )
}

export default AdminHome;