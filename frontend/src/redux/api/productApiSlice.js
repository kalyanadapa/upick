import { PRODUCT_URL } from "../constants";
import { apiSlice } from "./apiSlice";

export const productApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // getProducts: builder.query({
    //   query: ({ keyword }) => ({
    //     url: `${PRODUCT_URL}`,
    //     params: { keyword },
    //   }),
    //   keepUnusedDataFor: 5,
    //   providesTags: ["Products"],
    // }),
    
    getProductById: builder.query({
      query: (productId) => `${PRODUCT_URL}/${productId}`,
      providesTags: (result, error, productId) => [
        { type: "Product", id: productId },
      ],
    }),
    getProductsByCategory : builder.query({
      query: ({ categoryId, subCategoryIds=[],minPrice=0,maxPrice=10000 }) => ({
        url: `${PRODUCT_URL}/all_products`,
        params: {
          category: categoryId,
          subcategories: subCategoryIds.length > 0 ? subCategoryIds.join(",") : undefined, // Convert array to comma-separated string
          minPrice: minPrice,
          maxPrice: maxPrice, 
        },
      }),
      providesTags: ["Products"],
    }),
    allProducts: builder.query({
      query: () => `${PRODUCT_URL}`,
    }),

    getProductDetails: builder.query({
      query: (productId) => ({
        url: `${PRODUCT_URL}/${productId}`,
      }),
      keepUnusedDataFor: 5,
    }),

    createProduct: builder.mutation({
      query: (formData) => ({
        url: `${PRODUCT_URL}`,
        method: "POST",
        body: formData,
      }),
      invalidatesTags: ["Products"],
    }),
    
    // updateProduct: builder.mutation({
    //   query: ({ productId, formData }) => ({
    //     url: `${PRODUCT_URL}/${productId}`,
    //     method: "PUT",
    //     body: formData,
    //   }),
    // }),

    // uploadProductImage: builder.mutation({
    //   query: (data) => ({
    //     url: `${UPLOAD_URL}`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),

    // deleteProduct: builder.mutation({
    //   query: (productId) => ({
    //     url: `${PRODUCT_URL}/${productId}`,
    //     method: "DELETE",
    //   }),
    //   providesTags: ["Product"],
    // }),

    // createReview: builder.mutation({
    //   query: (data) => ({
    //     url: `${PRODUCT_URL}/${data.productId}/reviews`,
    //     method: "POST",
    //     body: data,
    //   }),
    // }),

    // getTopProducts: builder.query({
    //   query: () => `${PRODUCT_URL}/top`,
    //   keepUnusedDataFor: 5,
    // }),

    // getNewProducts: builder.query({
    //   query: () => `${PRODUCT_URL}/new`,
    //   keepUnusedDataFor: 5,
    // }),

    // getFilteredProducts: builder.query({
    //   query: ({ checked, radio }) => ({
    //     url: `${PRODUCT_URL}/filtered-products`,
    //     method: "POST",
    //     body: { checked, radio },
    //   }),
    // }),
  }),
});

export const {
  useGetProductByIdQuery,
  useGetProductsQuery,
  useGetProductDetailsQuery,
  useGetProductsByCategoryQuery,
  useAllProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useCreateReviewMutation,
  useGetTopProductsQuery,
  useGetNewProductsQuery,
  useUploadProductImageMutation,
  useGetFilteredProductsQuery,
} = productApiSlice;
