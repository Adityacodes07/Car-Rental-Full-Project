import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyCarData } from '../assets/assets'
import Loader from '../Components/Loader.jsx'

const CarDetails = () => {

  const { id } = useParams()
  const navigate = useNavigate()
  const [car, setCar] = useState(null)
  const handleSubmit = async (e) => {
    e.preventDefault()}

 useEffect(() => {
  setCar(dummyCarData.find(car => car._id == id))
}, [id])




  return car ? (
   <div className="px-6 md:px-16 lg:px-24 xl:px-32 mt-16">

  {/* Back Button */}
  <button
    onClick={() => navigate(-1)}
    className="flex items-center gap-2 text-gray-600 hover:text-sky-600 mb-8"
  >
    <img src={assets.arrow_icon} className="w-4 rotate-180" />
    <span className="font-medium">Back to all cars</span>
  </button>

  {/* Main Layout */}
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

    {/* LEFT SECTION */}
    <div>

      {/* Car Image */}
      <img
        src={car.image}
        alt=""
        className="w-full h-[380px] object-cover rounded-2xl shadow-lg mb-6"
      />

      {/* Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-1">
        {car.brand} {car.model}
      </h1>
      <p className="text-gray-500 mb-6">
        {car.category} · {car.year}
      </p>

      {/* Specs */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { icon: assets.users_icon, text: `${car.seating_capacity} Seats` },
          { icon: assets.fuel_icon, text: car.fuel_type },
          { icon: assets.car_icon, text: car.transmission },
          { icon: assets.location_icon, text: car.location },
        ].map(({ icon, text }) => (
          <div
            key={text}
            className="flex items-center gap-3 bg-gray-50 p-3 rounded-xl"
          >
            <img src={icon} className="w-5 h-5 opacity-70" />
            <span className="text-gray-700 text-sm">{text}</span>
          </div>
        ))}
      </div>

      {/* Description */}
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        Description
      </h2>
      <p className="text-gray-600 leading-relaxed">
        {car.description}
      </p>
    </div>

    {/* RIGHT SECTION (Booking Card Placeholder) */}
    <div className="bg-white rounded-2xl shadow-xl p-6 h-fit sticky top-24">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Book this car
      </h2>

      <div className="flex items-center justify-between mb-6">
        <span className="text-gray-500">Price per day</span>
        <span className="text-2xl font-bold text-sky-600">
          ${car.pricePerDay}
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="date"
          className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
        />
        <input
          type="date"
          className="w-full border rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-sky-500"
        />

        <button
          type="button"
          className="cursor-pointer w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
        >
          Continue Booking
        </button>
      </form>
    </div>
  </div>

  {/* FEATURES */}
  <div className="mt-14">
    <h2 className="text-2xl font-semibold text-gray-800 mb-6">
      Features
    </h2>

    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {[
        "360-degree view",
        "GPS Navigation System",
        "Bluetooth Connectivity",
        "Heated Seats",
      ].map(feature => (
        <li
          key={feature}
          className="flex items-center gap-3 bg-gray-50 p-4 rounded-xl"
        >
          <img src={assets.check_icon} className="w-5 h-5" />
          <span className="text-gray-700">{feature}</span>
        </li>
      ))}
    </ul>
  </div>

</div>

  ) :<Loader/>;
}

export default CarDetails
