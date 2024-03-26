import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
const View = () => {
    const [details, setDetails] = useState()
    const { _id } = useParams();
    useEffect(() => {
        const fetch = async () => {
            try {
                const response = (await axios.post(`http://localhost:4000/map/view/${_id}`)).data;
                setDetails(response)
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
        fetch();
    }, [_id]);
    return (
        <section className='py-[5%]'>
            {details &&

                <div className="flex flex-col bg-primary w-auto border border-gray-200 rounded-lg shadow md:flex-row mx-auto">
                    <img className="object-cover w-[50%] rounded-t-lg h-96 md:h-auto  md:rounded-none md:rounded-s-lg" src={details.image} alt={details.title} title={details.title} />
                    <div className="flex flex-col  p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{details.title}</h5>
                        <p className="mb-3 font-normal text-darkWhite">{details.description}</p>
                    </div>
                </div>
            }
        </section>
    )
}

export default View