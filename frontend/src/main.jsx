// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { Provider } from "react-redux";
// import store from "./redux/store";
// import { Route, RouterProvider, createRoutesFromElements } from "react-router";
// import { createBrowserRouter } from "react-router-dom";
// import { Toaster } from 'react-hot-toast';
// import PrivateRoute from "./components/PrivateRoute";

// // Auth
// import Login from "./pages/Auth/Login";
// import Register from "./pages/Auth/Register";

// import AdminRoute from "./pages/Admin/AdminRoute";
// import Profile from "./pages/User/Profile";
// import UserList from "./pages/Admin/UserList";

// import CategoryList from "./pages/Admin/CategoryList";
// import BrandList from "./pages/Admin/BrandList"
// import ProductList from "./pages/Admin/ProductList";
// import AllProducts from "./pages/Admin/AllProducts";
// import ProductUpdate from "./pages/Admin/ProductUpdate";

// import Home from "./pages/Home.jsx";
// import Favorites from "./pages/Products/Favorites.jsx";
// import ProductDetails from "./pages/Products/ProductDetails.jsx";

// import Cart from "./pages/Cart.jsx";
// import Shop from "./pages/Shop.jsx";

// import Shipping from "./pages/Orders/Shipping.jsx";
// import PlaceOrder from "./pages/Orders/PlaceOrder.jsx";
// import Order from "./pages/Orders/Order.jsx";
// import OrderList from "./pages/Admin/OrderList.jsx";
// import { PayPalScriptProvider } from "@paypal/react-paypal-js";
// import AdminDashboard from "./pages/Admin/AdminDashboard.jsx";
// import Category from './pages/Category.jsx'
// import Wishlist from "./pages/User/Wishlist.jsx";
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route index={true} path="/" element={<Home />} />
//       <Route path="/favorite" element={<Favorites />} />
//       <Route path="/product/:id" element={<ProductDetails />} />
//       <Route path="/cart" element={<Cart />} />
//       <Route path="/wishlist" element={<Wishlist />} />
//       <Route path="/shop" element={<Shop />} />
//       <Route path="/category/:categoryName" element={<Category />} />
//       {/* Registered users */}
//       <Route path="" element={<PrivateRoute />}>
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/shipping" element={<Shipping />} />
//         <Route path="/placeorder" element={<PlaceOrder />} />
//         <Route path="/order/:id" element={<Order />} />
//       </Route>

//       <Route path="/admin" element={<AdminRoute />}>
//         <Route path="userlist" element={<UserList />} />
//         <Route path="categorylist" element={<CategoryList />} />
//         <Route path="productlist" element={<ProductList />} />
//         <Route path="brandlist" element={<BrandList />} />
//         <Route path="allproductslist" element={<AllProducts />} />
//         <Route path="productlist/:pageNumber" element={<ProductList />} />
//         <Route path="product/update/:_id" element={<ProductUpdate />} />
//         <Route path="orderlist" element={<OrderList />} />
//         <Route path="dashboard" element={<AdminDashboard />} />
//       </Route>
//     </Route>
//   )
// );

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <PayPalScriptProvider>
//     <Toaster /> 
//       <RouterProvider router={router} />
//     </PayPalScriptProvider>
//   </Provider>
// );


// import ReactDOM from "react-dom/client";
// import "./index.css";
// import App from "./App.jsx";
// import { Provider } from "react-redux";
// import store from "./redux/store";
// import { Route, RouterProvider, createRoutesFromElements } from "react-router";
// import { createBrowserRouter } from "react-router-dom";
// import { Toaster } from 'react-hot-toast';
// import { PayPalScriptProvider } from "@paypal/react-paypal-js";
// import { Suspense, lazy } from "react";

// // Private/Admin Routes
// import PrivateRoute from "./components/PrivateRoute.jsx";
// const AdminRoute = lazy(() => import("./pages/Admin/AdminRoute.jsx"));

// // Auth Pages
// const Login = lazy(() => import("./pages/Auth/Login.jsx"));
// const Register = lazy(() => import("./pages/Auth/Register.jsx"));

// // User Pages
// const Profile = lazy(() => import("./pages/User/Profile.jsx"));
// const Wishlist = lazy(() => import("./pages/User/Wishlist.jsx"));

