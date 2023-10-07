import React, { useState } from 'react';
import { Popup, useMapEvents } from 'react-leaflet';


function AddWildfirePopup({ isDemoMode, addWildfire }) {
    const [popupPosition, setPopupPosition] = useState(null);
    const map = useMapEvents({
        click: (event) => {
            if (isDemoMode) {
                setPopupPosition(event.latlng);
            }
        },
    });

    const onAddWildfire = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setPopupPosition(null);
        addWildfire(popupPosition);
    };

    return popupPosition && (
        <Popup position={popupPosition} onClose={() => setPopupPosition(null)}>
            <div>
                <button onClick={onAddWildfire}>Add wildfire</button>
            </div>
        </Popup>
    );
}

export default AddWildfirePopup;