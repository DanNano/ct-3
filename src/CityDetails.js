import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './CityDetails.css';

function CityDetails() {
    const [population, setPopulation] = useState('');
    const navigate = useNavigate();
    let { cityName } = useParams();

    useEffect(() => {
        fetch('/CitiesPop.json')
            .then(response => response.json())
            .then(data => {
                if (data[cityName]) {
                    setPopulation(data[cityName].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
                } else {
                    setPopulation('Population data not available');
                }
            })
            .catch(error => {
                console.error('Error fetching population data:', error);
                setPopulation('Population data not available');
            });
    }, [cityName]);

    const handleComplianceClick = () => {
        navigate(`/compliance/${cityName}`);
    };

    const handleRepresentativesClick = () => {
        navigate(`/representatives/${cityName}`);
    }

    const handleElectionsClick = () => {
        navigate(`/elections/${cityName}`);
    }

    const handleMeetingsClick = () => {
        navigate(`/meetings/${cityName}`);
    }

    return (
        <div className="city-details-container">
            <h1>{cityName}</h1>
            <p>Population: {population}</p>
            <div className="buttons-container">
                <button onClick={handleComplianceClick}>Code of Compliance</button>
                <button onClick={handleRepresentativesClick}>Your Representatives</button>
                <button onClick={handleElectionsClick}>Local Elections</button>
                <button onClick={handleMeetingsClick}>Government Meetings</button>
            </div>
        </div>
    );
}

export default CityDetails;
