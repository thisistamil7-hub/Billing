// src/store/store.js

import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../context/authSlice'; 

export const Store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

