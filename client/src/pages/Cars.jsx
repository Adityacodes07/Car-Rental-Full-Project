import { useEffect, useState } from 'react';
import Title from '../Components/Title';
import { assets } from '../assets/assets';
import Card from '../Components/Card';
import { useSearchParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Cars = () => {
  const [input, setInput] = useState('');
  const [filteredCars, setFilteredCars] = useState([]);

  const [searchParams] = useSearchParams();

  const pickupLocation = searchParams.get('location');
  const pickupDate = searchParams.get('pickupDate');
  const returnDate = searchParams.get('returnDate');

  const { cars, axios } = useAppContext();

  const isSearchData = pickupLocation && pickupDate && returnDate;

  // 🔍 Local text search
  useEffect(() => {
    if (!cars.length || isSearchData) return;

    if (input === '') {
      setFilteredCars(cars);
    } else {
      const filtered = cars.filter(car =>
        car.brand.toLowerCase().includes(input.toLowerCase()) ||
        car.model.toLowerCase().includes(input.toLowerCase()) ||
        car.category.toLowerCase().includes(input.toLowerCase()) ||
        car.transmission.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredCars(filtered);
    }
  }, [input, cars, isSearchData]);

  // 📅 Search by availability (from Hero)
  const searchCarAvailability = async () => {
    try {
      const { data } = await axios.post(
        '/api/bookings/check-availability',
        {
          location: pickupLocation,
          pickupDate,
          returnDate
        }
      );

      if (data.success) {
        setFilteredCars(data.availableCars);
        if (data.availableCars.length === 0) {
          toast('No cars available for selected dates');
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isSearchData) {
      searchCarAvailability();
    }
  }, [pickupLocation, pickupDate, returnDate]);

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-8 md:py-12">

        <div className="mb-12">
          <Title
            title="Available Cars"
            subTitle="Browse our selection of premium vehicles"
          />

          <div className="flex items-center gap-3 bg-white rounded-2xl shadow-lg border px-4 py-3 mt-8">
            <img src={assets.search_icon} className="w-5 h-5 opacity-60" />

            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              type="text"
              placeholder="Search by brand, model, category"
              className="flex-1 bg-transparent outline-none"
            />
          </div>
        </div>

        <p className="text-gray-600 font-medium mb-6">
          Showing <span className="text-sky-600 font-bold">{filteredCars.length}</span> cars
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCars.map(car => (
            <Card key={car._id} car={car} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Cars;
