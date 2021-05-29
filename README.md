# react-teleport

Simple React portal

[![npm version](https://badge.fury.io/js/%40suinegmai%2Freact-teleport.svg)](https://badge.fury.io/js/%40suinegmai%2Freact-teleport)

## Installation

```
npm i @suinegmai/react-teleport
```

or

```
yarn @suinegmai/react-teleport
```

## Usage

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
                  <p>This will be rendered to Portal.Target node</p>
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
