import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import portalRegistry from './portalRegistry'

const PortalDest = ({ channel, Container = 'div' }) => {
  const containerRef = useRef()

  useEffect(
    () => portalRegistry.registerDestElement(channel, containerRef.current),
    [channel],
  )

  return <Container ref={containerRef} />
}

PortalDest.propTypes = {
  channel: PropTypes.string.isRequired,
  Container: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
}

export default PortalDest
