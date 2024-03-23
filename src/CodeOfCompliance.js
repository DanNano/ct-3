import React from 'react';
import { useParams } from 'react-router-dom';
import './CodeOfCompliance.css';

function CodeOfCompliance() {
    let { cityName } = useParams();

    return (
        <div className="complaince-container">
            <h1>{cityName} Code of Compliance</h1>
        </div>
    );
}
export default CodeOfCompliance;
