import { Link } from "react-router-dom";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { toast } from "react-toastify";
import HeartIcon from "./HeartIcon";
import { useAddToCartMutation } from "../../redux/api/cartApiSlice";
import { openLoginModal } from "../../redux/features/auth/authSlice";
// eslint-disable-next-line react/prop-types
const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const {userInfo, isAuthenticated } = useSelector((state) => state.auth);
  const isAdmin = userInfo?.data?.user?.isAdmin
  
    // const { isLoginModalOpen } = useSelector((state) => state.auth);
     const [addToCartApi, { isLoading: isAdding }] = useAddToCartMutation();
const addToCartHandler = async () => {
    if (!isAuthenticated) {
      dispatch(openLoginModal());
      return;
    }
  
    try {
      const res = await addToCartApi({
        productId: product._id,
        quantity: 1,
      }).unwrap();
  
      dispatch(addToCart(res)); // optional — only if you're using a local cart slice
      toast.success(res.message || "Item added to cart");
    } catch (err) {
      toast.error(err?.data?.message || "Failed to add item to cart");
    }
  };

  return (
    <div className="max-w-xs w-full bg-[#1A1A1A] rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 mx-auto">
      {/* Product Image */}
      <section className="relative">
        <Link to={`/product/${product._id}`}>
          <span className="absolute bottom-3 right-3 bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
            {typeof product?.brand === "object" ? product.brand.name : product.brand}
          </span>
          <img
            className="cursor-pointer w-full h-48 object-cover"
            src={product.images?.[0] || "/placeholder-image.jpg"} // Handling image array
            alt={product.name}
          />
        </Link>
       
      </section>

      {/* Product Details */}
      <div className="p-5 max-h-[35vh]">
        <div className="flex justify-between items-start">
          <h5 
            className="mb-2 text-xl text-white dark:text-white"
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {product?.name}
          </h5>

          <p className="text-black font-semibold text-pink-500">
            {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>

        <p className="mb-3 font-normal text-[#CFCFCF] line-clamp-2" >
          {product?.description || "No description available."}
        </p>

        {/* Action Buttons */}
        <section className="flex justify-between items-center">
          <Link
            to={`/product/${product._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
          >
            Read More
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>
          {!isAdmin && (<>
             <span className="flex justify-between items-center">  <HeartIcon product={product} />
          <button
            className="p-2 rounded-full"
            onClick={() => addToCartHandler()}
          >
            <AiOutlineShoppingCart size={25} />
          </button></span>
          </>)}
       
        
        </section>
      </div>
    </div>
  );
};

export default ProductCard;
