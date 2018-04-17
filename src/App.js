import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store, history } from './store/store';
import { ConnectedRouter } from 'react-router-redux';
import Routes from './routes/Routes'
import { setUpServerClient } from './util/index'
import './App.css';

setUpServerClient()

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <Routes />
        </ConnectedRouter>
      </Provider>
    )
  }
}

export default App;
