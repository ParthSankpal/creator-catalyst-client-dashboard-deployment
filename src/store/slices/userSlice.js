import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  status: 'idle', // 'idle' | 'loading' | 'authenticated' | 'unauthenticated'
  user: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoading: (state) => { state.status = 'loading'; },
    setUser: (state, action) => {
      state.user = action.payload;
      state.status = action.payload ? 'authenticated' : 'unauthenticated';
    },
    clearUser: (state) => {
      state.user = null;
      state.status = 'unauthenticated';
    }
  }
});

export const { setLoading, setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
