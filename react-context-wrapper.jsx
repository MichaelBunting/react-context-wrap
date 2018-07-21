import React from 'react';

const { Consumer, Provider } = React.createContext();

const connect = (component, mapContextToProps) => {
  const Component = component;

  const FunctionalComp = () => (
    <Consumer>
      {context => (
        <Component
          {...mapContextToProps(context)}
        />
      )}
    </Consumer>
  );

  return FunctionalComp;
};

export {
  Consumer,
  Provider,
  connect,
};