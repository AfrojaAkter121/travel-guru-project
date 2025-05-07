import React from 'react';
import { FaCalendarAlt } from 'react-icons/fa';

const BookingCart = ({findData}) => {
    return (
        <div className="w-90 bg-white rounded-lg shadow-lg p-5 space-y-4">
      {/* Origin */}
      <div>
        <label className="block text-sm text-gray-500 mb-1">Origin</label>
        <div className="bg-gray-100 p-2 rounded">{/* static text */} Dhaka</div>
      </div>

      {/* Destination */}
      <div>
        <label className="block text-sm text-gray-500 mb-1">Destination</label>
        <div className="bg-gray-100 p-2 rounded">{findData.name}</div>
      </div>

      {/* Date range */}
      <div className="flex space-x-2">
        <div className="flex-1">
          <label className="block text-sm text-gray-500 mb-1">From</label>
          <div className="flex items-center bg-gray-100 p-2 rounded">
            <span className="flex-1">01/09</span>
            <FaCalendarAlt className="text-gray-500" />
          </div>
        </div>
        <div className="flex-1">
          <label className="block text-sm text-gray-500 mb-1">To</label>
          <div className="flex items-center bg-gray-100 p-2 rounded">
            <span className="flex-1">12/09</span>
            <FaCalendarAlt className="text-gray-500" />
          </div>
        </div>
      </div>

      {/* Button */}
      <button className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition">
        Start Booking
      </button>
    </div>
    );
};

export default BookingCart;