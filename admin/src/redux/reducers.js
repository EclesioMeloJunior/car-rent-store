import { combineReducers } from "redux";
import auth from "./auth";
import { reducer as form } from "redux-form";

const REDUCERS = { auth, form };

export default combineReducers(REDUCERS);
