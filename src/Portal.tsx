import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import portalRegistry from './portalRegistry'

interface PortalProps {
  channel: string
  children: React.ReactNode
}

const Portal = ({ channel, children }: PortalProps) => {
  const [containerElement, setContainerElement] = useState<HTMLElement | null>(null)

  useEffect(() => portalRegistry.subscribe(channel, setContainerElement), [
    channel,
  ])

  return containerElement
    ? ReactDOM.createPortal(children, containerElement)
    : null
}

export default Portal
