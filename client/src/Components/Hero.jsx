import React, { useState } from 'react';
import { assets, cityList } from '../assets/assets';
import { useAppContext } from '../context/AppContext';

const Hero = () => {
  const { navigate, setPickupDate, setReturnDate } = useAppContext();

  const [pickupLocation, setPickupLocation] = useState('');
  const [pickupDate, setLocalPickupDate] = useState('');
  const [returnDate, setLocalReturnDate] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();

    if (!pickupLocation || !pickupDate || !returnDate) {
      return;
    }

    setPickupDate(pickupDate);
    setReturnDate(returnDate);

    navigate(
      `/cars?location=${pickupLocation}&pickupDate=${pickupDate}&returnDate=${returnDate}`
    );
  };

  return (
    <div className="relative bg-gradient-to-br from-sky-50 via-white to-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div className="space-y-8">
            <h1 className="text-5xl font-bold">
              <span className="text-sky-600">Luxury Cars</span><br />
              <span className="text-gray-800">on Rent</span>
            </h1>

            <form
              onSubmit={handleSearch}
              className="bg-white rounded-2xl shadow-xl p-6 border"
            >
              <div className="space-y-4">

                <select
                  required
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full px-4 py-3 border rounded-xl"
                >
                  <option value="">Pickup Location</option>
                  {cityList.map((city, index) => (
                    <option key={index} value={city}>{city}</option>
                  ))}
                </select>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="date"
                    required
                    value={pickupDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setLocalPickupDate(e.target.value)}
                    className="px-4 py-3 border rounded-xl"
                  />

                  <input
                    type="date"
                    required
                    value={returnDate}
                    min={pickupDate}
                    onChange={(e) => setLocalReturnDate(e.target.value)}
                    className="px-4 py-3 border rounded-xl"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-sky-600 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2"
                >
                  <img src={assets.search_icon} className="w-5" />
                  Search Cars
                </button>

              </div>
            </form>
          </div>

          <div>
            <img
              src={assets.main_car}
              alt="car"
              className="w-full max-h-96 object-contain"
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default Hero;
