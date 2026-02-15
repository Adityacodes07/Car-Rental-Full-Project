import React, { useState } from 'react'
import { assets, ownerMenuLinks } from '../../assets/assets'
import { NavLink, useLocation } from 'react-router-dom'
import { useAppContext } from '../../context/AppContext'
import toast from 'react-hot-toast'

const Sidebar = () => {
  const { user, fetchUser, axios } = useAppContext()
  const location = useLocation()
  const [image, setImage] = useState(null)

  const updateImage = async () => {
    try {
      const formData = new FormData()
      formData.append('image', image)

      const { data } = await axios.post('/api/owner/update-image', formData)

      if (data.success) {
        fetchUser()
        toast.success(data.message)
        setImage(null)
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="w-72 min-h-screen bg-white border-r shadow-sm px-6 py-8">
      {/* Profile */}
      <div className="flex flex-col items-center text-center mb-8">
        <label htmlFor="image" className="relative cursor-pointer group">
          <img
            src={
              image
                ? URL.createObjectURL(image)
                : user?.image ||
                  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGJMqd-SesKmP_5hSYBkZCBcnyRu9YoiY3_A&s'
            }
            className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow"
          />

          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition">
            <img src={assets.edit_icon} className="w-5 h-5" />
          </div>

          <input
            type="file"
            id="image"
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
        </label>

        {image && (
          <button
            onClick={updateImage}
            className="mt-3 flex items-center gap-2 text-sm font-medium text-white bg-sky-500 px-4 py-1.5 rounded-full hover:bg-sky-600 transition"
          >
            Save
            <img src={assets.check_icon} className="w-4 h-4" />
          </button>
        )}

        <p className="mt-4 text-lg font-semibold text-gray-800">{user?.name}</p>
        <p className="text-sm text-gray-500">Owner Dashboard</p>
      </div>

      {/* Menu */}
      <nav className="space-y-2">
        {ownerMenuLinks.map((link, index) => {
          const isActive = link.path === location.pathname
          return (
            <NavLink
              key={index}
              to={link.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                isActive
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <img
                src={isActive ? link.coloredIcon : link.icon}
                className="w-5 h-5"
              />
              <span className="font-medium">{link.name}</span>
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}

export default Sidebar
