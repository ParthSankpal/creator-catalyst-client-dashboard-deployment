import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"; // adjust path

export const store = configureStore({
  reducer: {
    user: userReducer, // <-- register here
  },
});

export default store;
