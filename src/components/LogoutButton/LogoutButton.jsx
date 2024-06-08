import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from "react-cookie";
const LogoutButton = () => {
    const location = useNavigate();
    const [, removeCookie] = useCookies([]);
    const handleLogout = () => {
        try {
            localStorage.clear();
            removeCookie("token");
            location('/');
            window.location.reload();
        } catch (error) {
            console.error('Error logging out:', error);
        }
    };
    return (
        <button onClick={handleLogout}><i className="fa-solid fa-right-from-bracket text-white md:text-primary-dark md:font-semibold hover:opacity-75 text-[20px]" title='Log Out'></i></button>
    );
}

export default LogoutButton;
