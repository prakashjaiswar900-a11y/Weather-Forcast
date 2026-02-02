import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Nav from './components/Nav'
import w from './assets/img/w.jpg'






function App() {
      const[count,setcount] = useState()
  
  
  return (
    <div className=' relative w-full h-screen flex items-center justify-center overflow-hidden'  ><img src={w} alt='' className='w-full h-screen' />
      <div className='absolute left-15 w-140 h-220 bg-white/30  backdrop-blur-none rounded-2xl ' >
        <Nav  />
    
      </div>

    </div>
   
  )}

  

export default App
