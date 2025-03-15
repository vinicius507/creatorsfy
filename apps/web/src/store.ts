import { configureStore } from "@reduxjs/toolkit";
import {
  useDispatch as useReduxDispatch,
  useSelector as useReduxSelector,
  useStore as useReduxStore,
} from "react-redux";
import authReducer from "./services/auth";
import { backendApi } from "./services/backend";

export const makeStore = () =>
  configureStore({
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(backendApi.middleware),
    reducer: {
      auth: authReducer,
      [backendApi.reducerPath]: backendApi.reducer,
    },
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useStore = useReduxStore.withTypes<AppStore>();
export const useSelector = useReduxSelector.withTypes<RootState>();
export const useDispatch = useReduxDispatch.withTypes<AppDispatch>();
