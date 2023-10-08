// TimeSlider.js
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './TimeSlider.css';
import moment from 'moment';
import { DATE_TIME_UP_TO_HOURS_FORMAT } from '../utils/date-utils';

const STEP_SIZE_IN_HOURS = 24;
const STEP_BUFFER = 7;

function getClosestPastHour() {
    return moment().startOf('day');
}

function TimeSlider({ stepHours, onDateChange, isDemoMode }) {
    const initialValue = getClosestPastHour();
    const [currentStep, setCurrentStep] = useState(0);

    const handleChange = (newStep) => {
        setCurrentStep(newStep);
        const newDate = initialValue.clone().add(newStep * stepHours, 'hours');
        onDateChange(moment(newDate).format(DATE_TIME_UP_TO_HOURS_FORMAT));
    };

    return (
        <div className="slider-container">
            <input
                type="range"
                min={isDemoMode ? 0 : -STEP_BUFFER}
                max={STEP_BUFFER}
                step={1}
                defaultValue={0}
                onChange={event => handleChange(Number(event.target.value))}
            />
            <label className='slider-label'>
                {initialValue.clone().add(currentStep * stepHours, 'hours').format(DATE_TIME_UP_TO_HOURS_FORMAT) + ':00 (UTC)'}
            </label>
        </div>
    );
}

TimeSlider.propTypes = {
    stepHours: PropTypes.number,
    onDateChange: PropTypes.func.isRequired,
};

TimeSlider.defaultProps = {
    stepHours: STEP_SIZE_IN_HOURS,
};

export default TimeSlider;
