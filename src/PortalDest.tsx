import React, { useEffect, useRef } from 'react'
import portalRegistry from './portalRegistry'

interface PortalDestProps {
  channel: string
  Container?: React.ElementType
}

const PortalDest = ({ channel, Container = 'div', ...props }: PortalDestProps) => {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(
    () => portalRegistry.registerDestElement(channel, containerRef.current),
    [channel],
  )

  return <Container ref={containerRef} {...props} />
}

export default PortalDest
