
import './App.css'
import Landing from '../src/User/pages/Landing/Landing'
import {Routes,Route,createBrowserRouter,
  createRoutesFromElements,} from 'react-router-dom'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Landing/>}/>
    </Routes>    
  )
}
export default App
