
import './App.css'
import Landing from '../src/User/pages/Landing/Landing'
import PrivateRoute from './User/components/PrivateRoute/PrivateRoute'
import Home from './User/pages/Home/Home'
import { Routes, Route} from 'react-router-dom'

function App() {
  return (
    
      <Routes>
        <Route path='/' element={<Landing/>}></Route>
           <Route path='' element={<PrivateRoute/>}>
              <Route path='home' element={<Home/>}/>          
         </Route>
      </Routes> 
    
  )
}
export default App
