import React from 'react';

const { Consumer, Provider } = React.createContext();

const connect = (Component, mapContextToProps) => {
  return React.forwardRef((props, ref) => (
    <Consumer>
      {context => (
        <Component
          ref={ref}
          {...Object.assign({}, mapContextToProps(context), props)}
        />
      )}
    </Consumer>
  ))
};

export {
  Consumer,
  Provider,
  connect,
};
