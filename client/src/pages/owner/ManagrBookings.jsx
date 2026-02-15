import { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../Components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const ManagrBookings = () => {
  const { isOwner, currency, axios } = useAppContext();
  const [cars, setCars] = useState([]);

  const fetchOwnerCars = async () => {
    try {
      const { data } = await axios.get("/api/owner/cars");
      if (data.success) {
        setCars(data.cars);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchOwnerCars();
    }
  }, [isOwner]);

  const handleDeleteCar = async (carId) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this car?"
    );

    if (!confirmDelete) {
      toast("Car deletion cancelled");
      return;
    }

    try {
      const { data } = await axios.post("/api/owner/delete-car", { carId });

      if (data.success) {
        toast.success("Car deleted successfully");
        setCars((prev) => prev.filter((car) => car._id !== carId));
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleAvailability = async (carId) => {
    try {
      const { data } = await axios.post("/api/owner/toggle-car", { carId });
      if (data.success) {
        toast.success(data.message);
        fetchOwnerCars();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 md:py-12">
        <div className="mb-8">
          <Title
            title="Manage Cars"
            subTitle="View and manage all your listed cars"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-xl border-2 border-sky-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-sky-500 to-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Car</th>
                  <th className="px-6 py-4 text-left">Category</th>
                  <th className="px-6 py-4 text-left">Price</th>
                  <th className="px-6 py-4 text-left">Status</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {cars.map((car) => (
                  <tr key={car._id} className="hover:bg-sky-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img
                          src={car.image}
                          alt={car.model}
                          className="w-20 h-16 object-cover rounded-lg"
                        />
                        <div>
                          <p className="font-bold">
                            {car.brand} {car.model}
                          </p>
                          <p className="text-sm text-gray-500">
                            {car.seating_capacity} Seats · {car.transmission}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4">
                      <span className="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm">
                        {car.category}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-bold">
                      {currency}
                      {car.pricePerDay}
                      <span className="text-sm text-gray-500"> /day</span>
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                          car.isAvalible
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {car.isAvalible ? "Available" : "Not Available"}
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex gap-3">
                        <button
                          onClick={() => toggleAvailability(car._id)}
                          className="p-2 hover:bg-sky-100 rounded-lg"
                        >
                          <img
                            src={
                              car.isAvalible
                                ? assets.eye_close_icon
                                : assets.eye_icon
                            }
                            className="w-6 h-6"
                          />
                        </button>

                        <button
                          onClick={() => handleDeleteCar(car._id)}
                          className="p-2 hover:bg-red-100 rounded-lg"
                        >
                          <img
                            src={assets.delete_icon}
                            className="w-6 h-6"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {cars.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              No cars found
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ManagrBookings;
