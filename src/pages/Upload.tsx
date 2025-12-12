import React from 'react';
import { useParams } from 'react-router-dom';

const Upload = () => {
  const { eventId } = useParams();
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold text-green-500 mb-4">Upload Ready</h1>
      <p className="text-xl">You are connected to: <span className="text-indigo-400 font-bold">{eventId}</span></p>
      <button className="mt-8 bg-indigo-600 px-8 py-4 rounded-xl font-bold">Take Photo</button>
    </div>
  );
};
export default Upload;