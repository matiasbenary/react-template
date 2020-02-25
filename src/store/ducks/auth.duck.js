import { call, put, takeLatest } from 'redux-saga/effects';
import { apiCall, saveUser } from '../../crud/api.crud';

// actions
export const actionTypes = {
  LoginStart: '[AUTH] LOGIN START',
  LoginCOMPLETE: '[AUTH] LOGIN COMPLETE',
  LoginERROR: '[AUTH] LOGIN ERROR',
};

const initialAuthState = {
  user: JSON.parse(localStorage.getItem('user')),
};

// Reducer
export const reducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case actionTypes.LoginStart: {
      return {
        ...state,
        loading: true,
        user: null,
        error: null,
      };
    }
    case actionTypes.LoginCOMPLETE: {
      const user = action.data;
      return {
        ...state,
        loading: false,
        user,
        error: null,
      };
    }
    case actionTypes.LoginERROR: {
      const { error } = action;
      return {
        ...state,
        loading: false,
        user: null,
        error,
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
    const results = yield call(
      apiCall,
      'login',
      payload,
      'POST',
    );
    const data = results.data.data[0];
    yield call(saveUser, data);
    yield put({ type: actionTypes.LoginCOMPLETE, data });
  } catch (error) {
    yield put({ type: actionTypes.LoginERROR, error: error.response.data });
  }
}

// Watchers

export function* saga() {
  yield takeLatest(actionTypes.LoginStart, loginUser);
}
