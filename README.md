# Simple react portal

[![npm version](https://badge.fury.io/js/%40suinegmai%2Freact-teleport.svg)](https://badge.fury.io/js/%40suinegmai%2Freact-teleport)

## Usage

```javascript
import { PortalDest, Portal } from '@suinegmai/react-teleport'

function App() {
  return (
    <div>
      <PortalDest channel="channelId" />
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
                <Portal channel="channelId">
                  <p>This will be rendered to PortalDest node</p>
                </Portal>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </div>
  )
}
```