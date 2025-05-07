import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useLoaderData, useParams } from "react-router";
import MapView from "./SearchableMap";
import CoxBazarMapPage from "./SearchableMap";
import SearchableMap from "./SearchableMap";

const Booking = () => {
  const { bookingId } = useParams();
  const data = useLoaderData();
  console.log(bookingId, data);
  const [stays, setStays] = useState([]);

  useEffect(() => {
    const findData = data.filter((cart) => cart.id == bookingId);
    setStays(findData);
  }, [bookingId, data]);

  return (
    <div className="relative min-h-screen w-full bg-cover bg-center bg-no-repeat " style={{ 
        backgroundImage: "linear-gradient(to bottom, rgba(1,0,0,0.52), rgba(1,0,0,0.73)), url('https://i.ibb.co/Q32xyqTX/beautiful-diamond-beach-penida-island-bali-indonesia-181624-41884.jpg')"
      }}>
      <Navbar></Navbar>
      <div className="flex">
      <div className="flex flex-col w-[50%] gap-4 p-4">
        {stays.map((stay) => (
          <div key={stay.id} className="border flex items-center space-x-5 text-white rounded-xl p-4 shadow">
            <img
              src={stay.image}
              alt={stay.title}
              className="rounded-lg w-80 h-60 mb-2"
            />
            <div>
            <h2 className="text-2xl font-semibold">{stay.title}</h2>
            <p>
              {stay.guests} guests · {stay.bedrooms} bedrooms · {stay.baths}{" "}
              baths
            </p>
            <p className="text-lg">Wif Air conditioning Kitchen</p>
            <p className="text-lg">Cancellation fexibility availiable</p>
            <p className="mt-7">${stay.price}/night</p>
            <p>
              ⭐ {stay.rating} ({stay.reviews} reviews)
            </p>
            </div>
          </div>
        ))}
      </div>
      <div className="w-[40%]">
        <SearchableMap></SearchableMap>
      </div>
      </div>
    </div>
  );
};

export default Booking;
