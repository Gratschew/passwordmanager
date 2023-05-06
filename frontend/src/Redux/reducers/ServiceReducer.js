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

    createServiceSuccess: (state, action) => {
      state.data.push(action.payload);
      state.loading = state.loading;
      state.error = state.error;
    },
    createServiceFailure: (state, action) => {
      state.data = state.data;
      state.loading = false;
      state.error = action.payload.error;
    },
    deleteServiceSuccess: (state, action) => {
      const { id } = action.payload;
      const serviceIndex = state.data.findIndex(service => service.id === id);
      if (serviceIndex !== -1) {
        state.data.splice(serviceIndex, 1);
      }
      state.loading = state.loading;
      state.error = state.error;
    },
    deleteServiceFailure: (state, action) => {
      state.data = state.data;
      state.loading = false;
      state.error = action.payload.error;
    },
    modifyServiceSuccess: (state, action) => {
      const updatedService = action.payload;
      console.log(updatedService);
      const index = state.data.findIndex(service => service._id === updatedService._id);
      if (index !== -1) {
        state.data[index] = updatedService;
      }
      state.loading = false;
      state.error = null;
    },
    modifyServiceFailure: (state, action) => {
      state.data = state.data;
      state.loading = false;
      state.error = action.payload.error;
    },
    resetState: () => resetedState,
  },
});

export const { getData, resetState, startLoading, stopLoading, createServiceSuccess, createServiceFailure, deleteServiceSuccess, deleteServiceFailure, modifyServiceSuccess, modifyServiceFailure} =
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
    dispatch(stopLoading());
  }
  dispatch(stopLoading());
};

export default serviceSlice.reducer;





export const createService = (serviceData) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { serviceName, username, password } = serviceData;
    const api = process.env.REACT_APP_API_URL;
    const response = await axios.post(`${api}/createService`, {
      serviceName,
      username,
      password,
    },{
      withCredentials: true,
    });
    dispatch(createServiceSuccess(response.data));
    dispatch(stopLoading());
  } catch (error) {
    dispatch(createServiceFailure(error.response.data.message));
    dispatch(stopLoading());
  }
};

export const DeleteService = (serviceId) => async (dispatch) => {
  try {
    
    dispatch(startLoading());
    const api = process.env.REACT_APP_API_URL;
    console.log(`serviceId : ${serviceId}`);
    const response = await axios.post(`${api}/deleteService`, {
      id: serviceId,
    },{
      withCredentials: true,
    });
    dispatch(deleteServiceSuccess(serviceId));
    dispatch(stopLoading());
  } catch (error) {
    dispatch(createServiceFailure(error.response.data.message));
    dispatch(stopLoading());
  }
};


export const ModifyService = (serviceData) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { id,serviceName,username,password } = serviceData;
    const api = process.env.REACT_APP_API_URL;
    const response = await axios.post(`${api}/modifyService`, {
      id,
      serviceName,
      username,
      password,
    },{
      withCredentials: true,
    });
    dispatch(modifyServiceSuccess(response.data));
    dispatch(stopLoading());
  } catch (error) {
    dispatch(modifyServiceFailure(error.response.data.message));
    dispatch(stopLoading());
  }
};