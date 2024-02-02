import React, { useRef, useEffect } from 'react';
import "./map.css";
import map from "../../assets/map.png"
const Map = () => {
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
            elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
            elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
        };

        const closeDragElement = () => {
            document.onmouseup = null;
            document.onmousemove = null;
        };
        if (document.getElementById(elmnt.id + "mydiv")) {
            document.getElementById(elmnt.id + "mydiv").onmousedown = dragMouseDown;
        } else {
            elmnt.onmousedown = dragMouseDown;
        }
    };

    useEffect(() => {
        const markerElement = markerRef.current;
        if (markerElement) {
            dragElement(markerElement);
        }
    }, []);

    return (
        <div className="map-container">
            <img
                src={map}
                alt="Map"
                className="map-image"
            />
            <div
                id="mydiv"
                ref={markerRef}
                className="marker"
                style={{ left: '0px', top: '0px' }}
            >
            </div>
        </div>
    );
}

export default Map;



