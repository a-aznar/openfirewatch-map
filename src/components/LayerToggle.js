import React from 'react';
import './LayerToggle.css';

import skullImage from '../media/skull.png';
import dangerSignImage from '../media/danger-sign.png';
import wildfireImage from '../media/wildfire.webp';

function LayerToggle({ showRiskAreas, setShowRiskAreas, showSpreadAreas, setShowSpreadAreas, showWildfires, setShowWildfires }) {
    const riskAreasToggleText = showRiskAreas ? 'Hide Risk Areas' : 'Show Risk Areas';
    const spreadAreasToggleText = showSpreadAreas ? 'Hide Fire Spread Areas' : 'Show Fire Spread Areas';
    const wildfiresToggleText = showWildfires ? 'Hide Wildfires' : 'Show Wildfires';

    const toggledButtonClassName = 'toggle-button-toggled';
    const buttonClassName = 'toggle-button';

    return (
        <div className="layer-toggle">
            <div className="toggle-item">
                <button
                    onClick={() => setShowRiskAreas(!showRiskAreas)}
                    className={showRiskAreas ? toggledButtonClassName : buttonClassName}
                >
                    <img className='toggle-item-icon' src={dangerSignImage} alt={riskAreasToggleText} />
                </button>
                <label className="toggle-item-label">{riskAreasToggleText}</label>
            </div>
            <div className="toggle-item">
                <button
                    onClick={() => setShowSpreadAreas(!showSpreadAreas)}
                    className={showSpreadAreas ? toggledButtonClassName : buttonClassName}
                >
                    <img className='toggle-item-icon' src={skullImage} alt={spreadAreasToggleText} />
                </button>
                <label className="toggle-item-label">{spreadAreasToggleText}</label>
            </div>
            <div className="toggle-item">
                <button
                    onClick={() => setShowWildfires(!showWildfires)}
                    className={showWildfires ? toggledButtonClassName : buttonClassName}
                >
                    <img className='toggle-item-icon' src={wildfireImage} alt={wildfiresToggleText} />
                </button>
                <label className="toggle-item-label">{wildfiresToggleText}</label>
            </div>
        </div>
    );
}

export default LayerToggle;
