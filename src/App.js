import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import {
  Switch,
  Route,
} from 'react-router-dom';
import './App.scss';
import Login from './components/pages/Login';
import Main from './components/Main';


function App({ store, history }) {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
      <Switch>
          <Route path="/login" component={Login} />
          <Route component={Main} />
      </Switch>
      </ConnectedRouter>
    </Provider>
  );
}

export default App;
