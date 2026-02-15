import { useState } from 'react';
import Navbar from './Components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './pages/Home.jsx';
import Cars from './pages/Cars.jsx';
import CarDetails from './pages/CarDetails.jsx';
import MyBookings from './pages/MyBookings.jsx';
import Footer from './Components/Footer.jsx';
import Laout from './pages/owner/Laout.jsx';
import Dashboard from './pages/owner/Dashboard.jsx';
import AddCar from './pages/owner/AddCar.jsx';
import ManagrBookings from './pages/owner/ManagrBookings.jsx';
import Manage_Bookings from './pages/owner/Manage_Bookings.jsx';
import Login from './Components/Login.jsx';
import {Toaster} from 'react-hot-toast'
import { useAppContext } from './context/AppContext.jsx';
const App = () => {
  const {showLogin} = useAppContext()
  const isOwnerPath = useLocation().pathname.startsWith('/owner');
  return (
    <>
      <Toaster/>
      {showLogin && <Login/>}
      {!isOwnerPath && <Navbar/>}

      {/* Add Routes and other components here */}
     <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/cars" element={<Cars />} />
  <Route path="/car-details/:id" element={<CarDetails />} />
  <Route path="/my-bookings" element={<MyBookings />} />

  {/* OWNER ROUTES */}
  <Route path="/owner" element={<Laout />}>
    <Route index element={<Dashboard />} />
    <Route path="add-car" element={<AddCar />} />
    <Route path="manage-cars" element={<ManagrBookings/>} />
    <Route path="manage-bookings" element={<Manage_Bookings/>} />
   
  </Route>
</Routes>

      {!isOwnerPath && <Footer />}
      



    </>
  )
}

export default App
