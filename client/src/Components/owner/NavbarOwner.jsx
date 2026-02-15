import React from 'react'
import { assets } from '../../assets/assets'
import { Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const NavbarOwner = () => {
    const {user} = useAppContext();
  return (
  <div className="w-full bg-white border-b shadow-sm px-6 py-4 flex items-center justify-between">

    {/* Left: Logo */}
    <Link to="/" className="flex items-center gap-3">
      <img
        src={assets.logo}
        alt="logo"
        className="h-8 w-auto"
      />
      <span className="text-xl font-bold text-gray-800">
        CarRental
      </span>
    </Link>

    {/* Right: Welcome */}
    <div className="flex items-center gap-4">
      <span className="text-sm text-gray-600">
        Welcome,
        <span className="font-semibold text-gray-800 ml-1">
          {user?.name || 'Owner'}
        </span>
      </span>

      {/* Avatar */}
      <div className="w-9 h-9 rounded-full bg-sky-500 text-white flex items-center justify-center font-semibold">
        {(user.name || 'O')[0]}
      </div>
    </div>

  </div>
)

}

export default NavbarOwner