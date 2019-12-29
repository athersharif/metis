/**
 *
 * Default Load Error Component when unable to fetch Google Sheets results
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
 * Default values for arguments: `className`, `message`, `title`
 *
 */
const DEFAULTS = {
  className: 'data-load-error',
  message: 'An error occurred fetching records from Google Sheets',
  title: 'Data Load Error'
};

/**
 *
 * A very basic and minimalist Component to render when unable to fetch results from Google Sheets
 *
 * @param {object} [config={}] The config for the Component
 * @param {string} [config.className="data-load-error"] The class name of the Component for custom styling and control.
 * @param {string} [config.message="[error message returned from the error response]"] The error message to display when unable to fetch results, rendered as a `P` tag.
 * @param {string} [config.title="Data Load Error: HTTP Status: [error code returned from error response]"] The title to display, rendered as an `H1` tag
 *
 */
const DefaultLoadErrorComponent = ({ config }) => (
  <div className={config.className || DEFAULTS.className}>
    <h1 className="title">{config.title || DEFAULTS.title}</h1>
    <p className="message">{config.message || DEFAULTS.message}</p>
  </div>
);

DefaultLoadErrorComponent.propTypes = {
  config: PropTypes.shape({
    className: PropTypes.string,
    message: PropTypes.string,
    title: PropTypes.string
  })
};

DefaultLoadErrorComponent.defaultProps = {
  config: DEFAULTS
};

export default DefaultLoadErrorComponent;
