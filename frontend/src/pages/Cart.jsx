import { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import {
  useGetCartQuery,
  useRemoveFromCartMutation,
  useCreateCheckoutSessionMutation,
} from "../redux/api/cartApiSlice";
import AnimatedLoader from "../components/AnimateLoader";
const Cart = () => {
  const [removeFromCart] = useRemoveFromCartMutation();
  const [createCheckoutSession, { isLoading: isCheckoutLoading }] =
    useCreateCheckoutSessionMutation();

  const { data: cartData, isLoading, error, refetch } = useGetCartQuery();
  const handleCheckout = async () => {
    try {
      const res = await createCheckoutSession().unwrap();
      if (res?.url) {
        window.location.href = res.url; // Redirect to Stripe checkout
      }
    } catch (err) {
      console.error("Checkout error:", err);
      alert("Failed to start checkout. Try again.");
    }
  };

  useEffect(() => {
    refetch();
  }, [refetch]);

  const cartItems = cartData?.data || [];

  const handleRemoveFromCart = async (productId) => {
    try {
      await removeFromCart(productId).unwrap();
    } catch (err) {
      console.error("Error removing product from cart:", err);
    }
  };

  if (isLoading)
    return (
      <div>
        <AnimatedLoader />
      </div>
    );
  if (error) return <p>Error: {error?.data?.message || error.message}</p>;

  return (
    <div className="container mx-auto px-4 py-8">
      {cartItems.length === 0 ? (
        <div className="flex flex-col justify-center items-center h-64 text-center">
          <p className="text-2xl font-semibold mb-2">Your cart is empty</p>
          <Link to="/category/men" className="text-pink-500 hover:underline">
            Go To Shop
          </Link>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Left - Cart Items */}
          <div className="flex-1">
            <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex items-center mb-6 border-b pb-4"
              >
                <div className="w-20 h-20">
                  <img
                    src={item.productData.images[0]}
                    alt={item.productData.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                <div className="flex-1 ml-4">
                  <Link
                    to={`/product/${item.productId}`}
                    className="text-pink-500 font-medium hover:underline"
                  >
                    {item.productData.name}
                  </Link>
                  <div className="text-gray-400 text-sm mt-1">
                    {item.productData.brand.name}
                  </div>
                  <div className="text-white font-bold mt-2">
                    ${item.productData.price}
                  </div>
                </div>

                <div className="w-24">
                  <select
                    className="w-full p-1 border rounded text-black"
                    value={item.qty}
                    onChange={(e) =>
                      console.log("Quantity updated:", e.target.value)
                    }
                  >
                    {[...Array(item.productData.countInStock).keys()].map(
                      (x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      )
                    )}
                  </select>
                </div>

                <button
                  className="text-red-500 ml-4"
                  onClick={() => handleRemoveFromCart(item.productId)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>

          {/* Right - Cart Summary */}
          <div className="w-full lg:w-[28rem] bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

            <div className="flex justify-between text-gray-600 mb-2">
              <span>Subtotal ({cartItems.length} items)</span>
              <span>
                $
                {cartItems
                  .reduce(
                    (acc, item) => acc + item.qty * item.productData.price,
                    0
                  )
                  .toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between text-gray-600 mb-2">
              <span>Shipping</span>
              <span>$5.00</span>
            </div>

            <div className="flex justify-between text-gray-600 mb-4">
              <span>Tax</span>
              <span>$3.00</span>
            </div>

            <div className="border-t pt-4 flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>
                $
                {(
                  cartItems.reduce(
                    (acc, item) => acc + item.qty * item.productData.price,
                    0
                  ) +
                  5 +
                  3
                ).toFixed(2)}
              </span>
            </div>

            <button
              className="bg-pink-500 text-white mt-6 w-full py-2 px-4 rounded-full text-lg hover:bg-pink-600 transition"
              onClick={handleCheckout}
              disabled={isCheckoutLoading}
            >
              {isCheckoutLoading ? "Processing..." : "Place Order"}
            </button>

            <p className="text-sm text-gray-500 mt-4 text-center">
              All prices include applicable taxes. Shipping charges may vary at
              checkout.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
