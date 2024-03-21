import React from 'react';
import { useParams } from 'react-router-dom';
import './ElectedRepresentatives.css';

function ElectedRepresentatives() {
    let { cityName } = useParams();

    return (
        <div className="representative-container">
            <h1>{cityName} Elected Representatives</h1>
        </div>
    );
}
export default ElectedRepresentatives;