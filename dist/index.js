'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var React = require('react');
var ReactDOM = require('react-dom');
var EventEmitter = require('@suinegmai/js-events');
var _extends = require('@babel/runtime/helpers/extends');
var _objectWithoutProperties = require('@babel/runtime/helpers/objectWithoutProperties');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);
var EventEmitter__default = /*#__PURE__*/_interopDefaultLegacy(EventEmitter);
var _extends__default = /*#__PURE__*/_interopDefaultLegacy(_extends);
var _objectWithoutProperties__default = /*#__PURE__*/_interopDefaultLegacy(_objectWithoutProperties);

var dests = new Map();
var portalEvents = EventEmitter__default['default']();

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

  var _useState = React.useState(null),
      _useState2 = _slicedToArray__default['default'](_useState, 2),
      containerElement = _useState2[0],
      setContainerElement = _useState2[1];

  React.useEffect(function () {
    return portalRegistry.subscribe(channel, setContainerElement);
  }, [channel]);
  return containerElement ? ReactDOM__default['default'].createPortal(children, containerElement) : null;
};

var _excluded = ["channel", "Container"];

var PortalDest = function PortalDest(_ref) {
  var channel = _ref.channel,
      _ref$Container = _ref.Container,
      Container = _ref$Container === void 0 ? 'div' : _ref$Container,
      props = _objectWithoutProperties__default['default'](_ref, _excluded);

  var containerRef = React.useRef(null);
  React.useEffect(function () {
    return portalRegistry.registerDestElement(channel, containerRef.current);
  }, [channel]);
  return React__default['default'].createElement(Container, _extends__default['default']({
    ref: containerRef
  }, props));
};

var createPortalRegistry = function createPortalRegistry() {
  var target = null;
  var sources = [];

  var registerTarget = function registerTarget(element) {
    target = element;
    sources.forEach(function (source) {
      source(target);
    });
    return function () {
      registerTarget(null);
    };
  };

  var registerSource = function registerSource(callback, only) {
    if (only && sources.length) {
      sources.forEach(function (source) {
        source(null);
      });
    }

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
    var children = _ref.children,
        only = _ref.only;

    var _useState = React.useState(null),
        _useState2 = _slicedToArray__default['default'](_useState, 2),
        containerElement = _useState2[0],
        setContainerElement = _useState2[1];

    React.useEffect(function () {
      return registerSource(setContainerElement, only);
    }, [only]);
    return containerElement ? ReactDOM__default['default'].createPortal(children, containerElement) : null;
  };

  var Target = function Target(_ref2) {
    var _ref2$Container = _ref2.Container,
        Container = _ref2$Container === void 0 ? 'div' : _ref2$Container;
    var containerRef = React.useRef(null);
    React.useEffect(function () {
      return registerTarget(containerRef.current);
    }, []);
    return React__default['default'].createElement(Container, {
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
