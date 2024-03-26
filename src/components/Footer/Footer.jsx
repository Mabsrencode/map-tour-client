import React from 'react'
import { Link } from 'react-router-dom'
const Footer = () => {
    return (
        <footer className="bg-primary shadow">
            <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div className="sm:flex sm:items-center sm:justify-between">
                    <a href="https://flowbite.com/" className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <Link to="/" className="ml-2 text-xl text-neutral-800 dark:text-neutral-200">
                            <img src="https://www.fatima.edu.ph/wp-content/uploads/2021/10/olfu-logo.png" alt="logo" />
                        </Link>
                    </a>
                    <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0">
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">About</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline me-4 md:me-6">Courses</a>
                        </li>
                        <li>
                            <a href="#" className="hover:underline">Contact</a>
                        </li>
                    </ul>
                </div>
                <hr className="my-6 border-white sm:mx-auto dark:border-white lg:my-8" />
                <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024<a href="https://flowbite.com/" className="hover:underline">Our Lady of Fatima University</a>. All Rights Reserved.</span>
            </div>
        </footer>
    )
}

export default Footer