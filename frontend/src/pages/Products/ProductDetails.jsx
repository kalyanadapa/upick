
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import BasicBreadcrumbs from "../../components/BreadCrumbs";
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
  console.log("product", product);

  const { isAuthenticated } = useSelector((state) => state.auth);
  // console.log("product page",isAuthenticated);

  const { isLoginModalOpen } = useSelector((state) => state.auth);
  console.log(isLoginModalOpen, "modal login");

 
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
  
      dispatch(addToCart(res)); // optional — only if you're using a local cart slice
      toast.success(res.message || "Item added to cart");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add item to cart");
    }
  };
  return (
    <>
      <BasicBreadcrumbs />
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <div className="flex flex-row items-start justify-evenly p-4 mt-8">
            {/* Left Section - Product Images */}
            <div className="flex flex-col  items-end mr-8">
              <div className="w-full h-full  mb-4">
                <img
                  src={selectedImage || product.images[0]}
                  alt={product.name}
                  className="max-w-[500px] h-[500px] object-cover rounded-lg"
                />
              </div>

              {/* Thumbnail Images */}
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

            {/* Right Section - Product Details */}
            <div className="flex flex-col justify-between w-full max-w-xl">
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p className="my-4 text-gray-500">{product.description}</p>
              <p className="text-4xl font-extrabold">$ {product.price}</p>

              <div className="flex items-start justify-between w-full">
                <div>
                  <h1 className="flex items-center mb-4">
                    <FaStore className="mr-2 text-gray-700" /> Brand:{" "}
                    {product.brand.name}
                  </h1>
                  <h1 className="flex items-center mb-4">
                    <FaClock className="mr-2 text-gray-700" /> Added:{" "}
                    {moment(product.createAt).fromNow()}
                  </h1>
                  <h1 className="flex items-center mb-4">
                    <FaStar className="mr-2 text-gray-700" /> Reviews:{" "}
                    {product.numReviews}
                  </h1>
                </div>
                <div>
                  <h1 className="flex items-center mb-4">
                    <FaStar className="mr-2 text-gray-700" /> Ratings:{" "}
                    {product.rating}
                  </h1>
                  <h1 className="flex items-center mb-4">
                    <FaShoppingCart className="mr-2 text-gray-700" /> Quantity:{" "}
                    {product.quantity}
                  </h1>
                  <h1 className="flex items-center mb-4">
                    <FaBox className="mr-2 text-gray-700" /> In Stock:{" "}
                    {product.countInStock}
                  </h1>
                </div>
              </div>

              <div className="flex justify-between flex-wrap">
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
                {product.countInStock > 0 && (
                  <select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="p-2 w-20 rounded-lg text-black"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                )}
              </div>
              <button
                onClick={addToCartHandler}
                disabled={product.countInStock === 0}
                className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-4"
              >
                Add To Cart
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default ProductDetails;
