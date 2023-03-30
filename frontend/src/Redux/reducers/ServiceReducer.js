import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import axios from "axios";
import { loginSuccess } from "./AuthReducer";
const initialState = {
  data: [],
  loading: true,
  error: null,
};

const resetedState = {
  data: [],
  loading: false,
  error: null,
};

const serviceSlice = createSlice({
  name: "service",
  initialState,
  reducers: {
    getData: (state, action) => {
      state.data = action.payload;
      state.loading = state.loading;
      state.error = state.error;
    },
    startLoading: (state, action) => {
      state.data = state.data;
      state.loading = true;
      state.error = state.error;
    },
    stopLoading: (state, action) => {
      state.data = state.data;
      state.loading = false;
      state.error = state.error;
    },
    resetState: () => resetedState,
  },
});

export const { getData, resetState, startLoading, stopLoading } =
  serviceSlice.actions;

export const getServices = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const api = process.env.REACT_APP_API_URL;
    const response = await axios.get(
      `${api}/getServices`,

      {
        withCredentials: true,
      }
    );

    dispatch(getData(response.data));
    dispatch(loginSuccess());
    dispatch(stopLoading());
  } catch (error) {
    console.log(error);
    dispatch(stopLoading());
  }
};

export default serviceSlice.reducer;
