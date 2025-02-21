import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Signin} from './components/Signin'
import {Signup} from './components/Signup'
import  Dashboard from './components/Dashboard'
// import Land from "./components/Land"
import {BrowserRouter,Route,Routes} from 'react-router-dom'
// import SendMoney from './components/SendMoney'
import SendMoney from './components/SendMoney'
function App() {
  const [count, setCount] = useState(0)

  return (
   <>
  <BrowserRouter>
    <Routes>
     <Route path='/signup' element={<Signup />}/>
     <Route path='/signin' element={<Signin />}/>
     <Route path='/' element={<Dashboard/>}/>
     <Route path='/send' element={<SendMoney />}/>
    </Routes>
  </BrowserRouter>
   </>
  )
}

export default App
