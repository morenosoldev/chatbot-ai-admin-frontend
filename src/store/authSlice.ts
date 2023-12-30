// src/store/authSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define a type for the user data
interface User {
  _id: string;
  id: string;
  name: string;
  email: string;
  // Add other user fields as needed
}

interface AuthState {
  isLoggedIn: boolean;
  authToken: string | null;
  user: User | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  authToken: null,
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ authToken: string; user: User }>,
    ) => {
      state.isLoggedIn = true;
      state.authToken = action.payload.authToken;
      state.user = action.payload.user;
      localStorage.setItem('authToken', action.payload.authToken);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.authToken = null;
      state.user = null;
      localStorage.removeItem('authToken');
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectIsLoggedIn = (state: { auth: AuthState }) =>
  state.auth.isLoggedIn;
export const selectAuthToken = (state: { auth: AuthState }) =>
  state.auth.authToken;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;

export default authSlice.reducer;
