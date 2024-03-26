import React, { useRef, useEffect, useState } from 'react';
import axios from 'axios';
import "./map.css";
import { Link } from "react-router-dom";
import map from "../../assets/olfu-map.png"
const Map = ({ onMarkerDragEnd, disabled, loading }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getCoordinate = async () => {
            try {
                const response = await axios.get('http://localhost:4000/map/coordinate' || "https://olfu-server.onrender.com/map/coordinate");
                setData(response.data);
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };
        getCoordinate();
    }, []);
    const markerRef = useRef(null);
    const dragElement = (elmnt) => {
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        const dragMouseDown = (e) => {
            e.preventDefault();
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        };

        const elementDrag = (e) => {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;

            const container = document.querySelector(".map-container");
            const markerWidth = elmnt.offsetWidth;
            const markerHeight = elmnt.offsetHeight;

            let newY = elmnt.offsetTop - pos2;
            let newX = elmnt.offsetLeft - pos1;
            newY = Math.max(newY, 0);
            newX = Math.max(newX, 0);
            newY = Math.min(newY, container.offsetHeight - markerHeight);
            newX = Math.min(newX, container.offsetWidth - markerWidth);

            elmnt.style.top = newY + "px";
            elmnt.style.left = newX + "px";
            onMarkerDragEnd({ x: newX, y: newY })
        };

        const closeDragElement = () => {
            document.onmouseup = null;
            document.onmousemove = null;
        };
        if (document.getElementById(elmnt.id + "marker")) {
            document.getElementById(elmnt.id + "marker").onmousedown = dragMouseDown;
        } else {
            elmnt.onmousedown = dragMouseDown;
        }
    };

    useEffect(() => {
        const markerElement = markerRef.current;
        if (markerElement) {
            dragElement(markerElement);
        }
        // eslint-disable-next-line 
    }, []);

    return (
        <div className="map-container p-4 border border-4 border-primary rounded-lg bg-white shadow-2xl relative">
            {loading ? <div className='loading h-full w-full rounded-lg'>
                <img src="https://www.fatima.edu.ph/wp-content/uploads/2021/10/olfu-program-logo.png" alt="" />
            </div> : <img
                src={map}
                alt="Map"
                className="map-image rounded-lg"
            />}
            {!disabled && <i className="fa-solid fa-location-dot marker" id="marker"
                ref={markerRef} style={{ left: '50px', top: '50px' }}></i>}
            {data.length > 0 && data.map((mark) => (
                <Link key={mark._id} to={`map/view/${mark._id}`}>
                    <h1 style={{ left: `${mark.location.x + -40}px`, top: `${mark.location.y + -30}px` }} className='absolute bg-primary text-white px-2 rounded-lg'>{mark.title}</h1>
                    <i className="fa-solid fa-map-pin marker posted" style={{ left: `${mark.location.x}px`, top: `${mark.location.y}px` }}></i>
                </Link>
            ))}
        </div>
    );
}

export default Map;



