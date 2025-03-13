import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "./services/auth";
import { backendApi } from "./services/backend";

export const store = configureStore({
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(backendApi.middleware),
  reducer: {
    auth: authReducer,
    [backendApi.reducerPath]: backendApi.reducer,
  },
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
