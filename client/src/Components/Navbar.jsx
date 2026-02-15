import  { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { assets, menuLinks } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";
import axios from "axios";

const Navbar = () => {
  const { setShowLogin, user, logout, isOwner, setIsOwner } = useAppContext();
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  // change role to owner
  const changeRole = async () => {
    try {
      const { data } = await axios.post("/api/owner/change-role");
      if (data.success) {
        setIsOwner(true);
        toast.success(data.message);
        navigate("/owner");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleNavigate = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-sky-50 to-white backdrop-blur-sm border-b border-sky-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-4 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <img src={assets.logo} alt="logo" className="h-10" />
          <span className="text-2xl font-bold text-sky-600">
            Car<span className="text-blue-600">Rental</span>
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-3">
          {menuLinks.map((link, index) => (
            <Link
              key={index}
              to={link.path}
              className={`px-5 py-2.5 rounded-full font-medium transition-all duration-300 ${
                location.pathname === link.path
                  ? "text-white bg-gradient-to-r from-sky-500 to-blue-500"
                  : "text-gray-700 hover:text-sky-600 hover:bg-sky-50"
              }`}
            >
              {link.name}
            </Link>
          ))}

          {/* Owner / List car */}
          <button
            onClick={() => (isOwner ? navigate("/owner") : changeRole())}
            className="px-5 py-2.5 rounded-full font-medium text-sky-600 bg-sky-50 hover:bg-sky-100 transition-all"
          >
            {isOwner ? "Dashboard" : "List car"}
          </button>

          {/* Login / Logout */}
          <button
            onClick={() => (user ? logout() : setShowLogin(true))}
            className="px-6 py-2.5 rounded-full font-semibold text-white bg-gradient-to-r from-sky-500 to-blue-600 hover:shadow-lg transition-all"
          >
            {user ? "Logout" : "Login"}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-sky-50"
        >
          <img
            src={open ? assets.close_icon : assets.menu_icon}
            alt="menu"
            className="w-6 h-6"
          />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <>
          <div
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/30 md:hidden"
          ></div>

          <div className="fixed top-0 right-0 h-screen w-80 bg-white shadow-2xl md:hidden p-6 z-50">
            <div className="flex flex-col gap-3 mt-20">
              {menuLinks.map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigate(link.path)}
                  className={`text-left px-6 py-3 rounded-xl ${
                    location.pathname === link.path
                      ? "bg-sky-500 text-white"
                      : "text-gray-700 hover:bg-sky-50"
                  }`}
                >
                  {link.name}
                </button>
              ))}

              <button
                onClick={() => {
                  isOwner ? navigate("/owner") : changeRole();
                  setOpen(false);
                }}
                className="px-6 py-3 rounded-xl text-sky-600 bg-sky-50"
              >
                {isOwner ? "Dashboard" : "List car"}
              </button>

              <button
                onClick={() => {
                  user ? logout() : setShowLogin(true);
                  setOpen(false);
                }}
                className="px-6 py-3 rounded-xl text-white bg-gradient-to-r from-sky-500 to-blue-600"
              >
                {user ? "Logout" : "Login"}
              </button>
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;
