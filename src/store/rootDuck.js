import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import * as auth from './ducks/auth.duck';


export const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  auth: auth.reducer,
});

export function* rootSaga() {
  yield all([
    auth.saga(),
  ]);
}
