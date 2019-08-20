import React, { useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

const createPortalRegistry = () => {
  let target = null
  let sources = []

  const registerTarget = element => {
    target = element
    sources.forEach(source => {
      typeof source === 'function' && source(target)
    })

    return () => {
      registerTarget(null)
    }
  }

  const registerSource = callback => {
    target && callback(target)
    sources.push(callback)

    return () => {
      sources = sources.filter(source => source !== callback)
    }
  }

  return {
    registerTarget,
    registerSource,
  }
}

const createPortal = () => {
  const { registerTarget, registerSource } = createPortalRegistry()

  const Source = ({ children }) => {
    const [containerElement, setContainerElement] = useState()

    useEffect(() => registerSource(setContainerElement), [])

    return containerElement
      ? ReactDOM.createPortal(children, containerElement)
      : null
  }

  const Target = ({ Container = 'div' }) => {
    const containerRef = useRef()

    useEffect(() => registerTarget(containerRef.current), [])

    return <Container ref={containerRef} />
  }

  return {
    Target,
    Source,
  }
}

export default createPortal
