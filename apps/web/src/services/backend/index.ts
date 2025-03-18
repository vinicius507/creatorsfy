import { getAuthCookie } from "@/lib/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const backendApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8181/",
    prepareHeaders: async (headers) => {
      const token = await getAuthCookie("auth_token");

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});
