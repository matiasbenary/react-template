import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import './App.scss';
import Routing from './Routing';


function App({ store, history }) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Routing />
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
