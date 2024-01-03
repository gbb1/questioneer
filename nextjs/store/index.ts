'use client'
import { configureStore } from "@reduxjs/toolkit";
import demoSlice from "./slice";

const store = configureStore({
  reducer: {
    demo: demoSlice.reducer,
  },
});

export default store;
