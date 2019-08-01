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

export default {
  registerDestElement,
  subscribe
};
