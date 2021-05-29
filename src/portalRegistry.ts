import EventEmitter from '@suinegmai/js-events'

type DestElement = HTMLElement | null

const dests = new Map<string, DestElement>()
const portalEvents = EventEmitter<Record<string, DestElement>>()

const registerDestElement = (channel: string, element: DestElement) => {
  dests.set(channel, element)
  portalEvents.emit(channel, element)
  return () => {
    registerDestElement(channel, null)
  }
}

const subscribe = (channel: string, callback: (el: DestElement) => void) => {
  const destElement = dests.get(channel)
  destElement && callback(destElement)
  portalEvents.on(channel, callback)
  return () => {
    portalEvents.off(channel, callback)
  }
}

export default {
  registerDestElement,
  subscribe,
}
