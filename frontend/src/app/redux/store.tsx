'use client'; 

import { configureStore } from '@reduxjs/toolkit';

// Example of a slice (you can replace this with your actual slice)
import counterSlice from './slice/counterSlice'

export const store = configureStore({
  reducer: {
    counter: counterSlice, // Add your reducers here
  },
});

export default store;
