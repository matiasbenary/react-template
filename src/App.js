import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router';
import './App.scss';
import Login from './components/pages/Login';
import Navbar from './components/organisms/Navbar';


function App({ store, history }) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
      <Switch>
          <Route exact path="/login" render={() => (<Login />)} />
          <Route render={() => (<Navbar />)} />
      </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
