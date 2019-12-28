"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "withGoogleSheets", {
  enumerable: true,
  get: function get() {
    return _withGoogleSheets["default"];
  }
});
exports["default"] = void 0;

var _GoogleSheetsProvider = _interopRequireDefault(require("./GoogleSheetsProvider"));

var _withGoogleSheets = _interopRequireDefault(require("./withGoogleSheets"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = _GoogleSheetsProvider["default"];
exports["default"] = _default;