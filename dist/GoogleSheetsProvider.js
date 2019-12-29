"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _flatMap = _interopRequireDefault(require("lodash/flatMap"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _toArray(arr) { return _arrayWithHoles(arr) || _iterableToArray(arr) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var GoogleSheetsProvider = function (_Component) {
  _inherits(GoogleSheetsProvider, _Component);

  function GoogleSheetsProvider() {
    var _this;

    _classCallCheck(this, GoogleSheetsProvider);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(GoogleSheetsProvider).call(this));

    _defineProperty(_assertThisInitialized(_this), "getUrl", function () {
      return "https://sheets.googleapis.com/v4/spreadsheets/".concat(process.env.REACT_APP_GOOGLE_SHEETS_DOC_ID, "?includeGridData=true&fields=sheets(data%2FrowData%2Fvalues%2FformattedValue%2Cproperties%2Ftitle)&key=").concat(process.env.REACT_APP_GOOGLE_SHEETS_API_KEY);
    });

    _defineProperty(_assertThisInitialized(_this), "processData", function (_ref) {
      var sheets = _ref.sheets;
      var result = {};
      sheets.forEach(function (sheet) {
        var id = sheet.properties.title,
            data = sheet.data;

        if (data[0].rowData) {
          var _data$0$rowData = _toArray(data[0].rowData),
              headerRow = _data$0$rowData[0],
              records = _data$0$rowData.slice(1);

          headerRow = (0, _flatMap["default"])(headerRow.values, function (row) {
            return row.formattedValue;
          });
          result = _objectSpread({}, result, _defineProperty({}, id, records.map(function (record) {
            var result = {};
            headerRow.forEach(function (value, index) {
              result = _objectSpread(_defineProperty({}, value, record.values[index] ? record.values[index].formattedValue : null), result);
            });
            return result;
          })));
        } else {
          result = _objectSpread({}, result, _defineProperty({}, id, null));
        }
      });
      return result;
    });

    _this.state = {
      db: null,
      error: null
    };
    return _this;
  }

  _createClass(GoogleSheetsProvider, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      fetch(this.getUrl()).then(function (response) {
        return response.json();
      }).then(function (data) {
        if (data.error) {
          _this2.setState({
            error: data.error
          });
        } else {
          _this2.setState({
            db: _this2.processData(data)
          });
        }
      })["catch"](function (error) {
        return console.error(error);
      });
    }
  }, {
    key: "getChildContext",
    value: function getChildContext() {
      var _this$state = this.state,
          db = _this$state.db,
          error = _this$state.error;
      return {
        db: db,
        error: error
      };
    }
  }, {
    key: "render",
    value: function render() {
      return this.state.db || this.state.error ? this.props.children : _react["default"].createElement("div", null, "Loading...");
    }
  }]);

  return GoogleSheetsProvider;
}(_react.Component);

_defineProperty(GoogleSheetsProvider, "propTypes", {
  children: _propTypes["default"].node
});

_defineProperty(GoogleSheetsProvider, "childContextTypes", {
  db: _propTypes["default"].object,
  error: _propTypes["default"].object
});

var _default = GoogleSheetsProvider;
exports["default"] = _default;