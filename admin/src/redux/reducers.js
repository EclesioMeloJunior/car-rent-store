import { combineReducers } from "redux";
import { reducer as form } from "redux-form";
import auth from "./auth";
import aluguel from "./aluguel";

const REDUCERS = { auth, form, aluguel };

export default combineReducers(REDUCERS);
