import React from 'react';
import Title from './Title';
import { assets, dummyCarData } from '../assets/assets';
import Card from './Card';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const FeatureSection = () => {
  const navigate = useNavigate();

  const {cars} = useAppContext ();
  
  return (
    <div className="bg-gradient-to-b from-white to-sky-50 py-16 md:py-24">
      {/* Container for consistent padding and max width */}
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* Section Title */}
        <div className="mb-12">
          <Title title="Our Features" subTitle="Discover what makes us stand out" align="left"/>
        </div>
        
        {/* Cards Grid - Responsive 3 column layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12">
          {cars.slice(0, 6).map((car) => (
            <div key={car.id}>
              <Card car={car}/>
            </div>
          ))}
        </div>
        
        {/* Explore All Cars Button - Centered */}
        <div className="flex justify-center">
          <button 
            onClick={() => navigate('/cars')}
            className="bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold px-8 py-3.5 rounded-full shadow-lg shadow-sky-300 hover:shadow-xl hover:shadow-sky-400 hover:scale-105 transition-all duration-300 active:scale-95 flex items-center gap-2"
          >
            Explore all Cars 
            <img src={assets.arrow_icon} alt="arrow" className="w-4 h-4" />
          </button>
        </div>
        
      </div>
    </div>
  );
};

export default FeatureSection;