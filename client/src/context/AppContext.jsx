import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

export const AppProvider = ({ children }) => {
    const navigate = useNavigate();
    const currency = import.meta.env.VITE_CURRENCY;

    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [isOwner, setIsOwner] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const [pickupDate, setPickupDate] = useState("");
    const [returnDate, setReturnDate] = useState("");

    const [cars, setCars] = useState([]);

  
      // FETCH LOGGED IN USER
    
    const fetchUser = async () => {
        try {
            const { data } = await axios.get("/api/user/data");

            if (data.success) {
                setUser(data.user);
                setIsOwner(data.user.role === "owner");
            } else {
                setUser(null);
                setIsOwner(false);
            }
        } catch (error) {
            setUser(null);
            setIsOwner(false);
        }
    };


      // FETCH ALL CARS (PUBLIC)
    
    const fetchCar = async () => {
        try {
             const { data } = await axios.get("/api/user/cars");

            if (data.success) {
                setCars(data.cars);
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

 
       //LOGOUT USER
    
    const logout = () => {
        localStorage.removeItem("token");
        setToken(null);
        setUser(null);
        setIsOwner(false);
        axios.defaults.headers.common["Authorization"] = "";
        toast.success("You have been logged out");
        navigate("/");
    };

   
      // GET TOKEN FROM STORAGE
   
    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        if (savedToken) {
            setToken(savedToken);
        }
    }, []);


      // SET AUTH HEADER + USER
   
    useEffect(() => {
        if (token) {
            axios.defaults.headers.common["Authorization"] = token;
            fetchUser();
        }
    }, [token]);

   
       //FETCH CARS ON LOAD
    
    useEffect(() => {
        fetchCar();
    }, []);

    const value = {
        axios,
        navigate,
        currency,

        token,
        setToken,

        user,
        setUser,

        isOwner,
        setIsOwner,

        showLogin,
        setShowLogin,

        pickupDate,
        setPickupDate,
        returnDate,
        setReturnDate,

        cars,
        setCars,

        fetchUser,
        fetchCar,
        logout,
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => {
    return useContext(AppContext);
};
