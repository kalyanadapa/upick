import { apiSlice } from "./apiSlice";
import { BRAND_URL } from "../constants"; // Make sure BRAND_URL is defined in constants

export const brandApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all brands
    fetchBrands: builder.query({
      query: () => ({
        url: BRAND_URL,
        method: "GET",
        isProtected: false, // If authentication is needed, set this to true
      }),
      providesTags: ["Brand"], // Helps with cache invalidation
    }),

    // Create a new brand
    createBrand: builder.mutation({
      query: (newBrand) => ({
        url: BRAND_URL,
        method: "POST",
        body: newBrand,
      }),
      invalidatesTags: ["Brand"], // Refresh data after mutation
    }),

    // Update a brand
    updateBrand: builder.mutation({
      query: ({ brandId, updatedBrand }) => ({
        url: `${BRAND_URL}/${brandId}`,
        method: "PUT",
        body: updatedBrand,
      }),
      invalidatesTags: ["Brand"], // Refresh data after mutation
    }),

    // Delete a brand
    deleteBrand: builder.mutation({
      query: (brandId) => ({
        url: `${BRAND_URL}/${brandId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brand"], // Refresh data after mutation
    }),
  }),
});

export const {
  useFetchBrandsQuery,
  useCreateBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandApiSlice;
