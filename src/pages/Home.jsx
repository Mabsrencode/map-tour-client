import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Map from '../components/Map/Map';
import "../styles/home.css"
const Home = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getCoordinate = async () => {
            try {
                setLoading(true);
                const response = await axios.get('http://localhost:4000/map/coordinate' || "https://olfu-server.onrender.com/map/coordinate");
                setData(response.data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.error('Error fetching data:', error.message);
            }
        };
        getCoordinate();
    }, []);

    return (
        <>
            <section className='hero py-[10%]'>
                {/* <img src="https://www.fatima.edu.ph/wp-content/uploads/2022/01/olfu-center-logo.png" alt="" className='mx-auto w-[300px]' /> */}
            </section>
            <section>
                <div className='w-[800px] mx-auto text-center'>
                    <h1 className=' mt-24 font-bold text-7xl'>Virtual Tour</h1>
                    <p className='mt-4 text-gray-600'>
                        Welcome to our school's virtual tour, where we invite you to explore our campus from the comfort of your own home. Through this immersive experience, you'll get a glimpse into the vibrant atmosphere, state-of-the-art facilities, and engaging learning environment that define our educational institution.
                    </p>
                </div>
                <div className='my-[8%]'>
                    {data.length > 0 ? <Map postedMark={data} disabled={true} /> : <Map disabled={true} loading={loading} />}
                </div>
            </section>
        </>

    );
};

export default Home;
