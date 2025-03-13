import { backendApi as api } from "./index";
const injectedRtkApi = api.injectEndpoints({
  endpoints: (build) => ({
    appControllerGetMe: build.query<AppControllerGetMeApiResponse, AppControllerGetMeApiArg>({
      query: () => ({ url: `/me` }),
    }),
    authControllerLogin: build.mutation<AuthControllerLoginApiResponse, AuthControllerLoginApiArg>({
      query: (queryArg) => ({
        url: `/auth/login`,
        method: "POST",
        body: queryArg.credentialsDto,
      }),
    }),
    authControllerRegister: build.mutation<AuthControllerRegisterApiResponse, AuthControllerRegisterApiArg>({
      query: (queryArg) => ({
        url: `/auth/register`,
        method: "POST",
        body: queryArg.credentialsDto,
      }),
    }),
  }),
  overrideExisting: false,
});
export { injectedRtkApi as backendApi };
export type AppControllerGetMeApiResponse = /** status 200 Successfully retrieved user information. */ ReadUser;
export type AppControllerGetMeApiArg = void;
export type AuthControllerLoginApiResponse = /** status 200 User has successfully logged in. */ Tokens;
export type AuthControllerLoginApiArg = {
  credentialsDto: CredentialsPayload;
};
export type AuthControllerRegisterApiResponse = unknown;
export type AuthControllerRegisterApiArg = {
  credentialsDto: CredentialsPayload;
};
export type ReadUser = {
  email: string;
  createdAt: string;
  updatedAt: string;
};
export type Tokens = {
  /** The access token of the user */
  accessToken: string;
};
export type CredentialsPayload = {
  email: string;
  password: string;
};
export const { useAppControllerGetMeQuery, useAuthControllerLoginMutation, useAuthControllerRegisterMutation } =
  injectedRtkApi;
