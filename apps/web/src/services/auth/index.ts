import { setAuthCookie } from "@/lib/auth";
import { createSlice } from "@reduxjs/toolkit";
import { backendApi } from "../backend/endpoints";

const slice = createSlice({
  name: "auth",
  initialState: {},
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(backendApi.endpoints.authControllerLogin.matchFulfilled, (_state, { payload }) => {
      setAuthCookie("auth_token", payload.accessToken);
    });
  },
});

export default slice.reducer;
