import { call, put, takeLatest } from "redux-saga/effects";
import { apiCall, saveUser, clearStorage } from "../../crud/api.crud";

// actions
export const actionTypes = {
  LoginStart: "[AUTH] LOGIN START",
  LoginComplete: "[AUTH] LOGIN COMPLETE",
  LoginError: "[AUTH] LOGIN ERROR",
  Logout: "[AUTH] LOGOUT",
  ResetSendMailStart: "[AUTH] RESET MAIL START",
  ResetSendMailComplete: "[AUTH] RESET MAIL COMPLETE",
  ResetSendMailError: "[AUTH] RESET MAIL ERROR",
  ResetStart: "[AUTH] RESET START",
  ResetComplete: "[AUTH] RESET COMPLETE",
  ResetError: "[AUTH] RESET ERROR",
  RegisterStart: "[AUTH] REGISTER START",
  RegisterComplete: "[AUTH] REGISTER COMPLETE",
  RegisterError: "[AUTH] REGISTER ERROR"
};

const initialAuthState = {
  user: JSON.parse(localStorage.getItem("user")),
  loading: false,
  error: null,
  loadingResetMail: false,
  errorResetMail: null,
  msjResetMail: null,
  loadingReset: false,
  errorReset: null,
  msjReset: null,
  loadingRegister: false,
  errorRegister: null,
  msjRegister: null
};

// Reducer
export const reducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case actionTypes.LoginStart: {
      return {
        ...state,
        loading: true,
        user: null,
        error: null
      };
    }
    case actionTypes.LoginComplete: {
      const user = action.data;
      return {
        ...state,
        loading: false,
        user,
        error: null
      };
    }
    case actionTypes.LoginError: {
      const { error } = action;
      return {
        ...state,
        loading: false,
        user: null,
        error
      };
    }
    case actionTypes.Logout: {
      return {
        ...state,
        loading: null,
        user: null,
        error: null
      };
    }
    case actionTypes.ResetStart: {
      return {
        ...state,
        loadingReset: true,
        errorReset: null,
        msjReset: null
      };
    }
    case actionTypes.ResetComplete: {
      const msjReset = action.data;
      return {
        ...state,
        loadingReset: false,
        errorReset: null,
        msjReset
      };
    }
    case actionTypes.ResetError: {
      const { error: errorReset } = action;
      return {
        ...state,
        loadingReset: false,
        errorReset,
        msjReset: "No se encontro el usuario"
      };
    }
    case actionTypes.ResetSendMailStart: {
      return {
        ...state,
        loadingResetMail: true,
        errorResetMail: null,
        msjResetMail: null
      };
    }
    case actionTypes.ResetSendMailComplete: {
      const msjResetMail = action.data;
      return {
        ...state,
        loadingResetMail: false,
        errorResetMail: null,
        msjResetMail
      };
    }
    case actionTypes.ResetSendMailError: {
      const { error: errorResetMail } = action;
      return {
        ...state,
        loadingResetMail: false,
        errorResetMail,
        msjResetMail: "No se encontro el usuario"
      };
    }
    case actionTypes.RegisterStart: {
      return {
        ...state,
        loadingRegister: true,
        errorRegister: null,
        msjRegister: null
      };
    }
    case actionTypes.RegisterComplete: {
      const msjRegister = action.data;
      return {
        ...state,
        loadingRegister: false,
        errorRegister: null,
        msjRegister
      };
    }
    case actionTypes.RegisterError: {
      const { error: errorRegister } = action;
      return {
        ...state,
        loadingRegister: false,
        errorRegister,
        msjRegister: "No se encontro el usuario"
      };
    }
    default:
      return state;
  }
};

// Action Creators
export const actions = {
  login: user => ({ type: actionTypes.LoginStart, payload: user }),
  logOut: () => ({ type: actionTypes.Logout }),
  resetSendMail: email => ({
    type: actionTypes.ResetSendMailStart,
    payload: email
  }),
  reset: payload => ({ type: actionTypes.ResetStart, payload }),
  register: payload => ({ type: actionTypes.RegisterStart, payload })
};
// Watchers

export function* loginUser({ payload }) {
  try {
    yield call(clearStorage);
    const results = yield call(apiCall, "login", payload, "POST");
    const data = results.data.data[0];
    yield call(saveUser, data);
    yield put({ type: actionTypes.LoginComplete, data });
  } catch (error) {
    yield put({ type: actionTypes.LoginError, error: error.response.data });
  }
}

export function* logout() {
  yield call(clearStorage);
}

export function* sendEmailReset({ payload }) {
  yield call(clearStorage);
  try {
    const results = yield call(apiCall, "sendResetLinkEmail", payload, "POST");
    const data = results.data.message;
    yield put({ type: actionTypes.ResetSendMailComplete, data });
  } catch (error) {
    yield put({
      type: actionTypes.ResetSendMailError,
      error: error.response.data
    });
  }
}

export function* sendReset({ payload }) {
  yield call(clearStorage);
  try {
    const results = yield call(apiCall, "reset", payload, "POST");
    const data = results.data.message;
    yield put({ type: actionTypes.ResetComplete, data });
  } catch (error) {
    yield put({ type: actionTypes.ResetError, error: error.response.data });
  }
}

export function* registerStart({ payload }) {
  yield call(clearStorage);
  try {
    const results = yield call(apiCall, "sendMailResgister", payload, "POST");
    const data = results.data.message;
    yield put({ type: actionTypes.RegisterComplete, data });
  } catch (error) {
    yield put({ type: actionTypes.RegisterError, error: error.response.data });
  }
}

// Watchers

export function* saga() {
  yield takeLatest(actionTypes.LoginStart, loginUser);
  yield takeLatest(actionTypes.Logout, logout);
  yield takeLatest(actionTypes.ResetSendMailStart, sendEmailReset);
  yield takeLatest(actionTypes.ResetStart, sendReset);
  yield takeLatest(actionTypes.RegisterStart, registerStart);
}
