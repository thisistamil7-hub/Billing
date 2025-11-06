import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Use environment variable for base URL
const baseURL = import.meta.env.VITE_BASE_URL
  ? `${import.meta.env.VITE_BASE_URL}/api/v1`
  : process.env.REACT_APP_BASE_URL
  ? `${process.env.REACT_APP_BASE_URL}/api/v1`
  : '/api/v1'; // Default fallback

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/auth/login`, {
        email,
        password,
      });

      const { token, user } = response.data;

      // Store in localStorage
      localStorage.setItem('flowerfarm_user', JSON.stringify(user));
      localStorage.setItem('flowerfarm_token', token);

      return { token, user };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Invalid credentials'
      );
    }
  }
);

// Async thunk for registration
export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/auth/register`, {
        name,
        email,
        password,
      });

      const { token, user } = response.data;

      // Store in localStorage
      localStorage.setItem('flowerfarm_user', JSON.stringify(user));
      localStorage.setItem('flowerfarm_token', token);

      return { token, user };
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Registration failed'
      );
    }
  }
);

// Async thunk for logout
export const logoutUser = createAsyncThunk(
  'auth/logout',
  async ({ email }, { rejectWithValue, getState }) => {
    try {
      const token = getState().auth.token || localStorage.getItem('flowerfarm_token');
      
      const response = await axios.post(
        `${baseURL}/auth/logout`,
        { email },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Clear localStorage
      localStorage.removeItem('flowerfarm_user');
      localStorage.removeItem('flowerfarm_token');

      return response.data;
    } catch (error) {
      // Even if API call fails, clear local storage
      localStorage.removeItem('flowerfarm_user');
      localStorage.removeItem('flowerfarm_token');
      return rejectWithValue(
        error.response?.data?.message || 'Logout failed'
      );
    }
  }
);

// Async thunk for forgot password
export const forgotPassword = createAsyncThunk(
  'auth/forgot-password',
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseURL}/auth/forgot-password`, {
        email,
      });

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to send reset email'
      );
    }
  }
);

// Async thunk for reset password
export const resetPassword = createAsyncThunk(
  'auth/reset-password',
  async ({ token, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${baseURL}/auth/reset-password/${token}`,
        { password }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to reset password'
      );
    }
  }
);

// Auth slice
const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: null,
    loading: false,
    error: null,
    isAuthenticated: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('flowerfarm_user');
      localStorage.removeItem('flowerfarm_token');
    },
    clearError: (state) => {
      state.error = null;
    },
    loadUserFromStorage: (state) => {
      const user = localStorage.getItem('flowerfarm_user');
      const token = localStorage.getItem('flowerfarm_token');
      if (user && token) {
        state.user = JSON.parse(user);
        state.token = token;
        state.isAuthenticated = true;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Register cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Logout cases
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.isAuthenticated = false;
        state.error = action.payload;
      })
      // Forgot password cases
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Reset password cases
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
