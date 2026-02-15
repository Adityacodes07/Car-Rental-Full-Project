import React, { useState } from 'react';
import Title from '../../Components/owner/Title';
import { assets } from '../../assets/assets';
import {useAppContext} from '../../context/AppContext'
import toast from 'react-hot-toast';

const AddCar = () => {
  const {axios,currency} = useAppContext(); 
  const [image, setImage] = useState(null);
  const [car, setCar] = useState({
    brand: '',
    model: '',
    year: 0,
    pricePerDay: 0,
    category: '',
    transmission: '',
    fuel_type: '',
    seating_capacity: 0,
    location: '',
    description: '',
  });
  const [ isLoading , setIsLoading]= useState(false);
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if(isLoading) return null

    setIsLoading(true)
    try {
      const formData = new FormData()
      formData.append('image',image)
      formData.append('carData',JSON.stringify(car))
      const {data}=await axios.post('/api/owner/add-car',formData)
      if(data.success){
        toast.success(data.message)
        setImage(null)
        setCar({
            brand: '',
            model: '',
            year: 0,
            pricePerDay: 0,
            category: '',
            transmission: '',
            fuel_type: '',
            seating_capacity: 0,
            location: '',
            description: '',
        })
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen">
      {/* Main Container */}
      <div className="max-w-6xl mx-auto px-6 md:px-10 py-8 md:py-12">
        
        {/* Page Title */}
        <div className="mb-8">
          <Title title="Add New Car" subTitle="Fill in the details of the new car" />
        </div>

        {/* Form Card */}
        <div className="bg-white border-2 border-sky-100 rounded-2xl p-6 md:p-8 shadow-xl">
          <form onSubmit={onSubmitHandler} className="space-y-8">

            {/* IMAGE UPLOAD SECTION */}
            <div>
              <label htmlFor="car-image" className="block text-sm font-bold text-gray-700 mb-3">
                Car Image
              </label>

              <label
                htmlFor="car-image"
                className="w-48 h-36 border-2 border-dashed border-sky-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-sky-50 hover:border-sky-400 transition-all duration-300 bg-sky-50/50"
              >
                <img
                  src={image ? URL.createObjectURL(image) : assets.upload_icon}
                  alt="upload"
                  className={`${image ? 'w-full h-full object-cover rounded-xl' : 'w-12 mb-2 opacity-60'}`}
                />
                {!image && <p className="text-sm text-gray-500 font-medium">Upload Image</p>}
              </label>

              <input
                type="file"
                id="car-image"
                accept="image/*"
                hidden
                onChange={(e) => setImage(e.target.files[0])}
              />
            </div>

            {/* BASIC INFO - Brand & Model */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Brand</label>
                <input
                  type="text"
                  placeholder="BMW, Audi, Mercedes"
                  value={car.brand}
                  onChange={(e) => setCar({ ...car, brand: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-sky-200 rounded-xl bg-sky-50 text-gray-700 font-medium focus:border-sky-400 focus:bg-white focus:outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Model</label>
                <input
                  type="text"
                  placeholder="X5, A4, C-Class"
                  value={car.model}
                  onChange={(e) => setCar({ ...car, model: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-sky-200 rounded-xl bg-sky-50 text-gray-700 font-medium focus:border-sky-400 focus:bg-white focus:outline-none transition-all"
                  required
                />
              </div>
            </div>

            {/* YEAR / PRICE / CATEGORY */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Year</label>
                <input
                  type="number"
                  placeholder="2024"
                  value={car.year}
                  onChange={(e) => setCar({ ...car, year: Number(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-sky-200 rounded-xl bg-sky-50 text-gray-700 font-medium focus:border-sky-400 focus:bg-white focus:outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Price Per Day ({currency})</label>
                <input
                  type="number"
                  placeholder="100"
                  value={car.pricePerDay}
                  onChange={(e) => setCar({ ...car, pricePerDay: Number(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-sky-200 rounded-xl bg-sky-50 text-gray-700 font-medium focus:border-sky-400 focus:bg-white focus:outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                <select
                  value={car.category}
                  onChange={(e) => setCar({ ...car, category: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-sky-200 rounded-xl bg-sky-50 text-gray-700 font-medium focus:border-sky-400 focus:bg-white focus:outline-none transition-all"
                  required
                >
                  <option value="">Select category</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Van">Van</option>
                </select>
              </div>
            </div>

            {/* TRANSMISSION / FUEL / SEATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Transmission</label>
                <select
                  value={car.transmission}
                  onChange={(e) => setCar({ ...car, transmission: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-sky-200 rounded-xl bg-sky-50 text-gray-700 font-medium focus:border-sky-400 focus:bg-white focus:outline-none transition-all"
                >
                  <option value="">Select</option>
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                  <option value="Semi-Automatic">Semi-Automatic</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Fuel Type</label>
                <select
                  value={car.fuel_type}
                  onChange={(e) => setCar({ ...car, fuel_type: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-sky-200 rounded-xl bg-sky-50 text-gray-700 font-medium focus:border-sky-400 focus:bg-white focus:outline-none transition-all"
                >
                  <option value="">Select</option>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Electric">Electric</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Seats</label>
                <input
                  type="number"
                  placeholder="5"
                  value={car.seating_capacity}
                  onChange={(e) => setCar({ ...car, seating_capacity: Number(e.target.value) })}
                  className="w-full px-4 py-3 border-2 border-sky-200 rounded-xl bg-sky-50 text-gray-700 font-medium focus:border-sky-400 focus:bg-white focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* LOCATION */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Location</label>
              <select
                value={car.location}
                onChange={(e) => setCar({ ...car, location: e.target.value })}
                className="w-full px-4 py-3 border-2 border-sky-200 rounded-xl bg-sky-50 text-gray-700 font-medium focus:border-sky-400 focus:bg-white focus:outline-none transition-all"
              >
                <option value="">Select location</option>
                <option value="Jabalpur">Jabalpur</option>
                <option value="Indore">Indore</option>
                <option value="Panagar">Panagar</option>
              </select>
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
              <textarea
                rows="4"
                value={car.description}
                onChange={(e) => setCar({ ...car, description: e.target.value })}
                className="w-full px-4 py-3 border-2 border-sky-200 rounded-xl bg-sky-50 text-gray-700 font-medium focus:border-sky-400 focus:bg-white focus:outline-none transition-all resize-none"
                placeholder="Write about your car, features, condition, etc."
              ></textarea>
            </div>

            {/* SUBMIT BUTTON */}
           <button
                    type="submit"
                    disabled={isLoading}
                    className={`flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white transition-all duration-300
                    ${isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-sky-500 to-blue-600 hover:shadow-xl hover:scale-105"
                    }`}
                  >
                    <img src={assets.tick_icon} alt="submit" className="w-5" />
                    {isLoading ? "Listing..." : "List your car"}
</button>

          </form>
        </div>
      </div>
    </div>
  );
};

export default AddCar;