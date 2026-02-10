import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.antymama.com";

export interface SendOtpPayload {
  email: string;
}

export interface SignupPayload {
  name: string;
  email: string;
  password: string;
  mobile: string;
  otp: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  otp: string;
  newPassword: string;
}

export interface UpdateProfilePayload {
  name: string;
  mobile: string;
}

export interface AddressPayload {
  fullName: string;
  phone: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  isDefault?: boolean;
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
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
  tagTypes: ["Profile", "Address"],
  endpoints: (builder) => ({
    sendOtp: builder.mutation<any, SendOtpPayload>({
      query: (body) => ({
        url: "/api/auth/send-otp",
        method: "POST",
        body,
      }),
    }),

    resendOtp: builder.mutation<any, SendOtpPayload>({
      query: (body) => ({
        url: "/api/auth/resend-otp",
        method: "POST",
        body,
      }),
    }),

    signup: builder.mutation<any, SignupPayload>({
      query: (body) => ({
        url: "/api/auth/signup",
        method: "POST",
        body,
      }),
    }),

    login: builder.mutation<any, LoginPayload>({
      query: (body) => ({
        url: "/api/auth/login",
        method: "POST",
        body,
      }),
    }),

    forgotPassword: builder.mutation<any, ForgotPasswordPayload>({
      query: (body) => ({
        url: "/api/auth/forgot-password",
        method: "POST",
        body,
      }),
    }),

    resetPassword: builder.mutation<any, ResetPasswordPayload>({
      query: (body) => ({
        url: "/api/auth/forgot-password",
        method: "PUT",
        body,
      }),
    }),

    // 🔹 GET PROFILE
    getProfile: builder.query<any, void>({
      query: () => "/api/auth/profile",
      providesTags: ["Profile", "Address"],
    }),

    // 🔹 UPDATE PROFILE
    updateProfile: builder.mutation<any, UpdateProfilePayload>({
      query: (body) => ({
        url: "/api/auth/profile",
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Profile"],
    }),

    // 🔹 ADD ADDRESS
    addAddress: builder.mutation<any, AddressPayload>({
      query: (body) => ({
        url: "/api/auth/addresses",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Address"],
    }),

    // 🔹 UPDATE ADDRESS
    updateAddress: builder.mutation<any, { id: string; body: AddressPayload }>({
      query: ({ id, body }) => ({
        url: `/api/auth/addresses/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Address"],
    }),

    // 🔹 UPDATE ADDRESS
    deleteAddress: builder.mutation<any, { id: string }>({
      query: ({ id }) => ({
        url: `/api/auth/addresses/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Address"],
    }),
  }),
});

export const {
  useSendOtpMutation,
  useResendOtpMutation,
  useSignupMutation,
  useLoginMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,

  useGetProfileQuery,
  useUpdateProfileMutation,
  useAddAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
} = authApi;
