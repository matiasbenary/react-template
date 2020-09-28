import { call, put, takeLatest } from "redux-saga/effects";
import { apiCall } from "../../../crud/api.crud";

export const actionTypes = {
  GetActivityHoursStart: "[USER HOURS] GET START",
  GetActivityHoursComplete: "[USER HOURS] GET COMPLETE",
  GetActivityHoursError: "[USER HOURS] GET ERROR",
};

const initialAuthState = {
  loading: false,
  hours: null,
  error: null,
};

export const reducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case actionTypes.GetActivityHoursStart:
      return { ...state, loading: true, hours: null };
    case actionTypes.GetActivityHoursComplete:
      const hours = action.results.data;
      return { ...state, loading: false, hours };
    case actionTypes.GetActivityHoursError:
      const error = action;
      return { ...state, loading: false, error };
    default:
      return state;
  }
};

export const actions = {
  getHours: (payload) => ({
    type: actionTypes.GetActivityHoursStart,
    payload,
  }),
};

export function* getHoursState({ payload }) {
  try {
    const setPage = payload.pages ? `page[number]=${payload.pages}` : "";
    const results = yield call(
      apiCall,
      `user/${payload.user_id}/activityHours?${setPage}&sort=-created_at`,
      null,
      "GET"
    );
    yield put({ type: actionTypes.GetActivityHoursComplete, results });
  } catch (error) {
    yield put({ type: actionTypes.GetActivityHoursError, error });
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GetActivityHoursStart, getHoursState);
}
