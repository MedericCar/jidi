import React from 'react';
import PropTypes from 'prop-types';
import './SpinnerComponent.css';

const SpinnerComponent = ({ message }) => (
  <div className="spinner-overlay">
    <div className="spinner-content">
      <div className="loading-spinner"></div>
      <p className="loading-text">{message}</p>
    </div>
  </div>
);

SpinnerComponent.propTypes = {
  message: PropTypes.string,
};

SpinnerComponent.defaultProps = {
  message: 'Loading, please wait...',
};

export default SpinnerComponent;
