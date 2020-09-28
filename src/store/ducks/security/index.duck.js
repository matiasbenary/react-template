import { call, put, takeLatest } from "redux-saga/effects";
import { apiCall } from "../../../crud/api.crud";

export const actionTypes = {
  ChangePassStart: "[CHANGE PASS] START",
  ChangePassComplete: "[CHANGE PASS] COMPLETE",
  ChangePassError: "[CHANGE PASS] ERROR",
  ChangePassClear: "[CHANGE PASS] CLEAR",
};

const initialAuthState = {
  loading: false,
  status: null,
  error: "",
};

export const reducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case actionTypes.ChangePassStart: {
      return { ...state, loading: true, status: null };
    }
    case actionTypes.ChangePassComplete: {
      const status = action.results.data;
      return { ...state, loading: false, status };
    }
    case actionTypes.ChangePassError: {
      const { error } = action;
      return {
        ...state,
        loading: false,
        status: null,
        error,
      };
    }
    case actionTypes.ChangePassClear: {
      return initialAuthState;
    }
    default:
      return state;
  }
};

export const actions = {
  changePass: (payload) => ({
    type: actionTypes.ChangePassStart,
    payload,
  }),
  clear: () => ({ type: actionTypes.ChangePassClear }),
};
// Watchers

export function* changePass({ payload }) {
  try {
    const results = yield call(apiCall, "changePass", payload, "POST");
    yield put({ type: actionTypes.ChangePassComplete, results });
  } catch (error) {
    yield put({ type: actionTypes.ChangePassError, error });
  }
}

export function* saga() {
  yield takeLatest(actionTypes.ChangePassStart, changePass);
}
