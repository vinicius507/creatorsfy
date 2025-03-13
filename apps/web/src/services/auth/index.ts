import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  token: string | null;
};

const slice = createSlice({
  name: "auth",
  initialState: { token: null } as AuthState,
  reducers: {
    setAccessToken: (state, { payload: { token } }: PayloadAction<{ token: string }>) => {
      state.token = token;
      return state;
    },
  },
});

export const { setAccessToken } = slice.actions;

export default slice.reducer;
