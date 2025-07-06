import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Attended = () => {

    const date= new Date();
    const today = date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

    const navigate=useNavigate();
    const [Students, setStudents] = React.useState([]);
    const [size,setSize]=useState(false);

    axios.get('http://localhost:5000/present-today')
      .then(response => {
       // console.log(response.data);
        setStudents(response.data);
        if(response.data.length===0){
          setSize(true);
        }
        else{
          setSize(false);
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });

      
  return (
    <div className='flex flex-col items-center ' >
       <button onClick={() => navigate('/rediract/barcodescannersecureroute')} className='bg-blue-500 text-white px-4 py-2 rounded cursor-pointer'>Scan Now</button>
    <div className='flex flex-col items-center mt-4 card bg-slate-200 shadow-md rounded-lg p-4 max-w-2xl mx-auto'>
    <h2 className='text-2xl font-bold mb-4'>Attendance Records</h2>
    <div>Attended Students on {today}</div>
    {size && <div className='text-red-500'>No students attended today</div>}
    <div className='mb-4'>Total Students: {Students.length}</div>

   {!size && <table className='min-w-full border-collapse border border-gray-200'>
      <thead>
        <tr>
          <th className='border border-gray-300 p-2'>Name</th>
          <th className='border border-gray-300 p-2'>Register No</th>
          <th className='border border-gray-300 p-2'>Department</th>
        </tr>
      </thead>
      <tbody>
       
        {Students.map(student => (
          <tr key={student.register_no}>
            <td className='border border-gray-300 p-2'>{student.name}</td>
            <td className='border border-gray-300 p-2'>{student.register_no}</td>
            <td className='border border-gray-300 p-2'>{student.department}</td>
          </tr>
        ))}
      </tbody>
    </table>
}
</div>
    </div>
  )
}

export default Attended