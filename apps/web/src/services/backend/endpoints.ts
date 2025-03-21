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
        body: queryArg.registerDto,
      }),
    }),
    ordersControllerFindMany: build.query<OrdersControllerFindManyApiResponse, OrdersControllerFindManyApiArg>({
      query: (queryArg) => ({
        url: `/orders`,
        params: {
          page: queryArg.page,
          size: queryArg.size,
          startDate: queryArg.startDate,
          endDate: queryArg.endDate,
        },
      }),
    }),
    webhooksControllerNewOrderWebhook: build.mutation<
      WebhooksControllerNewOrderWebhookApiResponse,
      WebhooksControllerNewOrderWebhookApiArg
    >({
      query: (queryArg) => ({
        url: `/webhook/order`,
        method: "POST",
        body: queryArg.newOrderDto,
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
export type AuthControllerRegisterApiResponse = /** status 201 User registered successfully. */ ReadUser;
export type AuthControllerRegisterApiArg = {
  registerDto: RegisterRequest;
};
export type OrdersControllerFindManyApiResponse =
  /** status 200 Successfully retrieved orders. */ PaginatedOrdersResponse;
export type OrdersControllerFindManyApiArg = {
  page?: number;
  size?: number;
  startDate?: string;
  endDate?: string;
};
export type WebhooksControllerNewOrderWebhookApiResponse = unknown;
export type WebhooksControllerNewOrderWebhookApiArg = {
  newOrderDto: NewOrder;
};
export type ReadUser = {
  storeName: string;
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
export type RegisterRequest = {
  email: string;
  password: string;
  storeName: string;
};
export type PaginatedOrdersResponse = {
  data: {
    id: string;
    status: "PENDING" | "APPROVED" | "REJECTED";
    amount: number;
    currency: "BRL" | "USD" | "EUR";
    product: string;
    createdAt: string;
  }[];
  meta: {
    count: number;
    total: number;
    page: number;
    pageSize: number;
    prevPage?: number;
    nextPage?: number;
    lastPage: number;
  };
};
export type NewOrder = {
  id: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  amount: number;
  currency: "BRL" | "USD" | "EUR";
  product: string;
  createdAt: string;
};
export const {
  useAppControllerGetMeQuery,
  useAuthControllerLoginMutation,
  useAuthControllerRegisterMutation,
  useOrdersControllerFindManyQuery,
  useWebhooksControllerNewOrderWebhookMutation,
} = injectedRtkApi;
