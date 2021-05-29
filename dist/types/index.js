import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import EventEmitter from '@suinegmai/js-events';
import { __rest, __assign } from 'tslib';

var dests = new Map();
var portalEvents = EventEmitter();
var registerDestElement = function (channel, element) {
    dests.set(channel, element);
    portalEvents.emit(channel, element);
    return function () {
        registerDestElement(channel, null);
    };
};
var subscribe = function (channel, callback) {
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

var Portal = function (_a) {
    var channel = _a.channel, children = _a.children;
    var _b = useState(null), containerElement = _b[0], setContainerElement = _b[1];
    useEffect(function () { return portalRegistry.subscribe(channel, setContainerElement); }, [
        channel,
    ]);
    return containerElement
        ? ReactDOM.createPortal(children, containerElement)
        : null;
};

var PortalDest = function (_a) {
    var channel = _a.channel, _b = _a.Container, Container = _b === void 0 ? 'div' : _b, props = __rest(_a, ["channel", "Container"]);
    var containerRef = useRef(null);
    useEffect(function () { return portalRegistry.registerDestElement(channel, containerRef.current); }, [channel]);
    return React.createElement(Container, __assign({ ref: containerRef }, props));
};

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
    var registerSource = function (callback, only) {
        if (only && sources.length) {
            sources.forEach(function (source) {
                source(null);
            });
        }
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
        var children = _a.children, only = _a.only;
        var _b = useState(null), containerElement = _b[0], setContainerElement = _b[1];
        useEffect(function () { return registerSource(setContainerElement, only); }, [only]);
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

export { Portal, PortalDest, createPortal };
