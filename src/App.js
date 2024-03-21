import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CitySelection from './CitySelection';
import CityDetails from './CityDetails';
import CodeOfCompliance from './CodeOfCompliance';
import ElectedRepresentatives from './ElectedRepresentatives';
import LocalElections from './LocalElections';
import GovernmentMeetings from './GovernmentMeetings';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<CitySelection />} />
                <Route path="/city/:cityName" element={<CityDetails />} />
                <Route path="/compliance/:cityName" element={<CodeOfCompliance />} />
                <Route path="/representatives/:cityName" element={<ElectedRepresentatives />} />
                <Route path="/elections/:cityName" element={<LocalElections />} />
                <Route path="/meetings/:cityName" element={<GovernmentMeetings /> } />
            </Routes>
        </Router>
    );
}

export default App;
