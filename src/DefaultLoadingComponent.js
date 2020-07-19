/**
 *
 * Default Loading Component when loading Google Sheets results
 *
 * metis <https://github.com/athersharif/metis>
 *
 * Copyright (c) 2019-Present, Ather Sharif.
 * Released under the MIT License.
 *
 */
import React from 'react';
import PropTypes from 'prop-types';

/**
 *
 * Default values for arguments: `className`, `text`
 *
 */
const DEFAULTS = {
  className: 'data-loading',
  text: 'Loading...',
};

/**
 *
 * A very basic and minimalist Component to render when loading results from Google Sheets
 *
 * @param {object} [config={}] The config for the Component
 * @param {string} [config.className="data-loading"] The class name of the Component for custom styling and control.
 * @param {string} [config.text="[Loading...]"] The text to display when loading results, rendered as a `P` tag.
 *
 */
const DefaultLoadingComponent = ({ config }) => (
  <div className={config.className || DEFAULTS.className}>
    <p className="text">{config.text || DEFAULTS.text}</p>
  </div>
);

DefaultLoadingComponent.propTypes = {
  config: PropTypes.shape({
    className: PropTypes.string,
    text: PropTypes.string,
  }),
};

DefaultLoadingComponent.defaultProps = {
  config: DEFAULTS,
};

export default DefaultLoadingComponent;
