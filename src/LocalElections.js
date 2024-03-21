import React from 'react';
import { useParams } from 'react-router-dom';
import './LocalElections.css';

function LocalElections() {
    let { cityName } = useParams();

    return (
        <div className="elections-container">
            <h1>{cityName} Election Results and Upcoming Elections</h1>
        </div>
    );
}

export default LocalElections;