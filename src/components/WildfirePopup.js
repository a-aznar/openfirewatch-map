import React, { useState, useEffect } from 'react';
import { Popup } from 'react-leaflet';
import WindArrow from '../utils/wind-arrow';

function WildfirePopup({ fetchTempAndWindData, lat, lng }) {
    const [tempAndWindData, setTempAndWindData] = useState(null);

    useEffect(() => {
        fetchTempAndWindData(lat, lng).then(data => {
            setTempAndWindData(data);
        });
    }, [fetchTempAndWindData, lat, lng]);

    let TemperatureDataComponent = null;
    const hasTemperatureData = tempAndWindData && tempAndWindData['temp-surface'] && tempAndWindData['temp-surface'][0]

    if (hasTemperatureData) {
        const temperatureKelvin = tempAndWindData['temp-surface'][0];
        const temperatureCelsius = (temperatureKelvin - 273.15).toFixed(1);
        TemperatureDataComponent = <p>Temperature: {temperatureCelsius} °C</p>;
    }

    let WindDataComponent = null;

    const hasWindData = tempAndWindData &&
        tempAndWindData['wind_u-surface'] &&
        tempAndWindData['wind_v-surface'] &&
        tempAndWindData['wind_u-surface'][0] &&
        tempAndWindData['wind_v-surface'][0]

    if (hasWindData) {

        const windU = tempAndWindData['wind_u-surface'][0];
        const windV = tempAndWindData['wind_v-surface'][0];

        const windDirection = (Math.atan2(-windU, -windV) * (180 / Math.PI) + 180).toFixed(2);
        const windSpeed = Math.sqrt(windU * windU + windV * windV).toFixed(2);


        WindDataComponent = (
            <div>
                <p>Wind Direction: {windDirection}°</p>
                <p>Wind Speed: {windSpeed} m/s</p>
                <WindArrow direction={windDirection} />
            </div>
        );
    }

    const latDirection = lat >= 0 ? 'N' : 'S';
    const lngDirection = lng >= 0 ? 'E' : 'W';

    return (
        <Popup>
            <header>Lat: {Math.abs(lat)}° {latDirection}, Lng: {Math.abs(lng)}° {lngDirection}</header>
            {hasTemperatureData && TemperatureDataComponent}
            {hasWindData && WindDataComponent}
        </Popup>
    )
}

export default WildfirePopup;