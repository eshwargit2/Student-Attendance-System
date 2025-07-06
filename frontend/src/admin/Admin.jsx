import React from 'react'

const Admin = () => {


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const adminId = e.target.adminId.value;
    const password = e.target.password.value;
    if (adminId === 'admin' && password === 'admin123') {
      alert('Login successful');
      // Redirect to admin dashboard or perform further actions
    } else {
      alert('Invalid credentials');
    }
  }

  const handleChange = (e) => {
    e.preventDefault();
    const adminId = e.target.adminId.value;
    const password = e.target.password.value;
    if (adminId === 'admin' && password === 'admin123') {
      alert('Login successful');
      // Redirect to admin dashboard or perform further actions
    } else {
      alert('Invalid credentials');
    }
  }

  return (
    <div>
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
       <form action="">
        <div className="flex flex-col items-center mt-5">
          <label htmlFor="adminId" className="mb-2">Admin ID:</label>
          <input type="text" id="adminId" name="adminId" className="border p-2 rounded mb-4" required />
          
          <label htmlFor="password" className="mb-2">Password:</label>
          <input type="password" id="password" name="password" className="border p-2 rounded mb-4" required />
          
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Login</button>
        </div>
       </form>
    </div>
  )
}

export default Admin