// import React, { useEffect, useRef, useState } from 'react';
// import { BrowserMultiFormatReader } from '@zxing/browser';

// const BarcodeScanner = () => {

//   const videoRef = useRef(null);
//   const [barcode, setBarcode] = useState('');
//   const [error, setError] = useState('');

//   useEffect(() => {
//     const codeReader = new BrowserMultiFormatReader();

//     let controls;

//     //camera access
//     codeReader.decodeFromVideoDevice(null, videoRef.current, (result, error) => {
//         if (result) {
//           setBarcode(result.getText());
          
//           controls?.stop();
//         }
//         if (error) {
//            console.log(error);
           
//         }
//       })
//       .then((c) => {
//         controls = c;
//       })
//       .catch((err) => {
//         setError('Camera access failed or device not found.');
//         console.error(err);
//       });

//     return () => {
//       controls?.stop();
//     };
//   }, []);

//   return (
//     <div className="p-4 text-center  bg-gray-200 rounded-lg shadow-lg">
//       <h2 className="text-xl text-black font-bold mb-4">Scan Barcode</h2>
//       {error && <p className="text-red-500">{error}</p>}
//       <video
//         ref={videoRef}
//         style={{ width: '100%', maxWidth: '400px' ,height:"200px" , border: '2px solid black' }}
//         autoPlay
//         muted
//         className='border-2 border-gray-300 p-2 shadow-md rounded-lg'
//       />
//       {barcode && (
//         <div className="mt-4 text-green-600 font-semibold">
//           <p>Scanned Barcode: {barcode}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default BarcodeScanner;


import React, { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader } from '@zxing/browser';
import axios from 'axios';

const BarcodeScanner = () => {
  const videoRef = useRef(null);
  const [barcode, setBarcode] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    let controls;

    codeReader
      .decodeFromVideoDevice(null, videoRef.current, async (result, err) => {
        if (result) {
          const registerNo = result.getText();
          setBarcode(registerNo);
          controls?.stop(); 
          try {
            const res = await axios.post('http://localhost:5000/mark-attendance', {
              register_no: registerNo,
            });
            setMessage(res.data.message); // from backend
          } catch (error) {
            setMessage(' Attendance marking failed.');
          }
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

  return (
    <div className="p-4 text-center">
      <h2 className="text-xl font-bold mb-4">Scan Student QR Code</h2>
      {error && <p className="text-red-500">{error}</p>}
      <video
        ref={videoRef}
        style={{ width: '100%', maxWidth: '300px', border: '2px solid black' }}
        autoPlay
        muted
      />
      <input type="text" placeholder='Enter Student ID' className="mt-4 p-2 bg-gray-300 border border-gray-300 rounded" />
      <button className='m-2 p-2 bg-blue-500 cursor-pointer  text-white rounded' >Enter</button>
      {barcode && (
        <div className="mt-4">
          <p className="text-green-700 font-medium">Scanned: {barcode}</p>
        </div>
      )}
      {message && (
        <div className="mt-2">
          <p className="text-blue-600 font-semibold">{message}</p>
        </div>
      )}
    </div>
  );
};

export default BarcodeScanner;
