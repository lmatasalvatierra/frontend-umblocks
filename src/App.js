import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { store, history } from './store/store';
import { ConnectedRouter } from 'react-router-redux';
import Routes from './routes/Routes'
import getWeb3 from './util/getWeb3'
import './App.css';

getWeb3.then(results => {
  console.log('Web3 initialized!')
}).catch(() => {
  console.log('Error in web3 initialization.')
})

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
