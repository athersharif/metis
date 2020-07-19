"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DEFAULTS = {
  className: 'data-loading',
  text: 'Loading...'
};

var DefaultLoadingComponent = function DefaultLoadingComponent(_ref) {
  var config = _ref.config;
  return _react["default"].createElement("div", {
    className: config.className || DEFAULTS.className
  }, _react["default"].createElement("p", {
    className: "text"
  }, config.text || DEFAULTS.text));
};

DefaultLoadingComponent.propTypes = {
  config: _propTypes["default"].shape({
    className: _propTypes["default"].string,
    text: _propTypes["default"].string
  })
};
DefaultLoadingComponent.defaultProps = {
  config: DEFAULTS
};
var _default = DefaultLoadingComponent;
exports["default"] = _default;