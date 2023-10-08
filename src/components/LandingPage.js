import React, { useState } from 'react';
import 'leaflet/dist/leaflet.css';

import TimeSlider from './TimeSlider';

import './MapComponent.css';

import LayerToggle from './LayerToggle';
import DemoButton from './DemoButton';
import CustomMapContainer from './CustomMapContainer';

function MapComponent() {
    const [showRiskAreas, setShowRiskAreas] = useState(true);
    const [showSpreadAreas, setShowSpreadAreas] = useState(true);
    const [showWildfires, setShowWildfires] = useState(true);

    const [isDemoMode, setIsDemoMode] = useState(false);
    const [dateToShow, setDateToShow] = useState();

    const toggleDemoMode = () => {
        setIsDemoMode(prevMode => !prevMode);
    };

    return (
        <div className="map-container">
            <CustomMapContainer
                dateToShow={dateToShow}
                showRiskAreas={showRiskAreas}
                showSpreadAreas={showSpreadAreas}
                showWildfires={showWildfires}
                isDemoMode={isDemoMode}
            />
            <DemoButton
                isDemoMode={isDemoMode}
                toggleDemoMode={toggleDemoMode}
            />
            <LayerToggle
                showRiskAreas={showRiskAreas}
                setShowRiskAreas={setShowRiskAreas}
                showSpreadAreas={showSpreadAreas}
                setShowSpreadAreas={setShowSpreadAreas}
                showWildfires={showWildfires}
                setShowWildfires={setShowWildfires}
            />
            <TimeSlider onDateChange={setDateToShow} isDemoMode={isDemoMode} />
        </div>
    );
}

export default MapComponent;
