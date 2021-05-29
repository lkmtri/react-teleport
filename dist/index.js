'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var _slicedToArray = require('@babel/runtime/helpers/slicedToArray');
var React = require('react');
var ReactDOM = require('react-dom');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var _slicedToArray__default = /*#__PURE__*/_interopDefaultLegacy(_slicedToArray);
var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var ReactDOM__default = /*#__PURE__*/_interopDefaultLegacy(ReactDOM);

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

    var _useState = React.useState(null),
        _useState2 = _slicedToArray__default['default'](_useState, 2),
        containerElement = _useState2[0],
        setContainerElement = _useState2[1];

    React.useEffect(function () {
      return registerSource(setContainerElement);
    }, []);
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

exports.createPortal = createPortal;
