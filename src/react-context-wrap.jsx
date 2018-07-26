import React from 'react';

const { Consumer, Provider } = React.createContext();

const connect = (Component, mapContextToProps) => {
  return (componentProps) => (
    <Consumer>
      {context => (
        <Component
          {...Object.assign({}, mapContextToProps(context), componentProps)}
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
