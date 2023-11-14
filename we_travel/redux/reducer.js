import { combineReducers } from "redux";
import reducer from "./action";
const rootReducer = combineReducers({
  Flightcode: reducer,
});

export default rootReducer
