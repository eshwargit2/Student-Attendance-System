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
        {/* <h1 className="text-2xl font-bold">Admin Dashboard</h1>
       <form onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
       }}>
        <div className="flex flex-col items-center mt-5">
          <label htmlFor="adminId" className="mb-2">Admin ID:</label>
          <input type="text" id="adminId" name="adminId" 
          onChange={(e) => setUserName(e.target.value)} className="border p-2 rounded mb-4" required />

          <label htmlFor="password" className="mb-2">Password:</label>
          <input type="password"
          onChange={(e) => setPassword(e.target.value)} id="password" name="password" className="border p-2 rounded mb-4" required />

          <button type='submit' className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
          {msg && <p className="text-red-500 mt-2">{msg}</p>}
        </div>
       </form> */}
       <section class="">
  <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto w-200 md:h-screen lg:py-0">
      
      <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Admin Login Page
              </h1>
              <form class="space-y-4 md:space-y-6" onSubmit={(e) => {
                  e.preventDefault();
                  handleLogin();
              }}>
                  <div>
                      <label for="email" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input  type="text" id="adminId" name="adminId" 
          onChange={(e) => setUserName(e.target.value)}  class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                  </div>
                  <div>
                      <label for="password" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input type="password"
          onChange={(e) => setPassword(e.target.value)} id="password" name="password" placeholder="••••••••" class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                  </div>
                  <div class="flex items-center justify-between">
                      <div class="flex items-start">
                          
                         
                      </div>
                     
                  </div>
                  <button  type='submit' className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</button>
                 
              </form>
               {msg && <p className="text-red-500 mt-2">{msg}</p>}
          </div>
      </div>
  </div>
</section>
    </div>
  )
}


export default Admin