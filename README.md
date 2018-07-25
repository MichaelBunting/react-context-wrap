# React Context Wrap
This is a simple wrapper that integrated with React context and allows you to access specified context values in the components class methods without having to create your own wrapper class.

## Installation
Install with npm/yarn
```
yarn add react-context-wrap
```

## Preface
This module mostly uses React's built in context functionality, so if you're unfamilliar with how it works, you can see the docs [here](https://reactjs.org/docs/context.html).

This module uses new ES6/7 feature and while it's transpiled into ES5, I didnt include any polyfills. If you plan to support legacy browsers you will need to include your own polyfills.

## Usage
### Exports
There are three things the `react-context-wrapper` module exports:

* `<Provider>` - The provider component from `React.createContext()`
* `<Consumer>` - The consumer component from `React.createContext()`. This is usually never used, but it's exported in case you would like to manually use the Consumer and still have access to the same Provider.
* `connect()` - The connect function that wraps your component


### Setting up `<Provider>`
In order to setup your components to receive context, you'll need to choose a high level component that will contain your context and wrap it in a `<Provider value={{// Your context values here}}>`.

__IMPORTANT__: If you are passing functions into context, you will need to manually bind the functions to the class in order to fix issues with the function scope getting messed up. Example:

```js
// Foo.jsx
import React, { Component } from 'react';
import { Provider } from 'react-context-wrap';

class Foo extends Component {
    constructor() {
        super();
        
        this.state = {
            name: 'Foo Bar',
        };
        
        // Bind method to class to force function scope
        this.upperCaseName = this.upperCaseName.bind(this);
    }
    
    upperCaseName(nameStr) {
        const name = nameStr.replace(/\w\S*/, (txt) => (
            `${txt.charAt(0).toUpperCase()}${txt.substr(1).toLowerCase()}`
        ));
        
        this.setState({
            name,
        });
    }
    
    // You can also set the method as an instance property (you'll need stage-2 transpiling to make it work)
    upperCaseName = () => {
        // ...
    }
    
    render() {
        const context = {
            ...this.state,
            // Add the bound method to the context passed to the provider
            upperCaseName: this.upperCaseName,
        };
    
        return (
            <Provider value={context}>
                // ...
            </Provider>
        )
    }
}
```

#### Example:
```js
// Container.jsx
import React, { Component } from 'react';
import { Provider } from 'react-context-wrap';

// Rest of the application
import App from './App'

class Container extends Component {
    constructor() {
        super();
        
        // Create context based on state
        this.state {
            word: 'Test',
            number: 10,
        };
    }
    
    render() {
        return (
            // Wrap <App /> and Set context value equal to the state
            <Provider value={{...this.state}}>
                <App />
            </Provider>
        )
    }
}
```

### Using the `connect()` function
The `connect()` function is what maps context properties to the components props using a `mapContextToProps` function to identify which context props to pass in.

__IMPORTANT__: It will also retain any props passed by a parent component, but if the mapped props have the same name as the props passed in, the mapped props will be overwritten by the parent props. Keep that in mind when naming props.

#### Example:
```js
// App.jsx - Pretend this is the same App.jsx from the example above
import React from 'react';

import Button from './Button';

const App = () => (
    <div>
        This is the app
        
        <Button
            word="Testing"
        />
    </div>
);

export default App;

// Button.jsx
import React from 'react';
import { connect } from 'react-context-wrap';

const Button = ({ word, number }) => (
    <button type="button">
        Word: {word}
        Number: {number}
    </button>
);

const mapContextToProps = (context) => ({
    word: context.word,
    number: context.number,
});

export default connect(Button, mapContextToProps);
```

This should render a button that says `Word: Testing Number: 10`. The `word` is `Testing` and not `Test` because the context props is overridden by the prop passed from the parent.

#### `mapContextToProps` function
The `mapContextToProps` function is simply a map of what context properties to set as the components props. It's a function that takes one parameter (context object) and returns an object mapping the components prop names to the context prop names. For example:

```js
const mapContextToProps = (context) => ({
    word: context.word,
    number: context.number
});
```

Will map `this.props.word` to be the `context.word` and `this.props.number` to be the `context.number`.