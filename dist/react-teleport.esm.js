import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import EventEmitter from '@suinegmai/js-events';

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

  var _useState = useState(),
      _useState2 = _slicedToArray(_useState, 2),
      containerElement = _useState2[0],
      setContainerElement = _useState2[1];

  useEffect(function () {
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
  var containerRef = useRef();
  useEffect(function () {
    return portalRegistry.registerDestElement(channel, containerRef.current);
  }, [channel]);
  return React.createElement(Container, {
    ref: containerRef
  });
};

PortalDest.propTypes = {
  channel: PropTypes.string.isRequired,
  Container: PropTypes.oneOfType([PropTypes.func, PropTypes.string])
};

export { Portal, PortalDest };
