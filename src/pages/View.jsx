import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Carousel } from "@material-tailwind/react";
import { Typography } from "@material-tailwind/react";
const View = () => {
    const [details, setDetails] = useState();
    const [loading, setLoading] = useState(false);
    const { _id } = useParams();
    useEffect(() => {
        const fetch = async () => {
            try {
                setLoading(true);
                const response = (await axios.post(`http://localhost:4000/map/view/${_id}` || `https://olfu-server.onrender.com/map/view/${_id}`)).data;
                setDetails(response)
            } catch (error) {
                console.error('Error fetching data:', error.message);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, [_id]);
    return (
        <section className='py-[5%]'>
            {loading ? <ImagePlacehoderSkeleton /> : details &&

                <div className="flex flex-col bg-primary w-auto border border-gray-200 rounded-lg shadow md:flex-row mx-auto">

                    <Carousel autoplay={true} loop={true} className="rounded-xl w-full w-[50%] ">
                        {details?.images.map((e) => (
                            <img key={e} className="object-cover rounded-t-lg h-96 md:h-auto  md:rounded-none md:rounded-s-lg" src={e} alt={details.title} title={details.title} />
                        ))}
                    </Carousel>

                    <div className="flex flex-col  p-4 leading-normal">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">{details.title}</h5>
                        <p className="mb-3 font-normal text-darkWhite">{details.description}</p>
                    </div>
                </div>}
            {
            }
        </section>
    )
}

export default View

export function ImagePlacehoderSkeleton() {
    return (
        <div className="flex animate-pulse flex-wrap items-center gap-8 justify-center items-center">
            <div className="grid h-[400px] w-[600px] place-items-center rounded-lg bg-gray-300">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="h-12 w-12 text-gray-500"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                    />
                </svg>
            </div>
            <div className="w-max">
                <Typography
                    as="div"
                    variant="h1"
                    className="mb-4 h-3 w-56 rounded-full bg-gray-300"
                >
                    &nbsp;
                </Typography>
                <Typography
                    as="div"
                    variant="paragraph"
                    className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                >
                    &nbsp;
                </Typography>
                <Typography
                    as="div"
                    variant="paragraph"
                    className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                >
                    &nbsp;
                </Typography>
                <Typography
                    as="div"
                    variant="paragraph"
                    className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                >
                    &nbsp;
                </Typography>
                <Typography
                    as="div"
                    variant="paragraph"
                    className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                >
                    &nbsp;
                </Typography>
                <Typography
                    as="div"
                    variant="paragraph"
                    className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                >
                    &nbsp;
                </Typography>
                <Typography
                    as="div"
                    variant="paragraph"
                    className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                >
                    &nbsp;
                </Typography>
            </div>
        </div>
    );
}