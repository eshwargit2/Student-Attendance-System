import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const BarcodeScanner = () => {
  const videoRef = useRef(null);
  const [barcode, setBarcode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [inputValue, setInputValue] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    let controls;

    codeReader
      .decodeFromVideoDevice(null, videoRef.current, async (result, err) => {
        if (result) {
          const registerNo = result.getText();
          setBarcode(registerNo);
          controls?.stop();
          handleAttendance(registerNo); 
        }

        if (err && !(err instanceof NotFoundException)) {
          console.error(err);
        }
      })
      .then((c) => {
        controls = c;
      })
      .catch((err) => {
        setError('Camera access failed or device not found.');
        console.error(err);
      });

    return () => {
      controls?.stop();
    };
  }, []);

  
  const handleAttendance = async (registerNo) => {
    try {
      const res = await axios.post('http://localhost:5000/mark-attendance', {
        register_no: registerNo,
      });
      setMessage(res.data.message);
    } catch (error) {
      setMessage('Attendance marking failed.');
    }
  };

  
  const handleManualEntry = () => {
    if (inputValue.trim() === '') {
      setMessage('Please enter a valid Register No.');
      return;
    }
    setBarcode(inputValue.trim());
    handleAttendance(inputValue.trim());
    setInputValue('');
  };

  const Enterbtn=(event)=>{
    if(event.key === 'Enter'){
      handleManualEntry();
    }
    else{
      console.log("Please press Enter to submit");
      
    }
    }
  return (
    <div className='flex flex-col items-center '>
       <button onClick={() => navigate('/attended')} className='bg-blue-500 text-white  px-4 py-2 rounded cursor-pointer'>View Attended Students</button>
    <div className="p-4 text-center card bg-slate-200 shadow-md rounded-lg mt-5 max-w-md mx-auto felx flex-col items-center and justify-center">
      <h2 className="text-xl font-bold mb-4">Scan Student QR Code or Enter Manually</h2>

      {error && <p className="text-red-500">{error}</p>}

      {/*Video Scanner */}
      <video
        ref={videoRef}
        style={{ width: '100%', maxWidth: '300px', border: '2px solid black' }}
        autoPlay
        muted
        className='ms-10 mb-4 rounded-lg shadow-lg'
      />

   
      <div className="mt-4">
        <input
          type="text"
          placeholder="Enter Register No"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="p-2 w-64 bg-gray-200 border border-gray-300 rounded"
        />
        <button
          onClick={handleManualEntry}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onKeyDown={Enterbtn}
        >
          Enter
        </button>
      </div>

     
      {barcode && (
        <div className="mt-4">
          <p className="text-green-700 font-medium">Scanned/Register No: {barcode}</p>
        </div>
      )}
      {message && (
        <div className="mt-2">
          <p className="text-blue-600 font-semibold">{message}</p>
        </div>
      )}
    </div>
    </div>
  );
};

export default BarcodeScanner;
