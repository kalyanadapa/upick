import { apiSlice } from "./apiSlice";
import { CART_URL } from "../constants";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: `${CART_URL}`,
        method: "GET",
        credentials: "include",
      }),
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation({
      query: (item) => ({
        url: `${CART_URL}`,
        method: "POST",
        body: item,
        credentials: "include",
      }),
      invalidatesTags: ["Cart"],
    }),

    removeFromCart: builder.mutation({
      query: (productId) => ({
        url: `${CART_URL}`,
        method: "DELETE",
        body: { productId },
        credentials: "include",
      }),
      invalidatesTags: ["Cart"],
    }),
     createCheckoutSession: builder.mutation({
      query: () => ({
        url: `${CART_URL}/create-checkout-session`,
        method: "POST",
        credentials: "include",
      }),
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
   useCreateCheckoutSessionMutation,
} = cartApiSlice;
