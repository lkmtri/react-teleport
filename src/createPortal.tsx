import React, { useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

type TargetType = HTMLElement | null
type SourceCallbackFn = (el: TargetType) => void

const createPortalRegistry = () => {
  let target: TargetType = null
  let sources: SourceCallbackFn[] = []

  const registerTarget = (element: TargetType) => {
    target = element
    sources.forEach(source => {
      source(target)
    })

    return () => {
      registerTarget(null)
    }
  }

  const registerSource = (callback: SourceCallbackFn) => {
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

interface TargetProps {
  Container?: React.ElementType
}

interface SourceProps {
  children: React.ReactNode
}

const createPortal = () => {
  const { registerTarget, registerSource } = createPortalRegistry()

  const Source = ({ children }: SourceProps) => {
    const [containerElement, setContainerElement] = useState<TargetType>(null)

    useEffect(() => registerSource(setContainerElement), [])

    return containerElement
      ? ReactDOM.createPortal(children, containerElement)
      : null
  }

  const Target = ({ Container = 'div' }: TargetProps) => {
    const containerRef = useRef<HTMLElement>(null)

    useEffect(() => registerTarget(containerRef.current), [])

    return <Container ref={containerRef} />
  }

  return {
    Target,
    Source,
  }
}

export default createPortal
