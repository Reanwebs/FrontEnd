import { Routes, Route} from 'react-router-dom'
import Layout from './User/pages/Layout'
import Landing from '../src/User/pages/Landing/Landing'
import UserPrivateRoute from './User/pages/UserPrivateRoute/UserPrivateRoute'
import Home from './User/pages/Home/Home'
import Profile from './User/pages/Profile/Profile'
import Schedule from './User/pages/Schedule/Schedule'
import Conference from './User/pages/Conference/Conference'
import Group from './User/pages/Group/Group'
import Chat  from './User/pages/Chat/Chat'
import MediaContainer from './User/components/MediaContainer/MediaContainer'
import GoLive from './User/pages/GoLive/GoLive'
import LiveContainer from './User/components/LiveContainer/LiveContainer'


import AdminLayout from './Admin/pages/AdminLayout'
import AdminLogin from './Admin/pages/loginPage/AdminLogin'
import AdminHome from './Admin/pages/AdminPrivateRoute/AdminPrivateRoute'
import Dashboard from './Admin/components/DashBoard/DashBoard'
import UserTable from './Admin/components/UsersTable/Table'
import InterestTable from './Admin/pages/Interests/InterestTable'
import CommunityTable from './Admin/pages/CommunityTable/CommunityTable'

function App() {
  return (
      <Routes>
        <Route path='/' element={<Layout/>}>
           <Route index={true} element={<Landing/>}/>
           <Route path='' element={<UserPrivateRoute/>}>
             <Route path='home' element={<Home/>}/>
             <Route path='profile' element={<Profile/>}/>
             <Route path='schedule' element={<Schedule/>}/>
             <Route path='conference' element={<Conference/>}/>
             <Route path='group' element={<Group/>}/>
             <Route path='chat'element={<Chat/>}/>
             <Route path='media-container/:id'element={<MediaContainer/>}/>
             <Route path='go-live' element={<GoLive/>}/>
             <Route path='live/:id' element={<LiveContainer/>}/>
           </Route>
        </Route>
        <Route path='/admin' element={<AdminLayout/>}>
          <Route index={true} element={<AdminLogin/>}/>
          <Route path='' element={<AdminHome/>}>
            <Route path='home' element={<Dashboard/>}/>
            <Route path='users' element={<UserTable/>}/>
            <Route path='interests' element={<InterestTable/>}/>
            <Route path='community' element={<CommunityTable/>}/>
            <Route/>
          </Route>
        </Route>
      </Routes>  
    
  )
}
export default App
