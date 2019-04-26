"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _moment = _interopRequireDefault(require("moment"));

var _reactSelect = _interopRequireDefault(require("react-select"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

_moment.default.updateLocale('es', {});

var createOptions = function createOptions(_ref) {
  var interval = _ref.interval;
  var options = [];
  var maxTime = {
    hour: 23,
    minute: 59
  };
  var actualMoment = (0, _moment.default)('12:00', 'HH:mm');
  var maxMomentTime = (0, _moment.default)(actualMoment).set(maxTime);

  while (actualMoment.isBefore(maxMomentTime)) {
    options.push({
      value: actualMoment.format(),
      label: actualMoment.format('HH:mm')
    });
    actualMoment.add(interval, 'minutes');
  }

  return options;
};

var hsLabel = function hsLabel() {
  var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#ccc';
  return {
    alignItems: 'center',
    display: 'flex',
    ':before': {
      position: 'absolute',
      right: '4px',
      content: '"hs"',
      display: 'block',
      marginRight: 8,
      fontSize: 16
    }
  };
};

var warningBorder = function warningBorder(data) {
  return console.log(data) || {};
};

var colourStyles = {
  input: function input(styles) {
    return _objectSpread({}, styles, hsLabel());
  },
  control: function control(styles, data) {
    return _objectSpread({}, styles, warningBorder(data));
  }
};

var TimeRangePicker = function TimeRangePicker(_ref2) {
  var handleRangeChange = _ref2.handleRangeChange,
      handleErrorChange = _ref2.handleErrorChange,
      timeStart = _ref2.timeStart,
      timeEnd = _ref2.timeEnd;
  var actualMoment = (0, _moment.default)(timeStart || '12:00', 'HH:mm');
  var maxMomentTime = (0, _moment.default)(timeEnd || '23:45', 'HH:mm');

  var _useState = (0, _react.useState)({
    value: actualMoment.format(),
    label: actualMoment.format('HH:mm'),
    error: false
  }),
      _useState2 = _slicedToArray(_useState, 2),
      startTime = _useState2[0],
      setStartTime = _useState2[1];

  var _useState3 = (0, _react.useState)({
    value: maxMomentTime.format(),
    label: maxMomentTime.format('HH:mm'),
    error: false
  }),
      _useState4 = _slicedToArray(_useState3, 2),
      endTime = _useState4[0],
      setEndTime = _useState4[1];

  var _useState5 = (0, _react.useState)(''),
      _useState6 = _slicedToArray(_useState5, 2),
      error = _useState6[0],
      setError = _useState6[1];

  (0, _react.useEffect)(function () {
    if (!error) return handleRangeChange({
      startTime: startTime,
      endTime: endTime
    });
    return handleErrorChange(error);
  }, [startTime, endTime]);

  var handleStartTimeChange = function handleStartTimeChange(startTime) {
    setStartTime(startTime);
    return !(0, _moment.default)(startTime.value).isBefore(endTime.value) ? setError('Por favor ingrese un rango válido. La hora de comienzo no puede estar después de la hora de fin.') : setError('');
  };

  var handleEndTimeChange = function handleEndTimeChange(endTime) {
    setEndTime(endTime);
    return !(0, _moment.default)(endTime.value).isAfter(startTime.value) ? setError('Por favor ingrese un rango válido. La hora de fin no puede estar antes de la hora de comienzo.') : setError('');
  };

  var options = (0, _react.useMemo)(function () {
    return createOptions({
      interval: 15
    });
  }, []);
  return _react.default.createElement("div", {
    className: "time-range-pickers"
  }, _react.default.createElement(_reactSelect.default, {
    options: options,
    value: startTime,
    onChange: handleStartTimeChange,
    styles: colourStyles
  }), _react.default.createElement(_reactSelect.default, {
    options: options,
    value: endTime,
    onChange: handleEndTimeChange,
    styles: colourStyles
  }));
};

var _default = TimeRangePicker;
exports.default = _default;

//# sourceMappingURL=index.js.map