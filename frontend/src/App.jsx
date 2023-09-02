
import Layout from './User/pages/Layout'
import Landing from '../src/User/pages/Landing/Landing'
import PrivateRoute from './User/components/PrivateRoute/PrivateRoute'
import Home from './User/pages/Home/Home'
import { Routes, Route} from 'react-router-dom'
import AdminLayout from './Admin/pages/AdminLayout'
import AdminLogin from './Admin/pages/loginPage/AdminLogin'
import AdminHome from './Admin/pages/AdminPrivateRoute/AdminPrivateRoute'
import Dashboard from './Admin/components/DashBoard/DashBoard'
import UserTable from './Admin/components/UsersTable/Table'
import InterestTable from './Admin/pages/Interests/InterestTable'

function App() {
  return (
      <Routes>
        <Route path='/' element={<Layout/>}>
           <Route index={true} element={<Landing/>}/>
           <Route path='' element={<PrivateRoute/>}>
             <Route path='home' element={<Home/>}/>          
           </Route>
        </Route>
        <Route path='/admin' element={<AdminLayout/>}>
          <Route index={true} element={<AdminLogin/>}/>
          <Route path='' element={<AdminHome/>}>
            <Route path='home' element={<Dashboard/>}/>
            <Route path='users' element={<UserTable/>}/>
            <Route path='interests' element={<InterestTable/>}/>
            <Route/>
          </Route>
        </Route>
      </Routes>  
    
  )
}
export default App
