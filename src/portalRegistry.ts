import EventEmitter from '@suinegmai/js-events'

type DestElementType = HTMLElement | null

const dests = new Map<string, DestElementType>()
const portalEvents = EventEmitter<Record<string, DestElementType>>()

const registerDestElement = (channel: string, element: DestElementType) => {
  dests.set(channel, element)
  portalEvents.emit(channel, element)
  return () => {
    registerDestElement(channel, null)
  }
}

const subscribe = (channel: string, callback: (el: DestElementType) => void) => {
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
