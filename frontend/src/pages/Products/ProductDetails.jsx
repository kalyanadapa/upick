import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import BasicBreadcrumbs from "../../components/BreadCrumbs";
import { useAddToCartMutation } from "../../redux/api/cartApiSlice";
import {
  useGetProductDetailsQuery,
  useCreateReviewMutation,
} from "../../redux/api/productApiSlice";
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";
import moment from "moment";
import Ratings from "./Ratings";
import ProductTabs from "./ProductTabs";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { openLoginModal } from "../../redux/features/auth/authSlice";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton"; // ✅
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [addToCartApi, { isLoading: isAdding }] = useAddToCartMutation();
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductDetailsQuery(productId);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const { isLoginModalOpen } = useSelector((state) => state.auth);

  const addToCartHandler = async () => {
    if (!isAuthenticated) {
      dispatch(openLoginModal());
      return;
    }

    try {
      const res = await addToCartApi({
        productId: product._id,
        quantity: qty,
      }).unwrap();

      dispatch(addToCart(res));
      toast.success(res.message || "Item added to cart");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add item to cart");
    }
  };

  return (
    <>
      {/* <BasicBreadcrumbs /> */}
   <div className="min-h-screen bg-black text-white p-4 md:p-10">
      {isLoading ? (
        <SkeletonTheme baseColor="#2a2a2a" highlightColor="#3a3a3a">
          <div className="flex flex-col md:flex-row items-start justify-center md:justify-evenly gap-8">
            <div>
              <Skeleton height={500} width={500} borderRadius={12} />
              <div className="grid grid-cols-4 gap-3 mt-5">
                {[1, 2, 3, 4].map((_, i) => (
                  <Skeleton key={i} height={80} width={80} borderRadius={8} />
                ))}
              </div>
            </div>
            <div className="max-w-xl w-full space-y-4">
              <Skeleton height={40} width={300} borderRadius={6} />
              <Skeleton count={4} />
              <Skeleton height={50} width={150} borderRadius={8} />
            </div>
          </div>
        </SkeletonTheme>
      ) : error ? (
        <Message variant="danger" className="bg-gray-900 text-red-500 p-4 rounded-lg max-w-xl mx-auto">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="flex flex-col md:flex-row items-start justify-center md:justify-evenly gap-10"
        >
          {/* Left side images */}
          <div className="flex flex-col items-center md:items-end gap-5">
            <img
              src={selectedImage || product.images[0]}
              alt={product.name}
              className="max-w-[500px] h-[500px] object-cover rounded-xl shadow-lg"
            />
            <div className="grid grid-cols-4 gap-3">
              {product.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={product.name + "-" + i}
                  className={`w-20 h-20 rounded-lg cursor-pointer border-2 ${
                    selectedImage === img ? "border-pink-600" : "border-transparent hover:border-gray-600"
                  } transition-colors duration-200`}
                  onClick={() => setSelectedImage(img)}
                />
              ))}
            </div>
          </div>

          {/* Right side details */}
          <div className="max-w-xl w-full flex flex-col justify-between space-y-6">
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <p className="text-gray-400">{product.description}</p>

            <p className="text-4xl font-extrabold text-pink-600">
              ₹{product.price}
            </p>

            <div className="flex flex-wrap justify-between gap-6 text-gray-400">
              <div className="space-y-3 min-w-[180px]">
                <h3 className="flex items-center gap-2">
                  <FaStore /> Brand: <span className="font-semibold text-white">{product.brand.name}</span>
                </h3>
                <h3 className="flex items-center gap-2">
                  <FaClock /> Added: <span className="font-semibold text-white">{moment(product.createAt).fromNow()}</span>
                </h3>
                <h3 className="flex items-center gap-2">
                  <FaStar /> Reviews: <span className="font-semibold text-white">{product.numReviews}</span>
                </h3>
              </div>
              <div className="space-y-3 min-w-[180px]">
                <h3 className="flex items-center gap-2">
                  <FaStar /> Ratings: <span className="font-semibold text-white">{product.rating}</span>
                </h3>
                <h3 className="flex items-center gap-2">
                  <FaShoppingCart /> Quantity: <span className="font-semibold text-white">{product.quantity}</span>
                </h3>
                <h3 className="flex items-center gap-2">
                  <FaBox /> In Stock: <span className="font-semibold text-white">{product.countInStock}</span>
                </h3>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <Ratings value={product.rating} text={`${product.numReviews} reviews`} />
              {product.countInStock > 0 ? (
                <select
                  value={qty}
                  onChange={(e) => setQty(Number(e.target.value))}
                  className="p-2 w-20 rounded-lg text-black"
                >
                  {[...Array(product.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              ) : (
                <p className="text-red-600 font-semibold mt-2">Out of Stock</p>
              )}
            </div>

            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0 || isAdding}
              className="bg-pink-600 hover:bg-pink-700 disabled:bg-pink-900 disabled:cursor-not-allowed text-white py-3 rounded-lg mt-4 transition-colors duration-200 font-semibold"
            >
              {isAdding ? "Adding..." : "Add To Cart"}
            </button>
          </div>

          {/* Sticky Add To Cart for Mobile */}
          {product.countInStock > 0 && (
            <div className="fixed bottom-0 left-0 w-full bg-gray-900 shadow-md p-4 md:hidden">
              <button
                className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-pink-900 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold transition-colors duration-200"
                onClick={addToCartHandler}
                disabled={isAdding}
              >
                {isAdding ? "Adding..." : "Add to Cart"}
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
    </>
  );
};

export default ProductDetails;
