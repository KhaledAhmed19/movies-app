import { combineReducers } from "redux";
import { currentReducer, modalReducer, selectedReducer } from "./moviesReducer";

export default combineReducers({
  current: currentReducer,
  selected: selectedReducer,
  modal: modalReducer,
});
