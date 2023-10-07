// src/components/DemoButton.js
import React from 'react';
import PropTypes from 'prop-types';

import './DemoButton.css';

function DemoButton({ isDemoMode, toggleDemoMode }) {
    const buttonClassName = isDemoMode ? 'demo-button-toggled' : 'demo-button';
    const buttonLabel = isDemoMode ? 'Show Normal Mode' : 'Show DEMO Mode';

    return (
        <button className={buttonClassName} onClick={toggleDemoMode}>
            <label className='demo-button-label'>{buttonLabel}</label>
        </button>
    );
}

DemoButton.propTypes = {
    isDemoMode: PropTypes.bool.isRequired,
    toggleDemoMode: PropTypes.func.isRequired,
};

export default DemoButton;
