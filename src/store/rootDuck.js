import { all } from 'redux-saga/effects';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import * as auth from './ducks/auth.duck';
import * as activities from './ducks/activities.duck';
import * as modal from './ducks/modal.duck';
import * as userActivities from './ducks/user/activities.duck';


export const rootReducer = (history) => combineReducers({
  router: connectRouter(history),
  auth: auth.reducer,
  activities: activities.reducer,
  modal: modal.reducer,
  userActivities: userActivities.reducer,
});

export function* rootSaga() {
  yield all([
    auth.saga(),
    activities.saga(),
    userActivities.saga(),
  ]);
}
