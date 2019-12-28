'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = void 0;

var _react = _interopRequireDefault(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

/**
 *
 * Default Load Error Component when unable to fetch Google Sheets results
 *
 * react-db-google-sheets <https://github.com/athersharif/react-db-google-sheets>
 *
 * Copyright (c) 2019-Present, Ather Sharif.
 * Released under the MIT License.
 *
 */

/**
 *
 * Default values for arguments: `className`, `message`, `title`
 *
 */
var DEFAULTS = {
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
 * @param {string} [config.message="An error occurred fetching records from Google Sheets"] The error message to display when unable to fetch results, rendered as a `P` tag.
 * @param {string} [config.title="Data Load Error"] The title to display, rendered as an `H1` tag
 *
 */

var DefaultLoadErrorComponent = function DefaultLoadErrorComponent(_ref) {
  var config = _ref.config;
  return _react['default'].createElement(
    'div',
    {
      className: config.className || DEFAULTS.className
    },
    _react['default'].createElement(
      'h1',
      {
        className: 'title'
      },
      config.title || DEFAULTS.title
    ),
    _react['default'].createElement(
      'p',
      {
        className: 'message'
      },
      config.message || DEFAULTS.message
    )
  );
};

DefaultLoadErrorComponent.propTypes = {
  config: _propTypes['default'].shape({
    className: _propTypes['default'].string,
    message: _propTypes['default'].string,
    title: _propTypes['default'].string
  })
};
DefaultLoadErrorComponent.defaultProps = {
  config: DEFAULTS
};
var _default = DefaultLoadErrorComponent;
exports['default'] = _default;
