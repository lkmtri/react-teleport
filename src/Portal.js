import { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import portalRegistry from './portalRegistry'

const Portal = ({ channel, children }) => {
  const [containerElement, setContainerElement] = useState()

  useEffect(() => portalRegistry.subscribe(channel, setContainerElement), [
    channel,
  ])

  return containerElement
    ? ReactDOM.createPortal(children, containerElement)
    : null
}

Portal.propTypes = {
  channel: PropTypes.string.isRequired,
}

export default Portal
