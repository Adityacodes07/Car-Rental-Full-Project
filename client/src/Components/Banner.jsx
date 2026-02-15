import React from 'react';
import { assets } from '../assets/assets';

const Banner = () => {
  return (
    <div className="py-16 md:py-20 bg-gradient-to-b from-white to-sky-50">
      <div className="w-full md:w-[85%] mx-auto px-6 md:px-12">
        <div className="relative bg-gradient-to-r from-blue-600 to-blue-400 rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2 gap-8 items-center py-8 md:py-12 px-8 md:px-12">
            
            {/* Left Content - Text Section */}
            <div className="space-y-6 text-white z-10">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                Do you own a Luxury Car?
              </h2>
              
              <p className="text-base md:text-lg leading-relaxed">
                Monetize it with us, By listing it on our platform.
              </p>
              
              <p className="text-base md:text-lg leading-relaxed">
                We help you earn money from your luxury car.
              </p>
              
              <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-300 active:scale-95 shadow-lg">
                List Your Car
              </button>
            </div>

            {/* Right Content - Car Image */}
            <div className="relative z-10">
              <div className="absolute inset-0 bg-white opacity-20 blur-3xl rounded-full"></div>
              <img 
                src={assets.banner_car_image} 
                alt="Car" 
                className="relative z-10 w-full object-contain hover:scale-105 transition-transform duration-500" 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;