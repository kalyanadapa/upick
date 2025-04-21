import { apiSlice } from "./apiSlice";
import { CART_URL } from "../constants";

export const cartApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => ({
        url: `${CART_URL}`,
        method: "GET",
        credentials: "include", // 👈 Include only for this one
      }),
      providesTags: ["Cart"],
    }),

    addToCart: builder.mutation({
      query: (item) => ({
        url: `${CART_URL}`,
        method: "POST",
        body: item,
        credentials: "include", // 👈 Include only where needed
      }),
      invalidatesTags: ["Cart"],
    }),

    removeFromCart: builder.mutation({
      query: (productId) => ({
        url: `${CART_URL}/remove/${productId}`,
        method: "DELETE",
        credentials: "include", // 👈 Include only where needed
      }),
      invalidatesTags: ["Cart"],
    }),
  }),
});

export const {
  useGetCartQuery,
  useAddToCartMutation,
  useRemoveFromCartMutation,
} = cartApiSlice;
