# React Truncate JSX


<img width="600" height="auto" src="https://user-images.githubusercontent.com/18291099/118523398-c45d3000-b745-11eb-9eaf-bd4f05a87a5e.png"/>

## You want to ellipsisify some text in your React app but it's encapsulated in a React component.

[CodeSandBox DEMO](https://codesandbox.io/s/charming-varahamihira-guso4?file=/src/App.js)

## Installation
```shell
npm install react-truncate-jsx

// or 

yarn add react-truncate-jsx
```

## Usage
```javascript
import React, {forwardRef} from 'react';
import Truncate, {TruncateList} from 'react-truncate-jsx';

const tags = ['Orange', 'Apple', 'Pear', 'Lemon', 'Watermelon'];


const Ellipsis = forwardRef(
    ({moreCount, moreChildren, ...props}, ref) => {
        return (
            <div ref={ref} style={{ flexShrink: 0 }} {...props}>
                +{moreCount} tags
            </div>
        );
    }
);

const App = () => (
    <div style={{width:200}}>
        <Truncate>
            <div
                style={{
                    display: 'flex',
                    flexWrap: 'wrap'
                }}
            >
                <TruncateList ellipsis={Ellipsis}>
                    {tags.map((t) => (
                        <div
                            key={t}
                            style={{
                                padding: '3px 5px',
                                background: '#bababa',
                                flexShrink: 0,
                                marginRight: 5,
                            }}
                        >
                            {t}
                        </div>
                    ))}
                </TruncateList>
            </div>
        </Truncate>
    </div>
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

