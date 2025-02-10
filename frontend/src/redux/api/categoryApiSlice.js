// import { apiSlice } from "./apiSlice";
// import { CATEGORY_URL } from "../constants";

// export const categoryApiSlice = apiSlice.injectEndpoints({
//   endpoints: (builder) => ({
//     createCategory: builder.mutation({
//       query: (newCategory) => ({
//         url: `${CATEGORY_URL}`,
//         method: "POST",
//         body: newCategory,
//       }),
//     }),

//     updateCategory: builder.mutation({
//       query: ({ categoryId, updatedCategory }) => ({
//         url: `${CATEGORY_URL}/${categoryId}`,
//         method: "PUT",
//         body: updatedCategory,
//       }),
//     }),

//     deleteCategory: builder.mutation({
//       query: (categoryId) => ({
//         url: `${CATEGORY_URL}/${categoryId}`,
//         method: "DELETE",
//       }),
//     }),

//     fetchCategories: builder.query({
//       query: () => `${CATEGORY_URL}`,
//       method: "GET",
//     }),
//   }),
// });

// export const {
//   useCreateCategoryMutation,
//   useUpdateCategoryMutation,
//   useDeleteCategoryMutation,
//   useFetchCategoriesQuery,
// } = categoryApiSlice;
import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../constants";

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch all categories
    fetchCategories: builder.query({
      query: () => ({
        url: CATEGORY_URL,
        method: "GET",
      }),
      providesTags: ["Category"], // Helps with cache invalidation
    }),

    // Create a new category
    createCategory: builder.mutation({
      query: (newCategory) => ({
        url: CATEGORY_URL,
        method: "POST",
        body: newCategory,
      }),
      invalidatesTags: ["Category"], // Refresh data after mutation
    }),

    // Update a category
    updateCategory: builder.mutation({
      query: ({ categoryId, updatedCategory }) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "PUT",
        body: updatedCategory,
      }),
      invalidatesTags: ["Category"],
    }),

    // Delete a category
    deleteCategory: builder.mutation({
      query: (categoryId) => ({
        url: `${CATEGORY_URL}/${categoryId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Category"],
    }),
  }),
});

export const {
  useFetchCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApiSlice;
