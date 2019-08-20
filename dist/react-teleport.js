'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var ReactDOM = _interopDefault(require('react-dom'));
var PropTypes = _interopDefault(require('prop-types'));
var EventEmitter = _interopDefault(require('@suinegmai/js-events'));

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}

var dests = new Map();
var portalEvents = EventEmitter();

var registerDestElement = function registerDestElement(channel, element) {
  dests.set(channel, element);
  portalEvents.emit(channel, element);
  return function () {
    registerDestElement(channel, null);
  };
};

var subscribe = function subscribe(channel, callback) {
  var destElement = dests.get(channel);
  destElement && callback(destElement);
  portalEvents.on(channel, callback);
  return function () {
    portalEvents.off(channel, callback);
  };
};

var portalRegistry = {
  registerDestElement: registerDestElement,
  subscribe: subscribe
};

var Portal = function Portal(_ref) {
  var channel = _ref.channel,
      children = _ref.children;

  var _useState = React.useState(),
      _useState2 = _slicedToArray(_useState, 2),
      containerElement = _useState2[0],
      setContainerElement = _useState2[1];

  React.useEffect(function () {
    return portalRegistry.subscribe(channel, setContainerElement);
  }, [channel]);
  return containerElement ? ReactDOM.createPortal(children, containerElement) : null;
};

Portal.propTypes = {
  channel: PropTypes.string.isRequired
};

var PortalDest = function PortalDest(_ref) {
  var channel = _ref.channel,
      _ref$Container = _ref.Container,
      Container = _ref$Container === void 0 ? 'div' : _ref$Container;
  var containerRef = React.useRef();
  React.useEffect(function () {
    return portalRegistry.registerDestElement(channel, containerRef.current);
  }, [channel]);
  return React__default.createElement(Container, {
    ref: containerRef
  });
};

PortalDest.propTypes = {
  channel: PropTypes.string.isRequired,
  Container: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

var createPortalRegistry = function createPortalRegistry() {
  var target = null;
  var sources = [];

  var registerTarget = function registerTarget(element) {
    target = element;
    sources.forEach(function (source) {
      typeof source === 'function' && source(target);
    });
    return function () {
      registerTarget(null);
    };
  };

  var registerSource = function registerSource(callback) {
    target && callback(target);
    sources.push(callback);
    return function () {
      sources = sources.filter(function (source) {
        return source !== callback;
      });
    };
  };

  return {
    registerTarget: registerTarget,
    registerSource: registerSource
  };
};

var createPortal = function createPortal() {
  var _createPortalRegistry = createPortalRegistry(),
      registerTarget = _createPortalRegistry.registerTarget,
      registerSource = _createPortalRegistry.registerSource;

  var Source = function Source(_ref) {
    var children = _ref.children;

    var _useState = React.useState(),
        _useState2 = _slicedToArray(_useState, 2),
        containerElement = _useState2[0],
        setContainerElement = _useState2[1];

    React.useEffect(function () {
      return registerSource(setContainerElement);
    }, []);
    return containerElement ? ReactDOM.createPortal(children, containerElement) : null;
  };

  var Target = function Target(_ref2) {
    var _ref2$Container = _ref2.Container,
        Container = _ref2$Container === void 0 ? 'div' : _ref2$Container;
    var containerRef = React.useRef();
    React.useEffect(function () {
      return registerTarget(containerRef.current);
    }, []);
    return React__default.createElement(Container, {
      ref: containerRef
    });
  };

  return {
    Target: Target,
    Source: Source
  };
};

exports.Portal = Portal;
exports.PortalDest = PortalDest;
exports.createPortal = createPortal;
