import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token =
        typeof window !== "undefined"
          ? localStorage.getItem("anty_mama_tkn")
          : null;

      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    createCheckoutSession: builder.mutation<
      { url: string },
      {
        items: { productId: string; quantity: number }[];
        shippingAddress: any;
      }
    >({
      query: (body) => ({
        url: "/api/payment/create-checkout-session",
        method: "POST",
        body,
      }),
    }),

    getSession: builder.query<any, string>({
      query: (sessionId) => `/api/payment/session/${sessionId}`,
    }),
  }),
});

export const { useCreateCheckoutSessionMutation, useGetSessionQuery } =
  paymentApi;
