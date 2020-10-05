import { call, put, takeLatest } from "redux-saga/effects";
import { apiCall } from "../../crud/api.crud";

export const actionTypes = {
  GetActivitiesStart: "[ACTIVITIES] GET START",
  GetActivitiesComplete: "[ACTIVITIES] GET COMPLETE",
  GetActivitiesError: "[ACTIVITIES] GET ERROR",
  ApplyActivityStart: "[ACTIVITIES] APPLY START",
  ApplyActivityComplete: "[ACTIVITIES] APPLY COMPLETE",
  ApplyActivityError: "[ACTIVITIES] APPLY ERROR",
  UnapplyActivityStart: "[ACTIVITIES] UNAPPLY START",
  UnapplyActivityComplete: "[ACTIVITIES] UNAPPLY COMPLETE",
  UnapplyActivityError: "[ACTIVITIES] UNAPPLY ERROR",
};

const initialAuthState = {
  loading: false,
  activities: null,
  error: "",
  loadingApply: false,
  errorApply: "",
  apply: "",
  applyId: null,
  loadingUnapply: false,
  errorUnapply: "",
  unapply: "",
  unapplyId: null,
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
        ...state,
        loading: false,
        activities: null,
        error,
      };
    }
    case actionTypes.ApplyActivityStart: {
      return {
        ...state,
        loadingApply: true,
        errorApply: null,
        apply: "",
        applyId: null,
        unapply: "",
      };
    }
    case actionTypes.ApplyActivityComplete: {
      const { message } = action.results.data;
      return {
        ...state,
        loadingApply: false,
        errorApply: null,
        apply: message,
        applyId: action.id,
      };
    }
    case actionTypes.ApplyActivityError: {
      const { error } = action;
      return {
        ...state,
        loadingApply: false,
        errorApply: error,
        apply: "",
        applyId: null,
      };
    }
    case actionTypes.UnapplyActivityStart: {
      return {
        ...state,
        loadingUnapply: true,
        errorUnapply: null,
        unapply: "",
        apply: "",
      };
    }
    case actionTypes.UnapplyActivityComplete: {
      const { message } = action.results.data;
      return {
        ...state,
        loadingUnapply: false,
        errorUnapply: null,
        unapply: message,
        unapplyId: action.id,
      };
    }
    case actionTypes.UnapplyActivityError: {
      const { error } = action;
      return {
        ...state,
        loadingUnapply: false,
        errorUnapply: error,
        unapply: "",
      };
    }
    default:
      return state;
  }
};

export const actions = {
  getActivities: (payload = {}) => ({
    type: actionTypes.GetActivitiesStart,
    payload,
  }),
  applyActivity: ({ payload }) => ({
    type: actionTypes.ApplyActivityStart,
    payload,
  }),
  unapplyActivity: ({ payload }) => ({
    type: actionTypes.UnapplyActivityStart,
    payload,
  }),
};
// Watchers

export function* getActivitiesState({ payload }) {
  const setPage = payload.pages ? `page[number]=${payload.pages}` : "";
  try {
    const results = yield call(
      apiCall,
      `activity/?${setPage}&filter[entity_origin_id]=${process.env.REACT_APP_ID_ENTITY}&filter[status]=1,2&include=locations`,
      null,
      "GET"
    );
    yield put({ type: actionTypes.GetActivitiesComplete, results });
  } catch (error) {
    yield put({ type: actionTypes.GetActivitiesError, error });
  }
}

export function* applyActivityStart({ payload }) {
  try {
    const results = yield call(apiCall, "activity/postulate", payload, "POST");
    yield put({
      type: actionTypes.ApplyActivityComplete,
      results,
      id: payload.activity_id,
    });
  } catch (error) {
    yield put({ type: actionTypes.ApplyActivityError, error });
  }
}

export function* unapplyActivityStart({ payload }) {
  try {
    const results = yield call(
      apiCall,
      "activity/despostulate",
      payload,
      "POST"
    );
    yield put({
      type: actionTypes.UnapplyActivityComplete,
      results,
      id: payload.activity_id,
    });
  } catch (error) {
    yield put({ type: actionTypes.UnapplyActivityError, error });
  }
}

export function* saga() {
  yield takeLatest(actionTypes.GetActivitiesStart, getActivitiesState);
  yield takeLatest(actionTypes.ApplyActivityStart, applyActivityStart);
  yield takeLatest(actionTypes.UnapplyActivityStart, unapplyActivityStart);
}
