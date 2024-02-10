import React, { useState } from 'react'
import axios from 'axios';
import Map from '../components/Map/Map'

const Home = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState();
    const [location, setLocation] = useState({});
    const handleMarkerDragEnd = (coordinates) => {
        setLocation(coordinates)
    };
    console.log(location)
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/locations/add', {
                title,
                description,
                image,
                location
            });
            setTitle('');
            setDescription('');
        } catch (error) {
            console.error('Error creating location:', error);
        }
    };
    return (
        <section>
            <div>
                <form onSubmit={handleSubmit}>
                    <label>Title:
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </label>
                    <br />
                    <label>Description:
                        <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </label>
                    <br />
                    <label onChange={(e) => setImage(e.target.value)}>
                        <input type="file" />
                    </label>
                    <button type="submit">Save Location</button>
                </form>

                <Map onMarkerDragEnd={handleMarkerDragEnd} />
            </div>
        </section>
    )
}

export default Home