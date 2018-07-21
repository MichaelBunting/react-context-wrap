import React from 'react';

const { Consumer, Provider } = React.createContext();

const connect = (Component, mapContextToProps) => {
  return () => (
    <Consumer>
      {context => (
        <Component
          {...mapContextToProps(context)}
        />
      )}
    </Consumer>
  );
};

export {
  Consumer,
  Provider,
  connect,
};