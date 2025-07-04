import React from 'react'

const Admin = () => {
  return (
    <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <form action="">
            <input type="text" placeholder='Enter admin id' />
            <input type="password" placeholder='Enter admin password' />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
            <button type="reset" className="bg-gray-500 text-white px-4 py-2 rounded ml-2">Reset</button>
            <button type="button" className="bg-red-500 text-white px-4 py-2 rounded ml-2">Logout</button>
            
        </form>
    </div>
  )
}

export default Admin