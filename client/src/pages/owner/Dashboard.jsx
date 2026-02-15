import { useEffect, useState } from "react"
import { assets } from "../../assets/assets"
import Title from "../../Components/owner/Title"
import { useAppContext } from "../../context/AppContext"
import toast from "react-hot-toast"

const Dashboard = () => {

 const {axios,currency} = useAppContext();

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0

  })
  const fetchDashboardData = async () => {
    try {
      const {data}=await axios.get('/api/owner/dashboard')
      if(data.success){
        setData(data.dashboardData)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
  fetchDashboardData()
}, [])


  const dashboardCard = [
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
    { title: "Total Bookings", value: data.totalBookings, icon: assets.listIconColored },
    { title: "Pending Bookings", value: data.pendingBookings, icon: assets.cautionIconColored },
    { title: "Confirmed", value: data.completedBookings, icon: assets.listIconColored },
  ]

  return (
    <div className="px-6 md:px-10 py-6">
      <Title
        title="Owner Dashboard"
        subTitle="Welcome back to your dashboard"
      />

      {/* DASHBOARD CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-8">
        {dashboardCard.map((card, index) => (
          <div
            key={index}
            className="bg-white border rounded-2xl p-6 flex items-center justify-between"
          >
            <div>
              <p className="text-sm text-gray-500">{card.title}</p>
              <h2 className="text-3xl font-bold text-gray-800">
                {card.value}
              </h2>
            </div>
            <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
              <img src={card.icon} className="w-6 h-6" />
            </div>
          </div>
        ))}
      </div>

      {/* RECENT BOOKINGS */}
      <div className="mt-12 bg-white border rounded-2xl p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-1">
          Recent Bookings
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          Latest customer bookings
        </p>

        {data.recentBookings.length === 0 ? (
          <p className="text-gray-500">No recent bookings</p>
        ) : (
          <div className="space-y-4">
            {data.recentBookings.map((booking, index) => (
              <div
                key={index}
                className="flex items-center justify-between border rounded-xl p-4"
              >
                {/* Left */}
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <img src={assets.listIconColored} className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {booking.car.brand} {booking.car.model}
                    </p>
                    <p className="text-sm text-gray-500">
                      {booking.createdAt.split("T")[0]}
                    </p>
                  </div>
                </div>

                {/* Right */}
                <div className="text-right">
                  <p className="font-semibold text-gray-800">
                    {currency}{booking.price}
                  </p>
                  <p
                    className={`text-sm ${
                      booking.status === "confirmed"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {booking.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
        
      </div>
      <div className="mt-12 bg-white border rounded-2xl p-6 flex items-center justify-between">

  {/* Left */}
  <div>
    <h2 className="text-xl font-semibold text-gray-800 mb-1">
      Monthly Revenue
    </h2>
    <p className="text-sm text-gray-500">
      Revenue for the current month
    </p>
  </div>

  {/* Right */}
  <div className="text-right">
    <p className="text-sm text-gray-500 mb-1">Total</p>
    <p className="text-3xl font-bold text-sky-600">
      {currency}{data.monthlyRevenue}
    </p>
  </div>

</div>

    </div>
  )
}

export default Dashboard

