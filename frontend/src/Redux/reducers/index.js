import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import ServiceReducer from "./ServiceReducer";

const rootReducer = combineReducers({
  auth: AuthReducer,
  service: ServiceReducer,
});

export default rootReducer;
