import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';

var createPortalRegistry = function () {
    var target = null;
    var sources = [];
    var registerTarget = function (element) {
        target = element;
        sources.forEach(function (source) {
            source(target);
        });
        return function () {
            registerTarget(null);
        };
    };
    var registerSource = function (callback) {
        target && callback(target);
        sources.push(callback);
        return function () {
            sources = sources.filter(function (source) { return source !== callback; });
        };
    };
    return {
        registerTarget: registerTarget,
        registerSource: registerSource
    };
};
var createPortal = function () {
    var _a = createPortalRegistry(), registerTarget = _a.registerTarget, registerSource = _a.registerSource;
    var Source = function (_a) {
        var children = _a.children;
        var _b = useState(null), containerElement = _b[0], setContainerElement = _b[1];
        useEffect(function () { return registerSource(setContainerElement); }, []);
        return containerElement
            ? ReactDOM.createPortal(children, containerElement)
            : null;
    };
    var Target = function (_a) {
        var _b = _a.Container, Container = _b === void 0 ? 'div' : _b;
        var containerRef = useRef(null);
        useEffect(function () { return registerTarget(containerRef.current); }, []);
        return React.createElement(Container, { ref: containerRef });
    };
    return {
        Target: Target,
        Source: Source
    };
};

export { createPortal };