// // Admin Pages
// const UserList = lazy(() => import("./pages/Admin/UserList.jsx"));
// const CategoryList = lazy(() => import("./pages/Admin/CategoryList.jsx"));
// const BrandList = lazy(() => import("./pages/Admin/BrandList.jsx"));
// const ProductList = lazy(() => import("./pages/Admin/ProductList.jsx"));
// const AllProducts = lazy(() => import("./pages/Admin/AllProducts.jsx"));
// const ProductUpdate = lazy(() => import("./pages/Admin/ProductUpdate.jsx"));
// const OrderList = lazy(() => import("./pages/Admin/OrderList.jsx"));
// const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard.jsx"));

// // Product/Shop Pages
// const Home = lazy(() => import("./pages/Home.jsx"));
// const Favorites = lazy(() => import("./pages/Products/Favorites.jsx"));
// const ProductDetails = lazy(() => import("./pages/Products/ProductDetails.jsx"));
// const Cart = lazy(() => import("./pages/Cart.jsx"));
// const Shop = lazy(() => import("./pages/Shop.jsx"));
// const Category = lazy(() => import("./pages/Category.jsx"));

// // Order Pages
// const Shipping = lazy(() => import("./pages/Orders/Shipping.jsx"));
// const PlaceOrder = lazy(() => import("./pages/Orders/PlaceOrder.jsx"));
// const Order = lazy(() => import("./pages/Orders/Order.jsx"));

// // Routing Configuration
// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>
//       {/* Public */}
//       <Route path="/login" element={<Login />} />
//       <Route path="/register" element={<Register />} />
//       <Route index={true} path="/" element={<Home />} />
//       <Route path="/favorite" element={<Favorites />} />
//       <Route path="/product/:id" element={<ProductDetails />} />
//       <Route path="/cart" element={<Cart />} />
//       <Route path="/wishlist" element={<Wishlist />} />
//       <Route path="/shop" element={<Shop />} />
//       <Route path="/category/:categoryName" element={<Category />} />

//       {/* Private */}
//       <Route path="" element={<PrivateRoute />}>
//         <Route path="/profile" element={<Profile />} />
//         <Route path="/shipping" element={<Shipping />} />
//         <Route path="/placeorder" element={<PlaceOrder />} />
//         <Route path="/order/:id" element={<Order />} />
//       </Route>

//       {/* Admin */}
//       <Route path="/admin" element={<AdminRoute />}>
//         <Route path="userlist" element={<UserList />} />
//         <Route path="categorylist" element={<CategoryList />} />
//         <Route path="productlist" element={<ProductList />} />
//         <Route path="brandlist" element={<BrandList />} />
//         <Route path="allproductslist" element={<AllProducts />} />
//         <Route path="productlist/:pageNumber" element={<ProductList />} />
//         <Route path="product/update/:_id" element={<ProductUpdate />} />
//         <Route path="orderlist" element={<OrderList />} />
//         <Route path="dashboard" element={<AdminDashboard />} />
//       </Route>
//     </Route>
//   )
// );

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <PayPalScriptProvider>
//       <Toaster />
//       <Suspense fallback={<div className="text-center p-10 text-xl">Loading...</div>}>
//         <RouterProvider router={router} />
//       </Suspense>
//     </PayPalScriptProvider>
//   </Provider>
// );





// import  { Suspense, lazy } from "react";
// import { createBrowserRouter, createRoutesFromElements, Route , RouterProvider} from "react-router-dom";
// import App from "./App.jsx";
// import PrivateRoute from "./components/PrivateRoute";
// import AdminRoute from "./pages/Admin/AdminRoute";
// import { Toaster } from "react-hot-toast";
// import { PayPalScriptProvider } from "@paypal/react-paypal-js";
// import { Provider } from "react-redux";
// import store from "./redux/store";

// // Lazy imports
// const Login = lazy(() => import("./pages/Auth/Login"));
// const Register = lazy(() => import("./pages/Auth/Register"));
// const Profile = lazy(() => import("./pages/User/Profile"));
// const UserList = lazy(() => import("./pages/Admin/UserList"));
// const CategoryList = lazy(() => import("./pages/Admin/CategoryList"));
// const BrandList = lazy(() => import("./pages/Admin/BrandList"));
// const ProductList = lazy(() => import("./pages/Admin/ProductList"));
// const AllProducts = lazy(() => import("./pages/Admin/AllProducts"));
// const ProductUpdate = lazy(() => import("./pages/Admin/ProductUpdate"));
// const Home = lazy(() => import("./pages/Home.jsx"));
// const Favorites = lazy(() => import("./pages/Products/Favorites.jsx"));
// const ProductDetails = lazy(() => import("./pages/Products/ProductDetails.jsx"));
// const Cart = lazy(() => import("./pages/Cart.jsx"));
// const Shop = lazy(() => import("./pages/Shop.jsx"));
// const Shipping = lazy(() => import("./pages/Orders/Shipping.jsx"));
// const PlaceOrder = lazy(() => import("./pages/Orders/PlaceOrder.jsx"));
// const Order = lazy(() => import("./pages/Orders/Order.jsx"));
// const OrderList = lazy(() => import("./pages/Admin/OrderList.jsx"));
// const AdminDashboard = lazy(() => import("./pages/Admin/AdminDashboard.jsx"));
// const Category = lazy(() => import('./pages/Category.jsx'));
// const Wishlist = lazy(() => import("./pages/User/Wishlist.jsx"));

