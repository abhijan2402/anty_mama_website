import { configureStore } from "@reduxjs/toolkit";
import { bannerApi } from "../api/bannerApi";
import { cmsApi } from "../api/cmsApi";
import { productApi } from "../api/productApi";
import { authApi } from "../api/authApi";
import { cartApi } from "../api/cartApi";
import { orderApi } from "../api/orderApi";
import { paymentApi } from "../api/paymentApi";

export const store = configureStore({
  reducer: {
    [bannerApi.reducerPath]: bannerApi.reducer,
    [cmsApi.reducerPath]: cmsApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [paymentApi.reducerPath]: paymentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      bannerApi.middleware,
      cmsApi.middleware,
      productApi.middleware,
      authApi.middleware,
      cartApi.middleware,
      orderApi.middleware,
      paymentApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
