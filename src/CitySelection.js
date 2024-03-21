import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './CitySelection.css';

function CitySelection() {
    const [cities, setCities] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('/floridaCities.json')
            .then(response => response.json())
            .then(data => {
                setCities(data);
            })
            .catch(error => {
                console.error('Error fetching city data:', error);
            });
    }, []);

    const handleCityChange = (event) => {
        navigate(`/city/${event.target.value}`);
    };

    return (
        <div className="city-selection-container">
            <h2>Please Select your city!</h2>
            <select onChange={handleCityChange} defaultValue="">
                <option value="" disabled>Select your city</option>
                {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                ))}
            </select>
        </div>
    );
}

export default CitySelection;
