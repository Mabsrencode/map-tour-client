import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import { useCookies } from "react-cookie";
import logo from "../assets/olfu-program-logo.png";
import axios from "axios";
// User Context
const UserContext = createContext();

export const UserProvider = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const verifyCookie = async () => {
      setLoading(true);

      const { data } = await axios.post("/auth", {}, { withCredentials: true });
      if (!data.status) {
        navigate("/sign-in-as-admin");
      }
      setUser(data);
      localStorage.setItem("user", data.role);
      setTimeout(() => {
        setLoading(false);
      }, 2000);

      return !data.status && removeCookie("token");
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);

  return (
    <UserContext.Provider value={user}>
      {loading ? (
        <div className="flex justify-center items-center h-[80vh] animate-pulse">
          <img className="h-[150px] w-[150px]" src={logo} alt="" />
        </div>
      ) : (
        <Outlet />
      )}
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);
