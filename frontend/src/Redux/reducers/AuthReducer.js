import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
import { resetState } from "./ServiceReducer";

const initialState = {
  isLoggedIn: false,
  error: null,
  loading: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isLoggedIn = true;
      state.error = null;
      state.loading = false;
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
    },
    logoutFailure: (state, action) => {
      state.isLoggedIn = true;
      state.error = action.payload;
      state.loading = false;
    },
    registerSuccess: (state) => {
      state.isLoggedIn = true;
      state.error = null;
      state.loading = false;
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
    //dispatch(loginSuccess());
    dispatch(login(userData));
  } catch (error) {
    dispatch(registerFailure(error.response.data.message));
    dispatch(stopLoading());
  }
};

//withCredentials vai ei?
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
    dispatch(loginFailure(error.message));
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

export default authSlice.reducer;
