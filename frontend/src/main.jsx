import { Suspense, lazy } from "react";
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { motion } from "framer-motion";
import store from "./redux/store";
import "./index.css";

// Base App + Routes
import App from "./App.jsx";
import PrivateRoute from "./components/PrivateRoute";
import AdminRoute from "./pages/Admin/AdminRoute";

// 👇 Lazy-loaded Components
const Login = lazy(() => import("./pages/Auth/Login"));
const Register = lazy(() => import("./pages/Auth/Register"));
const Profile = lazy(() => import("./pages/User/Profile"));
const Success = lazy(() => import("./pages/Success.jsx"));
const Cancel = lazy(() => import("./pages/Cancel.jsx"));
const UserList = lazy(() => import("./pages/Admin/UserList"));
const CategoryList = lazy(() => import("./pages/Admin/CategoryList"));
const BrandList = lazy(() => import("./pages/Admin/BrandList"));
const ProductList = lazy(() => import("./pages/Admin/ProductList"));
const AllProducts = lazy(() => import("./pages/Admin/AllProducts"));
const ProductUpdate = lazy(() => import("./pages/Admin/ProductUpdate"));
const Home = lazy(() => import("./pages/Home.jsx"));
const Favorites = lazy(() => import("./pages/Products/Favorites.jsx"));
const ProductDetails = lazy(() => import("./pages/Products/ProductDetails.jsx"));
const Cart = lazy(() => import("./pages/Cart.jsx"));
const Shop = lazy(() => import("./pages/Shop.jsx"));
const Shipping = lazy(() => import("./pages/Orders/Shipping.jsx"));
const PlaceOrder = lazy(() => import("./pages/Orders/PlaceOrder.jsx"));
const Order = lazy(() => import("./pages/Orders/Order.jsx"));
const OrderList = lazy(() => import("./pages/Admin/OrderList.jsx"));
const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard.jsx"));
const Category = lazy(() => import('./pages/Category.jsx'));
const Wishlist = lazy(() => import("./pages/User/Wishlist.jsx"));

//Animated Framer Motion Loader
const AnimatedLoader = () => {


  return (
    <div className="flex justify-center items-center h-64">
      <motion.span
        className="text-4xl font-extrabold bg-gradient-to-r from-pink-700 via-orange-400 to-pink-700 text-transparent bg-clip-text"
        animate={{
          y: ["0%", "-10%", "0%"], // bounce effect
          backgroundPosition: ["0% 50%", "100% 50%"], // shimmer effect
        }}
        transition={{
          y: {
            duration: 0.6,
            repeat: Infinity,
            repeatType: "loop",
            ease: "easeInOut",
          },
          backgroundPosition: {
            duration: 2,
            repeat: Infinity,
            ease: "linear",
          },
        }}
        style={{
          backgroundSize: "200% 200%",
        }}
      >
        Upick
      </motion.span>
    </div>
  );
};

// 📦 HOC: Wrap routes/components with Suspense fallback
const withSuspense = (Component, fallback = <AnimatedLoader />) => {
  return (
    <Suspense fallback={fallback}>
      <Component />
    </Suspense>
  );
};

// 🛣️ Route Setup
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/login" element={withSuspense(Login)} />
      <Route path="/register" element={withSuspense(Register)} />
      <Route index={true} path="/" element={withSuspense(Home)} />
      <Route path="/success" element={withSuspense(Success)} />
      <Route path="/cancel" element={withSuspense(Cancel)} />

      <Route path="/favorite" element={withSuspense(Favorites)} />
      <Route path="/product/:id" element={withSuspense(ProductDetails)} />
      <Route path="/cart" element={withSuspense(Cart)} />
      <Route path="/wishlist" element={withSuspense(Wishlist)} />
      <Route path="/shop" element={withSuspense(Shop)} />
      <Route path="/category/:categoryName" element={withSuspense(Category)} />

      {/* Authenticated Users */}
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={withSuspense(Profile)} />
        <Route path="/shipping" element={withSuspense(Shipping)} />
        <Route path="/placeorder" element={withSuspense(PlaceOrder)} />
        <Route path="/order/:id" element={withSuspense(Order)} />
      </Route>

      {/* Admin Routes */}
      <Route path="/admin" element={<AdminRoute />}>
        <Route path="userlist" element={withSuspense(UserList)} />
        <Route path="categorylist" element={withSuspense(CategoryList)} />
        <Route path="productlist" element={withSuspense(ProductList)} />
        <Route path="brandlist" element={withSuspense(BrandList)} />
        <Route path="allproductslist" element={withSuspense(AllProducts)} />
        <Route path="productlist/:pageNumber" element={withSuspense(ProductList)} />
        <Route path="product/update/:_id" element={withSuspense(ProductUpdate)} />
        <Route path="orderlist" element={withSuspense(OrderList)} />
        <Route path="dashboard" element={withSuspense(AdminDashboard)} />
      </Route>
    </Route>
  )
);

// 🔰 Render Application
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PayPalScriptProvider>
      <Toaster />
      <RouterProvider router={router} />
    </PayPalScriptProvider>
  </Provider>
);
