// src/components/DemoButton.js
import React from 'react';
import PropTypes from 'prop-types';

import './DemoButton.css';

function DemoButton({ isDemoMode, setDemoMode }) {
    return (
        <div className='button-container'>
            <button 
                className={`live-button ${isDemoMode ? '' : 'active'}`} 
                onClick={() => setDemoMode(false)}
            >
                <label className='button-label'>live</label>
            </button>
            <button 
                className={`demo-button ${isDemoMode ? 'active' : ''}`} 
                onClick={() => setDemoMode(true)}
            >
                <label className='button-label demo-button-label'>simulation</label>
            </button>
        </div>
    );
}

DemoButton.propTypes = {
    isDemoMode: PropTypes.bool.isRequired,
    toggleDemoMode: PropTypes.func.isRequired,
};

export default DemoButton;