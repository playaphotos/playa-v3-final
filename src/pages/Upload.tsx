import React, { useState } from 'react';
import { useParams } from 'react-router-dom';

const Upload = () => {
  const { eventId } = useParams();
  const [status, setStatus] = useState('Waiting...');

  return (
    <div className="min-h-screen bg-black text-white p-10 text-center">
      <h1 className="text-4xl font-bold text-green-500 mb-4">It Works!</h1>
      <p className="text-xl mb-4">You are uploading to event: {eventId}</p>
      
      <div className="p-4 border border-white rounded mt-4">
         <p>Status: {status}</p>
         <button 
           onClick={() => setStatus('Button Clicked!')}
           className="bg-blue-600 text-white px-6 py-3 rounded mt-4"
         >
           Test Button
         </button>
      </div>
    </div>
  );
};
export default Upload;