import React, { useState, useEffect } from "react";
import { FaAnglesLeft, FaAnglesRight, FaArrowRightLong } from "react-icons/fa6";
import Navbar from "./Navbar";
import "../App.css";
import { Link } from "react-router";

const DestinationCarousel = () => {
  const [places, setPlaces] = useState([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    fetch("/places.json")
      .then((res) => res.json())
      .then((data) => setPlaces(data));
  }, []);

  const nextSlide = () => {
    setCurrent(current === places.length - 1 ? 0 : current + 1);
  };

  const prevSlide = () => {
    setCurrent(current === 0 ? places.length - 1 : current - 1);
  };

  if (places.length === 0) return null;

  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col"
      style={{
        backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.52), rgba(0, 0, 0, 0.73)), url(${places[current].image})`,
      }}
    >
      {/* Navbar */}
      <Navbar></Navbar>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-between px-4 md:px-10 py-6 gap-6 min-h-[80vh]">
        {/* Left Side */}
        <div className="text-white max-w-lg bg-opacity-50 p-8 rounded-lg">
          <h1 className="text-5xl font-bold mb-4">{places[current].name}</h1>
          <p className="mb-6">{places[current].details}</p>
          <Link to={`/${places[current].id}`} className="bg-yellow-400 text-black w-[200px] px-6 py-2 rounded hover:bg-yellow-500 flex items-center font-bold">
            Booking <FaArrowRightLong className="ml-3" />
          </Link>

          {/* Navigation */}
          <div className="flex gap-4 mt-8">
            <button
              onClick={prevSlide}
              className="bg-white text-black p-2 rounded-full hover:bg-gray-700"
            >
              <FaAnglesLeft />
            </button>
            <button
              onClick={nextSlide}
              className="bg-white text-black p-2 rounded-full hover:bg-gray-700"
            >
              <FaAnglesRight />
            </button>
          </div>
        </div>

        {/* Right Side Cards */}
        <div className="flex flex-wrap justify-center gap-4">
  {places.map((place, index) => (
    <div
      key={place.id}
      onClick={() => setCurrent(index)}
      className={`relative w-40 h-60 rounded overflow-hidden cursor-pointer border-4 transform transition duration-500 ${
        current === index
          ? "border-yellow-500 scale-110"
          : "border-transparent scale-100"
      } hover:scale-110`}
    >
      <img
        src={place.image}
        alt={place.name}
        className="w-screen h-full object-cover transition-transform duration-500"
      />
      {/* Title Overlay */}
      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-2 text-sm font-semibold">
        {place.name}
      </div>
    </div>
  ))}
</div>

      </div>
    </div>
  );
};

export default DestinationCarousel;
