import React, { useState } from 'react';
import { Popup, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import WindArrow from '../utils/wind-arrow';
const WILDFIRE_ICON = new L.Icon({
    iconUrl: 'https://static.vecteezy.com/system/resources/previews/001/188/562/original/fire-png.png',
    iconSize: [25, 25]
});

function InfoMarker({ features, idx }) {
    const [responseData, setResponseData] = useState(null);
    const makeApiCall = async (lat, lon) => {
        const url = 'https://api.windy.com/api/point-forecast/v2'; // Reemplaza con la URL de tu API
    
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
    
          const responseData = await response.json();
          setResponseData(responseData);
        } catch (error) {
          console.error('Error making API call:', error);
        }
      };
    
    const handleMarkerClick = (lat, lon) => {
        makeApiCall(lat, lon);
    };

    const renderTemperatureData = () => {
        if (responseData && responseData['temp-surface'] && responseData['temp-surface'][0]) {
          const temperatureKelvin = responseData['temp-surface'][0];
          const temperatureCelsius = (temperatureKelvin - 273.15).toFixed(1);
          return <p>Temperature: {temperatureCelsius} °C</p>;
        }
        return null;
      };
    
    const renderWindData = () => {
    if (
        responseData &&
        responseData['wind_u-surface'] &&
        responseData['wind_v-surface'] &&
        responseData['wind_u-surface'][0] &&
        responseData['wind_v-surface'][0]
    ) {
        const windU = responseData['wind_u-surface'][0];
        const windV = responseData['wind_v-surface'][0];
    
        // Calcular la dirección del viento en grados
        const windDirection = (Math.atan2(-windU, -windV) * (180 / Math.PI) + 180).toFixed(2);
    
        return (
        <div>
            <p>Wind Direction: {windDirection}°</p>
            <WindArrow direction={windDirection} />
        </div>
        );
    }
    return null;
    };
    const [position] = useState(null)

    return (
        <Marker
            position={[features.geometry.coordinates[1], features.geometry.coordinates[0]]}
            icon={WILDFIRE_ICON}
            eventHandlers={{
                click: () => handleMarkerClick(features.geometry.coordinates[1], features.geometry.coordinates[0])
            }}
        >
            <Popup>
                {renderTemperatureData()}
                {renderWindData()}
            </Popup>
        </Marker>
    )
}

export default InfoMarker;