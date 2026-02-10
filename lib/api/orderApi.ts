import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const orderApi = createApi({
  reducerPath: "orderApi",
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
  tagTypes: ["Order"],
  endpoints: (builder) => ({
    // 🔹 GET Order
    getOrdert: builder.query<any, void>({
      query: () => "/api/orders",
      providesTags: ["Order"],
    }),

    // 🔹 ADD TO Order
    createOrder: builder.mutation<
      any,
      { productId: string; quantity?: number }
    >({
      query: (body) => ({
        url: "/api/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Order"],
    }),
  }),
});

export const { useGetOrdertQuery, useCreateOrderMutation } = orderApi;
