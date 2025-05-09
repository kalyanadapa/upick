// export const BASE_URL = "";
// export const USERS_URL = "/api/users";
// export const CATEGORY_URL = "/api/category";
// export const PRODUCT_URL = "/api/products";
// export const UPLOAD_URL = "/api/upload";
// export const ORDERS_URL = "/api/orders";
// export const PAYPAL_URL = "/api/config/paypal";
// Set BASE_URL to your backend server
export const BASE_URL = import.meta.env.VITE_API_URL
export const USERS_URL = `${BASE_URL}/api/v1/users`;
export const CATEGORY_URL = `${BASE_URL}/api/v1/category`;
export const PRODUCT_URL = `${BASE_URL}/api/v1/product`;
export const UPLOAD_URL = `${BASE_URL}/api/v1/upload`;
export const ORDERS_URL = `${BASE_URL}/api/orders`;
export const PAYPAL_URL = `${BASE_URL}/api/config/paypal`;
export const BRAND_URL = `${BASE_URL}/api/v1/brands`;
export const CART_URL =`${BASE_URL}/api/v1/cart`
export const WISH_LIST_URL =`${BASE_URL}/api/v1/wishlist`

