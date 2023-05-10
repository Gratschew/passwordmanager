import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
import { resetState } from "./ServiceReducer";

const initialState = {
  isLoggedIn: false,
  error: null,
  loading: false,
  twoFa: {
    logInActive: false,
    setupActive: false,
    secret: null,
    imageUrl: null,
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    twoFaLoginSuccess: (state) => {
      state.isLoggedIn = true;
      state.error = null;
      state.loading = false;
      state.twoFa = {
        logInActive: false,
        setupActive: false,
        secret: null,
        imageUrl: null,
      };
    },
    loginSuccess: (state) => {
      //state.isLoggedIn = true;
      state.error = null;
      state.loading = false;
      state.twoFa = {
        logInActive: true,
        setupActive: false,
        secret: null,
        imageUrl: null,
      };
    },
    loginFailure: (state, action) => {
      state.isLoggedIn = false;
      state.error = action.payload;
      state.loading = false;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.error = null;
      state.loading = false;
      state.twoFa = {
        logInActive: false,
        setupActive: false,
        secret: null,
        imageUrl: null,
      };
    },
    logoutFailure: (state, action) => {
      state.isLoggedIn = true;
      state.error = action.payload;
      state.loading = false;
      state.twoFa = {
        setupActive: false,
        secret: null,
        imageUrl: null,
      };
    },
    registerSuccess: (state) => {
      state.isLoggedIn = true;
      state.error = null;
      state.loading = false;
      state.twoFa = {
        logInActive: false,
        setupActive: false,
        secret: null,
        imageUrl: null,
      };
    },
    registerFailure: (state, action) => {
      state.isLoggedIn = false;
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state, action) => {
      state.isLoggedIn = state.isLoggedIn;
      state.error = null;
      state.loading = false;
    },
    startLoading: (state, action) => {
      state.isLoggedIn = state.isLoggedIn;
      state.error = state.error;
      state.loading = true;
    },
    stopLoading: (state, action) => {
      state.isLoggedIn = state.isLoggedIn;
      state.error = state.error;
      state.loading = false;
    },
    twoFaSetupStart: (state, action) => {
      state.twoFa = {
        setupActive: true,
        secret: action.payload.secret,
        imageUrl: action.payload.imageUrl,
      };
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logoutFailure,
  registerSuccess,
  registerFailure,
  clearError,
  startLoading,
  stopLoading,
  twoFaSetupStart,
  twoFaLoginSuccess,
} = authSlice.actions;

export const register = (userData) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { username, password } = userData;
    const api = process.env.REACT_APP_API_URL;
    const response = await axios.post(`${api}/auth/register`, {
      username,
      password,
    });
    // register success
    dispatch(stopLoading());
    dispatch(
      twoFaSetupStart({
        secret: response.data.secret,
        imageUrl: response.data.imageUrl,
      })
    );
  } catch (error) {
    dispatch(registerFailure(error.response.data.message));
    dispatch(stopLoading());
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { username, password } = userData;
    const api = process.env.REACT_APP_API_URL;
    const response = await axios.post(
      `${api}/auth/login`,
      {
        username,
        password,
      },
      {
        withCredentials: true,
      }
    );
    dispatch(stopLoading());
    dispatch(loginSuccess());
  } catch (error) {
    if (error.response.data.message == "TWOFA_DISABLED") {
      dispatch(
        twoFaSetupStart({
          secret: error.response.data.secret,
          imageUrl: error.response.data.imageUrl,
        })
      );
    } else {
      dispatch(loginFailure(error.response.data.message));
    }
    dispatch(stopLoading());
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const api = process.env.REACT_APP_API_URL;
    const response = await axios.post(
      `${api}/auth/logout`,
      {},
      {
        withCredentials: true,
      }
    );
    // register success
    dispatch(stopLoading());
    dispatch(logoutSuccess());
    dispatch(resetState());
  } catch (error) {
    dispatch(stopLoading());
    //dispatch(logoutFailure(error.message));
  }
};

export const validateTwoFa = (twoFaData) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { username, password, secret, twoFaToken } = twoFaData;
    const api = process.env.REACT_APP_API_URL;
    const response = await axios.post(
      `${api}/auth/validateTwoFa`,
      {
        username,
        password,
        secret,
        twoFaToken,
      },
      {
        withCredentials: true,
      }
    );
    dispatch(stopLoading());
    dispatch(twoFaLoginSuccess());
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
    dispatch(stopLoading());
  }
};

export const verifyTwoFa = (twoFaData) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { username, password, twoFaToken } = twoFaData;
    const api = process.env.REACT_APP_API_URL;
    const response = await axios.post(
      `${api}/auth/verifyTwoFa`,
      {
        username,
        password,
        twoFaToken,
      },
      {
        withCredentials: true,
      }
    );
    dispatch(stopLoading());
    dispatch(twoFaLoginSuccess());
  } catch (error) {
    dispatch(loginFailure(error.response.data.message));
    dispatch(stopLoading());
  }
};

export default authSlice.reducer;
