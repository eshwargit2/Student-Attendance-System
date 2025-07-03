import { useState } from 'react'
import axios from 'axios'

import './App.css'
import BarcodeScanner from './components/Scanner'

function App() {
  
  const [name, setName] = useState('');

  const backendData = axios.get('http://localhost:5000/api/std')
  .then(response => {
    console.log(response.data.name);
    setName(response.data.name);
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });

  return (
    <div className='flex flex-col items-center  min-h-screen p-4 text-white' >
     <h1 className='text-3xl font-bold mb-4 text-center mt-10' >Student Attendance System {name}</h1>
     <BarcodeScanner/>
    </div>
  )
}

export default App
