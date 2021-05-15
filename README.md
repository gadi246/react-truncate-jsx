# React Truncate JSX

## You want to ellipsisify some text in your React app but it's encapsulated in a React component.

## Installation
```shell
npm install react-truncate-jsx

// or 

yarn add react-truncate-jsx
```

## Usage
```javascript
import React, {forwardRef} from 'react';
import Trauncate, {TruncateList} from 'react-truncate-jsx';

const tags = ['Orange', 'Apple', 'Pear'];

const Ellipsis = forwardRef(
    (props, ref) => {
        return (
            <div ref={ref} style={{ flexShrink: 0 }}>
                +{props.moreCount} tags
            </div>
        );
    }
);

const App = () => (
    <Truncate>
        <div
            style={{
                display: 'flex',
                flexWrap: 'wrap'
            }}
        >
            <TruncateList ellipsis={Ellipsis}>
                {tags.map((t) => (
                    <div key={t}>{t}</div>
                ))}
            </TruncateList>
        </div>
    </Truncate>
)
```

## Prop types
### Truncate
| props        | default        | type  |
| ------------- |:-------------:| -----|
| `isTruncating`     | `true` | `boolean` |


### TruncateList
| props        | default        | type  | description |
| ------------- |:-------------:| -----| --- |
| `ellipsis`     | `...` |  render prop | see props bellow 

### Ellipsis
| props        | default        | type  |
| ------------- |:-------------:| -----|
| `moreCount`     |  | `number` | 
| `moreChildren`     |  | Array of truncated children |

