import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import * as auth from './ducks/auth.duck';
import * as activities from './ducks/activities.duck';


export const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  auth: auth.reducer,
  activities: activities.reducer,
});

export function* rootSaga() {
  yield all([
    auth.saga(),
    activities.saga(),
  ]);
}
