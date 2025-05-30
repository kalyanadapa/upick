// import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
// import { BASE_URL } from "../constants";

// const baseQuery = fetchBaseQuery({ baseUrl: BASE_URL });

// export const apiSlice = createApi({
//   baseQuery,
//   tagTypes: ["Product", "Order", "User", "Category"],
//   endpoints: () => ({}),
// });
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: 'include', // This line is added
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Product", "Order", "User", "Category", "Brand", "Cart", "Wishlist"],
  endpoints: () => ({}),
});
