import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Admin = () => {


const [userName, setUserName] =useState('');
const [password, setPassword] = useState('');
const [msg, setMsg] =useState('');

const navigate = useNavigate();

const handleLogin= async ()=>{
  try{
    const res = await axios.post('http://localhost:5000/admin-login', {
     userName,
    password,
    });
    if(res.data.success){
     navigate('/rediract/barcodescannersecureroute'); // Redirect to the barcode scanner route
     
    }
   
  }catch(error){
    setMsg('Invalid credentials, please try again.');
}
}

  return (
    <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
       <form action="">
        <div className="flex flex-col items-center mt-5">
          <label htmlFor="adminId" className="mb-2">Admin ID:</label>
          <input type="text" id="adminId" name="adminId" 
          onChange={(e) => setUserName(e.target.value)} className="border p-2 rounded mb-4" required />

          <label htmlFor="password" className="mb-2">Password:</label>
          <input type="password"
          onChange={(e) => setPassword(e.target.value)} id="password" name="password" className="border p-2 rounded mb-4" required />

          <button onClick={handleLogin} className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
          {msg && <p className="text-red-500 mt-2">{msg}</p>}
        </div>
       </form>
    </div>
  )
}


export default Admin