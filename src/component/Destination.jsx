import React from 'react';
import { useLoaderData, useParams } from 'react-router';
import Navbar from './Navbar';
import BookingCart from './BookingCart';
import Register from './Register';

const Destination = () => {
    const {id} = useParams()
    const data = useLoaderData()
    console.log(data)
    const findData = data.find(singleId => singleId.id == id)
    console.log(findData)
    return (
        <div
        className="min-h-screen bg-cover bg-center flex flex-col"
        style={{
            backgroundImage: findData?.image
              ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.73)), url(${findData.image})`
              : 'none',
          }}
      >
        {/* Navbar */}
        <Navbar></Navbar>
  
        {/* Main Content */}
        <div className="flex flex-col md:flex-row h-[80vh] items-center justify-around px-10">
          {/* Left Side */}
          <div className="text-white max-w-lg bg-opacity-50 p-8 rounded-lg">
            <h1 className="text-5xl font-bold mb-4">{findData?.name}</h1>
            <p className="mb-6">{findData?.bigDescription}</p>
          </div>

          {/* right side */}
          <BookingCart findData={findData}></BookingCart>
        </div>
      </div>
    );
};

export default Destination;