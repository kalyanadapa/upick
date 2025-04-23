import { apiSlice } from "./apiSlice";
import { WISH_LIST_URL } from "../constants";


export const wishlistApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch the user's wishlist
    getWishlist: builder.query({
      query: () => ({
        url: `${WISH_LIST_URL}`, // API to get the wishlist
        method: 'GET',
        credentials: 'include', // Send cookies or session automatically with the request
      }),
      providesTags: ['Wishlist'], // Cache tag for invalidation
    }),

    // Toggle the product in/out of the wishlist
    toggleWishlist: builder.mutation({
      query: ({productId}) => ({
        url:  `${WISH_LIST_URL}/toggle`, // API endpoint to toggle the wishlist
        method: 'POST',
        body:  {productId} , // Send productId to toggle in/out
        credentials: 'include', // Send cookies or session automatically with the request
      }),
      invalidatesTags: ['Wishlist'], // Invalidate wishlist cache after mutation
    }),
  }),
});

export const {
  useGetWishlistQuery,
  useToggleWishlistMutation,
} = wishlistApiSlice;
