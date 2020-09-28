import { call, put, takeLatest } from "redux-saga/effects";
import { apiCall } from "../../../crud/api.crud";

export const actionTypes = {
  AddHoursStart: "[HOURS] ADD START",
  AddHoursComplete: "[HOURS] ADD COMPLETE",
  AddHoursError: "[HOURS] ADD ERROR",
};

const initialAuthState = {
  loadingAdd: false,
  errorAdd: null,
  hours: null,
};

export const reducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case actionTypes.AddHoursStart:
      return { ...state, loadingAdd: true, hours: null, errorAdd: null };
    case actionTypes.AddHoursComplete:
      const hours = action.data;
      return { ...state, loadingAdd: false, errorAdd: null, hours };
    case actionTypes.AddHoursError:
      return { ...state, loadingAdd: false, errorAdd: "oops", hours: null };
    default:
      return state;
  }
};

export const actions = {
  addHours: (payload) => ({ type: actionTypes.AddHoursStart, payload }),
};

export function* addHours({ payload }) {
  try {
    const results = yield call(apiCall, "activityHours", payload, "POST");
    yield put({ type: actionTypes.AddHoursComplete, results });
  } catch (error) {
    yield put({ type: actionTypes.AddHoursError, error });
  }
}

export function* saga() {
  yield takeLatest(actionTypes.AddHoursStart, addHours);
}
