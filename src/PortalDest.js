import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import portalRegistry from './portalRegistry'

const PortalDest = ({ channel, Container = 'div', ...props }) => {
  const containerRef = useRef()

  useEffect(
    () => portalRegistry.registerDestElement(channel, containerRef.current),
    [channel],
  )

  return <Container ref={containerRef} {...props} />
}

PortalDest.propTypes = {
  channel: PropTypes.string.isRequired,
  Container: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
}

export default PortalDest
