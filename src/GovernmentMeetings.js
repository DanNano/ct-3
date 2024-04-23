import React, { useState, useEffect } from 'react';

function GovernmentMeetings() {
    const [meetings, setMeetings] = useState('Loading meetings...');

    useEffect(() => {
        fetch('http://localhost:5000/api/meetings')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                setMeetings(JSON.stringify(data, null, 2));
            })
            .catch(error => {
                console.error('Error fetching meetings:', error);
                setMeetings('Failed to load meetings. Please check the console for more information.');
            });
    }, []);

    return (
        <div>
            <h1>Government Meetings</h1>
            <pre>{meetings}</pre>
        </div>
    );
}

export default GovernmentMeetings;
