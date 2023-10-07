import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import moment from 'moment';  // Import moment.js

import TimeSlider from './TimeSlider';
import { areaStyles } from '../utils/area-styles';

import './MapComponent.css';

import riskAreasData from '../mock_data/risk-areas.json';
import spreadAreasData from '../mock_data/spread-areas.json';
import wildfiresData from '../mock_data/wildfires.json';

import { DATE_TIME_UP_TO_HOURS_FORMAT } from '../utils/date-utils';

const DEFAULT_MAP_ZOOM = 2;
const DEFAULT_MAP_CENTER_COORDS = [51.505, -0.09];

const customIcon = new L.Icon({
    iconUrl: 'https://static.vecteezy.com/system/resources/previews/001/188/562/original/fire-png.png',
    iconSize: [25, 25], // size of the icon
});

function MapComponent() {
    const [visibleRiskAreas, setVisibleRiskAreas] = useState([]);
    const [visibleSpreadAreas, setVisibleSpreadAreas] = useState([]);
    const [visibleWildfires, setVisibleWildfires] = useState([]);


    const handleDateChange = (newDate) => {
        const visibleRiskAreas = riskAreasData.features.filter(
            feature => moment(feature.properties.date).isSame(moment(newDate, DATE_TIME_UP_TO_HOURS_FORMAT), 'hour')
        );
        
        const visibleSpreadAreas = spreadAreasData.features.filter(
            feature => moment(feature.properties.date).isSame(moment(newDate, DATE_TIME_UP_TO_HOURS_FORMAT), 'hour')
        );
        
        const visibleWildfires = wildfiresData.features.filter(
            feature => moment(feature.properties.date).isSame(moment(newDate, DATE_TIME_UP_TO_HOURS_FORMAT), 'hour')
        );

        setVisibleRiskAreas(visibleRiskAreas);
        setVisibleSpreadAreas(visibleSpreadAreas);
        setVisibleWildfires(visibleWildfires);
    };

    return (
        <div className="map-container">
            <MapContainer
                center={DEFAULT_MAP_CENTER_COORDS}
                zoom={DEFAULT_MAP_ZOOM}
                style={{ height: "100%", width: "100%" }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                {visibleRiskAreas.map((feature, idx) => (
                    <GeoJSON 
                        key={feature.properties.date + '-risk-areas' + idx} 
                        data={feature} 
                        style={areaStyles['risk'][feature.properties.level]} 
                    />
                ))}
                {visibleSpreadAreas.map((feature, idx) => (
                    <GeoJSON 
                        key={feature.properties.date + '-spread-areas-' + idx} 
                        data={feature} 
                        style={areaStyles['spread'][feature.properties.level]} 
                    />
                ))}
                {visibleWildfires.map((feature, idx) => (
                    <Marker 
                        key={feature.properties.date + '-wildfires-' + idx}
                        position={[feature.geometry.coordinates[1], feature.geometry.coordinates[0]]}
                        icon={customIcon}
                    />
                ))}


            </MapContainer>
            <TimeSlider onDateChange={handleDateChange} />
        </div>
    );
}

export default MapComponent;
