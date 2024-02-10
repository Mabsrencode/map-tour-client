import React, { useRef, useEffect } from 'react';
import "./map.css";
import map from "../../assets/map.png"
const Map = ({ onMarkerDragEnd }) => {
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
    }, []);

    return (
        <div className="map-container">
            <img
                src={map}
                alt="Map"
                className="map-image"
            />
            <div
                id="marker"
                ref={markerRef}
                className="marker"
                style={{ left: '0px', top: '0px' }}
            >
            </div>
        </div>
    );
}

export default Map;



