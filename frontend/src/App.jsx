import { useState } from 'react'
import axios from 'axios'

import './App.css'
import BarcodeScanner from './components/Scanner'
import Attended from './components/Attended';
import { Route, Routes, useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  return (
    <div className='flex flex-col items-center  min-h-screen p-4 ' >
     <h1 className='text-4xl font-bold mb-4 text-center mt-3' >Student Attendance System {name}</h1>

    
    

     <Routes>
        <Route path='/' element={<BarcodeScanner/>} />
        <Route path='/attended' element={<Attended/>} />
      </Routes>


    </div>
  )
}

export default App
