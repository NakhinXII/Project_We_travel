import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer"; // Ensure you import your reducer correctly

const store = configureStore({
  reducer: rootReducer,
});

export default store;
