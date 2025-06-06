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
      {isLoading ? (
         <SkeletonTheme baseColor="#d4d4d4" highlightColor="#eeeeee">
    <div className="flex flex-row items-start justify-evenly p-4 mt-8">
      <div>
        <Skeleton height={500} width={500} />
        <div className="grid grid-cols-4 gap-2 mt-4">
          {[1, 2, 3, 4].map((_, i) => (
            <Skeleton key={i} height={80} width={80} />
          ))}
        </div>
      </div>
      <div className="max-w-xl w-full">
        <Skeleton height={40} width={300} />
        <Skeleton count={3} />
        <Skeleton height={50} width={150} className="mt-4" />
      </div>
    </div>
  </SkeletonTheme>
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="flex flex-row items-start justify-evenly p-4 mt-8">
            <div className="flex flex-col items-end mr-8">
              <div className="w-full h-full mb-4">
                <img
                  src={selectedImage || product.images[0]}
                  alt={product.name}
                  className="max-w-[500px] h-[500px] object-cover rounded-lg"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt={product.name}
                    className="w-20 h-20 rounded-lg cursor-pointer border-2 border-transparent hover:border-gray-500"
                    onClick={() => setSelectedImage(img)}
                  />
                ))}
              </div>
            </div>

            <div className="flex flex-col justify-between w-full max-w-xl">
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p className="my-4 text-gray-500">{product.description}</p>
              <p className="text-4xl font-extrabold text-green-700">
                $ {product.price}
              </p>

              <div className="flex items-start justify-between w-full">
                <div>
                  <h1 className="flex items-center mb-4">
                    <FaStore className="mr-2 text-gray-700" /> Brand: {product.brand.name}
                  </h1>
                  <h1 className="flex items-center mb-4">
                    <FaClock className="mr-2 text-gray-700" /> Added: {moment(product.createAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-4">
                    <FaStar className="mr-2 text-gray-700" /> Reviews: {product.numReviews}
                  </h1>
                </div>
                <div>
                  <h1 className="flex items-center mb-4">
                    <FaStar className="mr-2 text-gray-700" /> Ratings: {product.rating}
                  </h1>
                  <h1 className="flex items-center mb-4">
                    <FaShoppingCart className="mr-2 text-gray-700" /> Quantity: {product.quantity}
                  </h1>
                  <h1 className="flex items-center mb-4">
                    <FaBox className="mr-2 text-gray-700" /> In Stock: {product.countInStock}
                  </h1>
                </div>
              </div>

              <div className="flex justify-between flex-wrap items-center">
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
                disabled={product.countInStock === 0}
                className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 disabled:opacity-50"
              >
                Add To Cart
              </button>
            </div>
          </div>

          {/* Sticky Add To Cart for Mobile */}
          {product.countInStock > 0 && (
            <div className="fixed bottom-0 left-0 w-full bg-white shadow-md p-4 md:hidden">
              <button
                className="w-full bg-pink-600 text-white py-3 rounded-lg"
                onClick={addToCartHandler}
              >
                Add to Cart
              </button>
            </div>
          )}
        </motion.div>
      )}
    </>
  );
};

export default ProductDetails;
