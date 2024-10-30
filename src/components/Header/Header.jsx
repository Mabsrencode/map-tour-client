import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import LogoutButton from '../LogoutButton/LogoutButton';
import FetchDataQuery from '../../middleware/FetchDataQuery';
const Header = () => {
    const [searchData, setSearchData] = useState();
    console.log(searchData)
    const [searchDataValue, setSearchDataValue] = useState();
    const [loadingSearch, setLoadingSearch] = useState(false);
    const [user, setUser] = useState();
    const verifyCookie = () => {
        axios.post(
            "/auth",
            {},
            { withCredentials: true }
        )
            .then(response => {
                setUser(response.data.status);
            })
            .catch(error => {
                console.error(error);
            });
    };
    useEffect(() => {
        verifyCookie();
    }, [user]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingSearch(true);
                const response = (await FetchDataQuery("/map/search?query=", searchData)).data;
                console.log(response)
                setSearchDataValue(response);
                setLoadingSearch(false)
            } catch (error) {
                console.log(error)
                setLoadingSearch(false)
            }
        }
        fetchData();
    }, [searchData]);
    const clearValueOnClicks = () => {
        setSearchData("")
    };
    return (
        <div>
            <nav
                className="relative flex w-full flex-wrap items-center justify-between bg-primary py-2 text-neutral-500 shadow-lg hover:text-neutral-700 focus:text-neutral-700 lg:py-4">
                <div className="flex w-full flex-wrap items-center justify-between px-3">

                    <Link to="/" className="ml-2 text-xl text-neutral-800 dark:text-neutral-200">
                        <img src="https://www.fatima.edu.ph/wp-content/uploads/2021/10/olfu-logo.png" alt="logo" />
                    </Link>
                    <div className="ml-5 flex items-center justify-between gap-6 relative">
                        {user && <Link to={"/dashboard"} className="text-center lg:text-base text-white md:font-semibold hover:opacity-75 md:focus:text-primary-dark" >Dashboard</Link>}
                        {user && <Link to={"/admin-create-account"} className="text-center lg:text-base text-white md:font-semibold hover:opacity-75 md:focus:text-primary-dark" >Create Account</Link>}
                        <input
                            onChange={(e) => setSearchData(e.target.value)}
                            type="search"
                            className="relative m-0 block  w-[300px] flex-auto rounded  bg-slate-200 bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700  transition duration-200 outline-none border-none ease-in-out focus:z-[3] focus:text-neutral-700 focus:shadow-[inset_0_0_0_1px_rgb(59,113,202)]  motion-reduce:transition-none"
                            placeholder="Search"
                            aria-label="Search"
                            aria-describedby="button-addon2" />
                        {searchData?.length > 0 &&
                            <ul id='search-result' className={` absolute w-full z-30 top-24 -left-[1px] bg-primary max-h-[300px] overflow-y-scroll rounded-xl shadow-lg`}>
                                {loadingSearch ? (
                                    <p className='px-6 py-2 font-semibold text-xs text-white'>Searching...</p>
                                ) : (
                                    <>
                                        {searchDataValue.length > 0 ? (
                                            searchDataValue.map((search) => (
                                                <Link to={`/map/view/${search._id}`} key={search._id} onClick={clearValueOnClicks}>
                                                    <li className='px-6 py-2 transition-all hover:opacity-[0.7]'>
                                                        <span className='text-white'>{search.title}</span>

                                                    </li>
                                                </Link>
                                            ))
                                        ) : (
                                            <p className='px-6 py-2 font-semibold text-xs text-white'>No search found.</p>
                                        )}
                                    </>
                                )}
                            </ul>
                        }
                        <span
                            className="input-group-text flex items-center whitespace-nowrap rounded px-3 py-1.5 text-center text-base font-normal text-neutral-700 dark:text-neutral-200"
                            id="basic-addon2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                                fill="white"
                                className="h-5 w-5">
                                <path
                                    fillRule="evenodd"
                                    d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z"
                                    clipRule="evenodd" />
                            </svg>
                        </span>
                        {user && <LogoutButton />}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header