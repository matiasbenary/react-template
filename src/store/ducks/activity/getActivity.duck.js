import { call, put, takeLatest } from 'redux-saga/effects';
import { apiCall } from '../../../crud/api.crud';

export const actionTypes = {
  GetActivityStart: '[ACTIVITY] GET START',
  GetActivityComplete: '[ACTIVITY] GET COMPLETE',
  GetActivityError: '[ACTIVITY] GET ERROR',
};

const initialAuthState = {
  loading: false,
  activity: null,
  error: '',
};

export const reducer = (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.GetActivityStart: {
        return { ...state, loading: true, activity: null };
      }
      case actionTypes.GetActivityComplete: {
        const activity = action.results.data.data[0];
        return { ...state, loading: false, activity };
      }
      case actionTypes.GetActivityError: {
        const { error } = action;
        return {
          ...state, loading: false, activity: null, error,
        };
      }
      default:
        return state;
    }
  };


export const actions = {
  getActivity: (id) => ({ type: actionTypes.GetActivityStart, id }),
};
// Watchers


export function* getActivityState({ id }) {
  try {
    const results = yield call(apiCall, `activity/${id}`, null, 'GET');
    yield put({ type: actionTypes.GetActivityComplete, results });
  } catch (error) {
    yield put({ type: actionTypes.GetActivityError, error });
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GetActivityStart, getActivityState);
}
