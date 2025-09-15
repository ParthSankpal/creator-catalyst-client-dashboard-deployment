import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import notificationsReducer from "./slices/notificationsSlice";
export default configureStore({
  reducer: {
    user: userReducer,
    notifications: notificationsReducer,
  },
});

