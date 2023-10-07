// CustomMapContainer.js
import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

import 'leaflet/dist/leaflet.css';
import moment from 'moment';

import { areaStyles } from '../utils/area-styles';

import riskAreasData from '../mock_data/risk-areas.json';
import spreadAreasData from '../mock_data/spread-areas.json';
import wildfiresData from '../mock_data/wildfires.json';
import { DATE_TIME_UP_TO_HOURS_FORMAT } from '../utils/date-utils';
import AddWildfireOnMapClick from './AddWildfirePopup';
import AddWildfirePopup from './AddWildfirePopup';
import AddWildfirePopupInfo from './WildFirePopupInfo';

const DEFAULT_MAP_ZOOM = 2;
const DEFAULT_MAP_CENTER_COORDS = [51.505, -0.09];

const WILDFIRE_ICON = new L.Icon({
    iconUrl: 'https://static.vecteezy.com/system/resources/previews/001/188/562/original/fire-png.png',
    iconSize: [25, 25]
});

function CustomMapContainer({
    dateToShow,
    showRiskAreas,
    showSpreadAreas,
    showWildfires,
    isDemoMode
}) {
    const visibleRiskAreas = filterDataByDate(riskAreasData, dateToShow);
    const visibleSpreadAreas = filterDataByDate(spreadAreasData, dateToShow);
    const visibleWildfires = filterDataByDate(wildfiresData, dateToShow);

    const [customWildfires, setCustomWildfires] = useState([]); 

    const addWildfire = (position) => {
        setCustomWildfires([...customWildfires, position]);
    };

    const renderWildfireMarkers = (features, idx) => (
        <AddWildfirePopupInfo features={features} idx={idx} key={`${features.properties.date}-wildfires-${idx}`} />
    );

    const renderCustomWildfireMarkers = () => (
        customWildfires.map((position, idx) => (
            <Marker
                key={`custom-wildfire-${idx}`}
                position={[position.lat, position.lng]}
                icon={WILDFIRE_ICON}
            />
        ))
    );

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
            {showRiskAreas && visibleRiskAreas.map((feature, idx) => renderGeoJSON(feature, 'risk', idx))}
            {showSpreadAreas && visibleSpreadAreas.map((feature, idx) => renderGeoJSON(feature, 'spread', idx))}
            {isDemoMode ? renderCustomWildfireMarkers() : showWildfires && visibleWildfires.map((feature, idx) => renderWildfireMarkers(feature, idx))}
            <AddWildfirePopup isDemoMode={isDemoMode} addWildfire={addWildfire} />
        </MapContainer>
        </>
    );
}

const filterDataByDate = (data, date) => {
    return data.features.filter(
        feature => moment(feature.properties.date).isSame(moment(date, DATE_TIME_UP_TO_HOURS_FORMAT), 'hour')
    );
};

const renderGeoJSON = (features, type, idx) => (
    <GeoJSON
        key={features.properties.date + `-${type}-` + idx}
        data={features}
        style={areaStyles[type][features.properties.level]}
    />
);

const renderWildfireMarkers = (features, idx) => (
    <Marker
        key={features.properties.date + '-wildfires-' + idx}
        position={[features.geometry.coordinates[1], features.geometry.coordinates[0]]}
        icon={WILDFIRE_ICON}
    />
);

export default CustomMapContainer;
