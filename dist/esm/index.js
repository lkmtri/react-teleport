import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

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
    useEffect(() => registerSource(setContainerElement, only), []);
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

export { createPortal };
