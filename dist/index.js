"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
Object.defineProperty(exports, "withGoogleSheets", {
  enumerable: true,
  get: function get() {
    return _withGoogleSheets["default"];
  }
});
var _GoogleSheetsProvider = _interopRequireDefault(require("./GoogleSheetsProvider"));
var _withGoogleSheets = _interopRequireDefault(require("./withGoogleSheets"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = _GoogleSheetsProvider["default"];
exports["default"] = _default;