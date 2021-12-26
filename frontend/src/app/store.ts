import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import {cryptoApi} from './services/cryptoApi'
import {api} from './services/api'
import authSlice from "./services/auth.slice";

export const store = configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [api.reducerPath]: api.reducer,
    auth: authSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(logger, cryptoApi.middleware, api.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;