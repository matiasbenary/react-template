import { call, put, takeLatest } from 'redux-saga/effects';
import { apiCall } from '../../crud/api.crud';

export const actionTypes = {
  GetActivitiesStart: '[ACTIVITIES] GET START',
  GetActivitiesComplete: '[ACTIVITIES] GET COMPLETE',
  GetActivitiesError: '[ACTIVITIES] GET ERROR',
};

const initialAuthState = {
  loading: true,
  activities: null,
  error: '',
};

export const reducer = (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.GetActivitiesStart: {
        return { ...state, loading: true, activities: null };
      }
      case actionTypes.GetActivitiesComplete: {
        const activities = action.results.data;
        return { ...state, loading: false, activities };
      }
      case actionTypes.GetActivitiesError: {
        const { error } = action;
        return {
          ...state, loading: false, activities: null, error,
        };
      }
      default:
        return state;
    }
  };


export const actions = {
  getActivities: (activity) => ({ type: actionTypes.GetActivitiesStart, payload: { activity } }),
};
// Watchers


export function* getActivitiesState() {
  try {
    const results = yield call(apiCall, 'activity', null, 'GET');
    yield put({ type: actionTypes.GetActivitiesComplete, results });
  } catch (error) {
    yield put({ type: actionTypes.GetActivitiesError, error });
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GetActivitiesStart, getActivitiesState);
}
