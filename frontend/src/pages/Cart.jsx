// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import { FaTrash } from "react-icons/fa";

// const Cart = () => {
//   const navigate = useNavigate();
  
//   const [cartItems, setCartItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getCartProducts = async () => {
//       try {
//         const { data } = await axios.get("http://localhost:8000/api/v1/cart", { withCredentials: true });
//         console.log("Cart data:", data);
//         setCartItems(data.data); // Set the cart items from the API response
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching cart:", error.response?.data || error.message);
//         setError(error.response?.data || error.message);
//         setLoading(false);
//       }
//     };
//     getCartProducts();
//   }, []);

//   const removeFromCartHandler = (productId) => {
//     // Handle the remove product logic (you can add logic here for API remove or update the state)
//     console.log("Removed product with ID:", productId);
//   };

//   const checkoutHandler = () => {
//     navigate("/login?redirect=/shipping");
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div className="container flex justify-around items-start flex-wrap mx-auto mt-8">
//       {cartItems.length === 0 ? (
//         <div>
//           Your cart is empty <Link to="/shop">Go To Shop</Link>
//         </div>
//       ) : (
//         <div className="flex flex-col w-[80%]">
//           <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

//           {cartItems.map((item) => (
//             <div key={item._id} className="flex items-center mb-[1rem] pb-2">
//               <div className="w-[5rem] h-[5rem]">
//                 <img
//                   src={item.productData.images[0]} // Assuming the image is inside productData
//                   alt={item.productData.name}
//                   className="w-full h-full object-cover rounded"
//                 />
//               </div>

//               <div className="flex-1 ml-4">
//                 <Link to={`/product/${item.productId}`} className="text-pink-500">
//                   {item.productData.name}
//                 </Link>

//                 <div className="mt-2 text-white">{item.productData.brand.name}</div>
//                 <div className="mt-2 text-white font-bold">
//                   $ {item.productData.price}
//                 </div>
//               </div>

//               <div className="w-24">
//                 <select
//                   className="w-full p-1 border rounded text-black"
//                   value={item.qty}
//                   onChange={(e) =>
//                     // Handle quantity change (you can update state or call API to update cart)
//                     console.log("Quantity updated:", e.target.value)
//                   }
//                 >
//                   {[...Array(item.productData.countInStock).keys()].map((x) => (
//                     <option key={x + 1} value={x + 1}>
//                       {x + 1}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <button
//                   className="text-red-500 mr-[5rem]"
//                   onClick={() => removeFromCartHandler(item._id)}
//                 >
//                   <FaTrash className="ml-[1rem] mt-[.5rem]" />
//                 </button>
//               </div>
//             </div>
//           ))}

//           <div className="mt-8 w-[40rem]">
//             <div className="p-4 rounded-lg">
//               <h2 className="text-xl font-semibold mb-2">
//                 Items ({cartItems.length})
//               </h2>

//               <div className="text-2xl font-bold">
//                 ${" "}
//                 {cartItems
//                   .reduce((acc, item) => acc + item.qty * item.productData.price, 0)
//                   .toFixed(2)}
//               </div>

//               <button
//                 className="bg-pink-500 mt-4 py-2 px-4 rounded-full text-lg w-full"
//                 disabled={cartItems.length === 0}
//                 onClick={checkoutHandler}
//               >
//                 Proceed To Checkout
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Cart;
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";
import { useGetCartQuery } from "../redux/api/cartApiSlice";

const Cart = () => {
  const navigate = useNavigate();

  const {
    data: cartData,
    isLoading,
    error,
    refetch,
  } = useGetCartQuery();

  // Optional: Refetch on mount
  useEffect(() => {
    refetch();
  }, [refetch]);

  const cartItems = cartData?.data || [];

  const removeFromCartHandler = (productId) => {
    console.log("Removed product with ID:", productId);
  };

  const checkoutHandler = () => {
    navigate("/login?redirect=/shipping");
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <p>Error: {error?.data?.message || error.message}</p>;

  return (
    <div className="container flex justify-around items-start flex-wrap mx-auto mt-8">
      {cartItems.length === 0 ? (
        <div>
          Your cart is empty <Link to="/shop">Go To Shop</Link>
        </div>
      ) : (
        <div className="flex flex-col w-[80%]">
          <h1 className="text-2xl font-semibold mb-4">Shopping Cart</h1>

          {cartItems.map((item) => (
            <div key={item._id} className="flex items-center mb-[1rem] pb-2">
              <div className="w-[5rem] h-[5rem]">
                <img
                  src={item.productData.images[0]}
                  alt={item.productData.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>

              <div className="flex-1 ml-4">
                <Link to={`/product/${item.productId}`} className="text-pink-500">
                  {item.productData.name}
                </Link>

                <div className="mt-2 text-white">{item.productData.brand.name}</div>
                <div className="mt-2 text-white font-bold">
                  $ {item.productData.price}
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
                  {[...Array(item.productData.countInStock).keys()].map((x) => (
                    <option key={x + 1} value={x + 1}>
                      {x + 1}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <button
                  className="text-red-500 mr-[5rem]"
                  onClick={() => removeFromCartHandler(item._id)}
                >
                  <FaTrash className="ml-[1rem] mt-[.5rem]" />
                </button>
              </div>
            </div>
          ))}

          <div className="mt-8 w-[40rem]">
            <div className="p-4 rounded-lg">
              <h2 className="text-xl font-semibold mb-2">
                Items ({cartItems.length})
              </h2>

              <div className="text-2xl font-bold">
                ${" "}
                {cartItems
                  .reduce((acc, item) => acc + item.qty * item.productData.price, 0)
                  .toFixed(2)}
              </div>

              <button
                className="bg-pink-500 mt-4 py-2 px-4 rounded-full text-lg w-full"
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed To Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
