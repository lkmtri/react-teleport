import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import EventEmitter from '@suinegmai/js-events';

const dests = new Map();
const portalEvents = EventEmitter();
const registerDestElement = (channel, element) => {
  dests.set(channel, element);
  portalEvents.emit(channel, element);
  return () => {
    registerDestElement(channel, null);
  };
};
const subscribe = (channel, callback) => {
  const destElement = dests.get(channel);
  destElement && callback(destElement);
  portalEvents.on(channel, callback);
  return () => {
    portalEvents.off(channel, callback);
  };
};
var portalRegistry = {
  registerDestElement,
  subscribe
};

const Portal = ({ channel, children }) => {
  const [containerElement, setContainerElement] = useState(null);
  useEffect(() => portalRegistry.subscribe(channel, setContainerElement), [
    channel
  ]);
  return containerElement ? ReactDOM.createPortal(children, containerElement) : null;
};

var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __objRest = (source, exclude) => {
  var target = {};
  for (var prop in source)
    if (__hasOwnProp.call(source, prop) && exclude.indexOf(prop) < 0)
      target[prop] = source[prop];
  if (source != null && __getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(source)) {
      if (exclude.indexOf(prop) < 0 && __propIsEnum.call(source, prop))
        target[prop] = source[prop];
    }
  return target;
};
const PortalDest = (_a) => {
  var _b = _a, { channel, Container = "div" } = _b, props = __objRest(_b, ["channel", "Container"]);
  const containerRef = useRef(null);
  useEffect(() => portalRegistry.registerDestElement(channel, containerRef.current), [channel]);
  return /* @__PURE__ */ React.createElement(Container, __spreadValues({
    ref: containerRef
  }, props));
};

const createPortalRegistry = () => {
  let target = null;
  let sources = [];
  const registerTarget = (element) => {
    target = element;
    sources.forEach((source) => {
      source(target);
    });
    return () => {
      registerTarget(null);
    };
  };
  const registerSource = (callback, only) => {
    if (only && sources.length) {
      sources.forEach((source) => {
        source(null);
      });
    }
    target && callback(target);
    sources.push(callback);
    return () => {
      sources = sources.filter((source) => source !== callback);
    };
  };
  return {
    registerTarget,
    registerSource
  };
};
const createPortal = () => {
  const { registerTarget, registerSource } = createPortalRegistry();
  const Source = ({ children, only }) => {
    const [containerElement, setContainerElement] = useState(null);
    useEffect(() => registerSource(setContainerElement, only), [only]);
    return containerElement ? ReactDOM.createPortal(children, containerElement) : null;
  };
  const Target = ({ Container = "div" }) => {
    const containerRef = useRef(null);
    useEffect(() => registerTarget(containerRef.current), []);
    return /* @__PURE__ */ React.createElement(Container, {
      ref: containerRef
    });
  };
  return {
    Target,
    Source
  };
};

export { Portal, PortalDest, createPortal };
