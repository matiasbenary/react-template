import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import './App.scss';
import Login from './components/pages/Login';
import Main from './components/Main';


function App({ store, history }) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
      <Switch>
          <Route path="/login" render={() => (<Login />)} />
          <Route render={() => (<Main />)} />
      </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
