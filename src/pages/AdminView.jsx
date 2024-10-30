import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Carousel } from "@material-tailwind/react";
import { useNavigate, Link } from 'react-router-dom';
const AdminView = () => {
    const navigate = useNavigate()
    const [details, setDetails] = useState();
    const [loading, setLoading] = useState(false);
    const { _id } = useParams();
    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true);
                const response = (await axios.post(`/map/view/${_id}` || `https://olfu-server.onrender.com/map/view/${_id}`)).data;
                setDetails(response)
            } catch (error) {
                console.error('Error fetching data:', error.message);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [_id]);
    const handleDelete = async (id) => {
        try {
            await axios.delete(`/map/delete/${id}`);
            // setData(data.filter((item) => item._id !== id));
            navigate("/dashboard");
        } catch (error) {
            console.error('Error deleting location:', error.message);
        }
    };
    return (
        <section className='py-[5%]'>
            {loading ? <ImagePlacehoderSkeleton /> : details &&

                <div className="flex flex-col bg-primary w-auto rounded-lg shadow md:flex-row mx-auto">

                    <Carousel autoplay={true} loop={true} className="rounded-xl w-full w-[50%] ">
                        {details?.images.map((e) => (
                            <img key={e} className="object-cover rounded-t-lg h-96 md:h-auto  md:rounded-none md:rounded-s-lg" src={e} alt={details.title} title={details.title} />
                        ))}
                    </Carousel>

                    <div className="flex flex-col p-12 leading-normal">
                        <h1 className="mb-6 text-5xl font-bold tracking-tight text-white">{details.title}</h1>
                        <p className="mb-3 font-normal text-darkWhite">{details.description}</p>
                    </div>
                </div>}
            <div>
                <button className='px-6 py-3 w-full mt-4 font-medium tracking-wide text-white capitalize rounded-xl transition-colors duration-300 transform bg-primary' onClick={() => handleDelete(_id)}>Delete</button>
                <Link className="px-6 w-full block text-center py-3 mt-4 font-medium tracking-wide text-white capitalize rounded-xl transition-colors duration-300 transform bg-primary" to={`/map/edit/${_id}`}>Edit</Link>
            </div>
        </section>
    )
}

export default AdminView

export function ImagePlacehoderSkeleton() {
    return (
        <div className="flex  w-auto animate-pulse rounded-lg justify-center items-center mx-auto h-[600px]">
            <img className='w-[150px] h-[150px]' src="https://www.fatima.edu.ph/wp-content/uploads/2021/10/olfu-program-logo.png" alt="" />

        </div>
    );
}