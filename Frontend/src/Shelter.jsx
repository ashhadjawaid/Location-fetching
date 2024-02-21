import React, { useState } from 'react';
import axios from 'axios';

const LocationForm = () => {
    const [formData, setFormData] = useState({
        name: '',
        shelterName: '',
        email: '',
        address: '',
        latitude: '',
        longitude: ''
    });

    const handleChange = e => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fetchLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            setFormData({ ...formData, latitude: latitude.toString(), longitude: longitude.toString() });
        }, error => console.error(error));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/v1/shelter/createshelter', formData);
            console.log(response.data);
            // Add any further actions upon successful registration
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <div>
            <h2>Register Shelter Home</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div>
                    <label>Shelter Name:</label>
                    <input type="text" name="shelterName" value={formData.shelterName} onChange={handleChange} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div>
                    <label>Address:</label>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div>
                    <label>Latitude:</label>
                    <input type="text" name="latitude" value={formData.latitude} onChange={handleChange} required />
                </div>
                <div>
                    <label>Longitude:</label>
                    <input type="text" name="longitude" value={formData.longitude} onChange={handleChange} required />
                </div>
                <div>
                    <button type="button" onClick={fetchLocation}>Fetch Current Location</button>
                </div>
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default LocationForm;
