import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cartApi = createApi({
  reducerPath: "cartApi",
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
  tagTypes: ["Cart"],
  endpoints: (builder) => ({
    // 🔹 GET CART
    getCart: builder.query<any, void>({
      query: () => "/api/cart",
      providesTags: ["Cart"],
    }),

    // 🔹 ADD TO CART
    addToCart: builder.mutation<any, { productId: string; quantity?: number }>({
      query: (body) => ({
        url: "/api/cart/add",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),

    // 🔹 UPDATE CART ITEM
    updateCart: builder.mutation<any, { productId: string; quantity: number }>({
      query: ({ productId, quantity }) => ({
        url: "/api/cart/update",
        method: "PUT",
        body: { productId, quantity },
      }),
      invalidatesTags: ["Cart"],
    }),

    // 🔹 REMOVE ITEM
    removeFromCart: builder.mutation<any, string>({
      query: (productId) => ({
        url: `/api/cart/remove/${productId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),
    // 🔹 CLEAR CART
    clearCart: builder.mutation<any, void>({
      query: () => ({
        url: `/api/cart/clear`,
        method: "DELETE",
      }),
      invalidatesTags: ["Cart"],
    }),

    // ORDER APIS

    // GET ORDER LIST
    getOrder: builder.query<any, { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) =>
        `/api/orders?page=${page}&limit=${limit}`,
      providesTags: ["Cart"],
    }),

    // CREATE ORDER
    createOrder: builder.mutation<
      any,
      {
        items: { productId: string; quantity: number }[];
        shippingAddress: any;
        paymentProvider: string;
        paymentIntentId?: string;
      }
    >({
      query: (body) => ({
        url: "/api/orders",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useUpdateCartMutation,
  useRemoveFromCartMutation,
  useClearCartMutation,
  useCreateOrderMutation,
  useGetOrderQuery,
} = cartApi;
