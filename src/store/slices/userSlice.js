import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle", // 'idle' | 'loading' | 'authenticated' | 'unauthenticated'
  user: null,
  token: null, // store JWT here
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoading: (state) => {
      state.status = "loading";
    },
    setUser: (state, action) => {
      state.user = action.payload.user;
      if (action.payload.token) {
        state.token = action.payload.token;
      }
      state.status = "authenticated";
    },
    clearUser: (state) => {
      state.user = null;
      state.token = null;
      state.status = "unauthenticated";
    },
  },
});

export const { setLoading, setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
