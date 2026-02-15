import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';
import axios from 'axios';

const Login = () => {

  const {setShowLogin ,  setToken , navigate} = useAppContext();
  const [state, setState] = useState("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();
      const {data} = await axios.post(`/api/user/${state}`,{
        name,
        email,
        password   })
        if (data.success){
          navigate('/')
          setToken(data.token)
          localStorage.setItem('token',data.token)
          setShowLogin(false)
        }else{
          toast.error(data.message)
        }
      
    } catch (error) {
      
      toast.error(error.message)
    }
    
  };

  return (
    <div
      onClick={() => setShowLogin(false)}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      {/* Login/Register Form Card */}
      <div 
        onClick={(e) => e.stopPropagation()} 
        className="bg-white rounded-2xl shadow-2xl border-2 border-sky-100 p-8 py-12 w-80 sm:w-[400px] transform transition-all duration-300 scale-100 hover:scale-[1.02]"
      >
        {/* Title */}
        <p className="text-3xl font-bold text-center mb-8">
          <span className="bg-gradient-to-r from-sky-600 to-blue-600 bg-clip-text text-transparent">
            User
          </span>{" "}
          <span className="text-gray-800">
            {state === "login" ? "Login" : "Sign Up"}
          </span>
        </p>

        {/* Form */}
        <div onSubmit={onSubmitHandler} className="space-y-5">
          
          {/* Name Input - Only show for Register */}
          {state === "register" && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                Name
              </label>
              <input 
                onChange={(e) => setName(e.target.value)} 
                value={name} 
                placeholder="Enter your name" 
                className="w-full px-4 py-3 border-2 border-sky-200 rounded-xl bg-sky-50 text-gray-700 font-medium focus:border-sky-400 focus:bg-white focus:outline-none transition-all" 
                type="text" 
                required 
              />
            </div>
          )}

          {/* Email Input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Email
            </label>
            <input 
              onChange={(e) => setEmail(e.target.value)} 
              value={email} 
              placeholder="Enter your email" 
              className="w-full px-4 py-3 border-2 border-sky-200 rounded-xl bg-sky-50 text-gray-700 font-medium focus:border-sky-400 focus:bg-white focus:outline-none transition-all" 
              type="email" 
              required 
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Password
            </label>
            <input 
              onChange={(e) => setPassword(e.target.value)} 
              value={password} 
              placeholder="Enter your password" 
              className="w-full px-4 py-3 border-2 border-sky-200 rounded-xl bg-sky-50 text-gray-700 font-medium focus:border-sky-400 focus:bg-white focus:outline-none transition-all" 
              type="password" 
              required 
            />
          </div>

          {/* Toggle Login/Register Link */}
          <div className="pt-2">
            {state === "register" ? (
              <p className="text-sm text-gray-600 text-center">
                Already have an account?{" "}
                <span 
                  onClick={() => setState("login")} 
                  className="text-sky-600 font-semibold cursor-pointer hover:text-sky-700 hover:underline transition-colors"
                >
                  Login here
                </span>
              </p>
            ) : (
              <p className="text-sm text-gray-600 text-center">
                Don't have an account?{" "}
                <span 
                  onClick={() => setState("register")} 
                  className="text-sky-600 font-semibold cursor-pointer hover:text-sky-700 hover:underline transition-colors"
                >
                  Sign up here
                </span>
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button 
            onClick={onSubmitHandler}
            className="w-full bg-gradient-to-r from-sky-500 to-blue-600 text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-sky-300 hover:shadow-xl hover:scale-105 transition-all duration-300 active:scale-95 mt-6"
          >
            {state === "register" ? "Create Account" : "Login"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;