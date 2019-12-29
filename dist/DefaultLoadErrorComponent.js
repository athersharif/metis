"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DEFAULTS = {
  className: 'data-load-error',
  message: 'An error occurred fetching records from Google Sheets',
  title: 'Data Load Error'
};

var DefaultLoadErrorComponent = function DefaultLoadErrorComponent(_ref) {
  var config = _ref.config;
  return _react["default"].createElement("div", {
    className: config.className || DEFAULTS.className
  }, _react["default"].createElement("h1", {
    className: "title"
  }, config.title || DEFAULTS.title), _react["default"].createElement("p", {
    className: "message"
  }, config.message || DEFAULTS.message));
};

DefaultLoadErrorComponent.propTypes = {
  config: _propTypes["default"].shape({
    className: _propTypes["default"].string,
    message: _propTypes["default"].string,
    title: _propTypes["default"].string
  })
};
DefaultLoadErrorComponent.defaultProps = {
  config: DEFAULTS
};
var _default = DefaultLoadErrorComponent;
exports["default"] = _default;