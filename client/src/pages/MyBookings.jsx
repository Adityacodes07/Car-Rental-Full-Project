import { useEffect, useState } from "react";
import { assets, dummyCarData, dummyMyBookingsData } from "../assets/assets";
import Title from "../Components/Title";

const MyBookings = () => {
  const currency = import.meta.env.VITE_CURRENCY || "$";

  const [bookings, setBookings] = useState([]);
  
  const fethmyBookings = async () => {
    // Fetch bookings from backend
    setBookings(dummyMyBookingsData);
  };
  
  useEffect(() => {
    fethmyBookings();
  }, []);

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">
        
        {/* Page Title */}
        <div className="mb-12">
          <Title title="My Bookings" subTitle="View and manage your upcoming reservations." />
        </div>

        {/* Bookings List Container */}
        <div className="space-y-6">
          {bookings.map((booking, index) => (
            <div 
              key={booking._id} 
              className="bg-white border-2 border-sky-100 rounded-2xl p-6 md:p-8 shadow-lg hover:shadow-xl transition-all duration-300 max-w-4xl mx-auto"
            >
              {/* Car Image and Details Section */}
              <div className="grid md:grid-cols-3 gap-6 pb-6 border-b border-gray-200">
                {/* Car Image */}
                <div className="md:col-span-1">
                  <img 
                    src={booking.car.image} 
                    alt={booking.car.model} 
                    className="w-full h-48 object-cover rounded-xl shadow-md"
                  />
                </div>

                {/* Car Details */}
                <div className="md:col-span-2 flex flex-col justify-center space-y-2">
                  <p className="text-2xl md:text-3xl font-bold text-gray-800">
                    {booking.car.brand} {booking.car.model}
                  </p>
                  <p className="text-gray-500 text-lg">
                    {booking.car.year} · {booking.car.category} · {booking.car.location}
                  </p>
                </div>
              </div>

              {/* Booking Details Section */}
              <div className="py-6 space-y-4 border-b border-gray-200">
                {/* Booking ID and Status */}
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-600">
                    Booking ID: <span className="text-sky-600">#{index + 1}</span>
                  </p>
                  <p 
                    className={`px-4 py-1.5 rounded-full text-sm font-semibold uppercase ${
                      booking.status === "confirmed" 
                        ? "bg-green-100 text-green-700" 
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {booking.status}
                  </p>
                </div>

                {/* Rental Period */}
                <div className="flex items-start gap-3 bg-sky-50 rounded-xl p-4">
                  <img src={assets.calendar_icon_colored} alt="" className="w-6 h-6 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Rental Period</p>
                    <p className="text-gray-800 font-medium">
                      {booking.pickupDate.split("T")[0]} to {booking.returnDate.split("T")[0]}
                    </p>
                  </div>
                </div>

                {/* Pickup Location */}
                <div className="flex items-start gap-3 bg-sky-50 rounded-xl p-4">
                  <img src={assets.location_icon_colored} alt="" className="w-6 h-6 mt-1" />
                  <div>
                    <p className="text-sm font-semibold text-gray-600 mb-1">Pickup Location</p>
                    <p className="text-gray-800 font-medium">{booking.car.location}</p>
                  </div>
                </div>
              </div>

              {/* Total Price Section */}
              <div className="pt-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Total Price</p>
                  <p className="text-3xl font-bold bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
                    {currency}{booking.price}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    Booked on {booking.createdAt.split("T")[0]}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyBookings;