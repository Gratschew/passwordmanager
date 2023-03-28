import { createSlice } from "@reduxjs/toolkit";
import Cookies from 'js-cookie';
import axios from "axios";
const initialState = {
  isLoggedIn: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isLoggedIn = true;
      state.error = null;
    },
    loginFailure: (state, action) => {
      state.isLoggedIn = false;
      state.error = action.payload;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.error = null;
    },
    logoutFailure: (state, action) => {
      state.isLoggedIn = true;
      state.error = action.payload;
    },
    registerSuccess: (state) => {
      state.isLoggedIn = true;
      state.error = null;
    },
    registerFailure: (state, action) => {
      state.isLoggedIn = false;
      state.error = action.payload;
    },
    clearError: (state, action) => {
      state.isLoggedIn = state.isLoggedIn;
      state.error = null;
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
} = authSlice.actions;

export const register = (userData) => async (dispatch) => {
  try {
    const { username, password } = userData;
    const api = process.env.REACT_APP_API_URL;
    const response = await axios.post(`${api}/auth/register`, {
      username,
      password,
    });
    // register success
    console.log(response.data);
  } catch (error) {
    dispatch(registerFailure(error.response.data.message));
  }
};

export const login = (userData) => async (dispatch) => {
  try {
    const { username, password } = userData;
    const api = process.env.REACT_APP_API_URL;
    const response = await axios.post(`${api}/auth/login`, {
      username,
      password,
    },{
      withCredentials: true,
    });
    console.log(response.data);
    
    
    //const token = response.data.token;
    const token = Cookies.get("token")

    console.log(token);
    Cookies.set('token', token, { expires: 1/24 });
    dispatch(loginSuccess());
  } catch (error) {
    dispatch(loginFailure(error.message));
  }
};

export const logout = () => async (dispatch) => {
  try {
    //await logoutUser();
    //dispatch(logoutSuccess());
  } catch (error) {
    //dispatch(logoutFailure(error.message));
  }
};

export default authSlice.reducer;
