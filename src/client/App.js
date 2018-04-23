import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store, history } from 'client/store';
import { ConnectedRouter } from 'react-router-redux';
import Routes from 'shared/routes';
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default App;
