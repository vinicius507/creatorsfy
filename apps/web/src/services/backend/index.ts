import { getAuthCookie } from "@/lib/auth";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const backendApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8181/",
    paramsSerializer: (params) => {
      const resultParams = new URLSearchParams();

      for (const [key, value] of Object.entries(params)) {
        if (value === undefined || value === null) {
          continue;
        }
        if (typeof value !== "object" || !Array.isArray(value)) {
          resultParams.append(key, value);
          continue;
        }

        for (const data of value) {
          resultParams.append(key, data);
        }
      }
      return resultParams.toString();
    },
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
