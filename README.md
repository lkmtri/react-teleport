# react-teleport

Simple React portal

[![npm version](https://badge.fury.io/js/%40suinegmai%2Freact-teleport.svg)](https://badge.fury.io/js/%40suinegmai%2Freact-teleport)

## Usage

### Using PortalDest and Portal component

```javascript
import { PortalDest, Portal } from '@suinegmai/react-teleport'

function App() {
  return (
    <div>
      <PortalDest channel='channelId' />
      <div>
        Somewhere
        <div>
          deep
          <div>
            in
            <div>
              the
              <div>
                tree
                <Portal channel='channelId'>
                  <p>This will be rendered to PortalDest node</p>
                </Portal>
              </div>
              <Portal channel='channelId'>
                <p>
                  Multiple sources can be rendered to a single portal channel
                </p>
              </Portal>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

### Using createPortal

```javascript
import { createPortal } from '@suinegmai/react-teleport'

const Portal = createPortal()

function App() {
  return (
    <div>
      <Portal.Target />
      <div>
        Somewhere
        <div>
          deep
          <div>
            in
            <div>
              the
              <div>
                tree
                <Portal.Source>
                  <p>This will be rendered to PortalDest node</p>
                </Portal.Source>
              </div>
              <Portal.Source>
                <p>Multiple sources can be rendered to a single target</p>
              </Portal.Source>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
```

## Caveats

`PortalDest` and `Portal` component aren't SSR-compatible.
