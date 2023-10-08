// CustomMapContainer.js
import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, Circle } from 'react-leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import moment from 'moment';

import { areaStyles } from '../utils/area-styles';

import riskAreasData from '../mock_data/risk-areas.json';
import wildfiresData from '../mock_data/wildfires.json';
import wildfireImage from '../media/wildfire.webp';

import { DATE_TIME_UP_TO_HOURS_FORMAT } from '../utils/date-utils';
import AddWildfirePopup from './AddWildfirePopup';
import WildfirePopup from './WildfirePopup';

const DEFAULT_MAP_ZOOM = 2;
const DEFAULT_MAP_CENTER_COORDS = [51.505, -0.09];

const WILDFIRE_ICON = new L.Icon({
    iconUrl: wildfireImage,
    iconSize: [25, 25]
});

function CustomMapContainer({
    dateToShow,
    showRiskAreas,    
    showSpreadAreas,
    showWildfires,
    isDemoMode
}) {
    const [customWildfires, setCustomWildfires] = useState([]);

    const addWildfire = (position) => {
        setCustomWildfires([...customWildfires, position]);
    };

    return (
        <>
            <MapContainer
                center={DEFAULT_MAP_CENTER_COORDS}
                zoom={DEFAULT_MAP_ZOOM}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {showRiskAreas && riskAreasData.features.map((feature, idx) => renderGeoJSON(feature, 'risk', idx))}
                {isDemoMode ? renderCustomWildfireMarkers(customWildfires) : showWildfires && renderWildfireMarkers(dateToShow, wildfiresData)}
                <AddWildfirePopup isDemoMode={isDemoMode} addWildfire={addWildfire} />
                {showSpreadAreas && renderWildfireSpread(dateToShow, wildfiresData, customWildfires, isDemoMode)}
            </MapContainer>
        </>
    );
}

const filterDataByDate = (data, date) => {
    return data.features.filter(
        feature => moment(feature.properties.date).isSame(moment(date, DATE_TIME_UP_TO_HOURS_FORMAT), 'day')
    );
};

const renderGeoJSON = (features, type, idx) => (
    <GeoJSON
        key={features.properties.date + `-${type}-` + idx}
        data={features}
        style={areaStyles[type][features.properties.level]}
    />
);

const renderWildfireMarkers = (dateToShow, wildfiresData) => {
    return filterDataByDate(wildfiresData, dateToShow)
        .map((features, idx) => (
            <Marker
                key={`wildfire-${idx}`}
                position={[features.geometry.coordinates[1], features.geometry.coordinates[0]]}
                icon={WILDFIRE_ICON}
            >
                <WildfirePopup fetchTempAndWindData={fetchTempAndWindData} lat={features.geometry.coordinates[1]} lng={features.geometry.coordinates[0]} />
            </Marker>
        ))
}

const renderCustomWildfireMarkers = (customWildfires) => (
    customWildfires.map((position, idx) => (
        <Marker
            key={`wildfire-${idx}`}
            position={[position.lat, position.lng]}
            icon={WILDFIRE_ICON}
        />
    ))
);

function renderWildfireSpread(dateToShow, wildfiresData, customWildfires, isDemoMode) {
    const dateToShowRoundToHour = moment(dateToShow, DATE_TIME_UP_TO_HOURS_FORMAT);

    if (!isDemoMode) {
        return wildfiresData.features
            .map((features, idx) => {
                const wildfireDate = moment(features.properties.date);
                const hoursDifference = Math.max(0, dateToShowRoundToHour.diff(wildfireDate, 'hours'));
                return renderWildfireSpreadCircle(features.geometry.coordinates[1], features.geometry.coordinates[0], hoursDifference, idx);
            })
    } else {
        return customWildfires.map((position, idx) => {
            const wildfireDate = moment().startOf('day');
            const hoursDifference =  Math.max(0, dateToShowRoundToHour.diff(wildfireDate, 'hours'));
            return renderWildfireSpreadCircle(position.lat, position.lng, hoursDifference, idx);
        })
    }
}

function renderWildfireSpreadCircle(lat, lng, hoursDifference, idx) {
    const radius = isNaN(hoursDifference) ? 0 : 18 * hoursDifference; // 18 m/h avg spread speed

    return (
        <Circle
            key={lat + lng + hoursDifference + '-wildfires-' + idx}
            center={[lat, lng]}
            radius={radius}
            fillOpacity={0.5}
            color={'black'} />
    );
}

async function fetchTempAndWindData(lat, lon) {
    const url = 'https://api.windy.com/api/point-forecast/v2';

    const requestBody = {
        "lat": lat,
        "lon": lon,
        "model": "gfs",
        "parameters": ["wind", "temp"],
        "levels": ["surface"],
        key: 'm3IRhefaNn8bVhLUXk2a9X0aM995rtfZ'
    };

    try {

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        return await response.json();
    } catch (error) {
        console.error('Error making API call:', error);
    }
};



export default CustomMapContainer;