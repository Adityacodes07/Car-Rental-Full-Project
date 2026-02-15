import React from 'react';
import { assets } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Card = ({ car }) => {
  const currency = import.meta.env.VITE_CURRENCY || '$';
  const navigate = useNavigate();

  return (
    <div
      onClick={() => {
       navigate(`/car-details/${car._id}`);
        window.scrollTo(0, 0);
      }}
      className="
        group cursor-pointer
        bg-white rounded-2xl overflow-hidden
        shadow-md hover:shadow-2xl
        hover:-translate-y-2
        transition-all duration-500 ease-out
      "
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        <img
          src={car.image}
          alt="Car image"
          className="
            w-full h-56 object-cover
            transition-transform duration-700
            group-hover:scale-110
          "
        />

        {/* Gradient Overlay */}
        <div className="
          absolute inset-0
          bg-gradient-to-t from-black/50 via-black/20 to-transparent
          opacity-0 group-hover:opacity-100
          transition-opacity duration-500
        "></div>

        {/* Availability Badge */}
        {car.isAavailable && (
          <p className="
            absolute top-4 left-4
            bg-gradient-to-r from-sky-500 to-blue-600
            text-white text-sm font-semibold
            px-4 py-1.5 rounded-full
            shadow-lg
          ">
            Available Now
          </p>
        )}

        {/* Price Tag */}
        <div className="
          absolute bottom-4 right-4
          bg-black/80 text-white
          rounded-lg px-3 py-1.5
          backdrop-blur-sm
        ">
          <span className="text-lg font-bold">
            {currency}{car.pricePerDay}
          </span>
          <span className="text-sm"> / day</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div>
          <h3 className="
            text-xl font-bold text-gray-800
            group-hover:text-sky-600
            transition-colors duration-300
          ">
            {car.brand} {car.model}
          </h3>
          <p className="text-sm text-gray-500">
            {car.category} · {car.year}
          </p>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <img src={assets.users_icon} className="w-4 h-4 opacity-60" />
            <span>{car.seating_capacity} Seats</span>
          </div>

          <div className="flex items-center gap-2">
            <img src={assets.fuel_icon} className="w-4 h-4 opacity-60" />
            <span>{car.fuel_type}</span>
          </div>

          <div className="flex items-center gap-2">
            <img src={assets.car_icon} className="w-4 h-4 opacity-60" />
            <span>{car.transmission}</span>
          </div>

          <div className="flex items-center gap-2">
            <img src={assets.location_icon} className="w-4 h-4 opacity-60" />
            <span>{car.location}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
