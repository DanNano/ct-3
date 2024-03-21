import React from 'react';
import { useParams } from 'react-router-dom';
import './GovernmentMeetings.css';

function GovernmentMeetings() {
    let { cityName } = useParams();

    return (
        <div className="meetings-container">
            <h1>{cityName} Upcoming Meetings and Events</h1>
        </div>
    );
}

export default GovernmentMeetings;