import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  email: string | null;
  password: string | null;
}

const initialState: AuthState = {
  email: null,
  password: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ email: string; password: string }>,
    ) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    logout: state => {
      state.email = null;
      state.password = null;
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
