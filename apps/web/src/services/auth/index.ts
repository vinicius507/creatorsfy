import { deleteAuthToken, setAuthCookie } from "@/lib/auth";
import { createSlice } from "@reduxjs/toolkit";
import { type ReadUser, backendApi } from "../backend/endpoints";

type LoggedUser = {
  user: ReadUser;
};

const initialState: Partial<LoggedUser> = {};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: () => {
      deleteAuthToken("auth_token");
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(backendApi.endpoints.authControllerLogin.matchFulfilled, (_state, { payload }) => {
      setAuthCookie("auth_token", payload.accessToken);
    });
  },
});

export const { logout } = slice.actions;

export default slice.reducer;
