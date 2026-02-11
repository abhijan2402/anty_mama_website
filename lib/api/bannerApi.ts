import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiBaseUrl =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://api.antymama.com/";

export const bannerApi = createApi({
  reducerPath: "bannerApi",
  baseQuery: fetchBaseQuery({
    baseUrl: apiBaseUrl,
  }),
  tagTypes: ["Banner"],
  endpoints: (builder) => ({
    getBanners: builder.query<any[], string>({
      query: (brand) => ({
        url: "api/banners",
        params: { brand }, // ✅ send as query param
      }),
      providesTags: ["Banner"],
    }),
  }),
});

export const { useGetBannersQuery } = bannerApi;


