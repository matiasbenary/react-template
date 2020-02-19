import { call, put, takeLatest } from 'redux-saga/effects';
import { apiCall } from '../../crud/api.crud';

// actions
export const actionTypes = {
  LoginStart: '[Login] Action START',
  LoginCOMPLETE: '[Login] Action COMPLETE',
  LoginERROR: '[Login] Action ERROR',
};

const initialAuthState = {};

// Reducer
export const reducer = (state = initialAuthState, action) => {
    switch (action.type) {
      case actionTypes.LoginStart: {
        return {
 ...state, loading: true, user: null, error: null,
};
      }
      case actionTypes.LoginCOMPLETE: {
        const user = action.results.data;
        return {
 ...state, loading: false, user, error: null,
};
      }
      case actionTypes.LoginERROR: {
        const { error } = action;
        return {
          ...state, loading: false, user: null, error,
        };
      }
      default:
        return state;
    }
  };


// Action Creators
export const actions = {
  login: (user) => ({ type: actionTypes.LoginStart, payload: user }),
};
// Watchers

export function* loginUser({ payload }) {
  try {
    const results = yield call(apiCall, 'login', payload, 'POST');
    yield put({ type: actionTypes.LoginCOMPLETE, results });
  } catch (error) {
    yield put({ type: actionTypes.LoginERROR, error: error.response.data });
  }
}

// Watchers

export function* saga() {
  yield takeLatest(actionTypes.LoginStart, loginUser);
}
