'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
exports['default'] = void 0;

var _react = _interopRequireWildcard(require('react'));

var _propTypes = _interopRequireDefault(require('prop-types'));

var _get = _interopRequireDefault(require('lodash/get'));

var _DefaultLoadErrorComponent = _interopRequireDefault(
  require('./DefaultLoadErrorComponent')
);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

function _getRequireWildcardCache() {
  if (typeof WeakMap !== 'function') return null;
  var cache = new WeakMap();
  _getRequireWildcardCache = function _getRequireWildcardCache() {
    return cache;
  };
  return cache;
}

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  }
  if (
    obj === null ||
    (_typeof(obj) !== 'object' && typeof obj !== 'function')
  ) {
    return { default: obj };
  }
  var cache = _getRequireWildcardCache();
  if (cache && cache.has(obj)) {
    return cache.get(obj);
  }
  var newObj = {};
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null;
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  newObj['default'] = obj;
  if (cache) {
    cache.set(obj, newObj);
  }
  return newObj;
}

function _typeof(obj) {
  if (typeof Symbol === 'function' && typeof Symbol.iterator === 'symbol') {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj &&
        typeof Symbol === 'function' &&
        obj.constructor === Symbol &&
        obj !== Symbol.prototype
        ? 'symbol'
        : typeof obj;
    };
  }
  return _typeof(obj);
}

function _extends() {
  _extends =
    Object.assign ||
    function(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = arguments[i];
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
      return target;
    };
  return _extends.apply(this, arguments);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError('Cannot call a class as a function');
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ('value' in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === 'object' || typeof call === 'function')) {
    return call;
  }
  return _assertThisInitialized(self);
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf
    ? Object.getPrototypeOf
    : function _getPrototypeOf(o) {
        return o.__proto__ || Object.getPrototypeOf(o);
      };
  return _getPrototypeOf(o);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }
  return self;
}

function _inherits(subClass, superClass) {
  if (typeof superClass !== 'function' && superClass !== null) {
    throw new TypeError('Super expression must either be null or a function');
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: { value: subClass, writable: true, configurable: true }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf =
    Object.setPrototypeOf ||
    function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };
  return _setPrototypeOf(o, p);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }
  return obj;
}

/**
 *
 * Higher-Order Component to fetch data from Google Sheets.
 *
 * @param {string} sheet The name of the Google Sheets sheet.
 * @param {object} [config={}] The config for the HOC
 * @param {object} [config.dataLoadError={}] The config for the Load Error Component.
 * @param {function} [config.dataLoadError.component] The custom component to render when unable to fetch from Google Sheets.
 * @param {string} [config.dataLoadError.className="data-load-error"] The class name of the Component for custom styling and control.
 * @param {string} [config.dataLoadError.message="An error occurred fetching records from Google Sheets"] The error message to display when unable to fetch results, rendered as a `P` tag.
 * @param {string} [config.dataLoadError.title="Data Load Error"] The title to display, rendered as an `H1` tag
 *
 */
var withGoogleSheets = function withGoogleSheets(sheet) {
  var config =
    arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return function(WrappedComponent) {
    var _class, _temp;

    return (
      (_temp = _class =
        /*#__PURE__*/
        (function(_Component) {
          _inherits(_class, _Component);

          function _class() {
            var _getPrototypeOf2;

            var _this;

            _classCallCheck(this, _class);

            for (
              var _len = arguments.length, args = new Array(_len), _key = 0;
              _key < _len;
              _key++
            ) {
              args[_key] = arguments[_key];
            }

            _this = _possibleConstructorReturn(
              this,
              (_getPrototypeOf2 = _getPrototypeOf(_class)).call.apply(
                _getPrototypeOf2,
                [this].concat(args)
              )
            );

            _defineProperty(
              _assertThisInitialized(_this),
              'displayName',
              'DBGoogleSheets'
            );

            return _this;
          }

          _createClass(_class, [
            {
              key: 'render',
              value: function render() {
                var result = this.props.db || {};
                var db = this.context.db;
                var data = (0, _get['default'])(db, sheet);

                if (data) {
                  result[sheet] = data;
                }

                var errorComponentConfig = config.dataLoadError || {};
                var LoadErrorComponent = errorComponentConfig.component
                  ? errorComponentConfig.component
                  : _DefaultLoadErrorComponent['default'];
                return db && result
                  ? _react['default'].createElement(
                      WrappedComponent,
                      _extends({}, this.props, {
                        db: result
                      })
                    )
                  : _react['default'].createElement(LoadErrorComponent, {
                      config: errorComponentConfig
                    });
              }
            }
          ]);

          return _class;
        })(_react.Component)),
      _defineProperty(_class, 'propTypes', {
        db: _propTypes['default'].object
      }),
      _defineProperty(_class, 'contextTypes', {
        db: _propTypes['default'].object
      }),
      _temp
    );
  };
};

var _default = withGoogleSheets;
exports['default'] = _default;
