// authSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { LoginFormValues } from '../Model/User';

interface User {
  email: string;
  password: string;
  avatar: string;
  fullname: string;
  role: string;
  id: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
}

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (userData : LoginFormValues) => {
    try {
      // Gọi API bằng Axios với phương thức GET
      const response = await axios.get<User[]>(
        'https://61e5309b595afe00176e53ab.mockapi.io/api/Users'
      );

     
      

      // Kiểm tra xác thực thành công, bạn có thể sửa đổi điều này tùy thuộc vào cách API của bạn trả về dữ liệu
      const authenticatedUser = response.data.find(
        (user) =>
          user.email === userData.email &&
          user.password === userData.password
      );
      

      if (authenticatedUser) {
        return authenticatedUser;
      } else {
        return null;
      }
    } catch (error) {
      throw new Error('Failed to log in');
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    error: null,
  } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        state.user = null;
        state.isAuthenticated = false;
        state.error = action.error.message || 'Failed to log in';
      });
  },
});

export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  state.auth.isAuthenticated;
export const selectError = (state: { auth: AuthState }) => state.auth.error;

export default authSlice.reducer;
