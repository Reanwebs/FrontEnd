
import './App.css'
import Layout from './User/pages/Layout'
import Landing from '../src/User/pages/Landing/Landing'
import PrivateRoute from './User/components/PrivateRoute/PrivateRoute'
import Home from './User/pages/Home/Home'
import { Routes, Route} from 'react-router-dom'

function App() {
  return (
      <Routes>
        <Route path='/' element={<Layout/>}>
           <Route index={true} element={<Landing/>}/>
           <Route path='' element={<PrivateRoute/>}>
             <Route path='home' element={<Home/>}/>          
           </Route>
        </Route>
      </Routes>  
    
  )
}
export default App
