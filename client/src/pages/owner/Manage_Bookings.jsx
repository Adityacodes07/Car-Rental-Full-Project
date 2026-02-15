import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import Title from '../../Components/owner/Title';
import toast from 'react-hot-toast';

const Manage_Bookings = () => {
  const { currency, axios } = useAppContext(); 
  const [bookings, setBookings] = useState([]);

  // FETCH OWNER BOOKINGS
  const fetchOwnerBookings = async () => {
    try {
      const { data } = await axios.get('/api/bookings/owner');
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  // CHANGE BOOKING STATUS
  const changeBookingStatus = async (bookingId, status) => {
    try {
      const { data } = await axios.post('/api/bookings/change-status', {
        bookingId,
        status
      });

      if (data.success) {
        toast.success(data.message);
        fetchOwnerBookings();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchOwnerBookings();
  }, []);

  return (
    <div className="bg-gradient-to-b from-sky-50 to-white min-h-screen">
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-8 md:py-12">

        <div className="mb-8">
          <Title
            title="Manage Bookings"
            subTitle="View and manage all bookings for your cars"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-xl border-2 border-sky-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-sky-500 to-blue-600 text-white">
                <tr>
                  <th className="px-6 py-4 text-left">Car</th>
                  <th className="px-6 py-4 text-left">Date Range</th>
                  <th className="px-6 py-4 text-left">Total</th>
                  <th className="px-6 py-4 text-left">Payment</th>
                  <th className="px-6 py-4 text-left">Actions</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {bookings.map((booking) => (
                  <tr key={booking._id}>
                    <td className="px-6 py-4 flex items-center gap-4">
                      <img
                        src={booking.car.image}
                        className="w-20 h-16 object-cover rounded-lg"
                      />
                      <p className="font-semibold">
                        {booking.car.brand} {booking.car.model}
                      </p>
                    </td>

                    <td className="px-6 py-4">
                      {booking.pickupDate.split('T')[0]} <br />
                      to <br />
                      {booking.returnDate.split('T')[0]}
                    </td>

                    <td className="px-6 py-4 font-bold">
                      {currency}{booking.price}
                    </td>

                    <td className="px-6 py-4">
                      <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">
                        Offline
                      </span>
                    </td>

                    <td className="px-6 py-4">
                      {booking.status === 'pending' ? (
                        <select
                          value={booking.status}
                          onChange={(e) =>
                            changeBookingStatus(
                              booking._id,
                              e.target.value
                            )
                          }
                          className="px-4 py-2 border rounded-lg"
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      ) : (
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full">
                          {booking.status}
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {bookings.length === 0 && (
            <p className="text-center py-10 text-gray-500">
              No bookings found
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Manage_Bookings;