// // Helper to wrap components with Suspense + fallback
// const withSuspense = (Component, fallbackText = "Loading...") => {
//   return (
//     <Suspense fallback={<div className="p-4 text-center text-gray-600">{fallbackText}</div>}>
//       <Component />
//     </Suspense>
//   );
// };

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <Route path="/" element={<App />}>
//       <Route path="/login" element={withSuspense(Login, "Loading Login...")} />
//       <Route path="/register" element={withSuspense(Register, "Loading Register...")} />
//       <Route index={true} path="/" element={withSuspense(Home, "Loading Home...")} />
//       <Route path="/favorite" element={withSuspense(Favorites, "Loading Favorites...")} />
//       <Route path="/product/:id" element={withSuspense(ProductDetails, "Loading Product...")} />
//       <Route path="/cart" element={withSuspense(Cart, "Loading Cart...")} />
//       <Route path="/wishlist" element={withSuspense(Wishlist, "Loading Wishlist...")} />
//       <Route path="/shop" element={withSuspense(Shop, "Loading Shop...")} />
//       <Route path="/category/:categoryName" element={withSuspense(Category, "Loading Category...")} />
      
//       {/* Registered users */}
//       <Route path="" element={<PrivateRoute />}>
//         <Route path="/profile" element={withSuspense(Profile, "Loading Profile...")} />
//         <Route path="/shipping" element={withSuspense(Shipping, "Loading Shipping...")} />
//         <Route path="/placeorder" element={withSuspense(PlaceOrder, "Loading Order...")} />
//         <Route path="/order/:id" element={withSuspense(Order, "Loading Order...")} />
//       </Route>

//       {/* Admin */}
//       <Route path="/admin" element={<AdminRoute />}>
//         <Route path="userlist" element={withSuspense(UserList, "Loading Users...")} />
//         <Route path="categorylist" element={withSuspense(CategoryList, "Loading Categories...")} />
//         <Route path="productlist" element={withSuspense(ProductList, "Loading Products...")} />
//         <Route path="brandlist" element={withSuspense(BrandList, "Loading Brands...")} />
//         <Route path="allproductslist" element={withSuspense(AllProducts, "Loading All Products...")} />
//         <Route path="productlist/:pageNumber" element={withSuspense(ProductList, "Loading Products...")} />
//         <Route path="product/update/:_id" element={withSuspense(ProductUpdate, "Loading Product Update...")} />
//         <Route path="orderlist" element={withSuspense(OrderList, "Loading Orders...")} />
//         <Route path="dashboard" element={withSuspense(AdminDashboard, "Loading Dashboard...")} />
//       </Route>
//     </Route>
//   )
// );

// // Then in your entry point file

// import ReactDOM from "react-dom/client";
// import "./index.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <Provider store={store}>
//     <PayPalScriptProvider>
//       <Toaster />
//       <RouterProvider router={router} />
//     </PayPalScriptProvider>
//   </Provider>
// );



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

// 🔄 Animated Framer Motion Loader
const AnimatedLoader = () => {
  const bounce = {
    y: {
      duration: 0.5,
      repeat: Infinity,
      repeatType: "reverse",
      ease: "easeInOut",
    },
  };

  return (
    <div className="flex justify-center items-center h-64 gap-2">
      <motion.div className="w-3 h-3 bg-blue-500 rounded-full" animate={{ y: ["0%", "-100%"] }} transition={bounce} />
      <motion.div className="w-3 h-3 bg-pink-500 rounded-full" animate={{ y: ["0%", "-80%"] }} transition={bounce} />
      <motion.div className="w-3 h-3 bg-green-500 rounded-full" animate={{ y: ["0%", "-60%"] }} transition={bounce} />
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
